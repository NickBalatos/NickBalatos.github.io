# Nikolaos Balatos — Portfolio

A static personal site: plain HTML, CSS and JavaScript. It has no build step, no dependencies and no cookies or trackers.

```
portfolio-site/
├── index.html    ← all content (edit text here)
├── styles.css    ← design, colours, layout
├── script.js     ← theme toggle, scroll animations, hero dot grid
├── favicon.svg   ← browser tab icon
├── .nojekyll     ← tells GitHub Pages to serve files as-is
└── README.md     ← this guide
```

## Preview locally

Double-click `index.html` to open it in your browser.

## Publish on GitHub Pages (no command line needed)

1. **Create a GitHub account** at https://github.com if you don't have one.
   Your username becomes part of the address, e.g. `nbalatos`.
2. **Create a repository.** Click **+** (top right) → **New repository**.
   - Name it **`<your-username>.github.io`** (e.g. `nbalatos.github.io`).
     This exact name makes the site live at `https://<your-username>.github.io`.
   - Set it to **Public** and click **Create repository**.
3. **Upload the files.** On the new repo page, click **uploading an existing file**.
   Drag in **the contents of this folder** (`index.html`, `styles.css`, `script.js`, `favicon.svg`, `README.md`),
   not the folder itself. Then click **Commit changes**.
   - `.nojekyll` is hidden on Windows and is optional. You can skip it.
4. **Turn on Pages.** Go to **Settings → Pages**. Under *Build and deployment*, choose
   **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then click **Save**.
5. **Wait 1–2 minutes**, then open `https://<your-username>.github.io`.

To update the site later, edit the files and upload them again with **Add file → Upload files**.
They will replace the old versions, and the site will refresh within a minute or two.

### Alternative: using Git from the terminal

```bash
cd "portfolio-site"
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```
Then do step 4 above.

## Common edits

- **Text and content:** everything is in `index.html`, one `<section>` per part of the page.
- **Accent colour:** `--accent` in `styles.css`. It is set once for light mode and once for dark mode.
- **Add LinkedIn or GitHub links:** add another link under the email in the `#contact` section, for example
  `<a class="contact__mail" href="https://linkedin.com/in/...">LinkedIn ↗</a>`.
