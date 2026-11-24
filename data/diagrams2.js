// Module 2 hand-drawn diagrams (added by the module content pass)
window.ML_DIAGRAMS = window.ML_DIAGRAMS || {};

window.ML_DIAGRAMS["confusion-matrix"] = {
  cap: "A 2 by 2 confusion matrix. Rows hold the actual class, columns hold the predicted class, and the diagonal counts the correct calls.",
  svg: `<svg viewBox="0 0 660 340" width="660" height="340" role="img" aria-label="Confusion matrix with actual class as rows and predicted class as columns">
  <text x="420" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#0b6e63">Predicted class</text>
  <text x="335" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#1c2321">Predicted positive</text>
  <text x="505" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#1c2321">Predicted negative</text>
  <text x="28" y="190" text-anchor="middle" font-size="12" font-weight="700" fill="#0b6e63" transform="rotate(-90 28 190)">Actual class</text>
  <text x="238" y="117" text-anchor="end" font-size="12" font-weight="700" fill="#1c2321">Actual positive</text>
  <text x="238" y="217" text-anchor="end" font-size="12" font-weight="700" fill="#1c2321">Actual negative</text>

  <rect x="250" y="65" width="170" height="95" rx="6" fill="#eef6f4" stroke="#0b6e63" stroke-width="1.6"/>
  <text x="335" y="97" text-anchor="middle" font-size="19" font-weight="700" fill="#0b6e63">TP</text>
  <text x="335" y="120" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1c2321">true positive</text>
  <text x="335" y="139" text-anchor="middle" font-size="10" fill="#5f5b52">actual positive,</text>
  <text x="335" y="153" text-anchor="middle" font-size="10" fill="#5f5b52">predicted positive</text>

  <rect x="420" y="65" width="170" height="95" rx="6" fill="#fdf6e3" stroke="#b98a00" stroke-width="1.6"/>
  <text x="505" y="97" text-anchor="middle" font-size="19" font-weight="700" fill="#b98a00">FP</text>
  <text x="505" y="120" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1c2321">false positive</text>
  <text x="505" y="139" text-anchor="middle" font-size="10" fill="#5f5b52">actual negative,</text>
  <text x="505" y="153" text-anchor="middle" font-size="10" fill="#5f5b52">predicted positive</text>

  <rect x="250" y="165" width="170" height="95" rx="6" fill="#fdf6e3" stroke="#b98a00" stroke-width="1.6"/>
  <text x="335" y="197" text-anchor="middle" font-size="19" font-weight="700" fill="#b98a00">FN</text>
  <text x="335" y="220" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1c2321">false negative</text>
  <text x="335" y="239" text-anchor="middle" font-size="10" fill="#5f5b52">actual positive,</text>
  <text x="335" y="253" text-anchor="middle" font-size="10" fill="#5f5b52">predicted negative</text>

  <rect x="420" y="165" width="170" height="95" rx="6" fill="#eef6f4" stroke="#0b6e63" stroke-width="1.6"/>
  <text x="505" y="197" text-anchor="middle" font-size="19" font-weight="700" fill="#0b6e63">TN</text>
  <text x="505" y="220" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1c2321">true negative</text>
  <text x="505" y="239" text-anchor="middle" font-size="10" fill="#5f5b52">actual negative,</text>
  <text x="505" y="253" text-anchor="middle" font-size="10" fill="#5f5b52">predicted negative</text>

  <text x="330" y="300" text-anchor="middle" font-size="11" fill="#5f5b52">Rows are the truth. Columns are the model's call.</text>
  <text x="330" y="320" text-anchor="middle" font-size="11" fill="#5f5b52">TP and TN are correct. FP is a false alarm. FN is a missed positive.</text>
  </svg>`
};

window.ML_DIAGRAMS["version-space"] = {
  cap: "The version space sits between the most general boundary G and the most specific boundary S (from the course notes).",
  svg: `<img src="assets/img/version-space.png" alt="Version space diagram: the most general boundary G at the top with the broadest acceptable rules, the version space between the boundaries, and the most specific boundary S at the bottom with the narrowest acceptable rules">`
};

