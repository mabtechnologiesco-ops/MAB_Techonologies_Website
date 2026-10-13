#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Checks all local href/src targets and in-page anchors across HTML files."""
import os, re, io, sys

BASE = os.path.dirname(os.path.abspath(__file__))
errors = []
checked = 0

html_files = [f for f in os.listdir(BASE) if f.endswith(".html")]

# Collect ids per file
ids = {}
links = []  # (file, href)
for fn in html_files:
    path = os.path.join(BASE, fn)
    with io.open(path, encoding="utf-8") as f:
        content = f.read()
    ids[fn] = set(re.findall(r'id="([^"]+)"', content))
    for m in re.findall(r'(?:href|src)=["\']([^"\']+)["\']', content):
        links.append((fn, m))

# Also scan JS-generated link targets (shell builds from config anchors)
with io.open(os.path.join(BASE, "includes", "_config.js"), encoding="utf-8") as f:
    cfg = f.read()
config_anchors = set(re.findall(r'href:\s*"(#[^"]+)"', cfg)) | set(re.findall(r'target:\s*"(#[^"]+)"', cfg))
print("config anchors:", sorted(config_anchors))

def check_target(source, raw):
    global checked
    checked += 1
    if raw.startswith(("http://", "https://", "mailto:", "tel:", "data:", "//")):
        return
    if raw.startswith("#"):
        anchor = raw[1:]
        if anchor and anchor not in ids.get(source, set()):
            errors.append(f"{source}: missing in-page anchor {raw}")
        return
    # split anchor
    if "#" in raw:
        page, anchor = raw.split("#", 1)
    else:
        page, anchor = raw, None
    page = page.split("?")[0]
    if page == "":
        page = source
    target_path = os.path.join(BASE, page)
    if not os.path.exists(target_path):
        errors.append(f"{source}: missing file {page} (from {raw})")
        return
    if anchor and page.endswith(".html"):
        if anchor not in ids.get(page, set()):
            errors.append(f"{source}: {page} has no id '{anchor}'")

for src, raw in links:
    check_target(src, raw)

# config anchors must exist in index.html (single-page hub)
for a in config_anchors:
    anchor = a[1:]
    if anchor and anchor not in ids.get("index.html", set()):
        errors.append(f"config: index.html has no id '{anchor}' for {a}")

# main.js hash targets
with io.open(os.path.join(BASE, "js", "main.js"), encoding="utf-8") as f:
    pass  # main.js uses runtime querySelector on actual hrefs

print(f"checked {checked} references across {len(html_files)} files")
if errors:
    print("ERRORS:")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print("ALL LINKS OK")
