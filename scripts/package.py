"""Build a self-contained HTML and a complete source ZIP without dependencies."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
import re

root = Path(__file__).resolve().parents[1]
out = root / 'dist'
out.mkdir(exist_ok=True)
worker_source = (root / 'js/engine.js').read_text() + '\n' + (root / 'js/simulation-worker.js').read_text().replace("importScripts('engine.js');", '')
day_worker_source = (root / 'js/engine.js').read_text() + '\n' + (root / 'js/day-engine.js').read_text() + '\n' + (root / 'js/day-worker.js').read_text().replace("importScripts('engine.js','day-engine.js');", '')
prelude = 'const INLINE_DAY_WORKER_SOURCE=' + json.dumps(day_worker_source) + ';\n' + 'const INLINE_WORKER_SOURCE=' + json.dumps(worker_source) + ';\n' + '''
function makeInlineDayWorker(){
 const url=URL.createObjectURL(new Blob([INLINE_DAY_WORKER_SOURCE],{type:'text/javascript'}));
 const worker=new Worker(url),terminate=worker.terminate.bind(worker);
 worker.terminate=()=>{URL.revokeObjectURL(url);terminate()};return worker;
}
function makeInlineWorker(){
 const url=URL.createObjectURL(new Blob([INLINE_WORKER_SOURCE],{type:'text/javascript'}));
 const worker=new Worker(url),terminate=worker.terminate.bind(worker);
 worker.terminate=()=>{URL.revokeObjectURL(url);terminate()};
 return worker;
}
'''
page = (root / 'index.html').read_text()
page = page.replace('<link rel="stylesheet" href="styles.css">', '<style>' + (root / 'styles.css').read_text() + '</style>')
def inline(match):
    source = (root / match.group(1)).read_text()
    if match.group(1) in ['js/app.js','js/campaign.js']:
        source = source.replace("new Worker('js/simulation-worker.js')", 'makeInlineWorker()').replace("new Worker('js/day-worker.js')", 'makeInlineDayWorker()')
    return '<script>\n' + source + '\n</script>'
page = re.sub(r'<script src="([^"]+)"></script>', inline, page)
page = page.replace('<script>', '<script>\n' + prelude, 1)
page = page.replace('</body>', '<script type="application/json" id="modelNotes">' + json.dumps((root / 'docs/REGISTER_RECONCILIATION.md').read_text()).replace('<', '\\u003c') + '</script></body>')
standalone = out / 'ION_Campus_Planner_v4_1.html'
standalone.write_text(page)
archive = out / 'ION_Campus_Planner_v4_1.zip'
with ZipFile(archive, 'w', ZIP_DEFLATED) as z:
    z.write(standalone, standalone.name)
    for name in ['index.html', 'styles.css', 'README.md', 'package.json', '.gitignore']:
        if (root / name).exists(): z.write(root / name, name)
    for name in ['js', 'docs', 'tests', 'scripts', 'examples']:
        for p in sorted((root / name).rglob('*')):
            if p.is_file() and '__pycache__' not in p.parts: z.write(p, p.relative_to(root))
print(f'HTML: {standalone} ({standalone.stat().st_size:,} bytes)')
print(f'ZIP: {archive} ({archive.stat().st_size:,} bytes)')
