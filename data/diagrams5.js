// Module 5 hand-drawn diagrams (added by the module content pass)
window.ML_DIAGRAMS = window.ML_DIAGRAMS || {};

/* ---------- 1. K-means, first iteration on the Nov 2025 six points ---------- */
window.ML_DIAGRAMS["kmeans-iter"] = {
  cap: "K-means after one pass: the six points take the colour of the nearer centroid, then each centroid moves to the mean of its members.",
  svg: `<svg viewBox="0 0 700 380" width="700" height="380" role="img" aria-label="Six points coloured by their nearest centroid, with arrows from the two starting centroids to the updated means.">
  <defs><marker id="ar-m5-km" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#8a8578"/></marker></defs>

  <line x1="62" y1="320" x2="590" y2="320" stroke="#c9c3b4" stroke-width="1.2"/>
  <line x1="62" y1="320" x2="62" y2="58" stroke="#c9c3b4" stroke-width="1.2"/>
  <text x="596" y="324" font-size="11" fill="#5b616a">x</text>
  <text x="52" y="50" font-size="11" fill="#5b616a">y</text>

  <text x="118" y="336" text-anchor="middle" font-size="10" fill="#8a8578">1</text>
  <text x="174" y="336" text-anchor="middle" font-size="10" fill="#8a8578">2</text>
  <text x="230" y="336" text-anchor="middle" font-size="10" fill="#8a8578">3</text>
  <text x="286" y="336" text-anchor="middle" font-size="10" fill="#8a8578">4</text>
  <text x="342" y="336" text-anchor="middle" font-size="10" fill="#8a8578">5</text>
  <text x="398" y="336" text-anchor="middle" font-size="10" fill="#8a8578">6</text>
  <text x="454" y="336" text-anchor="middle" font-size="10" fill="#8a8578">7</text>
  <text x="510" y="336" text-anchor="middle" font-size="10" fill="#8a8578">8</text>

  <text x="54" y="292" text-anchor="end" font-size="10" fill="#8a8578">2</text>
  <text x="54" y="260" text-anchor="end" font-size="10" fill="#8a8578">3</text>
  <text x="54" y="228" text-anchor="end" font-size="10" fill="#8a8578">4</text>
  <text x="54" y="196" text-anchor="end" font-size="10" fill="#8a8578">5</text>
  <text x="54" y="164" text-anchor="end" font-size="10" fill="#8a8578">6</text>
  <text x="54" y="132" text-anchor="end" font-size="10" fill="#8a8578">7</text>
  <text x="54" y="100" text-anchor="end" font-size="10" fill="#8a8578">8</text>

  <circle cx="174" cy="160" r="9.5" fill="none" stroke="#0b6e63" stroke-width="1" opacity="0.45"/>
  <circle cx="174" cy="160" r="6" fill="#0b6e63" stroke="#ffffff" stroke-width="1.4"/>
  <text x="188" y="152" font-size="10.5" fill="#0a5c53">D1</text>

  <circle cx="230" cy="96" r="9.5" fill="none" stroke="#0b6e63" stroke-width="1" opacity="0.45"/>
  <circle cx="230" cy="96" r="6" fill="#0b6e63" stroke="#ffffff" stroke-width="1.4"/>
  <text x="241" y="90" font-size="10.5" fill="#0a5c53">D2</text>

  <circle cx="118" cy="256" r="9.5" fill="none" stroke="#0b6e63" stroke-width="1" opacity="0.45"/>
  <circle cx="118" cy="256" r="6" fill="#0b6e63" stroke="#ffffff" stroke-width="1.4"/>
  <text x="92" y="262" font-size="10.5" fill="#0a5c53">D3</text>

  <circle cx="342" cy="224" r="9.5" fill="none" stroke="#b98a00" stroke-width="1" opacity="0.45"/>
  <circle cx="342" cy="224" r="6" fill="#b98a00" stroke="#ffffff" stroke-width="1.4"/>
  <text x="353" y="218" font-size="10.5" fill="#8a6500">D4</text>

  <circle cx="454" cy="288" r="9.5" fill="none" stroke="#b98a00" stroke-width="1" opacity="0.45"/>
  <circle cx="454" cy="288" r="6" fill="#b98a00" stroke="#ffffff" stroke-width="1.4"/>
  <text x="465" y="284" font-size="10.5" fill="#8a6500">D5</text>

  <circle cx="510" cy="224" r="9.5" fill="none" stroke="#b98a00" stroke-width="1" opacity="0.45"/>
  <circle cx="510" cy="224" r="6" fill="#b98a00" stroke="#ffffff" stroke-width="1.4"/>
  <text x="521" y="218" font-size="10.5" fill="#8a6500">D6</text>

  <line x1="109" y1="160" x2="127" y2="160" stroke="#1c2321" stroke-width="2.2"/>
  <line x1="118" y1="151" x2="118" y2="169" stroke="#1c2321" stroke-width="2.2"/>
  <text x="106" y="178" text-anchor="end" font-size="10.5" font-weight="700" fill="#1c2321">C1</text>

  <line x1="389" y1="288" x2="407" y2="288" stroke="#1c2321" stroke-width="2.2"/>
  <line x1="398" y1="279" x2="398" y2="297" stroke="#1c2321" stroke-width="2.2"/>
  <text x="398" y="270" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1c2321">C2</text>

  <line x1="127" y1="163" x2="163" y2="169" stroke="#8a8578" stroke-width="1.4" stroke-dasharray="4 3" marker-end="url(#ar-m5-km)"/>
  <rect x="168.5" y="165.5" width="11" height="11" fill="#ffffff" stroke="#0b6e63" stroke-width="2"/>
  <line x1="180" y1="176" x2="200" y2="196" stroke="#0b6e63" stroke-width="1"/>
  <text x="205" y="200" font-size="9.5" fill="#0a5c53">C1 = (2, 5.67)</text>

  <line x1="405" y1="284" x2="426" y2="253" stroke="#8a8578" stroke-width="1.4" stroke-dasharray="4 3" marker-end="url(#ar-m5-km)"/>
  <rect x="429.5" y="239.5" width="11" height="11" fill="#ffffff" stroke="#b98a00" stroke-width="2"/>
  <line x1="440" y1="250" x2="457" y2="264" stroke="#b98a00" stroke-width="1"/>
  <text x="462" y="268" font-size="9.5" fill="#8a6500">C2 = (6.67, 3.33)</text>

  <g>
    <circle cx="582" cy="96" r="6" fill="#0b6e63"/>
    <text x="594" y="100" font-size="10" fill="#5b616a">cluster 1</text>
    <circle cx="582" cy="118" r="6" fill="#b98a00"/>
    <text x="594" y="122" font-size="10" fill="#5b616a">cluster 2</text>
    <line x1="576" y1="140" x2="588" y2="140" stroke="#1c2321" stroke-width="2"/>
    <line x1="582" y1="134" x2="582" y2="146" stroke="#1c2321" stroke-width="2"/>
    <text x="594" y="144" font-size="10" fill="#5b616a">start centroid</text>
    <rect x="577.5" y="156.5" width="9" height="9" fill="none" stroke="#8a8578" stroke-width="1.6"/>
    <text x="594" y="165" font-size="10" fill="#5b616a">updated mean</text>
    <line x1="576" y1="184" x2="588" y2="184" stroke="#8a8578" stroke-width="1.4" stroke-dasharray="3 2" marker-end="url(#ar-m5-km)"/>
    <text x="594" y="188" font-size="10" fill="#5b616a">centroid shift</text>
  </g>

  <text x="62" y="366" font-size="10.5" fill="#8a8578">Each point joins the nearer centroid, so the split is {D1, D2, D3} against {D4, D5, D6}.</text>
  </svg>`
};

