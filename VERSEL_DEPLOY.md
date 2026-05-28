# Deploying to Vercel (Quick Start)

This project is a static site. You can deploy it either via the Vercel CLI or by connecting a Git repository to Vercel.

## Option A — Vercel CLI (fast, from your machine)

1. Install Vercel CLI (requires Node.js/npm):

```bash
npm install -g vercel
```

2. Log in to Vercel:

```bash
vercel login
```
```

3. From the project root (where `index.html` is), run:

```bash
vercel --prod
```

This will deploy the site and give you a production URL.

Notes:
- If asked for the project root, choose the current folder.
- The `vercel.json` in the repo specifies static builds and routes, including the `Cognosy-Game` subfolder.

## Option B — Git + Vercel (recommended for continuous deploys)

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. In the Vercel dashboard, click "New Project" → import your repository.
3. Vercel will auto-detect a static site and use `vercel.json` configuration.

Done — your site will be published automatically on pushes to the connected branch.
