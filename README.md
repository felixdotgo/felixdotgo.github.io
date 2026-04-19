# iamfelix.dev — Source

Personal blog built with Jekyll. Fork of [samarsault/plainwhite-jekyll](https://github.com/samarsault/plainwhite-jekyll).

## Stack

- **Theme**: plainwhite (local gem, this repo IS the theme)
- **Build**: GitHub Actions → `bundle exec jekyll build` (not GitHub Pages static mode)
- **Tag pages**: `jekyll-archives` auto-generates `/tags/:name/` at build time
- **Fonts**: Lora (body) · Be Vietnam Pro (headings/UI) · JetBrains Mono (code/labels)

## Run locally

```bash
bundle install
bundle exec jekyll serve
```

## Add a new post

Create `_posts/YYYY/MM/DD/YYYY-MM-DD-slug.md`:

```yaml
---
layout: post
title: "Post title"
date: 2026-01-01 10:00:00 +7
categories: category
tags: [tag1, tag2]
---

Content here.
```

## Add a new tag

Just add it to `tags:` in the post frontmatter — `jekyll-archives` creates the page automatically at build time. No file creation needed.

## Add a new nav page

1. Create `page-name.md` in root with `layout: page` and `permalink: /page-name/`
2. Add to `_config.yml`:
   ```yaml
   navigation:
     - title: Page Name
       url: /page-name/
   ```

## Customize

| What | File |
|------|------|
| Colors (light) | `_sass/plain.scss` → `:root` CSS variables |
| Colors (dark) | `_sass/dark.scss` → `body.dark` CSS variables |
| Layout/CSS | `_sass/plain.scss` |
| Sidebar layout | `_layouts/default.html` |
| Post list | `_layouts/home.html` |
| Post page | `_layouts/post.html` |
| Tag page | `_layouts/tag.html` |
| Site config | `_config.yml` |
