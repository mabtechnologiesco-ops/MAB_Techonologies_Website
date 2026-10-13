"""Structural sanity check for the MAB Technologies static site.

Balances block-level container tags in every page and verifies that every
<section id="..."> is a direct child of <main> (not accidentally nested
inside another section, which silently breaks scroll and layout).
"""
import os
import re
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input",
        "link", "meta", "param", "source", "track", "wbr"}
CONTAINERS = ["section", "div", "main", "header", "footer", "nav", "ul",
              "ol", "form", "fieldset", "figure", "article", "aside"]

pages = sorted(f for f in os.listdir(BASE)
               if f.endswith(".html") and not f.startswith("_"))

failures = []

for page in pages:
    path = os.path.join(BASE, page)
    html = open(path, encoding="utf-8").read()

    # Strip comments, scripts and styles so their contents are not counted.
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S | re.I)
    html = re.sub(r"<style\b[^>]*>.*?</style>", "", html, flags=re.S | re.I)

    stack, problems = [], []
    for token in re.finditer(r"<(/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(/?)>", html):
        closing, tag, selfclose = token.group(1), token.group(2).lower(), token.group(3)
        if tag in VOID or selfclose:
            continue
        if tag not in CONTAINERS:
            continue
        line = html.count("\n", 0, token.start()) + 1
        if closing:
            if not stack:
                problems.append("line %d: stray </%s>" % (line, tag))
            elif stack[-1][0] != tag:
                problems.append(
                    "line %d: </%s> closes <%s> opened at line %d"
                    % (line, tag, stack[-1][0], stack[-1][1]))
                stack.pop()
            else:
                stack.pop()
        else:
            stack.append((tag, line))

    for tag, line in stack:
        problems.append("unclosed <%s> opened at line %d" % (tag, line))

    # Every section that carries an id must sit directly under <main>.
    for m in re.finditer(r'<section[^>]*\bid="([^"]+)"[^>]*>', html):
        start = m.start()
        before = html[:start]
        depth = 0
        for tok in reversed(list(re.finditer(r"<(/?)(section)\b[^>]*?(/?)>", before))):
            if tok.group(1):
                depth += 1
            elif not tok.group(3):
                depth -= 1
        if depth != 0:
            problems.append(
                'section id="%s" is nested %d level(s) inside another section '
                "(missing </section>)" % (m.group(1), depth))

    status = "OK  " if not problems else "FAIL"
    print("%s %-16s %d problems" % (status, page, len(problems)))
    for p in problems[:12]:
        print("       - %s" % p)
    if problems:
        failures.append(page)

print("\n%d/%d pages clean" % (len(pages) - len(failures), len(pages)))
sys.exit(1 if failures else 0)
