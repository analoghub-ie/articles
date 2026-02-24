# AnalogHub Articles

Content repository for [AnalogHub](https://analoghub.ie) — a technical blog about analog circuit design.

This repo contains all articles (as Markdown with YAML frontmatter) and images served on the site.

## Structure

```
articles/
  {slug}/
    article.md                   — article content (description in frontmatter)
    images/                      — co-located images for this article
category-article-mapping.yml     — categories + article registry (source of truth)
categoryIcons/                   — category icons
dates.yaml                       — fallback dates for articles without git history
scripts/                         — CI validation scripts
```

## How It Works

- **`category-article-mapping.yml`** defines all categories and which articles belong to each
- Each article lives in `articles/{slug}/article.md` with its images alongside in `images/`
- The main app reads this repo as a submodule and generates static pages at build time

## Contributing

**The easiest way:** use the [web editor](https://analoghub.ie/editor) — sign in with GitHub, write your article with live preview, and submit a PR in one click.

**Manual:** see [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide on article format, image handling, and submission process.

## Branches

| Branch | Purpose |
|--------|---------|
| `dev` | Default branch — PRs target here, triggers dev deploy |
| `master` | Production — merged from dev, triggers production deploy |
