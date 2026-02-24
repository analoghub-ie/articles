# Contributing to AnalogHub

Thank you for contributing to AnalogHub! This guide explains how to add or edit articles.

## Quick Start — Web Editor

The easiest way to contribute is through the **web editor** at [analoghub.ie/editor](https://analoghub.ie/editor):

1. Sign in with your GitHub account
2. Fill in the article metadata (title, slug, category, description)
3. Write your article in Markdown with live preview
4. Upload images via drag & drop
5. Click "Create PR" — the editor will fork the repo, commit your files, and open a Pull Request automatically

No local setup required.

## Manual Contribution

If you prefer working locally:

### 1. Fork and clone

```bash
git clone https://github.com/<your-username>/articles.git
cd articles
git checkout -b article/your-article-slug
```

### 2. Create article directory

Each article lives in its own folder under `articles/`:

```
articles/
  yourArticleSlug/
    article.md          # Article content
    images/             # Co-located images
      diagram.svg
      screenshot.png
```

### 3. Write article.md

```md
---
description: "Brief SEO description of the article"
---

## Your Article Title

Write your article using standard Markdown with:
- **KaTeX** math: `$inline$` or `$$block$$`
- **Code blocks** with syntax highlighting
- **GFM** tables
- **HTML** tags for images, divs, etc.
```

The frontmatter is minimal — only `description` is required. The article title and slug are defined in the category mapping file (see step 4).

Optional frontmatter field: `hideInProd: true` (to keep the article as a draft).

### 4. Register in category-article-mapping.yml

Add your article under the appropriate category:

```yaml
categories:
  - name: "Circuits"
    slug: Circuits
    # ...
    articles:
      - slug: yourArticleSlug
        title: "Your Article Title"
        short_title: "Short Title"
```

**Required fields per article:** `slug`, `title`, `short_title`

### 5. Add images

Place images in `articles/yourArticleSlug/images/` and reference them with:

```html
<img src="http://localhost:3000/images/yourArticleSlug/diagram.svg" alt="Description"
     style="display: block; margin-inline: auto; width: min(80%, 40rem)" />
```

The `localhost:3000` prefix is replaced with the production URL at render time.

Cross-article image references are allowed: `/images/otherSlug/filename.svg`

### 6. Submit Pull Request

```bash
git add articles/yourArticleSlug/ category-article-mapping.yml
git commit -m "Add article: Your Article Title"
git push -u origin article/your-article-slug
```

Open a PR targeting the **`dev`** branch. CI will automatically:
- Validate repo structure and frontmatter
- Check that all image references resolve
- Render a PDF preview of your article

## Repository Structure

```
articles/
  {slug}/
    article.md          # Article content (minimal frontmatter)
    images/             # Co-located images
category-article-mapping.yml  # Single source of truth for categories + articles
categoryIcons/          # Category icons
dates.yaml              # Fallback dates for articles without git history
scripts/                # CI validation scripts
```

## Slug Rules

Slugs must be URL-safe: letters, numbers, hyphens, underscores only (`[a-zA-Z0-9_-]+`).

## Questions?

Open an issue or email [suggestions@analoghub.ie](mailto:suggestions@analoghub.ie).
