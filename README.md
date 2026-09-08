# Krunal Panchal — Senior Android Developer & Mobile Solutions Architect Portfolio

A modern, high-performance personal portfolio and interactive resume website built for **Krunal Panchal**, designed for instant deployment on **GitHub Pages**.

## 🚀 Live Publishing to GitHub Pages (Automated)

This repository includes an automated **GitHub Actions** workflow ([`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml)).

### 1. Push to GitHub
Run the following command in your terminal:
```bash
git push -u origin main
```
*(If prompted by Git Credential Manager, complete the quick browser login.)*

### 2. Enable GitHub Pages
1. Go to your repository settings on GitHub: [https://github.com/krunal-labs/my_resume/settings/pages](https://github.com/krunal-labs/my_resume/settings/pages)
2. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions** (or **Deploy from a branch** &rarr; `main` / root).
3. Your website will be live in ~60 seconds at:
   👉 **`https://krunal-labs.github.io/my_resume/`**

---

## ✨ Features & Architecture

- **Privacy Protected**: Excludes private phone numbers and personal email addresses. Outreach is directed through LinkedIn and GitHub.
- **Modern Obsidian Theme**: Deep slate/dark background (`#0A0E17`) with emerald (`#3DDC84`) and indigo accents, frosted glassmorphism cards, and smooth glowing micro-interactions.
- **Light / Dark Mode Switcher**: Toggle theme with persistent `localStorage` preference.
- **Key Metrics Dashboard**: Animated counters displaying 11+ Years of Experience, 250+ Launched Apps, 100M+ Downloads, and >99.9% Crash-Free Session Rate.
- **Interactive Project Filtering**: Filter 18+ featured apps by *E-Commerce & Retail*, *Maps & Spatial*, *IoT & Connected Hardware*, or *Utilities*.
- **Verified Play Store Links**: Direct links to real published production applications (Joom, LightInTheBox, Tiqets, Map Marker, Flowtime, Kompaio, Mapsted SDK, etc.).
- **Recruiter Quick Drafter**: Preset outreach note generator for lead roles, architecture consulting, and networking.
- **ATS-Friendly Print Stylesheet**: Recruiter-ready "Print / PDF" button with `@media print` rules formatted for paper and clean PDF exports.

---

## 📁 Project Structure

```
ResumeWebsite/
├── index.html              # Main single-page portfolio
├── README.md               # GitHub Pages deployment guide
├── assets/
│   ├── css/
│   │   └── style.css       # Design tokens, themes, animations & print styles
│   ├── js/
│   │   └── main.js         # Theme toggle, metrics counters, filtering & scroll-spy
│   └── images/
│       ├── krunalgeek.jpg  # Profile portrait
│       └── favicon.svg     # Monogram branding icon
└── personal_data/          # Original resume source files (PDF & DOCX)
```
