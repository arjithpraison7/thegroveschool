# Hosting, domain & DNS

Everything below was checked against the live domain on **28 October 2026**. Re-check the GoDaddy DNS page before
changing anything; DNS lookups can't list every record, so the GoDaddy dashboard is the source of truth.

## 1. Where things are today

| Piece | Where it lives | Notes |
| --- | --- | --- |
| Domain `thegroveschool.in` | **GoDaddy** (registered April 2009, paid until **9 April 2028**) | Whoever holds the GoDaddy login controls the website *and* the email. |
| DNS (the domain's address book) | **GoDaddy** (`ns53/ns54.domaincontrol.com`) | DNSSEC is off. TTL is 600 s, so changes show up in about 10 minutes. |
| Website | **Hostinger** shared hosting, server `77.37.34.68` | Hand-written 2009 HTML ("Design by Webindia"). To be replaced: see the separate security notice. |
| Email `@thegroveschool.in` | **Google Workspace** | Depends on the MX/TXT records below. **Must keep working.** |
| School magazine | **WordPress.com** (`thegroveschoolmagazine.com`) | Separate domain, not affected by anything here. |
| Admission form | **123FormBuilder** (`form.123formbuilder.com/5430450`) | Linked from the site; not affected. |

**Nothing is on Webnode.** See §2.

### Current DNS records (keep this for reference and rollback)

| Type | Name | Value | Used for |
| --- | --- | --- | --- |
| A | `@` | `77.37.34.68` | Website (Hostinger). **Changes when you move hosting.** |
| CNAME | `www` | `thegroveschool.in` | Website. **Changes when you move hosting.** |
| MX | `@` | `1 aspmx.l.google.com`<br>`5 alt1.aspmx.l.google.com`<br>`5 alt2.aspmx.l.google.com`<br>`10 alt3.aspmx.l.google.com`<br>`10 alt4.aspmx.l.google.com` | Email (Google Workspace). **Do not touch.** |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | Email anti-spoofing (SPF). **Do not touch.** |
| TXT | `@` | `google-site-verification=MbhewIXAL9Lu41fdmZrtnYzC4sDaaEuAr6SorU2tF8M` | Google ownership proof (Workspace / Search Console). **Do not touch.** |
| TXT | `@` | `MS=ms64576097` | Microsoft 365 ownership proof (probably old). Leave it. |
| TXT | `_dmarc` | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` | Email policy (DMARC; reports go to GoDaddy). **Do not touch.** |
| CNAME | `mail` | `ghs.googlehosted.com` | `mail.thegroveschool.in` → Gmail. **Do not touch.** |

## 2. What about Webnode?

Webnode is a **hosted drag-and-drop website builder** (similar to Wix): you design pages in their online editor and
they host them. Connecting your own domain needs a paid premium plan, and you then point the domain's DNS at Webnode.

- It **can't host this site**. It's a builder, not a place to upload your own code.
- I couldn't find any option to export a Webnode site as files you could serve from GitHub Pages, so "Webnode +
  GitHub Pages" isn't a workable combination. Webnode is an *alternative* to all of this, not a step in it.
- The only reason to switch to Webnode would be if non-technical staff must edit the site visually, with no developer
  involved. Here the text already lives in simple Markdown files that can be edited in GitHub's web editor. If
  staff later need a visual editor, a free Git-based CMS (e.g. Pages CMS or Decap CMS) can be added on top without
  a subscription or a rebuild.

## 3. Hosting options

| | **GitHub Pages** (recommended) | Cloudflare | Netlify | Keep Hostinger |
| --- | --- | --- | --- | --- |
| Cost | Free | Free | Free tier (monthly usage limits) | Existing plan's renewal cost |
| Publishes automatically when the code changes | ✅ (workflow included) | ✅ | ✅ | ❌ upload by hand |
| Old `.htm` links | ✅ redirect pages | ✅ real 301s | ✅ redirect pages | ✅ real 301s (`.htaccess`) |
| Security headers | ❌ | ✅ (`_headers`) | ✅ (`_headers`) | ✅ (`.htaccess`) |
| DNS change | A + CNAME records at GoDaddy | Move nameservers to Cloudflare | A + CNAME records at GoDaddy | None |
| HTTPS certificate | Free, automatic | Free, automatic | Free, automatic | Hostinger SSL |
| Email affected? | No | Only if records are copied wrongly | No | No |

**Recommendation: GitHub Pages.** It's free and needs no account other than GitHub, the deploy workflow is already in the repo,
and the DNS change touches only the two website records, so email is never at risk. Choose **Cloudflare** if you want real
301 redirects, security headers and the fastest delivery in India (Cloudflare has data centres in Chennai). It needs one
more step, moving DNS to Cloudflare.

## 4. GitHub Pages, step by step

### 4.1 Put the code on GitHub

Create a **GitHub organisation for the school** (free), e.g. `thegroveschool`, and make at least one school staff
member an owner alongside you. The school should own its website, not a personal account. Then create a **public**
repository in it (GitHub's free plan only publishes Pages from public repos; the code is just the public website), e.g.
`website`, and push:

```sh
cd thegroveschool
git init -b main
git add .
git commit -m "New school website"
git remote add origin git@github.com:<org>/website.git
git push -u origin main
```

### 4.2 Turn on Pages and preview

1. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Actions** tab → "Deploy to GitHub Pages" → re-run it if the first run happened before step 1.
3. When it's green, the site is live at `https://<org>.github.io/website/`. Share this preview with the school before
   touching DNS. (The build automatically adapts its links to the `/website/` sub-path.)

### 4.3 Verify the domain first (prevents domain takeover)

Organisation **Settings → Pages → Add a domain** → `thegroveschool.in`. GitHub shows a TXT record like
`_github-pages-challenge-<org>` → `<code>`. Add it in GoDaddy (next step), wait a few minutes, click **Verify**.

### 4.4 Change DNS at GoDaddy

GoDaddy → **My Products** → `thegroveschool.in` → **DNS**. Change **only** these rows:

| Action | Type | Name | Value |
| --- | --- | --- | --- |
| Edit (replaces `77.37.34.68`) | A | `@` | `185.199.108.153` |
| Add | A | `@` | `185.199.109.153` |
| Add | A | `@` | `185.199.110.153` |
| Add | A | `@` | `185.199.111.153` |
| Add (optional, IPv6) | AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` (one record each) |
| Edit (replaces `thegroveschool.in`) | CNAME | `www` | `<org>.github.io` |
| Add | TXT | `_github-pages-challenge-<org>` | the code from step 4.3 |

Leave every MX, TXT, `_dmarc` and `mail` record exactly as it is. Also check **Domain → Forwarding** is off; GoDaddy
forwarding overrides the A records.

### 4.5 Connect the domain and switch on HTTPS

1. Repository **Settings → Pages → Custom domain** → `www.thegroveschool.in` → Save. (No `CNAME` file is needed with a
   GitHub Actions workflow.)
2. **Actions → Deploy to GitHub Pages → Run workflow**, so the site is rebuilt for the root of the domain.
3. When the DNS check turns green, tick **Enforce HTTPS**. The certificate usually takes minutes; GitHub allows up to 24 h.

### 4.6 Test

- `https://www.thegroveschool.in` loads the new site. `https://thegroveschool.in` and `http://…` redirect to it.
- An old address such as `https://www.thegroveschool.in/aboutus.htm` lands on `/about/`.
- **Send a test email to an `@thegroveschool.in` address and reply from it.**
- Phone check: open the site on mobile data, not Wi-Fi.

### 4.7 Rollback

Put the A record back to `77.37.34.68` (delete the four GitHub ones) and the `www` CNAME back to `thegroveschool.in`. It
takes effect within about 10 minutes. Don't roll back to the old files without cleaning them first.

## 5. Alternative: Cloudflare

Cloudflare now recommends **Workers static assets** (rather than Cloudflare Pages) for new sites; the repo includes the
`wrangler.jsonc` it needs. A custom domain on Workers requires the domain's DNS to be hosted on Cloudflare.

1. Create a free Cloudflare account → **Add a domain** → `thegroveschool.in` → Free plan.
2. Cloudflare imports the existing DNS records. **Compare them with the table in §1**: all 5 MX records, the 3 TXT
   records, `_dmarc` and the `mail` CNAME must be there. Set the `mail` CNAME to **DNS only** (grey cloud). Delete the
   imported `@` A record (`77.37.34.68`) and the `www` CNAME; the Worker will create its own.
3. GoDaddy → `thegroveschool.in` → **Nameservers → Change → "I'll use my own nameservers"** → enter the two Cloudflare
   nameservers. Wait until Cloudflare shows the domain as **Active**.
4. Cloudflare → **Workers & Pages → Create → Import a repository** → choose the GitHub repo. Build command
   `npm run build`, deploy command `npx wrangler deploy`.
5. The Worker → **Settings → Domains & Routes → Add → Custom domain**: `www.thegroveschool.in`, then
   `thegroveschool.in`. Add a **Redirect Rule** (template "Redirect from root to WWW") so one address is canonical.
6. `_redirects` (real 301s for the old URLs) and `_headers` (security headers) are applied automatically.

## 6. Alternative: Netlify

Import the GitHub repo in Netlify with build command `npm run build` and publish directory `dist`. `_redirects` and
`_headers` are applied automatically. Under **Domain management → Add a domain**, Netlify shows the exact A record (for `@`)
and CNAME (for `www`) to set at GoDaddy. Change only those two records, as in §4.4.

## 7. Alternative: keep Hostinger (no DNS change at all)

1. **Secure the account first** (see the separate security notice): new password, 2-factor authentication, remove
   unknown FTP accounts, run Hostinger's malware scanner.
2. hPanel → **Files → File Manager → public_html**: download a backup, then **delete everything** in `public_html`. The
   old files must not be reused.
3. On your computer: `npm run build`, then `cd dist && zip -r ../site.zip .` (this includes the `.htaccess` files).
4. Upload `site.zip` to `public_html` and **Extract** it there.
5. Every later update means rebuilding and re-uploading. (This can be automated with an FTP-deploy GitHub Action if needed.)

## 8. After the move

- **Google Search Console**: the domain already carries a Google verification record, so someone at the school likely
  has access. Use it to check **Security issues**, submit
  `https://www.thegroveschool.in/sitemap-index.xml`, and watch for crawl errors over the following weeks.
- **Close or clean the Hostinger account.** Even when no domain points at it, an unused hosting account is a security risk.
- **GoDaddy**: turn on 2-factor authentication and keep auto-renew on (renewal due April 2028).
- **Every year**: update `admissions.year` (and the form link if it changes) in `src/data/site.ts`.

## 9. FAQ

**Will email stop working?** No, as long as only the website records (the `@` A records and the `www` CNAME) change.
Email depends on the MX/TXT records, which you leave alone. With the Cloudflare option, email keeps working only if those
records are copied correctly before the nameservers change (step 5.2).

**How long does the switch take?** These records have a 10-minute TTL, so most visitors see the new site within about
10 minutes. A few networks cache longer, up to 24–48 hours in rare cases. Both old and new sites work during the
switch, so nobody sees an error.

**What does it cost?** GitHub Pages and Cloudflare: nothing. The domain renewal at GoDaddy continues as before.
