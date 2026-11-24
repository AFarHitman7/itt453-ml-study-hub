// Module 1 hand-drawn diagrams (added by the module content pass)
window.ML_DIAGRAMS = window.ML_DIAGRAMS || {};

window.ML_DIAGRAMS["pca-axes"] = {
  cap: "PCA turns the axes: PC1 follows the widest spread of the cloud, and PC2 takes what is left at a right angle. The dashed drops show how far points move when only PC1 is kept, so short lines mean little information is lost.",
  svg: `<svg viewBox="0 0 640 300" width="640" height="300" role="img" aria-label="Scatter plot with PC1 along the widest spread and PC2 at a right angle">
  <defs><marker id="ar-m1-pca" markerWidth="9" markerHeight="9" refX="7.5" refY="3" orient="auto"><path d="M0,0 L7.5,3 L0,6 z" fill="#0b6e63"/></marker></defs>
  <g stroke="#e6e2d6" stroke-width="1" stroke-dasharray="3 5">
    <line x1="160" y1="45" x2="160" y2="250"/>
    <line x1="240" y1="45" x2="240" y2="250"/>
    <line x1="320" y1="45" x2="320" y2="250"/>
    <line x1="400" y1="45" x2="400" y2="250"/>
    <line x1="480" y1="45" x2="480" y2="250"/>
    <line x1="80" y1="200" x2="560" y2="200"/>
    <line x1="80" y1="150" x2="560" y2="150"/>
    <line x1="80" y1="100" x2="560" y2="100"/>
    <line x1="80" y1="50" x2="560" y2="50"/>
  </g>
  <g stroke="#1c2321" stroke-width="1.3" stroke-linecap="round">
    <line x1="80" y1="250" x2="558" y2="250"/>
    <line x1="80" y1="250" x2="80" y2="47"/>
    <path d="M558 250 l-7 -3.5 M558 250 l-7 3.5" fill="none"/>
    <path d="M80 47 l-3.5 7 M80 47 l3.5 7" fill="none"/>
  </g>
  <text x="552" y="268" text-anchor="end" font-size="11" fill="#5b616a">feature 1</text>
  <text x="66" y="52" text-anchor="end" font-size="11" fill="#5b616a">feature 2</text>

  <g fill="#0b6e63" fill-opacity="0.72" stroke="#0a5c53" stroke-width="0.7">
    <circle cx="169.0" cy="229.2" r="3.0"/>
    <circle cx="176.3" cy="200.1" r="3.4"/>
    <circle cx="200.6" cy="211.6" r="2.9"/>
    <circle cx="207.7" cy="192.4" r="3.2"/>
    <circle cx="237.7" cy="206.9" r="2.8"/>
    <circle cx="243.9" cy="180.4" r="3.3"/>
    <circle cx="267.1" cy="189.1" r="3.0"/>
    <circle cx="272.9" cy="156.4" r="2.9"/>
    <circle cx="293.9" cy="170.3" r="3.2"/>
    <circle cx="304.7" cy="149.5" r="3.1"/>
    <circle cx="330.9" cy="165.6" r="3.3"/>
    <circle cx="338.7" cy="142.8" r="2.8"/>
    <circle cx="360.0" cy="146.9" r="3.0"/>
    <circle cx="367.7" cy="118.7" r="3.2"/>
    <circle cx="389.4" cy="129.1" r="2.9"/>
    <circle cx="401.7" cy="112.0" r="3.3"/>
    <circle cx="428.0" cy="128.1" r="3.1"/>
    <circle cx="436.1" cy="100.9" r="2.9"/>
    <circle cx="458.1" cy="106.8" r="3.2"/>
    <circle cx="466.6" cy="80.5" r="3.0"/>
  </g>

  <line x1="237.7" y1="206.9" x2="231.5" y2="192.2" stroke="#6b6b63" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="304.7" y1="149.5" x2="308.9" y2="159.6" stroke="#6b6b63" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="428.0" y1="128.1" x2="421.4" y2="112.4" stroke="#6b6b63" stroke-width="1.2" stroke-dasharray="3 3"/>

  <line x1="144.8" y1="228.5" x2="495.2" y2="81.5" stroke="#0b6e63" stroke-width="2.4" stroke-linecap="round" marker-end="url(#ar-m1-pca)"/>
  <line x1="289.8" y1="83.1" x2="350.2" y2="226.9" stroke="#0b6e63" stroke-width="1.7" stroke-linecap="round" marker-end="url(#ar-m1-pca)"/>
  <path d="M331.1 150.4 L335.6 161.5 L324.6 166.1" fill="none" stroke="#0b6e63" stroke-width="1.2"/>
  <circle cx="320" cy="155" r="2.2" fill="#1c2321"/>

  <text x="502" y="80" font-size="13" font-weight="700" fill="#0a5c53">PC1</text>
  <text x="502" y="96" font-size="11" fill="#5b616a">widest spread</text>
  <text x="276" y="58" text-anchor="end" font-size="13" font-weight="700" fill="#0a5c53">PC2</text>
  <text x="276" y="74" text-anchor="end" font-size="11" fill="#5b616a">leftover spread</text>
  </svg>`
};
