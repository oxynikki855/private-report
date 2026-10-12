"""Deterministic browser frames -> ffmpeg; use --preview before full render."""
import argparse
import base64
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import subprocess
import threading
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'out'
OUT.mkdir(exist_ok=True)
parser=argparse.ArgumentParser()
parser.add_argument('--preview',action='store_true')
parser.add_argument('--fps',type=int,default=30)
args=parser.parse_args()

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
    def copyfile(self,source,outputfile):
        try:super().copyfile(source,outputfile)
        except (ConnectionResetError,BrokenPipeError):pass

server=ThreadingHTTPServer(('127.0.0.1',0),partial(QuietHandler,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1920,'height':1080},device_scale_factor=1)
    errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.goto(f'http://127.0.0.1:{server.server_port}/index.html?export=1')
    page.evaluate('async()=>await window.ready')
    moments=[2.5,9,17,25,33,39,43,47,53]
    previews=[]
    for i,t in enumerate(moments):
        page.evaluate('(t)=>seek(t)',t)
        fn=OUT/f'scene-{i+1:02}.png'
        page.locator('canvas').screenshot(path=str(fn))
        im=Image.open(fn).convert('RGB')
        pixels=np.array(im)
        assert np.mean(np.any(pixels<220,axis=2))>.007, f'Blank scene {i}'
        im.thumbnail((640,360))
        previews.append(im)
    sheet=Image.new('RGB',(1920,3*400),'#edf0ef')
    draw=ImageDraw.Draw(sheet)
    for i,im in enumerate(previews):
        x,y=(i%3)*640,(i//3)*400
        sheet.paste(im,(x,y))
        draw.text((x+20,y+370),f'{moments[i]:04.1f}s / scene {i+1}',fill='#333333')
    sheet.save(OUT/'contact-sheet.jpg',quality=95)
    assert not errors,errors
    # Canvas pixels must change between timestamps in the same scene.
    page.evaluate('seek(14)')
    a=page.evaluate("film.toDataURL('image/jpeg',0.9)")
    page.evaluate('seek(16)')
    b=page.evaluate("film.toDataURL('image/jpeg',0.9)")
    assert a!=b,'Animation is stationary'
    # Check mobile viewer framing and the browser console as well.
    page.set_viewport_size({'width':390,'height':844})
    page.goto(f'http://127.0.0.1:{server.server_port}/index.html')
    page.evaluate('async()=>await window.ready')
    page.evaluate('seek(17)')
    page.screenshot(path=str(OUT/'mobile-preview.png'))
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),'Mobile overflow'
    page.set_viewport_size({'width':1920,'height':1080})
    page.goto(f'http://127.0.0.1:{server.server_port}/index.html?export=1')
    page.evaluate('async()=>await window.ready')
    print('Preview, nonblank pixels, animation, mobile framing: passed',flush=True)
    if not args.preview:
        cmd=['ffmpeg','-y','-hide_banner','-loglevel','warning','-f','image2pipe','-vcodec','mjpeg','-framerate',str(args.fps),'-i','pipe:0','-i',str(OUT/'music.wav'),'-map','0:v:0','-map','1:a:0','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','48000','-af','loudnorm=I=-18:TP=-1.5:LRA=9','-t','56','-movflags','+faststart',str(OUT/'growth-film.mp4')]
        encoder=subprocess.Popen(cmd,stdin=subprocess.PIPE)
        for frame in range(56*args.fps):
            t=frame/args.fps
            data=page.evaluate("t=>{seek(t);return film.toDataURL('image/jpeg',0.96).split(',')[1]}",t)
            encoder.stdin.write(base64.b64decode(data))
            if frame%(args.fps*4)==0:print(f'Rendered {t:.0f}/56 seconds',flush=True)
        encoder.stdin.close()
        assert encoder.wait()==0,'ffmpeg failed'
        print('Finished:',OUT/'growth-film.mp4',flush=True)
    browser.close()
server.shutdown()
