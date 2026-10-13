# Magpie website

The download site for Magpie, a calm, minimal library for design references.

It's a plain static site: HTML, one stylesheet and two small scripts. There's no build step and nothing to install. Two colours only (#000000 and #ffffff), light and dark themes, no shadows or glows.

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this repository.
2. Leave every setting as it is. The framework preset is **Other**, with no build command and no output directory.
3. Press **Deploy**.

Every push to `main` then updates the site automatically. To use your own domain, open the project on Vercel, go to **Settings → Domains** and add it.

`vercel.json` turns on clean URLs (`/privacy` instead of `/privacy.html`), sets security headers and caching, and redirects `/privacy-policy` to `/privacy`.

## Pages

| Page | File |
| --- | --- |
| Home and downloads | `index.html` |
| Privacy policy (link this from the Microsoft Store listing) | `privacy.html` → `/privacy` |
| Support | `support.html` → `/support` |
| Not found | `404.html` |

## Settings you might change

At the top of `assets/js/site.js`:

```js
const CONFIG = {
  releasesRepo: 'RudraKalsariya/-Storing-Design-Library',
  storeUrl: 'https://apps.microsoft.com/search?query=Magpie%20Library',
};
```

- **`storeUrl`**: Magpie's page in the Microsoft Store. Replace the search link with the real product link from Partner Center (**Product identity → URL**), which looks like `https://apps.microsoft.com/detail/9XXXXXXXXXXX`.
- **`releasesRepo`**: the GitHub repository whose latest release holds the installers. The download buttons link straight to the newest `.exe` and `.dmg` files there, and the page shows its version number. That repository must be **public** for this to work. If you make the app's code private, create a public repository just for releases and put its name here.

If GitHub can't be reached, the buttons fall back to the releases page.

## Updating the screenshots

Screenshots live in `assets/img/screens/`, as a light and a dark version of each (`library-light.webp`, `library-dark.webp`, …). They're 2400 × 1500 pixels. Replace a file with the same name and size and the site picks it up. `og.png` (1200 × 630) is the picture shown when the link is shared.

## Run it locally

Open `index.html` through any static server, for example:

```bash
npx serve .
```

## Credits

The typeface is [Instrument Sans](https://github.com/Instrument/instrument-sans), under the SIL Open Font License (`assets/fonts/OFL.txt`).
