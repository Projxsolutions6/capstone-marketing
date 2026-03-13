# SafePath — Social Anonymity Gateway

A professional React marketing website for the SafePath project.

## 🚀 Quick Start (Local)

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

## 🔧 Customise Before Deploying

### 1. Embed Your Demo Video
In `src/App.js`, find the `Feedback` component and replace:
```
src="https://drive.google.com/file/d/YOUR_FILE_ID/preview"
```
With your actual Google Drive video preview link.  
**How to get the link:** Drive → right-click video → Share → Copy link → change the URL from `/view` to `/preview`.

### 2. Embed Your Google Form
Replace:
```
src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
```
**How to get the link:** Google Forms → Send → Embed (`<>`) → copy the `src` value.

### 3. Replace Sample Charts with Live Google Sheets Charts
In the `sidebar-aside` div, you can replace the Recharts components with Google Sheets chart iframes:
- Google Sheets → Insert → Chart → three-dot menu → Publish chart → Embed → copy iframe

## 📦 Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo.
3. Vercel auto-detects Create React App — just click **Deploy**.
4. Every push to `main` auto-redeploys.

## 🏗️ Project Structure

```
safepath/
├── public/
│   └── index.html          # HTML shell with Google Fonts
├── src/
│   ├── App.js              # All sections (Navbar, Hero, About, …)
│   └── App.css             # All styles (CSS variables, responsive)
├── package.json
├── vercel.json             # Vercel deployment config
└── README.md
```

## 🎨 Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--navy` | `#0d3580` | Headings, logo |
| `--blue` | `#2d57a8` | Primary buttons, accents |
| `--sky`  | `#5b7ec2` | Chart fills, links |
| `--pale` | `#c7d2e8` | Light text on dark |
| `--dark` | `#07152e` | Dark section backgrounds |

## © 2026 SafePath Project