window.ML_DIAGRAMS["roc-curve"] = {
  cap: "ROC space: the curve plots the true positive rate against the false positive rate as the threshold moves. The dashed diagonal is random guessing, and (0,1) is perfect.",
  svg: `<svg viewBox="0 0 660 430" width="660" height="430" role="img" aria-label="ROC curve with false positive rate on the x axis and true positive rate on the y axis">
  <defs><marker id="ar-m2-roc" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0b6e63"/></marker></defs>

  <path d="M90,340 L90,280 C90,220 160,150 260,105 C320,78 350,40 390,40 L590,40 L590,340 Z" fill="#eef6f4" opacity="0.65"/>

  <line x1="90" y1="340" x2="600" y2="340" stroke="#0b6e63" stroke-width="1.5" marker-end="url(#ar-m2-roc)"/>
  <line x1="90" y1="340" x2="90" y2="30" stroke="#0b6e63" stroke-width="1.5" marker-end="url(#ar-m2-roc)"/>

  <line x1="90" y1="340" x2="590" y2="40" stroke="#8a8578" stroke-width="1.3" stroke-dasharray="5 4"/>
  <text x="392" y="196" text-anchor="middle" font-size="10.5" fill="#6b6455" transform="rotate(-31 392 196)">random guess</text>

  <path d="M90,340 L90,280 C90,220 160,150 260,105 C320,78 350,40 390,40 L590,40" fill="none" stroke="#0b6e63" stroke-width="2.4"/>
  <text x="220" y="300" text-anchor="middle" font-size="11" fill="#0b6e63">AUC</text>

  <circle cx="90" cy="40" r="4.5" fill="#fff" stroke="#0b6e63" stroke-width="2"/>
  <text x="102" y="32" font-size="11" font-weight="700" fill="#1c2321">perfect (0,1)</text>

  <circle cx="90" cy="340" r="4" fill="#0b6e63"/>
  <text x="102" y="326" font-size="10.5" fill="#5f5b52">never positive (0,0)</text>

  <circle cx="590" cy="40" r="4" fill="#0b6e63"/>
  <text x="578" y="28" text-anchor="end" font-size="10.5" fill="#5f5b52">always positive (1,1)</text>

  <circle cx="290" cy="100" r="4" fill="#fff" stroke="#0b6e63" stroke-width="2"/>
  <text x="302" y="94" font-size="10.5" fill="#0b6e63">threshold 0.60</text>

  <g font-size="10.5" fill="#5f5b52">
    <line x1="90" y1="340" x2="90" y2="346" stroke="#8a8578"/>
    <text x="90" y="362" text-anchor="middle">0</text>
    <line x1="190" y1="340" x2="190" y2="346" stroke="#8a8578"/>
    <text x="190" y="362" text-anchor="middle">0.2</text>
    <line x1="290" y1="340" x2="290" y2="346" stroke="#8a8578"/>
    <text x="290" y="362" text-anchor="middle">0.4</text>
    <line x1="390" y1="340" x2="390" y2="346" stroke="#8a8578"/>
    <text x="390" y="362" text-anchor="middle">0.6</text>
    <line x1="490" y1="340" x2="490" y2="346" stroke="#8a8578"/>
    <text x="490" y="362" text-anchor="middle">0.8</text>
    <line x1="590" y1="340" x2="590" y2="346" stroke="#8a8578"/>
    <text x="590" y="362" text-anchor="middle">1.0</text>

    <line x1="84" y1="340" x2="90" y2="340" stroke="#8a8578"/>
    <text x="78" y="344" text-anchor="end">0</text>
    <line x1="84" y1="280" x2="90" y2="280" stroke="#8a8578"/>
    <text x="78" y="284" text-anchor="end">0.2</text>
    <line x1="84" y1="220" x2="90" y2="220" stroke="#8a8578"/>
    <text x="78" y="224" text-anchor="end">0.4</text>
    <line x1="84" y1="160" x2="90" y2="160" stroke="#8a8578"/>
    <text x="78" y="164" text-anchor="end">0.6</text>
    <line x1="84" y1="100" x2="90" y2="100" stroke="#8a8578"/>
    <text x="78" y="104" text-anchor="end">0.8</text>
    <line x1="84" y1="40" x2="90" y2="40" stroke="#8a8578"/>
    <text x="78" y="44" text-anchor="end">1.0</text>
  </g>

  <text x="340" y="392" text-anchor="middle" font-size="12" font-weight="700" fill="#1c2321">False positive rate (FPR)</text>
  <text x="24" y="190" text-anchor="middle" font-size="12" font-weight="700" fill="#1c2321" transform="rotate(-90 24 190)">True positive rate (TPR)</text>
  <text x="330" y="416" text-anchor="middle" font-size="11" fill="#5f5b52">A curve closer to the top left is better. The diagonal is no better than a coin flip.</text>
  </svg>`
};
