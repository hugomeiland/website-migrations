# Noorderlichtjagers — GitHub Pages template

Static Jekyll rebuild of [noorderlichtjagers.nl](https://www.noorderlichtjagers.nl/) that keeps the same layout language (navy alert hero, lime accent `#81d742`, Open Sans, header/nav, monitor embeds, footer columns) without WordPress.

## What’s included

| Area | Notes |
|---|---|
| Shared layout | `_layouts/default.html` + `_includes/*` |
| Home | Alert signup (e-act), Kp chart from `/data/*.csv`, blog cards, tiles |
| Monitor | NOAA / GFZ / polarlicht embeds + CSV chart |
| Content pages | Noorderlicht, Tips, Foto’s, FAQ, Contact, Blog |
| Blog | Markdown posts in `_posts/` |

No app backend. Alert form still posts to e-act. Contact form needs a Formspree (or similar) ID in `contact.html`.

## Local preview

Needs Ruby 3.3+ (GitHub Actions uses 3.3). With Homebrew:

```bash
export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"
cd noorderlichtjagers
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000/
## Deploy on GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow `.github/workflows/noorderlichtjagers-pages.yml` builds `noorderlichtjagers/` and publishes it.

### Dedicated repo (optional)

If you split this folder into its own repo:

1. Set `baseurl: ""` in `_config.yml`.
2. Move the workflow into that repo (drop the `working-directory` / path filters).
3. Enable Pages with GitHub Actions.

## Updating Kp data

Replace `data/27.csv` and `data/45.csv` (same columns as now: `Datum,Kp`). A cron job or GitHub Action can overwrite them from NOAA and commit, or you can fetch NOAA JSON client-side later.

## Layout tokens

```css
--accent: #81d742;
--navy:   #00043d;
--mist:   #f7f7f7;
--footer: #222222;
```

Edit `assets/css/site.css` to tweak spacing/colors while keeping the structure.
