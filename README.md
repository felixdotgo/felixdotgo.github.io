# iamfelix.dev

Personal blog built with Hugo. The current design is ported from the earlier Jekyll/plainwhite setup, but the site now builds and deploys as a Hugo project.

## Stack

- **Generator**: Hugo
- **Build**: GitHub Actions → `hugo --gc --minify`
- **Taxonomies**: Hugo taxonomies for `/tags/`, `/tags/:name/`, `/categories/`, `/categories/:name/`
- **Fonts**: JetBrains Mono + local fontello icons

## Run locally

```bash
hugo server
```

## Add a new post

Create `content/posts/post-slug.md`:

```toml
+++
title = "Post title"
date = 2026-01-01T10:00:00+07:00
categories = ["category"]
tags = ["tag1", "tag2"]
slug = "post-slug"
+++

Content here.
```

## Add a new tag or category

Just add it to the post front matter. Hugo creates the taxonomy pages automatically.

## Add a new nav page

1. Create `content/page-name.md` with `type = "page"` and `url = "/page-name/"`
2. Add it to `hugo.toml` under `[[params.plainwhite.navigation]]`

## Customize

| What | File |
|------|------|
| Site config | `hugo.toml` |
| Base layout | `layouts/_default/baseof.html` |
| Home page | `layouts/index.html` |
| Post page | `layouts/posts/single.html` |
| Taxonomy pages | `layouts/_default/taxonomy.html`, `layouts/_default/terms.html` |
| Page layout | `layouts/page/single.html` |
| Shared head | `layouts/partials/head.html` |
| Shared post list item | `layouts/partials/post-item.html` |
| SCSS entrypoint | `assets/css/style.scss` |
| Core styles | `_sass/plain.scss`, `_sass/dark.scss`, `_sass/search.scss`, `_sass/toggle.scss` |
