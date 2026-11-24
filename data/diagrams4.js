// Module 4 hand-drawn diagrams (added by the module content pass)
window.ML_DIAGRAMS = window.ML_DIAGRAMS || {};

window.ML_DIAGRAMS["markov-states"] = {
  cap: "A two-state Markov process: each arrow carries a transition probability and each row of the matrix sums to 1.",
  svg: `<svg viewBox="0 0 640 250" width="640" height="250" role="img" aria-label="Two-state Markov chain with transition probabilities">
  <defs><marker id="ar-m4-mk" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0b6e63"/></marker></defs>
  <circle cx="170" cy="118" r="56" fill="#eef6f4" stroke="#0b6e63" stroke-width="1.5"/>
  <text x="170" y="114" text-anchor="middle" font-size="13" font-weight="700" fill="#1c2321">Sunny</text>
  <text x="170" y="134" text-anchor="middle" font-size="10.5" fill="#5b616a">state 1</text>
  <circle cx="470" cy="118" r="56" fill="#eef6f4" stroke="#0b6e63" stroke-width="1.5"/>
  <text x="470" y="114" text-anchor="middle" font-size="13" font-weight="700" fill="#1c2321">Rainy</text>
  <text x="470" y="134" text-anchor="middle" font-size="10.5" fill="#5b616a">state 2</text>
  <path d="M132 70 C 142 18, 198 18, 208 70" fill="none" stroke="#0b6e63" stroke-width="1.6" marker-end="url(#ar-m4-mk)"/>
  <text x="170" y="30" text-anchor="middle" font-size="12" font-weight="700" fill="#0a5c53">0.8</text>
  <path d="M432 70 C 442 18, 498 18, 508 70" fill="none" stroke="#0b6e63" stroke-width="1.6" marker-end="url(#ar-m4-mk)"/>
  <text x="470" y="30" text-anchor="middle" font-size="12" font-weight="700" fill="#0a5c53">0.7</text>
  <path d="M226 102 Q 320 42 414 102" fill="none" stroke="#0b6e63" stroke-width="1.6" marker-end="url(#ar-m4-mk)"/>
  <text x="320" y="62" text-anchor="middle" font-size="12" font-weight="700" fill="#0a5c53">0.2</text>
  <path d="M414 134 Q 320 194 226 134" fill="none" stroke="#0b6e63" stroke-width="1.6" marker-end="url(#ar-m4-mk)"/>
  <text x="320" y="184" text-anchor="middle" font-size="12" font-weight="700" fill="#0a5c53">0.3</text>
  <text x="320" y="232" text-anchor="middle" font-size="11" fill="#8a8578">P(next state | current state) only. Tomorrow ignores last week.</text>
  </svg>`
};

window.ML_DIAGRAMS["hmm-states"] = {
  cap: "The HMM picture: hidden states (circles) form a Markov chain, while each state emits visible symbols (squares).",
  svg: `<svg viewBox="0 0 640 330" width="640" height="330" role="img" aria-label="Hidden Markov model with hidden states, transitions and observed symbols">
  <defs><marker id="ar-m4-hm" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0b6e63"/></marker></defs>
  <text x="320" y="16" text-anchor="middle" font-size="10.5" fill="#8a8578">hidden layer</text>
  <circle cx="190" cy="90" r="46" fill="#eef6f4" stroke="#0b6e63" stroke-width="1.5"/>
  <text x="190" y="88" text-anchor="middle" font-size="12.5" font-weight="700" fill="#1c2321">Sunny</text>
  <text x="190" y="106" text-anchor="middle" font-size="10" fill="#5b616a">hidden</text>
  <circle cx="450" cy="90" r="46" fill="#eef6f4" stroke="#0b6e63" stroke-width="1.5"/>
  <text x="450" y="88" text-anchor="middle" font-size="12.5" font-weight="700" fill="#1c2321">Rainy</text>
  <text x="450" y="106" text-anchor="middle" font-size="10" fill="#5b616a">hidden</text>
  <path d="M158 51 C 168 8, 212 8, 222 51" fill="none" stroke="#0b6e63" stroke-width="1.6" marker-end="url(#ar-m4-hm)"/>
  <text x="190" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#0a5c53">0.7</text>
  <path d="M418 51 C 428 8, 472 8, 482 51" fill="none" stroke="#0b6e63" stroke-width="1.6" marker-end="url(#ar-m4-hm)"/>
  <text x="450" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#0a5c53">0.6</text>
  <line x1="238" y1="78" x2="400" y2="78" stroke="#0b6e63" stroke-width="1.6" marker-end="url(#ar-m4-hm)"/>
  <text x="320" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="#0a5c53">0.3</text>
  <line x1="402" y1="102" x2="240" y2="102" stroke="#0b6e63" stroke-width="1.6" marker-end="url(#ar-m4-hm)"/>
  <text x="320" y="120" text-anchor="middle" font-size="11" font-weight="700" fill="#0a5c53">0.4</text>
  <rect x="135" y="250" width="110" height="46" rx="4" fill="#fdf6e3" stroke="#b98a00" stroke-width="1.4"/>
  <text x="190" y="270" text-anchor="middle" font-size="12" font-weight="700" fill="#1c2321">Walk</text>
  <text x="190" y="287" text-anchor="middle" font-size="10" fill="#5b616a">observed</text>
  <rect x="395" y="250" width="110" height="46" rx="4" fill="#fdf6e3" stroke="#b98a00" stroke-width="1.4"/>
  <text x="450" y="270" text-anchor="middle" font-size="12" font-weight="700" fill="#1c2321">Clean</text>
  <text x="450" y="287" text-anchor="middle" font-size="10" fill="#5b616a">observed</text>
  <line x1="170" y1="134" x2="186" y2="248" stroke="#8a8578" stroke-width="1.3" stroke-dasharray="4 3" marker-end="url(#ar-m4-hm)"/>
  <text x="142" y="196" text-anchor="middle" font-size="11" font-weight="700" fill="#0a5c53">0.7</text>
  <line x1="224" y1="130" x2="406" y2="248" stroke="#8a8578" stroke-width="1.3" stroke-dasharray="4 3" marker-end="url(#ar-m4-hm)"/>
  <text x="312" y="174" text-anchor="middle" font-size="11" font-weight="700" fill="#0a5c53">0.3</text>
  <line x1="416" y1="130" x2="244" y2="248" stroke="#8a8578" stroke-width="1.3" stroke-dasharray="4 3" marker-end="url(#ar-m4-hm)"/>
  <text x="342" y="204" text-anchor="middle" font-size="11" font-weight="700" fill="#0a5c53">0.2</text>
  <line x1="470" y1="134" x2="454" y2="248" stroke="#8a8578" stroke-width="1.3" stroke-dasharray="4 3" marker-end="url(#ar-m4-hm)"/>
  <text x="500" y="196" text-anchor="middle" font-size="11" font-weight="700" fill="#0a5c53">0.8</text>
  <text x="320" y="322" text-anchor="middle" font-size="11" fill="#8a8578">Observed symbol depends only on the state emitting it. Emission rows also sum to 1.</text>
  </svg>`
};
