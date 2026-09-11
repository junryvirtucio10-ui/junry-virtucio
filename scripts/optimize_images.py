"""Build responsive images from the untouched originals in assets/.

Install: python -m pip install -r scripts/image-requirements.txt
Run:     python scripts/optimize_images.py
"""

import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageOps, features

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets' / 'optimized'
PROJECT_WIDTHS = (480, 800, 1200, 1600, 1920)
PHOTOS = {
    'workspace-hero': (480, 800, 1200, 1600),
    'services-workspace': (480, 800, 1200, 1600),
    'structure-purpose-visual': (480, 800, 1178),
    'junry-portrait': (400, 800, 1120),
}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def variants(source, name, widths, crop=False):
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        original_size = image.size
        if crop:
            # The site's object-fit: cover / object-position: top shows this
            # exact region. The narrower mobile archive/hero crops it further.
            image = image.crop((0, 0, image.width, image.width * 3 // 4))
        outputs = []
        for width in widths:
            if width > image.width:
                raise ValueError(f'Upscaling is not allowed: {source} -> {width}')
            height = round(width * image.height / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            for extension in ('webp', 'avif'):
                target = DEST / f'{name}-{width}.{extension}'
                target.parent.mkdir(parents=True, exist_ok=True)
                options = ({'quality': 85 if crop else 82, 'method': 6}
                           if extension == 'webp' else
                           {'quality': 68 if crop else 60, 'speed': 6,
                            'subsampling': '4:4:4' if crop else '4:2:0'})
                resized.save(target, **options)
                with Image.open(target) as check:
                    check.load()
                    assert check.size == (width, height)
                outputs.append({'path': target.relative_to(ROOT).as_posix(),
                                'width': width, 'height': height,
                                'bytes': target.stat().st_size})
    record = {'source': source.relative_to(ROOT).as_posix(),
              'sourceSha256': digest(source), 'sourceBytes': source.stat().st_size,
              'sourceWidth': original_size[0], 'sourceHeight': original_size[1],
              'crop': 'top 4:3' if crop else 'none', 'outputs': outputs}
    print(f'{name}: {record["sourceBytes"]:,} bytes -> '
          f'{outputs[-1]["bytes"]:,} bytes (largest AVIF)', flush=True)
    return record


def main():
    if not features.check('webp') or not features.check('avif'):
        raise RuntimeError('Pillow must include WebP and AVIF support.')
    catalog = (ROOT / 'projects-data.js').read_text(encoding='utf-8').split('window.JUNRY_PROJECTS =', 1)[1]
    projects = re.findall(r"id: '([^']+)'[\s\S]*?image: '([^']+)'", catalog)
    if not projects or len({name for name, _ in projects}) != len(projects):
        raise ValueError('The project catalog must contain unique project IDs.')
    records = [variants(ROOT / source, f'projects/{name}', PROJECT_WIDTHS, crop=True)
               for name, source in projects]
    for name, widths in PHOTOS.items():
        records.append(variants(ROOT / 'assets' / f'{name}.jpg', name, widths))

    source = ROOT / 'assets' / 'jv-white-logo.png'
    target = DEST / 'jv-white-logo-198.webp'
    with Image.open(source) as original:
        logo = ImageOps.exif_transpose(original).convert('RGBA')
        logo.resize((198, 132), Image.Resampling.LANCZOS).save(
            target, lossless=True, quality=100, method=6)
    with Image.open(target) as check:
        check.load()
        assert check.size == (198, 132)
    records.append({'source': source.relative_to(ROOT).as_posix(),
                    'sourceSha256': digest(source), 'sourceBytes': source.stat().st_size,
                    'sourceWidth': 1536, 'sourceHeight': 1024, 'crop': 'none',
                    'outputs': [{'path': target.relative_to(ROOT).as_posix(),
                                 'width': 198, 'height': 132,
                                 'bytes': target.stat().st_size}]})
    (DEST / 'manifest.json').write_text(json.dumps(records, indent=2) + '\n', encoding='utf-8')
    print(f'Logo: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes')
    print('All originals retained. Asset dimensions and decoding checked.')


if __name__ == '__main__':
    main()
