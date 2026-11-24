// Module 3 hand-drawn diagrams (added by the module content pass)
window.ML_DIAGRAMS = window.ML_DIAGRAMS || {};

window.ML_DIAGRAMS["dtree-example"] = {
  cap: "The first ID3 split on the loan table: Education Level sends two branches straight to a leaf, while the Graduate branch still holds 3 Yes and 1 No.",
  svg: `<svg viewBox="0 0 660 250" width="660" height="250" role="img" aria-label="Decision tree with Education Level at the root and three branches: High School gives No, Graduate is still mixed, Postgraduate gives Yes.">
  <defs><marker id="ar-m3-dt" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0b6e63"/></marker></defs>
  <rect x="250" y="14" width="160" height="52" rx="9" fill="#fdf6e3" stroke="#b98a00" stroke-width="1.5"/>
  <text x="330" y="35" text-anchor="middle" font-size="13" font-weight="700" fill="#1c2321">Education Level</text>
  <text x="330" y="52" text-anchor="middle" font-size="10.5" fill="#5b616a">10 rows: 6 Yes, 4 No</text>
  <line x1="330" y1="66" x2="330" y2="84" stroke="#0b6e63" stroke-width="1.5"/>
  <line x1="120" y1="84" x2="540" y2="84" stroke="#0b6e63" stroke-width="1.5"/>
  <line x1="120" y1="84" x2="120" y2="132" stroke="#0b6e63" stroke-width="1.5" marker-end="url(#ar-m3-dt)"/>
  <line x1="330" y1="84" x2="330" y2="132" stroke="#0b6e63" stroke-width="1.5" marker-end="url(#ar-m3-dt)"/>
  <line x1="540" y1="84" x2="540" y2="132" stroke="#0b6e63" stroke-width="1.5" marker-end="url(#ar-m3-dt)"/>
  <text x="127" y="102" font-size="10.5" fill="#5b616a">High School</text>
  <text x="337" y="102" font-size="10.5" fill="#5b616a">Graduate</text>
  <text x="547" y="102" font-size="10.5" fill="#5b616a">Postgraduate</text>
  <rect x="40" y="132" width="160" height="58" rx="9" fill="#eef6f4" stroke="#0b6e63" stroke-width="1.4"/>
  <text x="120" y="156" text-anchor="middle" font-size="15" font-weight="700" fill="#1c2321">No</text>
  <text x="120" y="174" text-anchor="middle" font-size="10.5" fill="#5b616a">3 rows, all No</text>
  <rect x="250" y="132" width="160" height="58" rx="9" fill="#ffffff" stroke="#8a8578" stroke-width="1.3" stroke-dasharray="5 4"/>
  <text x="330" y="155" text-anchor="middle" font-size="13" font-weight="700" fill="#1c2321">3 Yes, 1 No</text>
  <text x="330" y="173" text-anchor="middle" font-size="10" fill="#5b616a">test Employment Type next</text>
  <rect x="460" y="132" width="160" height="58" rx="9" fill="#eef6f4" stroke="#0b6e63" stroke-width="1.4"/>
  <text x="540" y="156" text-anchor="middle" font-size="15" font-weight="700" fill="#1c2321">Yes</text>
  <text x="540" y="174" text-anchor="middle" font-size="10.5" fill="#5b616a">3 rows, all Yes</text>
  <text x="330" y="219" text-anchor="middle" font-size="11" fill="#8a8578">The first test already settles two branches.</text>
  <text x="330" y="237" text-anchor="middle" font-size="11" fill="#8a8578">The middle branch is mixed, so the tree is not finished yet.</text>
  </svg>`
};