/* ---------- 2. Single-linkage dendrogram for the Dec 2023 matrix ---------- */
window.ML_DIAGRAMS["dendrogram"] = {
  cap: "Single-linkage dendrogram for the six-object matrix: each join sits at the distance that caused it, from D+F at 0.50 up to the root at 2.50.",
  svg: `<svg viewBox="0 0 660 370" width="660" height="370" role="img" aria-label="Dendrogram with leaves A B C D F E and merge heights 0.50, 0.71, 1.00, 1.411 and 2.50.">
  <line x1="70" y1="320" x2="70" y2="52" stroke="#c9c3b4" stroke-width="1.2"/>
  <line x1="70" y1="320" x2="560" y2="320" stroke="#c9c3b4" stroke-width="1.2"/>

  <text x="62" y="324" text-anchor="end" font-size="10" fill="#8a8578">0</text>
  <text x="62" y="274" text-anchor="end" font-size="10" fill="#8a8578">0.5</text>
  <text x="62" y="224" text-anchor="end" font-size="10" fill="#8a8578">1.0</text>
  <text x="62" y="174" text-anchor="end" font-size="10" fill="#8a8578">1.5</text>
  <text x="62" y="124" text-anchor="end" font-size="10" fill="#8a8578">2.0</text>
  <text x="62" y="74" text-anchor="end" font-size="10" fill="#8a8578">2.5</text>

  <line x1="66" y1="270" x2="70" y2="270" stroke="#8a8578" stroke-width="1"/>
  <line x1="66" y1="220" x2="70" y2="220" stroke="#8a8578" stroke-width="1"/>
  <line x1="66" y1="170" x2="70" y2="170" stroke="#8a8578" stroke-width="1"/>
  <line x1="66" y1="120" x2="70" y2="120" stroke="#8a8578" stroke-width="1"/>
  <line x1="66" y1="70" x2="70" y2="70" stroke="#8a8578" stroke-width="1"/>

  <text x="34" y="200" transform="rotate(-90 34 200)" text-anchor="middle" font-size="10.5" fill="#5b616a">merge distance</text>

  <line x1="370" y1="320" x2="370" y2="270" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="440" y1="320" x2="440" y2="270" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="370" y1="270" x2="440" y2="270" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="405" y1="270" x2="405" y2="220" stroke="#0b6e63" stroke-width="1.8"/>

  <line x1="520" y1="320" x2="520" y2="220" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="405" y1="220" x2="520" y2="220" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="462.5" y1="220" x2="462.5" y2="179" stroke="#0b6e63" stroke-width="1.8"/>

  <line x1="280" y1="320" x2="280" y2="179" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="280" y1="179" x2="462.5" y2="179" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="371.25" y1="179" x2="371.25" y2="70" stroke="#0b6e63" stroke-width="1.8"/>

  <line x1="110" y1="320" x2="110" y2="249" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="180" y1="320" x2="180" y2="249" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="110" y1="249" x2="180" y2="249" stroke="#0b6e63" stroke-width="1.8"/>
  <line x1="145" y1="249" x2="145" y2="70" stroke="#0b6e63" stroke-width="1.8"/>

  <line x1="145" y1="70" x2="371.25" y2="70" stroke="#0b6e63" stroke-width="2.2"/>

  <text x="447" y="266" font-size="10" fill="#0a5c53">0.50</text>
  <text x="188" y="245" font-size="10" fill="#0a5c53">0.71</text>
  <text x="527" y="216" font-size="10" fill="#0a5c53">1.00</text>
  <text x="470" y="175" font-size="10" fill="#0a5c53">1.411</text>
  <text x="380" y="64" font-size="10" fill="#0a5c53">2.50</text>

  <line x1="70" y1="200" x2="600" y2="200" stroke="#b98a00" stroke-width="1.2" stroke-dasharray="5 4"/>
  <text x="650" y="196" text-anchor="end" font-size="9.5" fill="#8a6500">cut at 1.2</text>
  <text x="650" y="209" text-anchor="end" font-size="9.5" fill="#8a6500">gives 3 groups</text>

  <text x="110" y="338" text-anchor="middle" font-size="11.5" font-weight="700" fill="#24292f">A</text>
  <text x="180" y="338" text-anchor="middle" font-size="11.5" font-weight="700" fill="#24292f">B</text>
  <text x="280" y="338" text-anchor="middle" font-size="11.5" font-weight="700" fill="#24292f">C</text>
  <text x="370" y="338" text-anchor="middle" font-size="11.5" font-weight="700" fill="#24292f">D</text>
  <text x="440" y="338" text-anchor="middle" font-size="11.5" font-weight="700" fill="#24292f">F</text>
  <text x="520" y="338" text-anchor="middle" font-size="11.5" font-weight="700" fill="#24292f">E</text>

  <text x="180" y="360" font-size="10.5" fill="#8a8578">Read the joins from the bottom up: D+F, then E, then C, and A+B joins the group last.</text>
  </svg>`
};

