from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import threading
import re
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
    def send_head(self):
        self.remaining=None
        match=re.fullmatch(r'bytes=(\d+)-(\d*)',self.headers.get('Range',''))
        path=Path(self.translate_path(self.path))
        if match and path.is_file():
            size=path.stat().st_size
            start=int(match[1]);end=min(int(match[2]) if match[2] else size-1,size-1)
            if start>=size:
                self.send_error(416);return None
            self.remaining=end-start+1
            self.send_response(206)
            self.send_header('Content-Type',self.guess_type(str(path)))
            self.send_header('Accept-Ranges','bytes')
            self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
            self.send_header('Content-Length',str(self.remaining))
            self.end_headers()
            file=path.open('rb');file.seek(start);return file
        return super().send_head()
    def copyfile(self,source,outputfile):
        try:
            if self.remaining is None:super().copyfile(source,outputfile)
            else:
                while self.remaining:
                    chunk=source.read(min(65536,self.remaining))
                    if not chunk:break
                    outputfile.write(chunk);self.remaining-=len(chunk)
        except (ConnectionResetError,BrokenPipeError):pass

server=ThreadingHTTPServer(('127.0.0.1',0),partial(Handler,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':900})
    page.goto(f'http://127.0.0.1:{server.server_port}/index.html')
    page.evaluate('async()=>await ready')
    page.click('#play')
    page.wait_for_function('!music.paused && music.readyState >= 2')
    page.click('#sound')
    assert page.evaluate('music.muted')
    page.click('#sound')
    assert not page.evaluate('music.muted')
    page.wait_for_function('music.seekable.length && music.seekable.end(0)>55')
    page.evaluate("scrub.value=24;scrub.dispatchEvent(new Event('input'))")
    page.wait_for_function('Math.abs(music.currentTime-24)<1')
    page.click('#play')
    assert page.evaluate('music.paused')
    page.screenshot(path=str(ROOT/'out/desktop-player.png'))
    page.evaluate('seek(56)')
    page.locator('canvas').screenshot(path=str(ROOT/'out/final-frame.png'))
    assert page.locator('a[download]').get_attribute('href')=='out/growth-film.mp4'
    browser.close()
server.shutdown()
print('Playback, audio, mute/unmute, seeking, pause, final frame: passed')
