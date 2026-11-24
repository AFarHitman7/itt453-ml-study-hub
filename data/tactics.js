/* ============================================================
   Study tactics: strategy articles for the Study Plan tab.
   Exam-pattern facts come from the official ITT453 syllabus;
   question shapes were read from ML_PYQ. Frequency tables are
   computed live from ML_PYQ by app.js.
   ============================================================ */

window.ML_TACTICS = [
{
  id: "paper-shape",
  title: "How the paper is built",
  html: `
   <p>You have three hours and 100 marks. Part A has ten compulsory questions worth three marks each, usually two per module. A boundary question may cover two modules. Part B has five questions worth 14 marks each, one per module, with two options within each module.</p>
   <p>Each module is worth about 20 marks: 6 in Part A and 14 in Part B. Part A is compulsory, and Part B choices stay within their module. Skipping a module leaves no substitute choice.</p>
  <h4>What Part A actually asks</h4>
   <p>Part A questions usually ask you to define, compare, list, or calculate. Examples include entropy, classification versus clustering, HMM components, distances, and neuron outputs. Aim for about four clear lines per three-mark answer.</p>
   <p>Questions usually follow module order, but the numbering can shift. Read each topic instead of relying on its position.</p>
  <h4>What Part B actually asks</h4>
   <p>Each Part B option totals 14 marks. Parts may be split 8 + 6, 9 + 5, 10 + 4, or 7 + 7; some questions use one block with smaller parts.</p>
   <p>Read both options through, including the marks for each part. Choose the option whose larger part you can finish, not the one with the friendlier opening line.</p>
  <h4>Use the shape tonight</h4>
   <p>Prepare every module: learn its key definitions and one Part B answer. Practise longer topics such as backpropagation, SVM classification, HMM problems, ensemble methods, and numeric procedures so you can choose an option you can complete.</p>`
},
{
  id: "night-before",
  title: "The night before",
  html: `
   <p>Use four focused blocks with short breaks. Start with calculations and longer answers, then review definitions and diagrams.</p>
  <div class="tl">
    <div class="ts">Block 1 · 50 min · the numeric templates</div>
     <p>Practise five recurring calculation types: naive Bayes, confusion matrices, the first ID3 split, two k-means rounds, and a dendrogram from a distance matrix. Attempt one of each with notes closed. Set up the table before calculating so your method stays clear if arithmetic slips.</p>
  </div>
  <div class="tl">
    <div class="ts">Block 2 · 45 min · the explain answers</div>
     <p>Review backpropagation, SVM for linearly separable data, the three HMM problems, and ensemble methods. For each, practise a definition, labelled diagram, ordered steps, example, and one limitation or comparison. For backpropagation, name both the forward and backward passes.</p>
  </div>
  <div class="tl">
    <div class="ts">Block 3 · 25 min · the short-answer definitions</div>
     <p>Review entropy, information gain, precision, recall, accuracy, activation functions, support vectors, margins, HMM components, similarity measures, and linear separability. Define each in one sentence, then add an example.</p>
  </div>
  <div class="tl">
    <div class="ts">Block 4 · 20 min · the six diagrams</div>
     <p>Draw six diagrams from memory: perceptron, backpropagation network, SVM margin, ROC axes, DBSCAN point types, and a small dendrogram. Label every part.</p>
  </div>
  <div class="tl">
    <div class="ts">Before sleep, and in the morning</div>
     <p>Skim definitions, then sleep. In the morning, redo one numeric setup and one diagram, then review the definitions once. Leave new material aside.</p>
  </div>`
},
{
  id: "templates",
  title: "Answer templates",
  html: `
   <p>Use these four formats to organise answers under time pressure.</p>
  <h4>3-mark short answer</h4>
  <ul>
    <li><b>Define</b> the term in one sentence, using the standard word. "Entropy is the average uncertainty in a dataset."</li>
    <li><b>Give the one-line formula or the list</b>: H(S) = -Σ p log2 p, or the three components, or the two examples the question asked for.</li>
    <li><b>Add a tiny example</b>: a fair coin has entropy 1 bit, and a biased coin has less.</li>
  </ul>
   <p>Three or four lines is enough. Underline the key term and move on.</p>
  <h4>Numeric Part B answer</h4>
  <ol>
    <li><b>Name the method and the formula.</b> "Using k-means with Euclidean distance, assign each point to the nearest centroid."</li>
    <li><b>Set up the table or matrix.</b> Label rows and columns with the actual point names, and copy the data correctly once. Everything after this depends on the copy.</li>
    <li><b>Compute in steps.</b> One line per point per round, with the subtraction and the square visible. For ID3, show the target entropy first, then the gain for each attribute. For naive Bayes, show the class priors, then the conditional product for each class.</li>
    <li><b>Box the answer and write it as a sentence.</b> "The three clusters after two rounds are ... with centroids ...". A bare number at the bottom is easy to miss.</li>
  </ol>
   <p>If time runs short, show the setup and working rather than guessing.</p>
  <h4>Explain-this-algorithm answer</h4>
  <ol>
    <li><b>Definition</b> in one sentence, then the purpose.</li>
    <li><b>Labelled diagram</b> before the prose, drawn large enough to label.</li>
    <li><b>Ordered steps</b>, numbered, in the order the algorithm runs.</li>
    <li><b>One concrete example</b>: two points for a perceptron, a short sequence for an HMM, three classifiers for an ensemble.</li>
    <li><b>One comparison or limitation</b> to close, such as k-means needing k in advance or backpropagation being slow to converge.</li>
  </ol>
   <p>Use this structure for backpropagation, SVM, HMM problems, DBSCAN, and ensemble methods.</p>
  <h4>Define-the-terms answer</h4>
   <p>Give each term its own line using a consistent sentence pattern. Add a diagram for geometric terms.</p>
  <ul>
    <li><b>Support vector:</b> a training point that lies closest to the separating hyperplane and therefore fixes the margin.</li>
    <li><b>Hyperplane:</b> the decision boundary that separates the classes, written as w·x + b = 0.</li>
    <li><b>Margin:</b> the distance between the hyperplane and the nearest support vectors, which SVM tries to maximise.</li>
  </ul>
   <p>Draw one picture with all three terms labelled.</p>
  <h4>Match the verb</h4>
   <p>Define: one sentence. List: items. Differentiate: a two-column table. Compute: numbered steps. Illustrate: an example. Justify: a reason and consequence. Match the format to the question's verb.</p>`
},
{
  id: "memory",
  title: "Memory hooks",
  html: `
   <p>Use each hook to recall the steps, then test yourself with the page closed.</p>
  <ul>
     <li><b>Three HMM problems:</b> "Likely, path, tune." Evaluation finds the observation sequence likelihood; decoding finds the hidden path; learning tunes the parameters. Match them to Forward, Viterbi, and Baum-Welch.</li>
     <li><b>Three ensemble schemes:</b> "Two Bs and a V." Bagging trains in parallel on resamples. Boosting trains in sequence, focusing on earlier errors. Voting combines predictions.</li>
     <li><b>DBSCAN point types:</b> "Crowd, edge, alone." A core point has enough neighbours within its radius; a border point sits at a cluster edge; noise sits outside. Recall minPts and epsilon.</li>
     <li><b>Activation families:</b> "Step, S, straight, bent." These mean threshold, sigmoid family (binary sigmoid, bipolar sigmoid, tanh), linear, and ReLU. Binary sigmoid ranges from 0 to 1; bipolar sigmoid ranges from -1 to +1.</li>
     <li><b>ID3 procedure:</b> "Whole, column, winner, branch." Find whole-set entropy, compute each column's information gain, split on the best, then repeat. Stop at a pure branch or when attributes run out.</li>
     <li><b>PCA steps:</b> "Centre, covariance, pairs, projection." Centre the data, compute covariance and eigenvalue-eigenvector pairs, keep the largest eigenvalues, and project onto their eigenvectors.</li>
     <li><b>Confusion matrix:</b> "First letter truth, second letter verdict." TP is positive in truth and prediction; FP is negative in truth but positive in prediction. Label rows and columns because layouts vary.</li>
     <li><b>ROC corners:</b> "Perfect top left, random on the diagonal." (0,1) is perfect; the diagonal is random. (0,0) never predicts positive; (1,1) always does. Put false-positive rate on x and true-positive rate on y.</li>
  </ul>`
},
{
  id: "hall",
  title: "Exam hall tactics",
  html: `
   <p>Use this three-hour schedule and protect the final ten minutes for a check.</p>
  <div class="tl">
    <div class="ts">0:00 to 0:40 · Part A</div>
     <p>Answer all ten short questions, at about four minutes each. If a calculation stalls, write the formula and setup, mark it, and continue.</p>
  </div>
  <div class="tl">
    <div class="ts">0:40 to 2:50 · Part B, about 26 minutes a module</div>
     <p>Read both options and their part marks before choosing. Pick the one whose larger part you can answer well. Both options total 14 marks.</p>
     <p>Spend the first two minutes on a diagram or setup table. Keep each module to 26 minutes; recover lost time from the next module, not the final check.</p>
  </div>
  <div class="tl">
    <div class="ts">2:50 to 3:00 · the sweep</div>
     <p>Finish parked Part A answers. Check for five Part B answers, one per module, and complete (a) and (b) parts. Add missing labels, units, and axes; underline final answers. Do not start a new derivation.</p>
  </div>
  <h4>How much working to show</h4>
   <p>Show enough working to follow your method. For k-means, include each round's distance table and updated centroids. For ID3, show target entropy and each attribute's gain. For naive Bayes, show priors and each class product. Label all four confusion-matrix cells before calculating ratios.</p>
  <h4>When to draw</h4>
   <p>Draw when asked, and practise diagrams for the perceptron, backpropagation, SVM, ROC, DBSCAN, and dendrograms. Leave room to label every box, arrow, and axis. Explain the steps in the same order as the drawing.</p>`
},
{
  id: "graders",
  title: "What the graders look for",
  html: `
   <p>Make your method easy to follow: show the steps, label diagrams, and answer every part.</p>
  <h4>Show the method as well as the answer</h4>
   <p>Name the method, set up the table, show ordered steps, and mark the final answer. Clear working lets the grader follow your procedure even if arithmetic slips.</p>
  <h4>Draw the diagram even when the question forgets to ask</h4>
   <p>A requested diagram is part of your answer. Practise the perceptron, backpropagation, SVM margin, ROC space, DBSCAN points, and dendrograms. Label axes, layers, support vectors, core points, and border points.</p>
  <h4>Name the algorithm beside the problem</h4>
   <p>For HMMs, pair Forward with evaluation, Viterbi with decoding, and Baum-Welch with learning. Name the relevant method at the start of other answers too: k-means, DBSCAN, ID3, naive Bayes, or backpropagation.</p>
  <h4>Answer the verb, and finish every part</h4>
   <p>Define in one sentence; differentiate with a two-column table; compute with numbered steps; illustrate with values; justify with a reason and consequence. Check that you answered both (a) and (b).</p>
  <h4>Keep the answer readable</h4>
   <p>Use short paragraphs and numbered steps. Box or underline the final answer and label every drawing. Finish a clear answer before adding extra detail.</p>`
}
];