/* ---------- 3. DBSCAN point types ---------- */
window.ML_DIAGRAMS["dbscan-points"] = {
  cap: "DBSCAN with eps drawn around one core point: dense points are core, the fringe point is border, and the lonely point is noise.",
  svg: `<svg viewBox="0 0 660 360" width="660" height="360" role="img" aria-label="A dense cluster of core points with an eps circle, one border point at the edge, and one noise point far away.">
  <defs><marker id="ar-m5-db" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0b6e63"/></marker></defs>

  <circle cx="240" cy="195" r="40" fill="#eef6f4" stroke="#0b6e63" stroke-width="1.3" stroke-dasharray="5 4"/>
  <text x="240" y="144" text-anchor="middle" font-size="10.5" fill="#0a5c53">eps radius</text>

  <circle cx="190" cy="190" r="9.5" fill="none" stroke="#0b6e63" stroke-width="1" opacity="0.45"/>
  <circle cx="190" cy="190" r="6" fill="#0b6e63" stroke="#ffffff" stroke-width="1.4"/>
  <text x="174" y="182" text-anchor="end" font-size="10" fill="#0a5c53">P1</text>

  <circle cx="215" cy="170" r="9.5" fill="none" stroke="#0b6e63" stroke-width="1" opacity="0.45"/>
  <circle cx="215" cy="170" r="6" fill="#0b6e63" stroke="#ffffff" stroke-width="1.4"/>
  <text x="201" y="166" text-anchor="end" font-size="10" fill="#0a5c53">P2</text>

  <circle cx="240" cy="195" r="9.5" fill="none" stroke="#0b6e63" stroke-width="1" opacity="0.45"/>
  <circle cx="240" cy="195" r="6" fill="#0b6e63" stroke="#ffffff" stroke-width="1.4"/>
  <text x="247" y="189" font-size="10" fill="#0a5c53">P3</text>

  <circle cx="215" cy="215" r="9.5" fill="none" stroke="#0b6e63" stroke-width="1" opacity="0.45"/>
  <circle cx="215" cy="215" r="6" fill="#0b6e63" stroke="#ffffff" stroke-width="1.4"/>
  <text x="204" y="236" text-anchor="middle" font-size="10" fill="#0a5c53">P4</text>

  <line x1="247" y1="199" x2="263" y2="204" stroke="#0b6e63" stroke-width="1.5" marker-end="url(#ar-m5-db)"/>

  <circle cx="272" cy="206" r="9.5" fill="none" stroke="#b98a00" stroke-width="1" opacity="0.5"/>
  <circle cx="272" cy="206" r="6" fill="#b98a00" stroke="#ffffff" stroke-width="1.4"/>
  <text x="284" y="210" font-size="10" fill="#8a6500">B (border)</text>

  <circle cx="520" cy="92" r="9" fill="none" stroke="#8a8578" stroke-width="1" stroke-dasharray="3 3"/>
  <circle cx="520" cy="92" r="5" fill="#8a8578" stroke="#ffffff" stroke-width="1.2"/>
  <text x="534" y="96" font-size="10" fill="#5b616a">N (noise)</text>

  <text x="200" y="286" text-anchor="middle" font-size="11" font-weight="700" fill="#24292f">one dense cluster</text>
  <text x="200" y="303" text-anchor="middle" font-size="10.5" fill="#5b616a">MinPts = 3, so P1 to P4 are core points</text>

  <g>
    <circle cx="402" cy="160" r="6" fill="#0b6e63"/>
    <text x="416" y="164" font-size="10.5" fill="#5b616a">core: at least MinPts points inside eps</text>
    <circle cx="402" cy="192" r="6" fill="#b98a00"/>
    <text x="416" y="196" font-size="10.5" fill="#5b616a">border: inside a core eps, not dense itself</text>
    <circle cx="402" cy="224" r="5" fill="#8a8578"/>
    <text x="416" y="228" font-size="10.5" fill="#5b616a">noise: outside every core eps</text>
  </g>

  <text x="36" y="340" font-size="10.5" fill="#8a8578">The circle is only one neighbourhood. B joins the cluster because a core point can reach it.</text>
  </svg>`
};
