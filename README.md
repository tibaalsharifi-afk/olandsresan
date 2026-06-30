# Ölandsresan 🌸

Söt, blommig one-page-sajt inför vår Ölandsresa **13–17 juli 2026** (bas: Borgholm).
Samlar schema, karta, Victoriadagen, historia, "för killarna" (öl & lokal mat), keramik & loppis,
lekparker, maträttsförslag och en bockbar packlista.

**Live:** https://tibaalsharifi-afk.github.io/olandsresan/

## Stack
- React + Vite (ingen backend)
- Packlista & matsedel sparas i webbläsarens `localStorage`
- Mobilanpassad (mobile-first)

## Kör lokalt
```bash
npm install
npm run dev
```

## Bygg
```bash
npm run build
```

## Publicera (GitHub Pages)
```bash
npm run deploy   # bygger + pushar till gh-pages-grenen
```
Sajten hostas på GitHub Pages (repot är publikt). **Obs:** inte Vercel — Vercels deploy-pipeline
strulade vid uppsättningen, så vi bytte till Pages. `vite.config.js` har `base: '/olandsresan/'`
eftersom projektsajten ligger på den undervägen.

## Innehåll
All platsdata ligger i `src/data.js` och är research-verifierad (juni 2026).
Öppettider/priser länkas i stället för att hårdkodas eftersom de ändras säsongsvis.
