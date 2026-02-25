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

### 6. Embed interactive widgets

The site provides built-in interactive calculators you can embed in articles using custom HTML tags:

| Tag | Description |
|-----|-------------|
| `<ldo-calculator></ldo-calculator>` | LDO feedback resistor divider design |
| `<series-parallel-calculator></series-parallel-calculator>` | Series/parallel resistor combinations |
| `<resistor-ladder-calculator></resistor-ladder-calculator>` | Resistor ladder network design |
| `<pcb-calculator></pcb-calculator>` | PCB trace width & thermal calculations |

Place the tag on its own line in your article. In the web editor, use the **Widgets** dropdown in the toolbar to insert them.

#### Create your own widget

You can also create custom interactive calculator widgets as declarative YAML files — no React/JavaScript needed.

Create a file in `widgets/your-widget-id.yml`:

```yaml
id: your-widget-id
title: "My Calculator"
inputs:
  - id: Vin
    label: "Input Voltage"
    type: number
    default: 3.3
    units: voltage        # predefined group: voltage, current, resistance, capacitance,
    defaultUnit: V        #   inductance, frequency, length, time, power, temperature
  - id: Iload
    label: "Load Current"
    type: number
    default: 100
    units: current
    defaultUnit: mA
outputs:
  - id: power
    label: "Power"
    formula: "Vin * Iload"    # expr-eval syntax: arithmetic, trig, comparisons, ternary
    format: si                  # "si" = auto SI prefix (mW, µW...), "number" = plain
    baseUnit: "W"
    precision: 3
validation:
  - condition: "Vin <= 0"
    message: "Input voltage must be positive."
```

**Rules:**
- `id` must match the filename (sans `.yml`), using only `a-zA-Z0-9_-`
- Input/output IDs must be unique within the widget
- Formulas use [expr-eval](https://github.com/nicolewhite/expr-eval) syntax (arithmetic, trig, comparisons, ternary `a ? b : c`)
- Output formulas can reference earlier outputs (evaluated top-to-bottom)
- Custom inline units: `units: { oz: 0.0000347, µm: 1e-6 }` instead of a group name

Embed in your article with: `<widget data-id="your-widget-id"></widget>`

You can also use the **web editor** widget builder: Widgets ▾ → + Create Widget.

### 7. Submit Pull Request

```bash
git add articles/yourArticleSlug/ category-article-mapping.yml widgets/
git commit -m "Add article: Your Article Title"
git push -u origin article/your-article-slug
```

Open a PR targeting the **`dev`** branch. CI will automatically:
- Validate repo structure and frontmatter
- Check that all image references resolve
- Validate widget YAML files
- Render a PDF preview of your article

### 8. Review and deployment

Once your PR is approved and merged into `dev`, the article will be available on the staging site at **[dev.analoghub.ie](https://dev.analoghub.ie)** for final review. It will remain there until the `dev` branch is merged into `master`, at which point it goes live on the production site at [analoghub.ie](https://analoghub.ie).

## Repository Structure

```
articles/
  {slug}/
    article.md          # Article content (minimal frontmatter)
    images/             # Co-located images
widgets/
  {widget-id}.yml       # Declarative calculator widget configs
category-article-mapping.yml  # Single source of truth for categories + articles
categoryIcons/          # Category icons
dates.yaml              # Fallback dates for articles without git history
scripts/                # CI validation scripts
```

## Slug Rules

Slugs must be URL-safe: letters, numbers, hyphens, underscores only (`[a-zA-Z0-9_-]+`).

## Questions?

Open an issue or email [suggestions@analoghub.ie](mailto:suggestions@analoghub.ie).
