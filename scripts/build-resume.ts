// Builds the plain résumé (public/resume.html + public/resume.pdf) from src/data,
// so the game and the PDF never disagree. Run with `npm run resume` (Node >= 23.6,
// which runs TypeScript directly) after editing anything in src/data.
import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { education } from "../src/data/education.ts";
import { experience } from "../src/data/experience.ts";
import { projects } from "../src/data/projects.ts";
import { skills } from "../src/data/skills.ts";

const SITE = "https://thypirate.github.io/my-resume/";
const GITHUB = "https://github.com/thypirate";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const link = (href: string, text = href.replace(/^https?:\/\//, "").replace(/\/$/, "")) =>
  `<a href="${esc(href)}">${esc(text)}</a>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Ricardo Barros — Résumé</title>
<style>
  body { font: 10.5pt/1.45 system-ui, -apple-system, "Segoe UI", Arial, sans-serif; color: #111; max-width: 780px; margin: 24px auto; padding: 0 16px; }
  h1 { font-size: 20pt; margin: 0; }
  h2 { font-size: 11pt; text-transform: uppercase; letter-spacing: .06em; border-bottom: 1px solid #999; padding-bottom: 2px; margin: 18px 0 8px; }
  h3 { font-size: 10.5pt; margin: 0; }
  p { margin: 2px 0 0; }
  a { color: #0a4fa3; }
  .contact, .meta, .tech { color: #444; }
  .tech { font-size: 9.5pt; }
  .entry { margin-bottom: 10px; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12px; }
  ul { margin: 0; padding-left: 18px; }
  @page { margin: 14mm; }
  @media print { body { margin: 0; padding: 0; } }
</style>
</head>
<body>
<header>
  <h1>Ricardo Barros</h1>
  <p>Software Developer — 5+ years building reliable, high-performance web applications.</p>
  <p class="contact">${link(SITE, "Interactive résumé")} · ${link(GITHUB)}</p>
</header>

<h2>Experience</h2>
${experience
  .map(
    (e) => `<div class="entry">
  <div class="row"><h3>${esc(e.role)} — ${esc(e.company)}</h3><span class="meta">${esc(e.period)}</span></div>
  <p>${esc(e.description)}</p>
  <p class="tech">${esc(e.tech.join(", "))}</p>
</div>`,
  )
  .join("\n")}

<h2>Projects</h2>
${projects
  .map(
    (p) => `<div class="entry">
  <h3>${esc(p.name)}</h3>
  <p>${esc(p.description)}</p>
  <p class="tech">${esc(p.tech.join(", "))}${p.url ? ` · ${link(p.url)}` : ""}${p.repo ? ` · ${link(p.repo)}` : ""}</p>
</div>`,
  )
  .join("\n")}

<h2>Education</h2>
${education
  .map(
    (e) => `<div class="entry">
  <div class="row"><h3>${esc(e.degree)} in ${esc(e.field)} — ${esc(e.institution)}</h3><span class="meta">${esc(e.period)}</span></div>
  <p class="meta">${esc(e.highlights.join(", "))}</p>
</div>`,
  )
  .join("\n")}

<h2>Skills</h2>
<ul>
${skills.map((g) => `  <li><strong>${esc(g.category)}:</strong> ${esc(g.items.join(", "))}</li>`).join("\n")}
</ul>
</body>
</html>
`;

const htmlPath = fileURLToPath(new URL("../public/resume.html", import.meta.url));
const pdfPath = fileURLToPath(new URL("../public/resume.pdf", import.meta.url));
writeFileSync(htmlPath, html);
console.log(`wrote ${htmlPath}`);

const chrome =
  process.env.CHROME ??
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(
    existsSync,
  );
if (!chrome) {
  console.error("No Chrome found for the PDF; set CHROME=/path/to/chrome.");
  process.exit(1);
}
execFileSync(chrome, [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${pdfPath}`,
  `file://${htmlPath}`,
], { stdio: "ignore" });
console.log(`wrote ${pdfPath}`);
