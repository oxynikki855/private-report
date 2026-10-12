from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent
DEST = ROOT / 'assets'
DEST.mkdir(exist_ok=True)
SOURCES = {
    'voice': '01-voice-to-agent-system.jpg',
    'pipe': '02-repair-data-pipe-agent-patrol.jpg',
    'boundary': '03-skill-to-tool-boundary.jpg',
    'entrance': 'complexity-to-task-entrance.jpg',
    'team': 'department-bot-task-pipeline.jpg',
    'next': '06-ap06-operations-bottleneck.jpg',
}
for key, name in SOURCES.items():
    rgb = np.array(Image.open(ROOT.parent / 'public/assets' / name).convert('RGB'))
    corners = np.concatenate([rgb[:40,:40].reshape(-1,3),rgb[:40,-40:].reshape(-1,3)])
    paper = np.median(corners,axis=0)
    distance = np.max(np.abs(rgb.astype(float) - paper),axis=2)
    alpha = np.clip((distance-5)/22,0,1)
    rgba = np.dstack([rgb,(alpha*255).astype('uint8')])
    image = Image.fromarray(rgba)
    bounds = Image.fromarray((alpha>.8).astype('uint8')*255).getbbox()
    left, top, right, bottom = bounds
    image = image.crop((max(0,left-30),max(0,top-30),min(image.width,right+30),min(image.height,bottom+30)))
    image.save(DEST / f'{key}.png')
    print(key, 'paper', paper)
