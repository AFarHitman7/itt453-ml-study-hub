# ITT453 Machine Learning · Exam Study Hub

An offline-first study website for **ITT453 Machine Learning** (APJ Abdul
Kalam Technological University, 2019 Scheme, S7 B.Tech Information
Technology, Program Elective II).

Built for one purpose: the night before the exam. Open `index.html`,
pick a module, revise.

## How to use

Double-click `index.html`. No server, no build step, no internet needed.
Everything is inline: notes, practice questions, past papers with answers,
and the study plan all work from the file system.

## What is inside

- **Notes** — every syllabus topic across the five modules, written in
  short plain-language paragraphs with micro-headings: a one-line
  definition, an intuitive explanation before every formula, worked
  examples with each step shown, code where it helps, diagrams, and exam
  tips. Each topic ends with a past-paper spotlight and fresh practice.
- **Practice Q&A** — 66 brand-new questions that appear in no past paper,
  with model answers, module and difficulty filters.
- **PYQ** — all 177 questions from six previous papers (May 2023 to
  May 2026), grouped by module and merged into 88 repeat themes with a
  ×N counter. Every question now carries the original table, matrix or
  figure from its paper (cropped from the source PDF, with a full-size
  link), and a reveal answer: short theory answers for definitions and
  comparisons, and step-by-step worked solutions for every numerical
  problem, with formulas, substitutions, intermediate tables and the
  final result.
- **Study Plan** — the exam pattern, marks each module has put on offer,
  the most-repeated themes computed live from the data, a night-before
  hour plan, answer templates, memory hooks and exam-hall tactics.

## Sources

- Official KTU ITT453 syllabus (2019 scheme) for module titles, hours
  and the exam pattern.
- Six official question papers: May 2023, Dec 2023, May 2024, Nov 2024,
  Nov 2025, May 2026. PYQ tables and matrices are cropped from these
  papers; worked answers were computed and checked independently, not
  copied from any evaluation material.
- Each Notes topic lists the exact reference pages it was written from
  (Wikipedia, scikit-learn documentation and other educational sources
  fetched during the build).
- Course-note diagrams are reused as-is where the notes had them; the
  rest are drawn for this site.

## Data integrity

The past-paper question texts are verbatim. The concatenation of all
177 question strings hashes to SHA-256
`c2fcd5e440ac743aab6f66f1a3866cb80c5e653ea3e1ba02cd89d379d2990788`,
so any accidental edit of a question is detectable.
Run `node tests/verify-data.cjs` to check topic structure, practice
counts, answer coverage and asset integrity offline, and
`python tests/browser-revision.py` for the browser regression
(needs Playwright).

## Structure

    index.html              four views, hash routing
    assets/app.js           renderer (vanilla JS)
    assets/style.css        light + dark themes (prefers-color-scheme)
    assets/pyq/             original paper tables, matrices and figures
    data/pyq.js             exam pattern, papers, repeat themes, PYQ
    data/pyq-assets.js      mapping of each question to its paper visual
    data/pyq-answers1..5.js worked and theory answers per module
    data/module1..5.js      notes + practice per module
    data/diagrams*.js       SVG diagrams + reused course-note figures
    data/tactics.js         study-plan articles
    tests/                  offline data check + browser regression
