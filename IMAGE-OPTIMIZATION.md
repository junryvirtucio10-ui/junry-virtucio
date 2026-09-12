# Image optimization

The homepage and project archive use responsive AVIF images with WebP fallbacks.
Original site media is organized in `assets/images/`, while full project captures
live in `assets/projects/`. Pages display smaller derivatives from
`assets/optimized/`.

## Measured image downloads

Measured in local Microsoft Edge with a fresh browser context. Desktop was
1440 x 900 at 1x pixel density; mobile was 390 x 844 at 2x. These are downloaded
image bytes, not total page size or a prediction of load time on a live network.
Full-page measurements include scrolling through all images.

The project-archive measurements below document the original nine-project
benchmark; the archive has since expanded and should be remeasured before using
those two rows as a current transfer-size budget.

| Measurement | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Desktop homepage, initial load | 2,618,780 B | 166,831 B | 93.6% |
| Desktop homepage, full page | 7,469,276 B | 602,939 B | 91.9% |
| Desktop project archive, full page | 12,045,688 B | 229,118 B | 98.1% |
| Mobile homepage, full page | 7,469,276 B | 418,925 B | 94.4% |
| Mobile project archive, full page | 12,045,688 B | 507,716 B | 95.8% |

Browser image selection varies with screen size, pixel density, support for
AVIF, caching, and the browser's lazy-loading distance.

## Asset choices

- Project previews crop the top 4:3 region of the original screenshot, matching
  the existing CSS framing. Mobile archive cards and the hero retain their own
  existing crop via `object-fit: cover` and `object-position: top center`.
- Project thumbnails use 480, 800, and 1200 px variants. Sources at least 1600
  or 1920 px wide also receive those larger variants; the optimizer never upscales.
- Photos retain their original compositions and have multiple width variants.
  Services image sizes account for the extra scaling caused by its tall frame.
- The 66 x 44 px header logo uses a 198 x 132 lossless WebP for up to 3x density:
  4,620 B instead of 1,090,585 B.
- The hero remains eagerly loaded with high priority. Below-the-fold images
  retain native lazy loading. The browser chooses one format/width per image.
- Hero dimensions now correctly declare 1800 x 2250, and services dimensions
  correctly declare 1800 x 1198. Social sharing retains the original images.
- Versioned stylesheet and script URLs were incremented for the changed files.

## Rebuild

From the repository root, with Python installed:

```powershell
python -m pip install -r scripts/image-requirements.txt
python scripts/optimize_images.py
```

The script rebuilds derivatives and `assets/optimized/manifest.json`. It does
not overwrite the originals. The manifest records original SHA-256 hashes and
each generated file's size and dimensions. Generated images are committed
website assets; Python and Pillow are only needed when regenerating them.

For a new project, add the full screenshot and its catalog entry in
`projects-data.js`, then run the script. Thumbnail names derive from the project
ID. If adding a new homepage card, add its matching `<picture>` markup, including
both source sets and the appropriate `sizes` value.

To preview the static site:

```powershell
py -m http.server 5173 --bind 127.0.0.1
```

Open `http://localhost:5173`. No npm build or dev server is required.

## Verification

- All 217 generated images decoded successfully with the expected dimensions.
- All 30 source images were processed without modifying the originals.
- Asset references and responsive width descriptors were verified.
- Homepage and archive checked at 1440, 820, and 390 px, including high-density
  tablet/mobile rendering, image loading, project filters, mobile navigation,
  and the homepage case-study dialog.
- Repeated all six page/viewport checks with AVIF sources marked unsupported;
  WebP fallbacks loaded successfully. Neither format run had JavaScript errors
  or failed HTTP responses.
- Image layout measurements matched the baseline within 1 px, excluding the
  scroll-dependent Y position of the fixed navigation. Existing page overflow
  measurements did not increase.
- Compared before/after screenshots of the hero, project card, supporting
  images, portrait, and logo. QA artifacts are in ignored `tmp/image-qa/`.
- JavaScript syntax and `git diff --check` passed.

Changes are local; publishing requires committing and deploying the changed
pages/scripts/styles and the entire `assets/optimized/` directory together.
