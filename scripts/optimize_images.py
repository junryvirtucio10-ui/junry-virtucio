"""Build responsive images from the untouched originals in assets/images/.

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
IMAGE_SOURCES = ROOT / 'assets' / 'images'
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
        crop_description = 'none'
        if crop:
            target_height = image.width * 3 // 4
            if image.height >= target_height:
                # Tall captures show their top 4:3 region in the archive.
                image = image.crop((0, 0, image.width, target_height))
                crop_description = 'top 4:3'
            else:
                # Wide captures crop equally from both sides without padding.
                target_width = image.height * 4 // 3
                left = (image.width - target_width) // 2
                image = image.crop((left, 0, left + target_width, image.height))
                crop_description = 'center 4:3'
        eligible_widths = tuple(width for width in widths if width <= image.width)
        if not eligible_widths:
            raise ValueError(f'No output width fits without upscaling: {source}')
        outputs = []
        for width in eligible_widths:
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
              'crop': crop_description, 'outputs': outputs}
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
        records.append(variants(IMAGE_SOURCES / f'{name}.jpg', name, widths))

    source = IMAGE_SOURCES / 'jv-white-logo.png'
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
