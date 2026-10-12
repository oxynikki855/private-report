from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parent
assets = ROOT.parent / 'public/assets'
names = ['01-voice-to-agent-system.jpg', '02-repair-data-pipe-agent-patrol.jpg', '03-skill-to-tool-boundary.jpg', 'complexity-to-task-entrance.jpg', 'department-bot-task-pipeline.jpg', '06-ap06-operations-bottleneck.jpg', '01-ap01-agent-image-line-v2-retry.jpg', '02-ap02-restart-data-bottleneck.jpg', '03-ap03-customer-service-dispatch-v2.jpg', '04-ap04-erp-digital-employee-platform-v2.jpg', '10-ap10-quality-app-constellation-v2.jpg', 'obsidian.jpeg']
sheet = Image.new('RGB', (1200, 6 * 270), 'white')
draw = ImageDraw.Draw(sheet)
for i, name in enumerate(names):
    im = Image.open(assets / name).convert('RGB')
    print(name, im.size)
    im.thumbnail((580, 235))
    x, y = (i % 2) * 600, (i // 2) * 270
    sheet.paste(im, (x + (600 - im.width)//2, y))
    draw.text((x+12, y+240), f'{i+1:02} {name.encode("ascii", "replace").decode()}', fill='black')
sheet.save(ROOT / 'assets-contact.jpg')
