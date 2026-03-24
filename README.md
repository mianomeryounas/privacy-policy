# Privacy Policy Generator

A **free**, **open-source**, **offline-capable** Privacy Policy Generator for apps and websites. No signup, no backend, no cost — just fill in a form and get a professional privacy policy instantly.

**Live Site:** [https://mianomeryounas.github.io/privacy-policy/](https://mianomeryounas.github.io/privacy-policy/)

---

## Features

- **Instant Generation** — Fill a form, get a complete privacy policy in seconds
- **Fully Offline** — Works without internet after the initial page load
- **No Backend** — 100% static HTML, CSS, and JavaScript
- **No Data Collected** — Your information never leaves your browser
- **Copy & Download** — Copy to clipboard or download as `.txt`
- **Mobile Responsive** — Works on all screen sizes
- **Free Forever** — No paywalls, no premium tiers

## Supported Sections

- Introduction
- Information We Collect (15 data categories)
- How We Use Information
- Cookies & Tracking
- Third-Party Services
- Data Retention
- Data Sharing & Disclosure
- User Rights (GDPR/CCPA aligned)
- Children's Privacy
- International Data Transfers
- Security
- Changes to Policy
- Contact Information

## Tech Stack

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Inter) — graceful fallback to system fonts

## Project Structure

```
├── index.html        # Main page
├── style.css         # Styles
├── app.js            # Application logic (form, preview, copy, download)
├── engine.js         # Rule engine (conditional section assembly)
├── templates.js      # Static policy section templates
├── README.md         # This file
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages CI/CD
```

## Local Development

Just open `index.html` in a browser. No build step required.

```bash
# Or use a local server
npx serve .
```

## Deployment

This project auto-deploys to GitHub Pages on every push to `main` via GitHub Actions.

### Manual Setup

1. Fork or clone the repo
2. Go to **Settings → Pages**
3. Set source to **GitHub Actions**
4. Push to `main` — the site deploys automatically

## License

MIT — Use it however you like.
