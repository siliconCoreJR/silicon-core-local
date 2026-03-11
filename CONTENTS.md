# SiliconCore Local — Site Map & File Index

Clean rebuild of silicon-core.com for local editing and redesign.
Built: March 2026

---

## How to run locally

```bash
cd silicon-core-local
python3 serve.py
# then open http://localhost:8080
```

---

## Shared Assets

| File | Purpose |
|------|---------|
| `assets/css/style.css` | Full design system — fonts, colours, layout, components, responsive |
| `assets/js/main.js` | Hamburger nav, sliders, sticky header, smooth scroll |
| `assets/js/components.js` | Shared header + footer injected into every page via JS |

**Design tokens (edit in style.css `:root`)**
- `--color-dark: #171717` — body text
- `--color-red: #e31e24` — accent / CTA
- `--color-footer-bg: #595959`
- `--font-heading: 'Barlow Condensed'` — H1s (≈ Flama Condensed)
- `--font-subheading: 'Outfit'` — H2s
- `--font-body: 'Inter'` — body (≈ Effra)

---

## Pages (49 total)

### Root
- `index.html` — Homepage (hero slider, features, technology, experience, displays, contact)

### About
- `about/index.html`
- `about-1/index.html`
- `history/index.html`
- `awards/index.html`
- `training/index.html`
- `why-siliconcore/index.html`
- `taa-compliant-led-displays/index.html`

### Technology
- `unique-technologies/index.html`
- `knowledge-base/index.html`
- `technology-1/index.html`

### Displays (listing)
- `displays/index.html`

### Products (21 pages)
- `products/iris/index.html` — Iris 0.78mm
- `products/lotus/index.html` — Lotus 0.83mm
- `products/camellia/index.html` — Camellia 0.95mm
- `products/lavender/index.html` — Lavender 1.2mm
- `products/magnolia/index.html` — Magnolia 1.5mm
- `products/magnolia-158/index.html` — Magnolia 158"
- `products/orchid/index.html` — Orchid 1.9mm HB
- `products/orchid-highbright/index.html` — Orchid High Bright
- `products/peony/index.html` — Peony 2.6mm
- `products/daffodil/index.html` — Daffodil 2.5mm
- `products/lily/index.html` — Lily
- `products/silicon-floor/index.html` — Silicon Floor
- `products/sunflower/index.html` — Sunflower
- `products/tulip-indoor/index.html` — Tulip 3.9mm Indoor
- `products/tulip-outdoor/index.html` — Tulip 3.9mm Outdoor
- `products/mobile-foldable-columns/index.html` — Mobile Foldable Columns
- `products/all-in-one/index.html` — Mobile All-In-One LED
- `products/xr/index.html` — XR LED Displays
- `products/led-outdoor-display/index.html` — 1.2mm Outdoor LED
- `products/enlighten/index.html` — Enlighten (COB series)
- `products/trak-kit/index.html` — TRAK-KIT

### Experience
- `casestudies/index.html` — Case Studies grid
- `case-studies/cnh-industrial/index.html`
- `case-studies/david-geffen-hall-lincoln-center-for-the-performing-arts/index.html`
- `case-studies/integris-health-auditorium/index.html`
- `case-studies/lord-abbett-and-co/index.html`
- `case-studies/multi-point-of-view-vr-at-ise/index.html`
- `case-studies/ramazstudios/index.html`
- `case-studies/regent-college/index.html`
- `case-studies/us-research-lab/index.html`
- `case-studies/white-case/index.html`
- `case-studies/yongchuan-technology-studio-virtual-production/index.html`
- `virtual-production/index.html`

### Other
- `led-outdoor-display/index.html`
- `news-1/index.html`
- `contact-us/index.html`
- `privacy-statement/index.html`

---

## Notes for redesign

- All images are **live CDN links** (Squarespace) — replace with local `/assets/img/` paths when going offline
- To change the **logo**, update the `<img src="...">` in `assets/js/components.js` lines ~18 and ~29
- To change **nav items**, edit the `navEl.innerHTML` block in `components.js`
- To change the **footer**, edit the `footerEl.innerHTML` block in `components.js`
- **Google Fonts** are loaded via `@import` in `style.css` — swap for local fonts to work fully offline
- The `build_pages.py` script in the parent folder regenerates all inner pages if you change the template
