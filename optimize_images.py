"""Compress site images for faster mobile load (run once)."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent / "images"

# Max width in pixels
LANDING = {
    "hero.jpg": 1200,
    "about.jpg": 900,
    "product-nikkah.jpg": 800,
    "product-jhumkas.jpg": 800,
    "product-necklaces.jpg": 800,
    "product-keychains.jpg": 800,
    "product-trays.jpg": 1000,
    "trust-handmade.jpg": 800,
    "trust-custom.jpg": 800,
    "trust-shipping.jpg": 800,
}

CATALOG_MAX = 640


def compress(path: Path, max_w: int) -> None:
    img = Image.open(path)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    w, h = img.size
    if w > max_w:
        ratio = max_w / w
        img = img.resize((max_w, int(h * ratio)), Image.Resampling.LANCZOS)
    img.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    kb = path.stat().st_size / 1024
    print(f"  {path.name}: {kb:.0f} KB")


def main():
    for name, max_w in LANDING.items():
        p = ROOT / name
        if p.exists():
            print(f"Landing {name}")
            compress(p, max_w)

    for p in sorted(ROOT.glob("product*.jpeg")):
        print(f"Catalog {p.name}")
        compress(p, CATALOG_MAX)

    for p in sorted(ROOT.glob("product*.jpg")):
        name = p.name
        if name.startswith("product-") or name in LANDING:
            continue
        num = name.replace("product", "").replace(".jpg", "")
        if num.isdigit() and int(num) >= 15:
            print(f"Catalog {p.name}")
            compress(p, CATALOG_MAX)

    for p in sorted(ROOT.glob("product*.jpg")):
        if p.name.startswith("product-") and p.name not in LANDING:
            continue
        if p.name in LANDING:
            continue

    logo = ROOT / "logo.png"
    if logo.exists() and logo.stat().st_size > 150_000:
        img = Image.open(logo)
        img.thumbnail((256, 256), Image.Resampling.LANCZOS)
        img.save(logo, "PNG", optimize=True)
        print(f"  logo.png: {logo.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
