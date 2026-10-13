import re, os
os.chdir('c:/Users/hp/Desktop/MAB_Techonologies_Website')

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
refs = set()
for f in html_files:
    txt = open(f, encoding='utf-8').read()
    refs.update(re.findall(r'(?:src|href|content)="([^"]+\.(?:png|jpg|jpeg|ico|css|js|svg|webmanifest))"', txt))

# CSS url() references
for css in ['css/style.css']:
    if os.path.exists(css):
        txt = open(css, encoding='utf-8').read()
        for m in re.findall(r'url\(([^)]+)\)', txt):
            m = m.strip('\'"').split('?')[0]
            if m and not m.startswith(('data:', 'http')):
                refs.add(m)

missing = []
for r in sorted(refs):
    p = r.replace('%20', ' ')
    if os.path.exists(p):
        print('OK      ', r)
    else:
        print('MISSING ', r)
        missing.append(r)

print()
print('Total refs:', len(refs), '| Missing:', len(missing))
if missing:
    print('BROKEN:', missing)
else:
    print('ALL ASSETS PRESENT')
