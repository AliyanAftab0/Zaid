# Resin Dreams — Website

Single-page brochure site for handmade resin art (Karachi). Orders via WhatsApp.

## Files

- `index.html` — full site (HTML, CSS, JS)
- `images/logo.png` — brand logo (also used as favicon)
- `images/` — product and section photos
- `CONTENT.md` — contact info and owner verification checklist

## Local preview

```bash
# From this folder (Python 3)
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Deploy (static hosting)

Upload the entire folder to any static host:

- [Netlify](https://www.netlify.com/) — drag & drop the folder
- [Vercel](https://vercel.com/) — import or `vercel deploy`
- [GitHub Pages](https://pages.github.com/) — push repo, enable Pages on `main`

Ensure `index.html` is at the site root and paths stay relative (`logo.png`, `images/...`).

## Post-deploy checks

- Logo and all `images/` load (no broken images)
- WhatsApp links open with correct number
- Instagram link works
- Mobile menu opens all sections including Reviews and FAQ
