#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Builds a contact sheet of template images + generates favicon/logo variants."""
import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(BASE, "images")

# ---------- 1) Contact sheet of img_01..img_12 ----------
cols, rows = 4, 3
tw, th = 300, 180
sheet = Image.new("RGB", (cols * tw, rows * (th + 22)), (24, 24, 28))
draw = ImageDraw.Draw(sheet)
for i in range(12):
    p = os.path.join(IMG, "img_%02d.png" % (i + 1))
    if not os.path.exists(p):
        continue
    im = Image.open(p).convert("RGB")
    im.thumbnail((tw, th))
    x = (i % cols) * tw
    y = (i // cols) * (th + 22)
    sheet.paste(im, (x + (tw - im.width) // 2, y + (th - im.height) // 2))
    draw.text((x + 6, y + th + 4), "img_%02d" % (i + 1), fill=(230, 230, 230))
sheet_path = os.path.join(BASE, "_contact_sheet.png")
sheet.save(sheet_path)
print("contact sheet:", sheet_path)

# ---------- 2) Favicon from logo (black bg square, content-centred) ----------
logo = Image.open(os.path.join(IMG, "MAB Logo 3.jpeg")).convert("RGB")
w, h = logo.size
# find bounding box of non-black content
gray = logo.convert("L")
bbox = gray.point(lambda v: 255 if v > 18 else 0).getbbox()
print("logo content bbox:", bbox)
if bbox:
    pad = 24
    l = max(0, bbox[0] - pad)
    t = max(0, bbox[1] - pad)
    r = min(w, bbox[2] + pad)
    b = min(h, bbox[3] + pad)
    content = logo.crop((l, t, r, b))
else:
    content = logo
# square canvas, black bg, content centred and scaled to 78%
side = max(content.size)
canvas = Image.new("RGB", (side, side), (0, 0, 0))
scale = 0.80
cs = content.copy()
cs.thumbnail((int(side * scale), int(side * scale)))
canvas.paste(cs, ((side - cs.width) // 2, (side - cs.height) // 2))
canvas.save(os.path.join(IMG, "favicon-512.png"), optimize=True)
canvas.resize((192, 192), Image.LANCZOS).save(os.path.join(IMG, "favicon-192.png"), optimize=True)
canvas.resize((32, 32), Image.LANCZOS).save(os.path.join(BASE, "favicon-32x32.png"), optimize=True)
canvas.resize((16, 16), Image.LANCZOS).save(os.path.join(BASE, "favicon-16x16.png"), optimize=True)
# ICO with multiple sizes
ico_sizes = [(16, 16), (32, 32), (48, 48)]
canvas.save(os.path.join(BASE, "favicon.ico"), format="ICO", sizes=ico_sizes)
print("favicon written")

# ---------- 3) Web-friendly logo (trimmed, moderate size) ----------
web_logo = content.copy()
web_logo.thumbnail((720, 360), Image.LANCZOS)
web_logo.save(os.path.join(IMG, "mab-logo.png"), optimize=True)
print("web logo:", web_logo.size)

# ---------- 4) Optimised copies of images (max 1280w) used on site ----------
os.makedirs(os.path.join(IMG, "opt"), exist_ok=True)
for i in range(1, 13):
    src = os.path.join(IMG, "img_%02d.png" % i)
    if not os.path.exists(src):
        continue
    im = Image.open(src).convert("RGB")
    if im.width > 1280:
        im = im.resize((1280, int(im.height * 1280 / im.width)), Image.LANCZOS)
    out = os.path.join(IMG, "opt", "img_%02d.jpg" % i)
    im.save(out, "JPEG", quality=82, optimize=True, progressive=True)
print("optimised images written to images/opt/")
print("DONE")
