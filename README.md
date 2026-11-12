# Black Hills Speech Solutions — static website

A plain HTML/CSS copy of www.blackhillsspeechsolutions.com (originally built on Squarespace), ready to host free on **GitHub Pages**. No build step, no frameworks: one stylesheet and a few lines of JavaScript for the mobile menu.

## Structure

```
index.html                  Home  (/)
services/index.html         Services & pricing  (/services)
contact/index.html          Contact  (/contact)
games/index.html            Speech Games / Game Center  (/games)
home/index.html             Redirects the old Squarespace /home URL to /
404.html                    "Page not found" page (GitHub Pages uses it automatically)
s/How-to-Use-Your-Superbill-Client-Handout.docx   Superbill handout (same URL as on Squarespace)
assets/css/style.css        All styles (colors, fonts, layout, mobile)
assets/fonts/               Marcellus + PT Serif (free Google Fonts, SIL Open Font License), self-hosted
assets/img/*.webp           Web-optimized images used by the pages
assets/img/original/        Full-resolution originals (not used by pages; keep as backup)
CREDITS.md                  Source + photographer for every stock photo (all Unsplash License)
CNAME                       Custom domain for GitHub Pages: www.blackhillsspeechsolutions.com
robots.txt, sitemap.xml     For search engines
.nojekyll                   Tells GitHub Pages to serve files as-is
```

To edit text, open the page's `index.html` in any text editor, change the words between the tags, and save.

## Contact forms — needs a free Formspree account (TO DO)

Static hosting can't process forms, so the three forms (Home, Services, Contact) post to [Formspree](https://formspree.io), which emails each submission to you. Free plan: 50 submissions/month.

1. Sign up at formspree.io with blackhillsspeechsolutions@gmail.com and create a form.
2. Copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, `services/index.html`, and `contact/index.html`, replace `https://formspree.io/f/REPLACE_ME` with your endpoint.

Until then, the forms will not send. Fields: First Name, Last Name, Phone, Email, Message (+ Subject on Home, + "Sign up for news and updates" on Services). A hidden `form_page` field tells you which page it came from; `_gotcha` is a spam trap.

## Preview locally

```
cd bhss-site
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. On github.com (account `danicabhss`), create a new **public** repository, e.g. `bhss-website`.
2. Upload the *contents* of this folder (not the folder itself) so `index.html` and `CNAME` are at the top level of the repo. (Either drag-and-drop in "Add file → Upload files", or `git init`, `git add .`, `git commit`, `git push`.)
3. Repo **Settings → Pages**: Source = "Deploy from a branch", Branch = `main`, folder = `/ (root)`. Save.
4. Still in Settings → Pages, Custom domain should show `www.blackhillsspeechsolutions.com` (from the CNAME file). After DNS is set up (below) and the check passes, tick **Enforce HTTPS**.

Tip: to try the site at `https://danicabhss.github.io/bhss-website/` before switching the domain, leave the Custom domain box empty in Settings → Pages for now (page links are relative, so they work there; only the 404 page expects the real domain). When ready, enter `www.blackhillsspeechsolutions.com` as the custom domain.

## Point the domain (Squarespace Domains) at GitHub Pages

The domain is registered with Squarespace Domains (paid through April 25, 2027). Keep it there; you only cancel the **website plan**, not the domain.

In Squarespace: **Domains → blackhillsspeechsolutions.com → DNS → DNS Settings**:

1. Delete the Squarespace Defaults records (the A records and the `www` CNAME pointing to `ext-sq.squarespace.com`). **Leave any MX / TXT records for email alone.**
2. Add these custom records:

| Host | Type  | Data                 |
|------|-------|----------------------|
| @    | A     | 185.199.108.153      |
| @    | A     | 185.199.109.153      |
| @    | A     | 185.199.110.153      |
| @    | A     | 185.199.111.153      |
| www  | CNAME | danicabhss.github.io |

(Optional IPv6 AAAA records for @: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153.)

3. Wait for DNS to update (minutes to a few hours), confirm the site loads, turn on Enforce HTTPS in GitHub, then cancel the Squarespace website subscription.
4. Optional but recommended: in GitHub **Settings → Pages**, verify the domain for your account to prevent takeover.

## What is different from the Squarespace version

- Phone and email are clickable (tel: / mailto:); "Book now" opens Contact in the same tab.
- Squarespace template background images were replaced with free Unsplash photos (see CREDITS.md).
- Typo fix "Lets" → "Let's"; each page has a real title and search description; images have descriptive alt text; the games page is titled "Speech Games" instead of "Gallery 1".
- Squarespace-only features not carried over: built-in form handling (replaced by Formspree), the newsletter sign-up list, scroll/hover animations, site analytics, and the Squarespace cookie/banner tools.
