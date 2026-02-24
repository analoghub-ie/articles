# Contributing to AnalogHub

Thank you for contributing to AnalogHub! This guide explains how to add or edit articles.

## Article Format

Each article is a Markdown file with YAML frontmatter:

```md
---
id: myArticleSlug
title: "My Article Title"
description: "Brief SEO description of the article"
hideInProd: false
---

## Article content here

Write your article using standard Markdown with:
- **KaTeX** math: `$inline$` or `$$block$$`
- **Code blocks** with syntax highlighting
- **GFM** tables
- **HTML** tags for images, divs, etc.
```

## Required Frontmatter Fields

| Field | Description |
|-------|-------------|
| `id` | URL-safe slug (letters, numbers, hyphens, underscores) |
| `title` | Display title |
| `description` | Brief description for SEO |

## Optional Fields

| Field | Description |
|-------|-------------|
| `hideInProd` | Set to `true` to hide in production (draft mode) |

## Images

Place images in the `images/` directory, mirroring the category structure:

```
images/
  circuits/
    myDiagram.svg
  layout/
    myLayout.png
```

Reference them with absolute paths:
```html
<img src="/images/circuits/myDiagram.svg" alt="Description" />
```

## Directory Structure

Articles are organized by category:

```
articles/
  Circuits/
    myNewArticle.md
  Layout/
    anotherArticle.md
```

Categories are defined in `articles/categories.yaml`.

## Submitting

1. Fork this repository
2. Create a branch: `article/your-article-slug`
3. Add your `.md` file and any images
4. Open a Pull Request

CI will automatically validate your article's frontmatter and image references.
