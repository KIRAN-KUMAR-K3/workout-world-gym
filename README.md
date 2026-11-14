# Workout World Gym — Official Website

A premium, cinematic, production-ready website for **Workout World Gym**, Mathikere, Bengaluru.

Built with React + TypeScript + Vite, a Three.js / React Three Fiber 3D hero, Tailwind CSS, GSAP ScrollTrigger and Framer Motion. Fully responsive, SEO-optimised and ready to deploy on **Cloudflare Pages**.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Local installation](#1-local-installation)
3. [Running the project](#2-running-the-project)
4. [GitHub repository setup & push](#3-github-repository-setup--push)
5. [Cloudflare Pages connection](#4-cloudflare-pages-connection)
6. [Build command & output directory](#5-build-command--output-directory)
7. [Custom domain configuration](#6-custom-domain-configuration)
8. [Replacing the Google Form URL](#7-replacing-the-google-form-url)
9. [Updating photographs](#8-updating-photographs)
10. [Updating prices & business details](#9-updating-prices--business-details)
11. [Project structure](#project-structure)
12. [Notes on content accuracy](#notes-on-content-accuracy)

---

## Tech stack

- **React 18 + TypeScript**
- **Vite 6** (build tooling, dev server)
- **Tailwind CSS 3** (styling / design system)
- **Three.js + @react-three/fiber + @react-three/drei** (3D hero)
- **@react-three/postprocessing** (cinematic bloom + vignette on the 3D hero)
- **GSAP + ScrollTrigger** (scroll animations)
- **Framer Motion** (UI animation, reveals, mobile menu, lightbox)
- **Lucide React** (icons)
- **Fontsource** (Bebas Neue for display, Inter for text — self-hosted, no Google Fonts request)
- **Lenis** (smooth scrolling, wired into GSAP)
- **React Helmet Async** (runtime SEO)

---

## 1. Local installation

**Prerequisites:** [Node.js](https://nodejs.org) 18+ (20 or 22 recommended) and npm.

```bash
# From the project folder
npm install
```

## 2. Running the project

```bash
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check + production build into /dist
npm run preview   # preview the production build locally
npm run typecheck # TypeScript check only
npm run audit     # check dependencies for known vulnerabilities
npm run check     # typecheck + audit + build (run before deploying)
```

---

## 3. GitHub repository setup & push

1. Create a new **empty** repository on GitHub (no README/.gitignore — they already exist here).
2. From the project folder:

```bash
git init
git add .
git commit -m "Initial commit: Workout World Gym website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`node_modules/` and `dist/` are already excluded via `.gitignore`.

---

## 4. Cloudflare Pages connection

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorise GitHub and select your repository.
3. Use the build settings below.
4. Click **Save and Deploy**. Cloudflare builds and gives you a `*.pages.dev` URL.

Every push to `main` triggers an automatic redeploy.

## 5. Build command & output directory

| Setting | Value |
|---|---|
| **Framework preset** | `Vite` (or `None`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node version** | `18` or higher (an `.nvmrc` pinning `22` is included) |

SPA routing is handled by `public/_redirects` (`/* /index.html 200`), which Cloudflare copies into the build output automatically.

---

## 6. Custom domain configuration

1. In your Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter your domain (e.g. `workoutworldgym.com`) and follow the DNS prompts. If the domain is on Cloudflare, records are added automatically; otherwise add the shown CNAME at your registrar.
3. After the domain is live, update the canonical/site URL in **two** places so SEO tags are correct:
   - `src/config/siteConfig.ts` → `site.url`
   - `index.html` → the `<link rel="canonical">` and Open Graph `og:url` / `og:image`
   - `public/robots.txt` and `public/sitemap.xml` → replace the `pages.dev` URL

---

## 7. Replacing the Google Form URL

All **Join Now / Register / Membership Enquiry** buttons read from a single value. To change the registration form, edit **one line**:

```ts
// src/config/siteConfig.ts
export const registrationFormUrl = safeLink('https://docs.google.com/forms/d/e/XXXX/viewform');
```

Every button opens it in a new tab with `target="_blank"` and `rel="noopener noreferrer"`. No URL is duplicated anywhere else.

> The form is an **enquiry only** — the site never collects payments. This is stated on the membership and final CTA sections.

---

## 8. Updating photographs

Every photo and the background video are defined in **one file: `src/config/media.ts`**.

**Real photographs (Founder, About, Services, Gallery, final banner)**
Fourteen photographs of Deepak Kaverappa supplied by the gym live in `public/images/` as WebP files (metadata stripped, each under 90 KB). `media.ts` maps them to the slots:

| Slot | File |
|---|---|
| Founder main photo | `deepak-cable-crossover-wide.webp` |
| Founder "moments" strip | `deepak-stage.webp`, `deepak-trophy.webp`, `deepak-artwork.webp` |
| About | `deepak-portrait-red.webp` |
| Services | `deepak-back-pose.webp` |
| Final call-to-action backdrop | `deepak-double-biceps.webp` |
| Gallery (7 tiles) | `deepak-cable-crossover`, `-between-sets`, `-outdoors`, `-barbell-curl`, `-dumbbell-rack`, `-dumbbell-curl`, `-overhead-press` |

The gallery layout is a 7-tile grid (`SPANS` in `src/sections/Gallery.tsx`). If you add or remove gallery photos, adjust that array so the tiles still fill the rows.

**Stock media that remains**
The 14 Equipment tiles and the three training clips are still **free-licensed stock from [Pexels](https://www.pexels.com/license/)** (free for commercial use, no attribution required), loaded from the Pexels CDN. The Equipment section carries a small "representative" caption until you replace them.

**To use your own photo for any slot**
1. Put the file in `public/images/` (use `.webp`, ~1400px wide, under ~150 KB; strip EXIF/location data first).
2. In `src/config/media.ts`, replace that slot's line with the local path, e.g.
   ```ts
   latPulldown: '/images/lat-pulldown.webp',
   ```
3. Once the Equipment photos are your own, delete the "Images are representative" caption in `src/sections/Equipment.tsx`.
4. Give a replaced photo a **new file name** — photos are cached by browsers for 30 days.

**Founder titles**
The chips under the founder text come from `owner.titles` in `src/config/siteConfig.ts` (Mr. Universe (IFBF), Mr. India, Mr. Karnataka, Mr. Dasara — as printed on the gym's signage). Edit that list to change them.

**Videos**
`media.reels` (the "Press. Pull. Lift." section) and `media.video` (the full-width band) in the same file. These are free Pexels clips used GIF-style: muted, looping, only loaded when scrolled into view, and skipped for reduced-motion users. To self-host, put an `.mp4` in `public/` and point `src` at it.

If an image ever fails to load, a neutral placeholder is shown automatically, so the layout never breaks.

---

## Security

The site is hardened for production; full details are in [`SECURITY.md`](./SECURITY.md).

- **Security headers and Content-Security-Policy** are defined once in `security-headers.ts`. The build writes them to `dist/_headers`, which Cloudflare Pages applies automatically — there is nothing to configure in the dashboard.
- **If you add an external service** (analytics, a chat widget, a new image host), add its host to `security-headers.ts` or the browser will block it.
- **Before each deploy** run `npm run check` (type-check + vulnerability audit + build).
- `npm run preview` serves the built site with the same security headers as production, so use it for a final check.
- After going live, test the real site at <https://securityheaders.com>.

## Editing the FAQ

Questions and answers live in `src/data/faq.ts`. Most answers are built from `siteConfig.ts`, so changing a price or the opening hours there updates the FAQ automatically. The same list is published to search engines as FAQ structured data.

## Social share image

`public/og-image.jpg` (1200×630) is the picture shown when the site link is shared on WhatsApp, Facebook or Instagram. Replace the file to change it.

## Colour themes

The site ships with four colour combinations: **Volt Lime** (default), **Inferno** (orange/red), **Champion Gold** and **Ice Blue**. The palette button at the bottom-left lets anyone try them; the 3D hero, gradients, buttons and glows all follow the chosen theme.

In `src/config/siteConfig.ts`:
```ts
export const theme = {
  default: 'volt',      // 'volt' | 'inferno' | 'gold' | 'ice'
  showSwitcher: true,   // set false to hide the palette button and lock the site to the default
};
```
To tweak a palette, edit the `[data-theme='…']` variables in `src/index.css` and the matching hex values in `src/config/themes.ts`.

---

## 9. Updating prices & business details

Everything lives in **`src/config/siteConfig.ts`**:

- **Prices** — edit `membershipPlans` (`fee`) and `admissionFee`. First-time payment and renewal are **calculated automatically** (`firstTimePayment = fee + admissionFee`, `renewal = fee`), so you never maintain them by hand.
- **Phone / WhatsApp** — `contact` (updating the number updates click-to-call, the WhatsApp links and the floating button).
- **Address, hours, services, social links, navigation** — all in the same file.

Current pricing:

| Duration | Membership fee | First-time payment | Renewal |
|---|---:|---:|---:|
| Monthly | ₹1,499 | ₹1,999 | ₹1,499 |
| 3 Months | ₹3,999 | ₹4,499 | ₹3,999 |
| 6 Months | ₹5,999 | ₹6,499 | ₹5,999 |
| 12 Months | ₹9,999 | ₹10,499 | ₹9,999 |

One-time admission fee: **₹500** (first-time joiners only).

---

## Project structure

```
workout-world-gym/
├─ public/
│  ├─ images/            # the gym's own photos (WebP, metadata stripped)
│  ├─ favicon.svg
│  ├─ og-image.jpg       # social share image
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ _redirects         # Cloudflare SPA fallback
│                        # (_headers is generated into dist/ at build time)
├─ src/
│  ├─ components/        # Navbar, Footer, Loader, MobileActionBar, ThemeSwitcher, SmartImage…
│  ├─ sections/          # Hero, About, Founder, Facilities, Equipment, Membership, …
│  ├─ three/             # 3D hero scene, dumbbell, particles, fallback
│  ├─ config/
│  │  ├─ siteConfig.ts   # ★ single source of truth (prices, links, form URL)
│  │  ├─ media.ts        # ★ every photo + video URL in one place
│  │  └─ themes.ts       # colour themes
│  ├─ data/              # equipment.ts, content.ts, faq.ts
│  ├─ lib/               # scroll.ts (smooth scrolling), safeUrl.ts (link/media guards)
│  ├─ hooks/             # reduced-motion, WebGL support, scroll progress
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ index.html            # base SEO + structured data
├─ security-headers.ts   # ★ security headers + Content-Security-Policy
├─ SECURITY.md           # what is protected and how to keep it that way
├─ .github/              # CI checks + Dependabot updates
├─ tailwind.config.js
├─ vite.config.ts
├─ tsconfig*.json
└─ package.json
```

---

## Notes on content accuracy

This site intentionally contains **only verified information**:

- No invented reviews, ratings, achievements or popularity statistics.
- No invented discounts, student/couple prices or special packages — these are shown as "discuss at the gym" with a **Visit Our Gym** button to Google Maps.
- No invented personal-training prices, trainer certifications, nutritionist qualifications or guaranteed results.
- No email address is shown (none was provided).
- Equipment is listed from the gym's confirmed inventory. Equipment tile photos are free-licensed representative stock images (Pexels), captioned as such; replace them with real photos as described above.
- Founder, About, Services, Gallery and the final banner use Deepak Kaverappa's own photographs (supplied by the gym), never stock photos of another person.

---

### Accessibility & performance

- Respects `prefers-reduced-motion`: the opening curtain, 3D scene, looping videos and smooth scrolling are all skipped.
- The 3D hero adapts to the device. Phones and low-powered devices get a lighter version (no bloom or background plates), and any device that can't hold a steady frame rate switches to it automatically. It also stops rendering once scrolled out of view. If WebGL is unavailable a static illustration is shown.
- Keyboard-accessible navigation, FAQ accordion and gallery lightbox, a "Skip to content" link, visible focus styles, one `<h1>` and labelled controls.
- Phones get a bottom action bar (Call, WhatsApp, Join now); larger screens get the floating WhatsApp button.
- Heavy 3D code is code-split and lazy-loaded; images and videos lazy-load.
- Semantic HTML, alt text, Open Graph tags, and LocalBusiness + FAQ structured data.
