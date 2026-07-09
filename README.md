# Usha Nagula — Portfolio (React)

A dark-themed, colorful React rebuild of the portfolio, built with Vite. Content lives
in `src/data.js` — edit that file to update experience, projects, skills, etc. without
touching any component code.

## Design

- **Dark background** with four accent colors mapped to content categories, so color
  carries meaning instead of being decorative:
  - 🔵 Blue — Cloud Infrastructure
  - 🟠 Amber — DevOps
  - 🟣 Purple — AI / ML
  - 🟢 Green — Open Source / GitHub
- Gradient text on the hero name cycles through all four colors.
- Same interactive features as the HTML version: scroll reveals, active-section nav
  highlighting, mobile menu, click-to-copy email, and a filterable projects grid.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` with hot reload.

## Before you deploy

1. Open `vite.config.js` and confirm `base` matches your actual GitHub repo name
   (defaults to `/usha-portfolio-react/`). If you're deploying to a custom domain or
   your root `nagulaua.github.io` site instead of a project page, change it to `/`.
2. Your resume is already in `public/UshaN_Resume.pdf` — replace it if you update your resume.

## Deploy to GitHub Pages (automatic, via GitHub Actions)

This repo includes `.github/workflows/deploy.yml`, which automatically builds and
deploys on every push to `main`. To enable it:

```bash
git remote add origin https://github.com/nagulaua/usha-portfolio-react.git
git branch -M main
git push -u origin main
```

Then on GitHub:
1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. Push again (or re-run the workflow from the **Actions** tab) if it doesn't trigger automatically

Your site will be live at:

```
https://nagulaua.github.io/usha-portfolio-react/
```

## Deploy manually instead (Netlify / Vercel)

```bash
npm run build
```

This outputs a static site to `dist/`. Drag that folder onto
[app.netlify.com/drop](https://app.netlify.com/drop), or connect the repo in Vercel —
both auto-detect Vite and handle the build for you (set build command to `npm run build`
and output directory to `dist` if asked).

## Editing content

All real content — jobs, projects, skills, certifications, education, contact info —
lives in `src/data.js`. Add a new project by adding an object to the `projects` array;
give it a `category` of `cloud`, `devops`, `ai`, or `github` to pick up the matching
accent color automatically.
