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
  <p>Three hours, 100 marks, and a shape you can plan around. Part A is ten short questions of three marks each, all compulsory, and the pattern gives two per module, though one boundary question can straddle two modules. Part B is five questions of fourteen marks, one from each module, and each module gives you two to choose between. That makes fifteen questions in all: ten short ones and five long ones.</p>
  <p>The marks add up in a way worth remembering. By the pattern, every module carries 6 marks in Part A and 14 in Part B, so a module is worth about 20 marks on the day. The Part A share is 6 by design, with one paper drifting where a boundary question straddles two modules. That is a fifth of the paper in every module, with no way to opt out. The choice in Part B sits inside the module, so it cannot cover for a module you skipped.</p>
  <h4>What Part A actually asks</h4>
  <p>Read a set of Part A questions and four shapes appear. Define a term, as in entropy or a confusion matrix. Differentiate two ideas, as in classification and clustering. List examples or components, as in activation functions or HMM elements. Work one small calculation, as in a distance between two points or a neuron output. Three marks is worth about four lines, so keep the answer tight.</p>
  <p>The numbering usually runs two questions per module in order, module 1 first. It drifts in places, so read the topic instead of trusting the position.</p>
  <h4>What Part B actually asks</h4>
  <p>Every Part B question totals 14, and the two options in a module are different routes to the same 14. The split is where the decision lives. One question may be 8 + 6, another 9 + 5, another 10 + 4, another 7 + 7. A few arrive as a single 14-mark block rather than an a/b split, with smaller numbered parts inside.</p>
  <p>Read both options to the end and look at the marks printed beside (a) and (b). If (a) carries 10, then (a) is the question. A perfect four-mark (b) will not save a half-finished (a), and choosing by the friendlier first line turns a good paper into a rushed one.</p>
  <h4>Use the shape tonight</h4>
  <p>Two consequences follow. First, the last module is as valuable as the first, so give every module at least its definitions and one usable Part B answer. Second, the Part B choice rewards preparation of the big a-parts: backpropagation, SVM classification, the HMM problems, methods for combining learners, and the numeric routines. Those are the parts that decide which option you can finish.</p>`
},
{
  id: "night-before",
  title: "The night before",
  html: `
  <p>Study by payoff tonight. The highest-paying work goes first, while you still have attention, and the definitions come last because they refresh quickly in the morning. Four blocks, with a short break between them.</p>
  <div class="tl">
    <div class="ts">Block 1 · 50 min · the numeric templates</div>
    <p>Across the papers the same five numeric questions return with new numbers: naive Bayes on a small training table, a confusion matrix built from a story about dogs or patients or balls, the first split of an ID3 tree, two rounds of k-means, and a dendrogram from a distance matrix. Only the numbers change, so practise the fixed steps. Do one of each with the page closed, and write the setup table before you calculate. If the arithmetic wobbles, the setup still shows the method.</p>
  </div>
  <div class="tl">
    <div class="ts">Block 2 · 45 min · the explain answers</div>
    <p>Four topics carry most of the big Part B parts: backpropagation, SVM for linearly separable data, the three HMM problems, and methods for combining learners. They share one skeleton, so learn the skeleton once and pour each topic into it: definition, labelled diagram, ordered steps, one concrete example, one limitation or comparison. Say the skeleton out loud for each topic, then close the page and write the steps in order. Name the forward pass and the backward pass explicitly in backpropagation; a paragraph without them loses the marks the steps would have earned.</p>
  </div>
  <div class="tl">
    <div class="ts">Block 3 · 25 min · the short-answer definitions</div>
    <p>Part A is thirty marks of small answers, and each one is quick to prepare. Run the list: entropy and information gain, precision, recall and accuracy, activation function, support vector and margin, the components of an HMM, similarity measures, linear separability. Say each one in a single sentence, then add one example. If a definition will not come out in one sentence, you do not have it yet.</p>
  </div>
  <div class="tl">
    <div class="ts">Block 4 · 20 min · the six diagrams</div>
    <p>Draw from memory: the perceptron, the backpropagation network with its layers and arrows, the SVM margin with support vectors, ROC space with its axes, the DBSCAN point diagram, and a small dendrogram. Label every part. A diagram you can produce in two minutes is worth more than a paragraph you have to invent in the hall.</p>
  </div>
  <div class="tl">
    <div class="ts">Before sleep, and in the morning</div>
    <p>Skim only the definitions, then sleep. In the morning, redo one numeric setup and one diagram, read the definition list once, and add nothing new. New material on exam morning mostly produces panic. A clean run through old material settles you before you walk in.</p>
  </div>`
},
{
  id: "templates",
  title: "Answer templates",
  html: `
  <p>Four formats cover almost every question on this paper. Learn the shape of each one, and you stop inventing structure under time pressure.</p>
  <h4>3-mark short answer</h4>
  <ul>
    <li><b>Define</b> the term in one sentence, using the standard word. "Entropy is the average uncertainty in a dataset."</li>
    <li><b>Give the one-line formula or the list</b>: H(S) = -Σ p log2 p, or the three components, or the two examples the question asked for.</li>
    <li><b>Add a tiny example</b>: a fair coin has entropy 1 bit, and a biased coin has less.</li>
  </ul>
  <p>Three or four lines is enough. Underline the term and move on, because Part A rewards coverage more than depth.</p>
  <h4>Numeric Part B answer</h4>
  <ol>
    <li><b>Name the method and the formula.</b> "Using k-means with Euclidean distance, assign each point to the nearest centroid."</li>
    <li><b>Set up the table or matrix.</b> Label rows and columns with the actual point names, and copy the data correctly once. Everything after this depends on the copy.</li>
    <li><b>Compute in steps.</b> One line per point per round, with the subtraction and the square visible. For ID3, show the target entropy first, then the gain for each attribute. For naive Bayes, show the class priors, then the conditional product for each class.</li>
    <li><b>Box the answer and write it as a sentence.</b> "The three clusters after two rounds are ... with centroids ...". A bare number at the bottom is easy to miss.</li>
  </ol>
  <p>If time runs short, the setup and two steps earn more than a guessed final answer.</p>
  <h4>Explain-this-algorithm answer</h4>
  <ol>
    <li><b>Definition</b> in one sentence, then the purpose.</li>
    <li><b>Labelled diagram</b> before the prose, drawn large enough to label.</li>
    <li><b>Ordered steps</b>, numbered, in the order the algorithm runs.</li>
    <li><b>One concrete example</b>: two points for a perceptron, a short sequence for an HMM, three classifiers for an ensemble.</li>
    <li><b>One comparison or limitation</b> to close, such as k-means needing k in advance or backpropagation being slow to converge.</li>
  </ol>
  <p>This skeleton fits backpropagation, SVM, the HMM problems, DBSCAN and the ensemble methods, which is most of Part B.</p>
  <h4>Define-the-terms answer</h4>
  <p>Give each term its own line and keep the sentence shape identical, so the answer reads as a set. Add a single diagram if the terms are geometric.</p>
  <ul>
    <li><b>Support vector:</b> a training point that lies closest to the separating hyperplane and therefore fixes the margin.</li>
    <li><b>Hyperplane:</b> the decision boundary that separates the classes, written as w·x + b = 0.</li>
    <li><b>Margin:</b> the distance between the hyperplane and the nearest support vectors, which SVM tries to maximise.</li>
  </ul>
  <p>Then draw one picture with all three labelled. Three separate paragraphs without the picture make the examiner assemble the geometry alone.</p>
  <h4>Match the verb</h4>
  <p>Define gets a sentence. List gets items. Differentiate gets a two-column table. Compute gets steps. Illustrate gets an example. Justify gets a reason plus a consequence. Then check the verb the paper used, because a table where a definition was asked reads as an answer to a different question.</p>`
},
{
  id: "memory",
  title: "Memory hooks",
  html: `
  <p>These are hooks, not explanations. Say each one once, then test it with the page closed.</p>
  <ul>
    <li><b>Three HMM problems:</b> "Likely, path, tune." Evaluation asks how likely the observation sequence is, decoding asks which hidden path produced it, learning asks how to tune the parameters. Attach the algorithm to each: Forward, Viterbi, Baum-Welch.</li>
    <li><b>Three ensemble schemes:</b> "Two Bs and a V." Bagging trains learners in parallel on resamples, boosting trains them in sequence so each fixes the last one's errors, and voting counts their answers. The sequence question is what separates boosting from the other two.</li>
    <li><b>DBSCAN point types:</b> "Crowd, edge, alone." A core point has the crowd inside its radius, a border point stands at the edge of the crowd, and noise stands alone. Tie the picture to minPts and epsilon.</li>
    <li><b>Activation families:</b> "Step, S, straight, bent." Step is the threshold, S is the sigmoid family (binary sigmoid, bipolar sigmoid, tanh), straight is linear, and bent is ReLU. Binary outputs run 0 to 1 and bipolar outputs run -1 to +1.</li>
    <li><b>ID3 procedure:</b> "Whole, column, winner, branch." Entropy of the whole set, information gain for each column, split on the winner, repeat on every branch. Stop when a branch is pure or the attributes run out.</li>
    <li><b>PCA steps:</b> "Centre, covariance, pairs, projection." Centre the data, build the covariance matrix, take the eigenvalue and eigenvector pairs, keep the largest, and project the data onto them.</li>
    <li><b>Confusion matrix:</b> "First letter truth, second letter verdict." TP is actually positive and predicted positive. FP is actually negative and predicted positive. Label the rows and columns too, since layouts differ between textbooks.</li>
    <li><b>ROC corners:</b> "Perfect top left, random on the diagonal." The point (0,1) is a perfect classifier, the diagonal is a coin toss, (0,0) never predicts positive, and (1,1) always does. Axes: false positive rate across, true positive rate up.</li>
  </ul>`
},
{
  id: "hall",
  title: "Exam hall tactics",
  html: `
  <p>Three hours is enough if you spend it in the right order. Here is a budget that leaves room for the mistakes everyone makes.</p>
  <div class="tl">
    <div class="ts">0:00 to 0:40 · Part A</div>
    <p>Take the ten short questions first. Four minutes each is the pace, and most will take less. Answer every one, even with a bare definition, because a blank is the only answer that cannot score. If a calculation stalls, write the formula and the setup, mark the question, and move on.</p>
  </div>
  <div class="tl">
    <div class="ts">0:40 to 2:50 · Part B, about 26 minutes a module</div>
    <p>For each module, read both questions to the end, including the marks on each part, then choose. Pick by your strongest a-part, since the a-part carries the bigger share and both options total the same 14. A familiar topic with an a-part you cannot finish is a trap.</p>
    <p>Spend the first two minutes on the diagram or the setup table, then write. Keep 26 minutes as the ceiling for a module. If one runs long, take the time back from the next module, not from the final ten minutes.</p>
  </div>
  <div class="tl">
    <div class="ts">2:50 to 3:00 · the sweep</div>
    <p>Fill any parked Part A answers. Check that all five Part B questions are present, one per module, with both (a) and (b) answered. Add missing axis labels, units and diagram labels, and underline each final answer. Do not begin a new derivation in this window.</p>
  </div>
  <h4>How much working to show</h4>
  <p>Enough that a reader can follow without guessing. For k-means, one distance table per round and the updated centroids. For ID3, the target entropy and one gain line per attribute. For naive Bayes, the priors and the product for each class. For a confusion matrix, the four cells with labels before any ratio. The arithmetic can slip and the method still reads.</p>
  <h4>When to draw</h4>
  <p>Draw first whenever the question asks for a diagram, and draw anyway for the perceptron, backpropagation, SVM, ROC, DBSCAN and any dendrogram. Give the drawing a third of the answer space, label every box and arrow, and then let the prose walk the same order. A labelled diagram also gives you something to refer back to when the wording dries up.</p>`
},
{
  id: "graders",
  title: "What the graders look for",
  html: `
  <p>Some habits show up again and again in answers that score well on this paper. They come from experience with questions of this shape.</p>
  <h4>Show the method as well as the answer</h4>
  <p>A strong numeric answer reads like a recipe: the method named, the table set up, the steps in order, the final answer marked. When the arithmetic slips, the setup and the steps still carry most of the credit, because the examiner can see that you knew the procedure. A bare final number gives the examiner nothing to award if it is wrong.</p>
  <h4>Draw the diagram even when the question forgets to ask</h4>
  <p>Where a question says "with a neat diagram", the diagram is part of the marks. The safest shape is to draw one anyway for the perceptron, backpropagation, SVM and its margin, ROC space, DBSCAN point types and any dendrogram. Label the axes, the layers, the support vectors, the core and border points. An unlabelled sketch earns little, while a labelled one frames everything you write after it.</p>
  <h4>Name the algorithm beside the problem</h4>
  <p>For the HMM question, put Forward beside evaluation, Viterbi beside decoding, and Baum-Welch beside learning. A list of three problem names answers only half the question, while the algorithm names show how each one is solved. The same habit helps elsewhere: name k-means, DBSCAN, ID3, naive Bayes and backpropagation explicitly at the start of the answer.</p>
  <h4>Answer the verb, and finish every part</h4>
  <p>Define gets one sentence. Differentiate gets a table with two columns. Compute gets numbered steps. Illustrate gets an example with real values. Justify gets a reason and a consequence. Then check that both (a) and (b) are answered, because a missing short part costs several marks for a few lines of work.</p>
  <h4>Keep the answer readable</h4>
  <p>Use short paragraphs, numbered steps, a boxed or underlined final answer, and labels on every drawing. A complete short answer scores better than a long unfinished one, so make the script easy to follow.</p>`
}
];
