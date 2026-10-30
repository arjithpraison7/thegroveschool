# Content inventory

What was taken from the old site (crawled 28 October 2026), where it lives now, and what the school should review.
A full backup of the old site is kept **outside this repository** in `../thegroveschool-old-site-backup/`.

## Old pages → new pages

Every old address redirects to its new page (see `oldUrls` in `astro.config.mjs`).

| Old page | New page | Notes |
| --- | --- | --- |
| `index.htm`, `index.html` | `/` | Welcome text, the four highlights, admissions banner → text and buttons. |
| `aboutus.htm` | `/about/` | All text kept: story, philosophy, Sir C.P. Ramaswami Aiyar quote, inclusive school, timings, holidays, aim. |
| `admission.htm` | `/admissions/` | All guidelines kept, including the vegetarian-food and no-transport rules (now highlighted). |
| `location.htm` | `/contact/#location` | The hand-drawn route map, plus a Google Map and Directions button. |
| `contact.htm` | `/contact/` | Principal, address, phones, email, e-magazine link, office hours, holidays. |
| `artsculture.htm` | `/school-life/arts-culture/` | Text + 8 student paintings. |
| `sportsgame.htm` | `/school-life/sports-games/` | Text + 10 photos. |
| `annualday.htm` | `/school-life/annual-day/` | Text + 16 photos (see "Recovered" below). |
| `exhibitionprojects.htm` | `/school-life/exhibitions-projects/` | Text + 5 photos. |
| `annualprojectday.htm` | `/school-life/annual-project-day/` | Text + 24 photos. Was linked from inner pages only. |
| `electionshouses.htm` | `/school-life/elections-houses/` | Text + house flags photo + the four houses with their colours. |
| `supwenvironment.htm` | `/school-life/supw-environment/` | 4 photos. The old page had **no text**: see "New text". |
| `arjagannathantheatre.htm` | `/school-life/childrens-theatre/` | Text + 2 photos. |
| `achievements.htm` | `/achievements/` | Full 2016–17 highlights; the dated events became a timeline. |
| `highlightsandachivements.htm` | `/achievements/` | This was an empty "page is currently being updated" placeholder. |
| `media.htm` | `/media/` | 4 newspaper clippings, now with publication, date and headline. |
| `magazine.htm` | `/magazine/` | Links to the WordPress.com magazine site. |

## Recovered

- **16 Annual Day photos.** The old page linked to `annual_day_img_2_big.jpg`, but the files on the server are
  `…_big.JPG` (and the reverse for photo 1). The server treats upper and lower case as different, so the old site's
  pop-up photos never opened. All 16 were recovered, 5 of them as 4496 × 3000 originals, which now power the large
  photos on the home and About pages.
- **5 older Art & Culture photos** that the school had hidden in HTML comments: kept in the backup, not published.
- Old banners referenced only in comments (Sports Day 2018, admissions 2020–21, a 2019 Sports Day invitation): in the backup.

## Editorial changes (no facts changed)

- Light copy-editing for grammar and consistency (e.g. "Class X", "Ganesh Chaturthi", "Swachh Bharat").
- "Pipal" → **"Peepal"**, as on the house flag and in the 2016–17 achievements text.
- CISCE written out correctly as "Council for the **Indian School Certificate** Examinations" (the 2009 logo text
  differs; the school's own 2020–21 banner uses the correct name).
- 2016–17 achievements: "His current ranking is 1146" → "His ranking at the time was 1146" (written in 2017).
- The repeated ISC-affiliation paragraph in 2016–17 now appears once, under its own heading.
- Location merged into Contact; the empty "Highlights & Achievements" placeholder merged into Achievements.

## New text written for the new site: please review

- **SUPW & Environment** page text, assembled from facts elsewhere on the old site (horticulture on the syllabus; the
  Eco-Club and Nature Club; visits to the Blue Cross of India). The photos look like an animal-shelter visit but
  don't say where, so the captions don't name a place.
- One-line summaries for each School Life page (used on cards and in search results).
- Captions for the newspaper clippings, read from the clippings themselves.
- Alt text (descriptions for blind visitors) for every photo.
- About page timeline: 1984, 2004 and 2017, all taken from the old site.

## Left out on purpose (kept in the backup)

- **ICSE Class X mark lists 2014–2016** (PDFs with each student's name and subject-wise marks; the students were
  minors at the time). Before republishing, the school may want to weigh student privacy and the Digital Personal
  Data Protection Act, 2023. To restore: copy the PDFs into `public/` under their original names (the old links then
  work again) and link them from `src/pages/achievements.astro`.
- Admission banners as images (2020–21, 2026–27). The new admissions box is real text: readable on phones, by
  screen readers and by search engines, and updated in one line of `src/data/site.ts`.
- Navigation icons, spacer images and the 2009 "Design by Webindia" footer credit.

## Only the school can supply or confirm

- [ ] Principal (Mrs. S.M. Sujatha), phone numbers, email, school and office timings: still current?
- [ ] Which classes have admissions open for 2026–27 (the old banner only says "academic year 2026–2027").
- [ ] Achievements and board results **after 2017**. The old site has nothing newer, so the Achievements page
  currently shows 2016–17, clearly dated.
- [ ] **Better photos.** Most old photos are only 700–850 px wide. Recent, full-size photos (the 2017 Annual Day
  originals were 4496 × 3000) would make the biggest visible difference. Drop them into `src/assets/galleries/…`.
- [ ] The logo as a vector file (SVG, AI, EPS or PDF) if one exists. The site uses a cut-out of the 2009 JPEG.
- [ ] Is the Saraswathi Kendra / Lakshmi Kendra description still accurate?
- [ ] Confirm the school's consent policy for publishing photos of children (these photos were already public).
- [ ] Decide whether the 2014–2016 mark lists should be published again.
