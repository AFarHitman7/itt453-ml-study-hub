// Optional development check: node tests/verify-data.cjs. No site dependencies.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');
const context = vm.createContext({window: {}});
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const match of html.matchAll(/<script src="(data\/[^"]+)"/g)) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, match[1]), 'utf8'), context, {filename:match[1]});
}
const {ML_PYQ:q, ML_MODULES:modules, ML_REPEATS:themes,
  ML_DIAGRAMS:diagrams, ML_PYQ_ASSETS:assets, ML_PYQ_ANSWERS:answers} = context.window;
assert.equal(q.length, 177);
assert.equal(crypto.createHash('sha256').update(q.map(e=>e.q).join('')).digest('hex'),
  'c2fcd5e440ac743aab6f66f1a3866cb80c5e653ea3e1ba02cd89d379d2990788', 'Past-paper text changed');
const topics = Object.values(modules).flatMap(m=>m.topics);
assert.equal(topics.length, 30);
assert.equal(Object.keys(themes).length, 88);
assert.deepEqual(Object.values(modules).map(m=>m.topics.reduce((n,t)=>n+t.practice.length,0)), [13,14,13,14,12]);
const topicsBySlug = new Map(topics.map(t=>[t.slug,t]));
for (const t of topics) {
  assert.equal(t.blocks[0].type, 'definition', t.slug);
  assert.equal(t.blocks.filter(b=>b.type==='definition').length, 1, t.slug);
  assert(t.blocks[0].text.trim().split(/\s+/).length <= 25, `Long definition: ${t.slug}`);
  assert(t.sources.length > 0, `No sources: ${t.slug}`);
  for (const b of t.blocks) if (b.type==='diagram') assert(diagrams[b.id], `Missing ${b.id}`);
}
assert(assets, 'Missing PYQ asset manifest/script');
assert(answers, 'Missing PYQ answer scripts');
const requiredAssets = ['m23:13a','m23:15a','m23:20a','d23:15a','d23:19a',
  'm24:13a','m24:15a','m24:20','n24:4','n24:13a','n24:15a','n24:16b','n24:20',
  'n25:13a','n25:15a','n25:20a','m26:13a','m26:15a','m26:20'];
const keys = new Set(q.map(e=>`${e.p}:${e.no}`));
for (const id of requiredAssets) assert(assets[id]?.length, `Missing original table: ${id}`);
for (const [id, list] of Object.entries(assets)) {
  assert(keys.has(id), `Unknown asset key: ${id}`);
  const paperIds = new Set(q.map(e=>e.p));
  for (const item of list) {
    assert(item.alt?.length > 12, `Asset needs descriptive alt: ${id}`);
    assert(item.page >= 1, `Asset needs source page: ${id}`);
    assert(paperIds.has(item.paper), `Asset provenance not a public paper: ${id}`);
    assert(item.src.startsWith('assets/pyq/') && !item.src.includes('..'), id);
    assert(fs.existsSync(path.join(ROOT,item.src)), `Missing image: ${item.src}`);
  }
}
/* Prose dashes stay out of rewritten notes and tactics too. */
for (const m of Object.values(modules)) for (const t of m.topics) for (const b of t.blocks)
  assert(!/[\u2013\u2014]/.test(b.html || b.text || ''), `Prose dash in ${t.slug}`);
for (const t of Object.values(modules).flatMap(m=>m.topics)) for (const p of t.practice)
  assert(!/[\u2013\u2014]/.test(p.q + p.a), `Prose dash in practice ${t.slug}`);
for (const art of context.window.ML_TACTICS)
  assert(!/[\u2013\u2014]/.test(art.html), `Prose dash in tactics ${art.id}`);
for (const entry of q) {
  const id = `${entry.p}:${entry.no}`;
  assert(topicsBySlug.has(entry.t), `Bad topic: ${id}`);
  assert(themes[entry.rk], `Bad theme: ${id}`);
  const a = answers[id];
  assert(a?.html?.length > 80, `Missing or skeletal answer: ${id}`);
  assert(['theory','worked'].includes(a.kind), `Answer needs kind: ${id}`);
  assert(a.sources?.length > 0, `Answer needs sources: ${id}`);
  assert(!/<(?:script|iframe|object)\b|\bon\w+\s*=/i.test(a.html), `Unsafe answer HTML: ${id}`);
  assert(!/—|–/.test(a.html), `Unexpected prose dash: ${id}`);
  for (const d of a.diagrams || []) assert(diagrams[d], `Missing answer diagram: ${id}/${d}`);
  if (a.kind==='worked') assert(/<ol\b|<table\b/.test(a.html), `Worked answer needs steps: ${id}`);
}
assert.equal(Object.keys(answers).length,q.length,'Extraneous or missing answer keys');
console.log(`PASS: ${topics.length} topics, 66 practice questions, ${q.length} PYQs and answers; ${Object.keys(assets).length} source visuals; checksum unchanged.`);
