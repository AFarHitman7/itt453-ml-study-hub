/* ============================================================
   ITT453 Machine Learning — Study Hub · app.js
   Vanilla JS. Renders Notes / Practice / PYQ / Study Plan
   from the data files. No dependencies, works from file://.
   ============================================================ */
(function () {
"use strict";

const $ = s => document.querySelector(s);
const esc = s => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const MODS = [];
for (let i = 1; i <= 5; i++) if (window.ML_MODULES && ML_MODULES[i]) MODS.push(ML_MODULES[i]);
const PYQ = window.ML_PYQ || [];
const PAPERS = (window.ML_EXAM && ML_EXAM.papers) || [];
const paperById = {}; PAPERS.forEach(p => paperById[p.id] = p);
const REPEATS = window.ML_REPEATS || {};
const DIAGRAMS = window.ML_DIAGRAMS || {};

const state = {
  view: "notes",
  topic: null,
  q: "",
  pfMod: "all",   // practice module filter
  pfDiff: "all",  // practice difficulty filter
  pyqPapers: new Set(PAPERS.map(p => p.id))
};

/* Sidebar accordion state lives in memory (not localStorage), so it resets
   on reload but survives every re-render and view switch. */
const sideOpen = new Set(MODS.length ? [MODS[0].num] : []);

/* ---------- lookups ---------- */
function topicBySlug(slug) {
  for (const m of MODS) for (const t of m.topics) if (t.slug === slug) return { mod: m, topic: t };
  return null;
}
function topicTitle(slug) {
  const hit = topicBySlug(slug);
  if (hit) return hit.topic.title;
  return slug;
}
function modTitle(m) {
  const mod = MODS.find(x => x.num === m);
  return mod ? mod.title : "Module " + m;
}
function pyqFor(slug) { return PYQ.filter(e => e.t === slug); }
function repeatLabel(rk) { return REPEATS[rk] || rk; }
function groupByRK(entries) {
  const g = {};
  entries.forEach(e => { (g[e.rk] = g[e.rk] || []).push(e); });
  return g;
}

/* ---------- shared render helpers ---------- */
function paperChip(id, small) {
  const p = paperById[id];
  return '<span class="pill paper' + (small ? " small" : "") + '">' + esc(p ? p.label : id) + "</span>";
}
function marksPill(m) { return '<span class="pill mark">' + m + "m</span>"; }
function diffPill(d) { return '<span class="pill diff-' + esc(d) + '">' + esc(d) + "</span>"; }

function blockHTML(b) {
  switch (b.type) {
    case "definition":
      return '<div class="blk"><div class="definition"><span class="blk-tag">Definition</span><div class="defn">' + b.text + "</div></div></div>";
    case "text":
      return '<div class="blk prose">' + b.html + "</div>";
    case "example":
      return '<div class="blk"><div class="examplebox"><span class="blk-tag">Example</span>' + b.html + "</div></div>";
    case "tip":
      return '<div class="blk"><div class="tipbox"><span class="blk-tag">Exam tip</span>' + b.html + "</div></div>";
    case "code":
      return '<div class="blk"><span class="codetag">Code <i>· ' + esc(b.lang || "") + "</i></span>" +
        '<pre class="code">' + b.html + "</pre></div>";
    case "diagram": {
      const d = DIAGRAMS[b.id];
      if (!d) return "";
      return '<div class="blk"><span class="blk-tag">Diagram · practise sketching this</span>' +
        '<div class="diagram">' + d.svg + '<div class="dcap">' + d.cap + "</div></div></div>";
    }
    default: return "";
  }
}

/* One past-paper occurrence: a fixed paper rail on the left, the question on
   the right. Used by the PYQ page and the Notes spotlight so both rhyme. */
function occHTML(e) {
  const label = paperById[e.p] ? paperById[e.p].label : e.p;
  return '<li><div class="occ-rail">' +
    '<span class="occ-paper" title="' + esc(label) + '">' + esc(label) + "</span>" +
    '<span class="occ-no">Q' + esc(e.no) + " · " + e.marks + "m</span></div>" +
    '<p class="occ-q">' + e.q + "</p></li>";
}

/* A repeat-group card: theme label + ×N badge, then its occurrences, then an
   optional quiet footer link. opts.spot marks the Notes spotlight variant. */
function pyqCardHTML(rk, g, opts) {
  opts = opts || {};
  const label = repeatLabel(rk);
  const tag = opts.spot ? "p" : "h4";
  let h = '<article class="pyq-card' + (opts.spot ? " spot" : "") + '">' +
    '<header class="pyq-card-head"><' + tag + ' class="pyq-card-theme" title="' + esc(label) + '">' +
    esc(label) + "</" + tag + ">";
  if (g.length > 1) {
    h += '<span class="badge-x" aria-label="asked ' + g.length + ' times">' + g.length + "</span>";
  }
  h += '</header><ul class="occurrences">';
  g.forEach(e => { h += occHTML(e); });
  h += "</ul>";
  if (opts.linkSlug) {
    h += '<a class="pyq-link" href="#notes/' + opts.linkSlug +
      '">Study this topic in Notes <span aria-hidden="true">→</span></a>';
  }
  return h + "</article>";
}

function pyqSpotlight(slug) {
  const entries = pyqFor(slug);
  if (!entries.length) return "";
  const groups = groupByRK(entries);
  let html = '<div class="blk"><div class="pyqbox"><span class="blk-tag">Past-paper spotlight: asked ' +
    entries.length + " time" + (entries.length > 1 ? "s" : "") + " across your papers</span>";
  Object.keys(groups).forEach(rk => {
    html += pyqCardHTML(rk, groups[rk], { spot: true });
  });
  html += "</div></div>";
  return html;
}

function practiceCard(qa, i) {
  return "<details class=\"qa\"><summary><span>" + qa.q + "</span>" +
    marksPill(qa.marks) + diffPill(qa.diff || "medium") + "</summary>" +
    '<div class="answer">' + qa.a + "</div></details>";
}

function topicPractice(slug) {
  const hit = topicBySlug(slug);
  if (!hit || !hit.topic.practice || !hit.topic.practice.length) return "";
  return '<div class="blk"><h3>Fresh practice on this topic</h3>' +
    hit.topic.practice.map(practiceCard).join("") + "</div>";
}

function sourcesLine(t) {
  if (!t.sources || !t.sources.length) return "";
  return '<p class="sources">Sources: ' + t.sources.map(esc).join(" · ") + "</p>";
}

/* ---------- Notes view ---------- */
function renderNotes() {
  const hit = topicBySlug(state.topic) || (MODS.length && MODS[0].topics.length
    ? { mod: MODS[0], topic: MODS[0].topics[0] } : null);
  let h = "";
  if (!hit) {
    h = '<div class="empty">No notes loaded. Check that the data files sit next to <code>index.html</code>.</div>';
  } else {
    state.topic = hit.topic.slug;
    const t = hit.topic;
    h += '<div class="crumbs"><span>Notes</span><span aria-hidden="true">/</span><span>Module ' + hit.mod.num + " · " + esc(hit.mod.title) + "</span></div>";
    h += "<h1>" + esc(t.title) + "</h1>";
    const def = (t.blocks || []).find(b => b.type === "definition");
    if (!def) {
      const first = (t.blocks || []).find(b => b.type === "text");
      if (first) h += '<p class="lead">' + first.html.replace(/<[^>]+>/g, " ").slice(0, 180) + "…</p>";
    }
    (t.blocks || []).forEach(b => { h += blockHTML(b); });
    h += pyqSpotlight(t.slug);
    h += topicPractice(t.slug);
    h += sourcesLine(t);
  }
  $("#content").innerHTML = h;
  $("#content").scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/* ---------- Practice view ---------- */
function practiceEntries() {
  const out = [];
  MODS.forEach(m => (m.topics || []).forEach(t =>
    (t.practice || []).forEach(qa => out.push({ mod: m, topic: t, qa }))));
  return out;
}
function renderPractice() {
  let list = practiceEntries();
  if (state.pfMod !== "all") list = list.filter(x => x.mod.num === state.pfMod);
  if (state.pfDiff !== "all") list = list.filter(x => (x.qa.diff || "medium") === state.pfDiff);

  let h = '<p class="eyebrow">Practice</p><h1>Fresh Q&amp;A: angles the papers have not tested</h1>';
  h += '<p class="lead">Each topic gets a question the exams have not used yet, so a surprise question stays a surprise. Write your answer before opening ours.</p>';

  h += '<div class="filterrow"><span class="lbl">Module</span><button type="button" class="chip' +
    (state.pfMod === "all" ? " on" : "") + '" data-pfm="all" aria-pressed="' + (state.pfMod === "all") + '">All</button>';
  MODS.forEach(m => {
    h += '<button type="button" class="chip' + (state.pfMod === m.num ? " on" : "") + '" data-pfm="' + m.num +
      '" aria-pressed="' + (state.pfMod === m.num) + '">M' + m.num + "</button>";
  });
  h += '<span class="lbl" style="margin-left:10px">Difficulty</span>';
  ["all", "easy", "medium", "hard"].forEach(d => {
    const label = d.charAt(0).toUpperCase() + d.slice(1);
    h += '<button type="button" class="chip' + (state.pfDiff === d ? " on" : "") + '" data-pfd="' + d +
      '" aria-pressed="' + (state.pfDiff === d) + '">' + label + "</button>";
  });
  h += '<span class="count">' + list.length + " questions</span></div>";

  if (!list.length) {
    h += '<div class="empty"><p>No questions match this filter.</p>' +
      '<button type="button" class="chip" data-reset-filters>Reset filters</button></div>';
  }
  let curMod = null;
  list.forEach(x => {
    if (x.mod.num !== curMod) {
      curMod = x.mod.num;
      h += "<h2>Module " + curMod + " · " + esc(x.mod.title) + "</h2>";
    }
    h += practiceCard(x.qa);
  });
  $("#content").innerHTML = h;
  document.documentElement.scrollTop = 0;
}

/* ---------- PYQ view ---------- */
function filteredPYQ() { return PYQ.filter(e => state.pyqPapers.has(e.p)); }

function pyqGroupHTML(entries) {
  const groups = groupByRK(entries);
  let h = "";
  Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length).forEach(rk => {
    const g = groups[rk];
    const slugs = [...new Set(g.map(e => e.t))];
    const linkSlug = slugs.length === 1 && topicBySlug(slugs[0]) ? slugs[0] : null;
    h += pyqCardHTML(rk, g, { linkSlug });
  });
  return h;
}

function renderPYQ() {
  const all = filteredPYQ();
  let h = '<p class="eyebrow">Previous year questions</p><h1>Every past question, grouped by module and topic</h1>';
  h += '<p class="lead">' + PAPERS.length + ' papers, merged by theme; ×N means it was asked N times, so start there.</p>';

  h += '<div class="filterrow"><span class="lbl">Papers</span>';
  h += '<button type="button" class="chip' + (state.pyqPapers.size === PAPERS.length ? " on" : "") +
    '" data-pp="*" aria-pressed="' + (state.pyqPapers.size === PAPERS.length) + '">All</button>';
  PAPERS.forEach(p => {
    h += '<button type="button" class="chip' + (state.pyqPapers.has(p.id) ? " on" : "") + '" data-pp="' + p.id +
      '" aria-pressed="' + state.pyqPapers.has(p.id) + '">' + esc(p.label) + "</button>";
  });
  h += "</div>";

  /* high-yield summary, collapsed so the page opens on Module 1's cards */
  const freq = {};
  all.forEach(e => { freq[e.rk] = (freq[e.rk] || 0) + 1; });
  const repeated = Object.keys(freq).filter(k => freq[k] > 1)
    .sort((a, b) => freq[b] - freq[a]);
  const top = repeated.slice(0, 12);
  if (top.length) {
    h += '<details class="hy"><summary><span>High-yield themes, asked more than once</span>' +
      '<span class="hy-n" aria-label="' + repeated.length + ' themes">' + repeated.length +
      '</span></summary><div class="hy-body">';
    const maxN = freq[top[0]];
    top.forEach(rk => {
      const e = all.find(x => x.rk === rk);
      const label = repeatLabel(rk);
      h += '<div class="freqrow"><div class="fl">' + esc(label) +
        ' <span class="modref">· M' + e.m + "</span></div>" +
        '<div class="bar"><i style="width:' + Math.round(freq[rk] / maxN * 100) + '%"></i></div>' +
        '<div class="n">' + freq[rk] + "</div></div>";
    });
    h += '<p class="hy-note">Top 12 by frequency across the selected papers.</p></div></details>';
  }

  /* modules */
  const order = [1, 2, 3, 4, 5];
  order.forEach(m => {
    const me = all.filter(e => e.m === m);
    if (!me.length) return;
    const modLabel = "Module " + m + " · " + esc(modTitle(m));
    h += '<h2 class="pyq-mod" id="pyq-m-' + m + '"><span class="mod-name">' + modLabel +
      '</span> <span class="h2-count">' + me.length + " questions</span></h2>";
    /* group by topic */
    const byTopic = {};
    me.forEach(e => (byTopic[e.t] = byTopic[e.t] || []).push(e));
    Object.keys(byTopic).sort((a, b) => byTopic[b].length - byTopic[a].length).forEach(ts => {
      const tes = byTopic[ts];
      h += '<div class="pyq-group"><h3 class="pyq-topic">' + esc(topicTitle(ts)) +
        ' <span class="h3-count">· ' + tes.length +
        (tes.length > 1 ? " questions" : " question") + "</span></h3>" + pyqGroupHTML(tes) + "</div>";
    });
  });

  $("#content").innerHTML = h;
  document.documentElement.scrollTop = 0;
}

/* ---------- Study plan view ---------- */
function renderPlan() {
  let h = '<p class="eyebrow">Study plan</p><h1>How to spend the hours you have</h1>';
  h += '<p class="lead">Everything below comes from the official exam pattern and your actual papers. The frequency tables are computed live from the PYQ data.</p>';

  h += '<div class="plan-card" id="t-exam-pattern"><h2>Exam pattern (from the official syllabus)</h2>' + ML_EXAM.patternHTML + "</div>";

  /* module weight */
  h += '<div class="plan-card" id="t-module-weight"><h2>Where the marks live, by module</h2>';
  h += '<p class="lead">Marks each module has put on offer across the papers (one Part B alternative per paper).</p>';
  const modMarks = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  PYQ.forEach(e => {
    if (e.part === "A") modMarks[e.m] += e.marks;
  });
  const bSeen = {};
  PYQ.forEach(e => {
    if (e.part !== "B") return;
    const k = e.p + "|" + e.m;
    if (bSeen[k]) return;
    bSeen[k] = true;
    modMarks[e.m] += 14;
  });
  const maxM = Math.max.apply(null, Object.keys(modMarks).map(k => modMarks[k]));
  [1, 2, 3, 4, 5].forEach(m => {
    if (modMarks[m] == null) return;
    h += '<div class="freqrow"><div class="fl">M' + m +
      " · " + esc(modTitle(m)) + "</div>" +
      '<div class="bar"><i style="width:' + Math.round(modMarks[m] / maxM * 100) + '%"></i></div>' +
      '<div class="n">' + modMarks[m] + "m</div></div>";
  });
  h += "</div>";

  /* overall frequency */
  h += '<div class="plan-card" id="t-priority"><h2>The priority list: most repeated themes</h2>';
  h += '<p class="lead">A theme asked five times is a theme that will be asked again. Study top-down until time runs out.</p>';
  const freq = {};
  PYQ.forEach(e => { freq[e.rk] = (freq[e.rk] || 0) + 1; });
  const top = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 14);
  const maxN = freq[top[0]];
  top.forEach(rk => {
    const e = PYQ.find(x => x.rk === rk);
    h += '<div class="freqrow"><div class="fl">' + esc(repeatLabel(rk)) +
      ' <span class="modref">· M' + e.m + "</span></div>" +
      '<div class="bar"><i style="width:' + Math.round(freq[rk] / maxN * 100) + '%"></i></div>' +
      '<div class="n">' + freq[rk] + "</div></div>";
  });
  h += "</div>";

  /* tactic articles */
  (window.ML_TACTICS || []).forEach(t => {
    h += '<div class="plan-card" id="t-' + (t.id || "") + '"><h2>' + esc(t.title) + "</h2>" + t.html + "</div>";
  });

  /* papers */
  h += '<div class="plan-card"><h2>The papers in this collection</h2><ul>';
  PAPERS.forEach(p => {
    h += "<li><b>" + esc(p.label) + "</b>: " + esc(p.detail) + ' <span class="paper-code">(' + esc(p.code) + ")</span></li>";
  });
  h += "</ul></div>";

  $("#content").innerHTML = h;
  document.documentElement.scrollTop = 0;
}

/* ---------- Sidebar ---------- */
let sidebarView = null;

function sideSectionOpen(sec, open, remember) {
  if (!sec) return;
  sec.classList.toggle("collapsed", !open);
  const head = sec.querySelector(".side-mod");
  if (head && head.hasAttribute("aria-expanded")) head.setAttribute("aria-expanded", String(open));
  if (remember) {
    const num = parseInt(sec.dataset.modSec, 10);
    if (!isNaN(num)) {
      if (open) sideOpen.add(num); else sideOpen.delete(num);
    }
  }
}

function sideStatic(badge, title, meta, rows) {
  return '<section class="side-sec side-sec-static">' +
    '<div class="side-mod side-mod-static">' +
    '<span class="mn">' + esc(badge) + '</span>' +
    '<span class="side-mod-title">' + esc(title) + '</span>' +
    '<span class="side-mod-meta">' + esc(String(meta)) + '</span>' +
    '</div><div class="side-list"><div class="side-list-inner">' + rows + "</div></div></section>";
}

function sideEmptyHTML() {
  return '<div class="side-empty" id="sideEmpty" hidden aria-live="polite"><p></p>' +
    '<button type="button" data-clear-search>Clear search</button></div>';
}

function renderSidebar() {
  const sb = $("#sidebar");
  const keepScroll = sidebarView === state.view ? sb.scrollTop : 0;
  let h = "";
  if (state.view === "notes") {
    const hit = state.topic ? topicBySlug(state.topic) : null;
    const activeMod = hit ? hit.mod.num : null;

    h += '<div class="side-label">Notes · Modules</div>';
    h += '<div class="side-sections">';
    MODS.forEach(m => {
      const open = sideOpen.has(m.num) || m.num === activeMod;
      const pyqN = m.topics.reduce((n, t) => n + pyqFor(t.slug).length, 0);
      h += '<section class="side-sec' + (open ? "" : " collapsed") + '" data-mod-sec="' + m.num + '">';
      h += '<button type="button" class="side-mod" data-mod-toggle="' + m.num +
        '" aria-expanded="' + open + '" aria-controls="side-list-' + m.num + '">' +
        '<span class="mn">M' + m.num + '</span>' +
        '<span class="side-mod-title">' + esc(m.title) + '</span>' +
        '<span class="side-mod-meta" title="' + m.topics.length + ' topics" aria-label="' + m.topics.length +
        ' topics, ' + pyqN + ' past-paper questions">' + m.topics.length + '</span>' +
        '<span class="chev" aria-hidden="true"></span></button>';
      h += '<div class="side-list" id="side-list-' + m.num + '"><div class="side-list-inner">';
      m.topics.forEach(t => {
        const n = pyqFor(t.slug).length;
        const active = state.topic === t.slug;
        h += '<button type="button" class="side-topic' + (active ? " active" : "") + '" data-topic="' + t.slug + '"' +
          (active ? ' aria-current="true"' : "") + ">" +
          '<span class="side-topic-title">' + esc(t.title) + "</span>" +
          (n ? '<span class="cnt" title="' + n + ' past-paper questions" aria-label="' + n +
            ' past-paper questions">' + n + "</span>" : "") +
          "</button>";
      });
      h += "</div></div></section>";
    });
    h += "</div>";
    h += sideEmptyHTML();
    h += '<div class="side-foot">The number next to a topic is how many times its questions appear across your past papers.</div>';
  } else if (state.view === "practice") {
    const all = practiceEntries();
    let rows = '<button type="button" class="side-topic' + (state.pfMod === "all" ? " active" : "") +
      '" data-pfm="all" aria-pressed="' + (state.pfMod === "all") + '">' +
      '<span class="side-topic-title">All modules</span>' +
      '<span class="cnt" aria-label="' + all.length + ' questions">' + all.length + "</span></button>";
    MODS.forEach(m => {
      const n = all.filter(x => x.mod.num === m.num).length;
      rows += '<button type="button" class="side-topic' + (state.pfMod === m.num ? " active" : "") +
        '" data-pfm="' + m.num + '" aria-pressed="' + (state.pfMod === m.num) + '">' +
        '<span class="side-topic-title">Module ' + m.num + " · " + esc(m.title) + '</span>' +
        '<span class="cnt" aria-label="' + n + ' questions">' + n + "</span></button>";
    });
    h += '<div class="side-label">Practice · Filters</div>';
    h += '<div class="side-sections">' + sideStatic("M", "Module filter", all.length, rows) + "</div>";
    h += '<div class="side-foot">Use the chips at the top of the page for difficulty.</div>';
  } else if (state.view === "pyq") {
    const all = filteredPYQ();
    let rows = "";
    [1, 2, 3, 4, 5].forEach(m => {
      const n = all.filter(e => e.m === m).length;
      rows += '<button type="button" class="side-topic" data-pym="' + m + '">' +
        '<span class="side-topic-title">Module ' + m + '</span>' +
        '<span class="cnt" aria-label="' + n + ' questions">' + n + "</span></button>";
    });
    let prows = "";
    PAPERS.forEach(p => {
      const on = state.pyqPapers.has(p.id);
      prows += '<button type="button" class="side-toggle' + (on ? " on" : "") + '" data-pp="' + p.id +
        '" aria-pressed="' + on + '"><span class="tg-ind" aria-hidden="true"></span>' +
        '<span class="tg-label">' + esc(p.label) + '</span>' +
        '<span class="tg-state" aria-hidden="true">' + (on ? "On" : "Off") + "</span></button>";
    });
    h += '<div class="side-label">PYQ · Modules</div>';
    h += '<div class="side-sections">' +
      sideStatic("M", "Jump to module", "5", rows) +
      sideStatic("P", "Paper filter", state.pyqPapers.size + "/" + PAPERS.length, prows) +
      "</div>";
    h += '<div class="side-foot">Toggle papers to compare series. Merged questions carry a ×N counter.</div>';
  } else if (state.view === "plan") {
    let trows = "";
    (window.ML_TACTICS || []).forEach(t => {
      trows += '<button type="button" class="side-topic" data-tactic="' + esc(t.id) + '">' +
        '<span class="side-topic-title">' + esc(t.title) + "</span></button>";
    });
    let jrows = "";
    jrows += '<button type="button" class="side-topic" data-tactic="exam-pattern"><span class="side-topic-title">Exam pattern</span></button>';
    jrows += '<button type="button" class="side-topic" data-tactic="module-weight"><span class="side-topic-title">Where the marks live</span></button>';
    jrows += '<button type="button" class="side-topic" data-tactic="priority"><span class="side-topic-title">Priority list</span></button>';
    h += '<div class="side-label">Study plan</div>';
    h += '<div class="side-sections">' +
      sideStatic("T", "Tactics", (window.ML_TACTICS || []).length, trows) +
      sideStatic("J", "Jump to", "3", jrows) +
      "</div>";
  }
  sb.innerHTML = h;
  sb.scrollTop = keepScroll;
  const active = sb.querySelector(".side-topic.active");
  if (active && active.offsetParent !== null) {
    const ar = active.getBoundingClientRect();
    const sr = sb.getBoundingClientRect();
    if (ar.top < sr.top + 56 || ar.bottom > sr.bottom) {
      sb.scrollTop = Math.max(0, sb.scrollTop + (ar.top - sr.top) - 120);
    }
  }
  sidebarView = state.view;
  if (state.view === "notes") applySearchFilter();
}

/* ---------- routing & events ---------- */
function applyHash() {
  const h = (location.hash || "#notes").replace(/^#/, "");
  const [view, arg] = h.split("/");
  if (["notes", "practice", "pyq", "plan"].includes(view)) state.view = view;
  if (view === "notes" && arg && topicBySlug(arg)) state.topic = arg;
  if (!state.topic && MODS.length) state.topic = MODS[0].topics[0].slug;
}

function wrapTables() {
  document.querySelectorAll("#content table.tbl").forEach(t => {
    if (t.parentElement && t.parentElement.classList.contains("tbl-wrap")) return;
    const w = document.createElement("div");
    w.className = "tbl-wrap";
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });
}

function render() {
  let focusTarget = null;
  try {
    const ae = document.activeElement;
    const box = ae && (ae.closest("#content") || ae.closest("#sidebar"));
    if (box) {
      for (const attr of ["pfm", "pfd", "pp", "pym", "topic", "tactic"]) {
        if (ae.dataset && ae.dataset[attr] != null) {
          focusTarget = { root: box.id, attr: attr, val: ae.dataset[attr] };
          break;
        }
      }
    }
  } catch (e) { focusTarget = null; }
  document.querySelectorAll("#tabs button").forEach(b => {
    const on = b.dataset.view === state.view;
    b.classList.toggle("active", on);
    if (on) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  if (state.view === "notes") renderNotes();
  else if (state.view === "practice") renderPractice();
  else if (state.view === "pyq") renderPYQ();
  else renderPlan();
  wrapTables();
  renderSidebar();
  if (focusTarget) {
    try {
      const root = document.getElementById(focusTarget.root);
      const val = String(focusTarget.val).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const el = root && root.querySelector('[data-' + focusTarget.attr + '="' + val + '"]');
      if (el) el.focus();
    } catch (e) { /* focus restoration is best effort */ }
  }
}

function navigate(hash) {
  if (("#" + location.hash.replace(/^#/, "")) !== hash) {
    history.pushState(null, "", hash);
  }
  applyHash();
  render();
}

function openNav() {
  $("#sidebar").classList.add("open");
  $("#menuBtn").setAttribute("aria-expanded", "true");
  const scrim = $("#scrim");
  if (scrim) scrim.hidden = false;
}
function closeNav() {
  $("#sidebar").classList.remove("open");
  $("#menuBtn").setAttribute("aria-expanded", "false");
  const scrim = $("#scrim");
  if (scrim) scrim.hidden = true;
}
function scrollToEl(el) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

document.addEventListener("click", ev => {
  if (ev.target.id === "scrim") { closeNav(); return; }

  const t = ev.target.closest("button, a, summary");
  if (!t) return;

  if (t.id === "menuBtn") {
    if ($("#sidebar").classList.contains("open")) closeNav(); else openNav();
    return;
  }
  /* Accordion header: toggle in place, keep the mobile overlay open. */
  if (t.dataset.modToggle) {
    if (state.q) return;
    sideSectionOpen(t.closest(".side-sec"), t.getAttribute("aria-expanded") !== "true", true);
    return;
  }
  /* Toggles inside the drawer re-render the page, so keep the overlay open. */
  const keepDrawer = t.closest("#sidebar") && (
    t.hasAttribute("data-pp") || t.hasAttribute("data-pfm") ||
    t.hasAttribute("data-pfd") || t.hasAttribute("data-pt"));
  if (t.closest("#sidebar") && !keepDrawer) closeNav();
  if (t.closest("#content")) closeNav();

  /* tabs */
  if (t.closest("#tabs")) {
    state.view = t.dataset.view;
    navigate("#" + state.view);
    closeNav();
    return;
  }

  /* sidebar + content chips */
  if (t.dataset.topic) {
    state.view = "notes";
    state.topic = t.dataset.topic;
    navigate("#notes/" + state.topic);
    closeNav();
    return;
  }
  if (t.dataset.pfm) {
    state.pfMod = t.dataset.pfm === "all" ? "all" : parseInt(t.dataset.pfm, 10);
    return render();
  }
  if (t.dataset.pfd) {
    state.pfDiff = t.dataset.pfd;
    return render();
  }
  if (t.dataset.resetFilters !== undefined) {
    state.pfMod = "all";
    state.pfDiff = "all";
    return render();
  }
  if (t.dataset.pp) {
    if (t.dataset.pp === "*") state.pyqPapers = new Set(PAPERS.map(p => p.id));
    else if (state.pyqPapers.has(t.dataset.pp)) state.pyqPapers.delete(t.dataset.pp);
    else state.pyqPapers.add(t.dataset.pp);
    if (!state.pyqPapers.size) state.pyqPapers = new Set(PAPERS.map(p => p.id));
    return render();
  }
  if (t.dataset.pym) {
    closeNav();
    const hd = document.getElementById("pyq-m-" + t.dataset.pym);
    if (hd) scrollToEl(hd);
    return;
  }
  if (t.dataset.tactic) {
    closeNav();
    const el = document.getElementById("t-" + t.dataset.tactic);
    if (el) scrollToEl(el);
    return;
  }
  if (t.dataset.clearSearch !== undefined) {
    state.q = "";
    $("#search").value = "";
    applySearchFilter();
    $("#search").focus();
    return;
  }
});

document.addEventListener("keydown", ev => {
  if (ev.key === "Escape" && $("#sidebar").classList.contains("open")) {
    closeNav();
    $("#menuBtn").focus();
  }
});

/* search: filter the sidebar topic list, opening matching modules */
function applySearchFilter() {
  const q = state.q;
  const sb = $("#sidebar");
  const empty = document.getElementById("sideEmpty");
  const secs = sb.querySelectorAll(".side-sec[data-mod-sec]");

  if (!q) {
    sb.classList.remove("searching");
    const hit = state.topic ? topicBySlug(state.topic) : null;
    const activeMod = hit ? hit.mod.num : null;
    secs.forEach(sec => {
      sec.hidden = false;
      const num = parseInt(sec.dataset.modSec, 10);
      sideSectionOpen(sec, sideOpen.has(num) || num === activeMod, false);
      sec.querySelectorAll(".side-topic[data-topic]").forEach(b => { b.hidden = false; });
    });
    if (empty) empty.hidden = true;
    return;
  }

  sb.classList.add("searching");
  let visible = 0;
  secs.forEach(sec => {
    let any = false;
    sec.querySelectorAll(".side-topic[data-topic]").forEach(b => {
      const hit = topicBySlug(b.dataset.topic);
      if (!hit) return;
      const hay = (hit.topic.title + " " + (hit.topic.blocks || []).map(x =>
        x.text || x.html || "").join(" ")).toLowerCase();
      const on = hay.includes(q);
      b.hidden = !on;
      if (on) { any = true; visible++; }
    });
    sec.hidden = !any;
    if (any) sideSectionOpen(sec, true, false);
  });
  if (empty) {
    empty.hidden = visible > 0;
    const p = empty.querySelector("p");
    if (p && visible === 0) p.textContent = 'No topics match "' + ($("#search").value.trim() || q) + '".';
  }
}
$("#search").addEventListener("input", ev => {
  state.q = ev.target.value.trim().toLowerCase();
  if (window.matchMedia("(max-width: 800px)").matches) openNav();
  if (state.view !== "notes") {
    state.view = "notes";
    navigate("#notes" + (state.topic ? "/" + state.topic : ""));
    return;
  }
  applySearchFilter();
});

window.addEventListener("popstate", () => { applyHash(); render(); });

window.addEventListener("hashchange", () => { applyHash(); render(); });

applyHash();
if (!state.topic && MODS.length) state.topic = MODS[0].topics[0].slug;
render();
})();
