PBCUM 马大华文学会 — modernised website
=======================================
Open index.htm directly (double-click), or run:  python3 serve.py   ->  http://localhost:8000/
No framework, no build step, no IE needed. Works from a folder, a drive root or any web host
(all links are now relative; the old root-relative "/image/..." paths are gone).

What changed (look is unchanged: same palette, 680px home card, 740px inner card, 180px blue sidebar)
  - Nested <table> layout  -> CSS grid/flex in assets/style.css (one stylesheet replaces onmouse_effect.css)
  - <font>/<center>/bgcolor -> inline styles + small CSS classes
  - <marquee> + IE-only scripts (document.all, neon, showdate, marquee*.js) -> CSS animations
    (pause on hover; disabled when the visitor prefers reduced motion)
  - Hover cells / image rollovers / "past committee" dropdowns -> assets/site.js (~25 lines)
  - GB2312/Big5 -> UTF-8, HTML5 doctype, viewport meta, per-page <title>
  - Responsive: sidebar becomes a top nav under 680px; tables shrink; no sideways scrolling at 360-1200px

Left out on purpose: index1-4/index_test/indexcss (design iterations), marquee_function.htm,
Tripod.htm + Tripod_files (a saved third-party page), the dead CountZ counter, and the old JS files.
Known gaps carried over from the original: unit/wenhua/shufa.htm links to chayi.htm and
zhuanke.htm, which were never in the archive.
