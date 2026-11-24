window.ML_MODULES = window.ML_MODULES || {};
window.ML_MODULES[3] = {
  num: 3,
  title: "Classification using Decision Trees and Neural Networks",
  hours: 8,
  topics: [
    {
      slug: "m3-dtree",
      title: "Decision Trees and Their Types",
      sources: [
        "https://en.wikipedia.org/wiki/Decision_tree_learning",
        "https://en.wikipedia.org/wiki/Decision_tree"
      ],
      blocks: [
        {
          type: "definition",
          text: "A decision tree is a supervised model that splits data through a chain of feature tests and predicts a class or number at a leaf."
        },
        {
          type: "text",
          html: `<p><b>The four parts.</b> A decision tree is a flowchart you read from the top down. The <b>root node</b> holds the whole training set and the first test. An <b>internal node</b> tests one attribute, a <b>branch</b> is one answer to that test, and a <b>leaf</b> gives the prediction. Every path from root to leaf is a rule of the form "if attendance is good and hours are high, then pass".</p>
<p><b>How it grows.</b> The tree is built by recursive partitioning, also called top-down induction. At each node the learner scores every unused attribute, picks the one that separates the classes best, and divides the rows by its values. The same step repeats on each child with the attributes that are left. Growth stops when a node is pure, when no attributes remain (the node becomes a leaf with the majority class), or when the subset is empty (the leaf takes the parent's majority class). The search is greedy, because each split is chosen for its local score without looking at the tree it will produce later.</p>
<p><b>Two types, one difference.</b> The type follows the target column, not the algorithm.</p>
<table class="tbl">
<tr><th></th><th>Classification tree</th><th>Regression tree</th></tr>
<tr><td>Target</td><td>a class or label</td><td>a continuous number</td></tr>
<tr><td>Leaf holds</td><td>class label, or class counts</td><td>mean of the training values in that leaf</td></tr>
<tr><td>Split score</td><td>entropy, Gini, gain ratio</td><td>reduction in squared error (variance)</td></tr>
<tr><td>Example</td><td>spam or not spam</td><td>house price, delivery minutes</td></tr>
</table>
<p><b>One caution about names.</b> Classification and regression tree (CART) is the umbrella term for both kinds, and ID3, C4.5 and CART are algorithms that build trees, not separate types. Ensembles such as a random forest or a boosted tree build many trees and vote, so they sit outside this two-way split.</p>
<p>A leaf can also store the class distribution instead of a single label. A leaf reading "3 Yes, 1 No" is more honest than a bare "Yes", because it shows how much evidence sits behind the answer.</p>`
        },
        {
          type: "example",
          html: `<p>A courier wants to flag late deliveries. The training table has distance, weather, time of day and a late flag, and a tree of depth three is grown on last year's trips. At prediction time a new order with a 32 km distance and heavy rain follows two branches and lands in a leaf that says "late, 11 of 14 rows". The dispatcher sees both the warning and the strength of the evidence. Because the target is a yes/no flag, this is a classification tree, and the leaf label carries the counts that support it.</p>`
        },
        {
          type: "tip",
          html: `<p>Sketch the tree with the root at the top, then label root, internal node, branch and leaf before you write a sentence, since those four labels are quick marks. For a 3-mark question, put classification and regression in a two-row table and name what sits in the leaf. Add one line on how the tree is grown, because a definition alone rarely fills 5 marks. If the question says types and nothing else, do not spend half the answer on ID3.</p>`
        }
      ],
      practice: [
        {
          q: "A courier company trains a tree to predict delivery time in minutes from distance, weather and time of day. Is this a classification tree or a regression tree? State what sits in each leaf and which split criterion you would use.",
          a: `<p>It is a regression tree, because the target is a continuous number rather than a class. Each leaf holds the mean delivery time of the training rows that reach it, so a leaf might read "38 minutes, 12 rows".</p>
<p>The split criterion is the reduction in squared error. For a node, take the sum of squared differences between each row's time and the node mean, then compare it with the weighted sum of the two or more child errors after a candidate split. The attribute that removes the most squared error wins. Entropy and Gini need class labels, so they do not apply until you bin the minutes into ranges, and binning throws away the ordering that a regression tree uses.</p>
<p>If the company later asks "late or not late", the same data becomes a classification tree, the leaves hold labels, and entropy is the natural score.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A loan officer uses this tree. Root: amount above 5000? If yes, go to existing customer? If yes, approve, if no, reject. If the amount is 5000 or less, go to repayment on time last year? If yes, approve, if no, reject. Write the four decision rules, predict for an applicant who asks for 8000 and is an existing customer with an on-time record, and say what the leaf does not tell you.",
          a: `<p>The four rules, one per leaf:</p>
<ol>
<li>Amount above 5000 and existing customer: approve.</li>
<li>Amount above 5000 and not an existing customer: reject.</li>
<li>Amount 5000 or less and repaid on time last year: approve.</li>
<li>Amount 5000 or less and did not repay on time last year: reject.</li>
</ol>
<p>The new applicant takes the left branch at the root, then the left branch at the second test, and lands on rule 1: approve.</p>
<p>The leaf gives a decision, not a confidence. A bare label says nothing about how many past applicants followed that path or how mixed they were, so a leaf built from two rows looks as certain as a leaf built from two thousand. Store the class counts or a probability at each leaf if the officer needs that. An applicant whose combination never appeared in training can only be answered by the majority class of the nearest node the tree can reach.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m3-features",
      title: "Entropy, Information Gain and Gain Ratio",
      sources: [
        "https://en.wikipedia.org/wiki/Information_gain_(decision_tree)",
        "https://en.wikipedia.org/wiki/ID3_algorithm"
      ],
      blocks: [
        {
          type: "definition",
          text: "Entropy measures a node's impurity, information gain measures the impurity a split removes, and gain ratio divides gain by split information."
        },
        {
          type: "text",
          html: `<p><b>Entropy.</b> Entropy scores how mixed the class labels are at a node.</p>
<p>H(S) = &minus;&Sigma; p<sub>i</sub> log<sub>2</sub>(p<sub>i</sub>)</p>
<p>Here p<sub>i</sub> is the fraction of rows in class i. A pure node has H = 0, because the only term is &minus;1 log<sub>2</sub>1 = 0. A node split evenly between two classes has H = 1. With c classes the maximum is log<sub>2</sub>c, so a four-class node tops out at 2 bits. Entropy falls as the node becomes more one-sided, which is why it is called a measure of impurity rather than of information.</p>
<p><b>Information gain.</b> Gain compares the parent with its children.</p>
<p>IG(S, A) = H(S) &minus; &Sigma;<sub>v</sub> (|S<sub>v</sub>| / |S|) H(S<sub>v</sub>)</p>
<p>The second term is the weighted average entropy of the subsets created by attribute A. It is never larger than H(S), so gain is never negative. ID3 chooses the attribute with the largest gain. Write the fractions out in the exam, as 0.4 &times; 0.811, because that line is where most arithmetic marks sit.</p>
<p><b>Why plain gain misleads.</b> Give an attribute one distinct value per row, such as a customer number or a transaction ID. Every subset is a single row, so every child has entropy 0, the weighted term vanishes, and the gain equals the whole parent entropy. The attribute wins the comparison and teaches the tree nothing that generalises, since a new customer brings a number the tree has never seen.</p>
<p><b>Gain ratio.</b> Split information measures how widely an attribute divides the data.</p>
<p>SI(A) = &minus;&Sigma;<sub>v</sub> (|S<sub>v</sub>| / |S|) log<sub>2</sub>(|S<sub>v</sub>| / |S|)</p>
<p>Gain ratio = IG(A) / SI(A). The customer-number attribute has SI = log<sub>2</sub>10 = 3.32 on ten rows, so its ratio drops below a modest but honest attribute. C4.5 uses gain ratio, with one guard: it first discards attributes whose gain is below the average gain, because the ratio can reward an attribute that hardly splits at all (a small denominator). When an attribute has a single value, SI = 0, so the ratio is undefined and the gain, which is also 0 here, has to decide.</p>
<p><b>Gini, for contrast.</b> Gini(S) = 1 &minus; &Sigma; p<sub>i</sub><sup>2</sup> is zero for a pure node and 0.5 for an even two-class node. CART uses it because it needs no logarithm, and it usually ranks attributes close to the way entropy does.</p>
<table class="tbl">
<tr><th>log<sub>2</sub></th><th>value</th><th>log<sub>2</sub></th><th>value</th><th>log<sub>2</sub></th><th>value</th></tr>
<tr><td>0.2</td><td>&minus;2.322</td><td>0.4</td><td>&minus;1.322</td><td>0.6</td><td>&minus;0.737</td></tr>
<tr><td>0.25</td><td>&minus;2.000</td><td>0.5</td><td>&minus;1.000</td><td>0.7</td><td>&minus;0.515</td></tr>
<tr><td>0.3</td><td>&minus;1.737</td><td>0.75</td><td>&minus;0.415</td><td>0.8</td><td>&minus;0.322</td></tr>
</table>`
        },
        {
          type: "example",
          html: `<p>Eight emails are labelled, four spam and four normal, so H(S) = 1 bit. The attribute "contains a link" splits them into five with a link (four spam, one normal) and three without (no spam, three normal).</p>
<p>H(link) = &minus;(0.8 log<sub>2</sub>0.8 + 0.2 log<sub>2</sub>0.2) = 0.722 and H(no link) = 0. The weighted term is (5/8)(0.722) = 0.451, so the gain is 1 &minus; 0.451 = 0.549.</p>
<p>The attribute "known sender" splits six rows (two spam, four normal) from two rows (both spam). Its weighted entropy is (6/8)(0.918) = 0.689 and its gain is 0.311. The link wins. Run the ratio as a check: the link has SI = 0.954 and ratio 0.575, the sender has SI = 0.811 and ratio 0.384, so the order does not change on this table.</p>`
        },
        {
          type: "tip",
          html: `<p>Open every numeric answer with H(S), even when the question only asks for a gain, because the marker checks that number first. Write the weighted sum with fractions visible instead of jumping to the total. Put the candidate gains in one small table and name the winner in a full sentence. Quote logs to three decimals and state the unit as bits once.</p>`
        }
      ],
      practice: [
        {
          q: "Information gain is biased toward attributes with many distinct values. Explain the bias using an added customer-number column on the ten-row loan table, and show how the split information term changes the ranking.",
          a: `<p>Add a column that gives each of the ten applicants a different customer number. Splitting on it produces ten subsets of one row each. Every subset is pure, so every H(S<sub>v</sub>) is 0, the weighted term is 0, and the gain is the full parent entropy, 0.971. That beats Education Level at 0.646, even though the column carries no usable pattern for a new applicant.</p>
<p>The split information exposes the problem. Ten equal subsets give SI = &minus;10 &times; 0.1 log<sub>2</sub>0.1 = log<sub>2</sub>10 = 3.322. The ratio becomes 0.971 / 3.322 = 0.292, which falls below Education Level at 0.646 / 1.571 = 0.411. The ranking is repaired.</p>
<p>The denominator is large exactly when an attribute cuts the data into many small pieces, and small when an attribute has few values. That is why C4.5 applies a filter first, keeping only attributes whose gain is at least the average, and then picks the best ratio among those. Without the filter, a rare attribute with two very uneven branches could win on a tiny denominator while explaining almost nothing.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "Five deliveries are recorded with a late flag: four on time, one late. The weather attribute splits them into three clear days (all on time) and two rainy days (one on time, one late). Compute the entropy of the full set, of each subset, and the information gain of the split.",
          a: `<p>H(S) = &minus;(0.8 log<sub>2</sub>0.8 + 0.2 log<sub>2</sub>0.2) = &minus;(0.8 &times; &minus;0.322 + 0.2 &times; &minus;2.322) = 0.258 + 0.464 = 0.722 bits.</p>
<p>For clear days, all three rows are on time, so H(clear) = 0. For rainy days, one row of each class gives H(rain) = 1.</p>
<p>The weighted entropy is (3/5)(0) + (2/5)(1) = 0.4. The gain is 0.722 &minus; 0.4 = 0.322 bits.</p>
<p>The gain is positive but small, and it comes from a split that puts only two rows on one side. On a table this size, treat the number as a hint rather than proof, and check the same attribute on more rows before you trust the branch.</p>`,
          marks: 3,
          diff: "easy"
        }
      ]
    },
    {
      slug: "m3-id3",
      title: "The ID3 Algorithm",
      sources: [
        "https://en.wikipedia.org/wiki/ID3_algorithm"
      ],
      blocks: [
        {
          type: "definition",
          text: "ID3 is a greedy tree learner that splits on the attribute with the highest information gain, then recurses on every subset it creates."
        },
        {
          type: "text",
          html: `<p><b>The name and the idea.</b> ID3 stands for Iterative Dichotomiser 3, published by Ross Quinlan in 1986 and the direct ancestor of C4.5. The 3 stands for his third attempt at an entropy-based learner, and "dichotomiser" is a misnomer, because ID3 happily splits a multi-valued attribute into three or more branches. The idea is one sentence long: at each node, take the attribute that removes the most uncertainty, divide the rows by its values, and repeat on each child.</p>
<p><b>The algorithm in order.</b></p>
<ol>
<li>Place the full training set at the root.</li>
<li>Compute H(S) for the current set.</li>
<li>Compute the information gain of every attribute that has not been used on the path above.</li>
<li>Select the attribute with the largest gain and make it a decision node.</li>
<li>Split S into subsets, one per value of that attribute.</li>
<li>Recurse on each non-empty subset with the attribute removed.</li>
<li>Stop when a subset is pure, when no attributes remain, or when the subset is empty.</li>
</ol>
<p><b>The three stop rules, and what each produces.</b> A pure subset becomes a leaf with its class. A subset with rows but no remaining attributes becomes a leaf with the majority class, which is the best guess left. An empty subset becomes a leaf with the majority class of the parent, because there is no evidence of its own to use.</p>
<p><b>What to say about its limits.</b> ID3 is greedy, so it returns a locally good tree and offers no guarantee of the smallest one; the global problem is NP-complete. It overfits when the table is small or noisy, it needs categorical values, and it has no built-in answer for a blank cell. C4.5 adds gain ratio, continuous splits, missing-value handling and pruning, which is why examiners like the comparison.</p>`
        },
        {
          type: "example",
          html: `<p><b>Worked ID3 question, the ten-row loan table.</b> The predictors are Education Level, Employment Type and Marital Status; the target is Loan Approval.</p>
<table class="tbl">
<tr><th>Sl.</th><th>Education Level</th><th>Employment Type</th><th>Marital Status</th><th>Loan Approval</th></tr>
<tr><td>1</td><td>Graduate</td><td>Salaried</td><td>Married</td><td>Yes</td></tr>
<tr><td>2</td><td>High School</td><td>Self-employed</td><td>Single</td><td>No</td></tr>
<tr><td>3</td><td>Graduate</td><td>Self-employed</td><td>Married</td><td>Yes</td></tr>
<tr><td>4</td><td>Postgraduate</td><td>Salaried</td><td>Married</td><td>Yes</td></tr>
<tr><td>5</td><td>High School</td><td>Salaried</td><td>Single</td><td>No</td></tr>
<tr><td>6</td><td>Graduate</td><td>Salaried</td><td>Single</td><td>Yes</td></tr>
<tr><td>7</td><td>Postgraduate</td><td>Self-employed</td><td>Married</td><td>Yes</td></tr>
<tr><td>8</td><td>Graduate</td><td>Self-employed</td><td>Single</td><td>No</td></tr>
<tr><td>9</td><td>High School</td><td>Salaried</td><td>Married</td><td>No</td></tr>
<tr><td>10</td><td>Postgraduate</td><td>Salaried</td><td>Single</td><td>Yes</td></tr>
</table>
<p><b>Step 1, the parent entropy.</b> Six Yes and four No, so H(S) = &minus;(0.6 log<sub>2</sub>0.6 + 0.4 log<sub>2</sub>0.4) = 0.442 + 0.529 = 0.971 bits.</p>
<p><b>Step 2, Education Level.</b> Graduate holds 3 Yes and 1 No, so H = 0.811. High School holds 0 Yes and 3 No, and Postgraduate holds 3 Yes and 0 No, so both are pure with H = 0.</p>
<table class="tbl">
<tr><th>Value</th><th>Rows</th><th>Yes</th><th>No</th><th>H</th><th>Weight</th><th>Weight &times; H</th></tr>
<tr><td>Graduate</td><td>4</td><td>3</td><td>1</td><td>0.811</td><td>0.4</td><td>0.324</td></tr>
<tr><td>High School</td><td>3</td><td>0</td><td>3</td><td>0</td><td>0.3</td><td>0</td></tr>
<tr><td>Postgraduate</td><td>3</td><td>3</td><td>0</td><td>0</td><td>0.3</td><td>0</td></tr>
</table>
<p>Weighted entropy = 0.324, so gain = 0.971 &minus; 0.324 = <b>0.646</b>.</p>
<p><b>Step 3, Employment Type.</b> Salaried holds 4 Yes and 2 No, so H = 0.918 at weight 0.6. Self-employed holds 2 Yes and 2 No, so H = 1 at weight 0.4. Weighted entropy = 0.551 + 0.400 = 0.951, so gain = <b>0.020</b>.</p>
<p><b>Step 4, Marital Status.</b> Married holds 4 Yes and 1 No, so H = 0.722 at weight 0.5. Single holds 2 Yes and 3 No, so H = 0.971 at weight 0.5. Weighted entropy = 0.361 + 0.485 = 0.846, so gain = <b>0.124</b>.</p>
<table class="tbl">
<tr><th>Attribute</th><th>Weighted entropy</th><th>Information gain</th><th>Split information</th><th>Gain ratio</th></tr>
<tr><td>Education Level</td><td>0.324</td><td>0.646</td><td>1.571</td><td>0.411</td></tr>
<tr><td>Employment Type</td><td>0.951</td><td>0.020</td><td>0.971</td><td>0.021</td></tr>
<tr><td>Marital Status</td><td>0.846</td><td>0.124</td><td>1.000</td><td>0.124</td></tr>
</table>
<p><b>Step 5, the verdict.</b> Education Level has the highest gain at 0.646, and it also has the highest gain ratio, so it becomes the root. Two of its three branches are already pure, so only the four Graduate rows need another test.</p>`
        },
        {
          type: "diagram",
          id: "dtree-example"
        },
        {
          type: "code",
          lang: "python",
          html: `from sklearn.preprocessing import OrdinalEncoder
from sklearn.tree import DecisionTreeClassifier, export_text

rows = [
    ("Graduate", "Salaried", "Married", "Yes"),
    ("High School", "Self-employed", "Single", "No"),
    ("Graduate", "Self-employed", "Married", "Yes"),
    ("Postgraduate", "Salaried", "Married", "Yes"),
    ("High School", "Salaried", "Single", "No"),
    ("Graduate", "Salaried", "Single", "Yes"),
    ("Postgraduate", "Self-employed", "Married", "Yes"),
    ("Graduate", "Self-employed", "Single", "No"),
    ("High School", "Salaried", "Married", "No"),
    ("Postgraduate", "Salaried", "Single", "Yes"),
]
X = [r[:3] for r in rows]
y = [r[3] for r in rows]

enc = OrdinalEncoder()
Xe = enc.fit_transform(X)

# criterion="entropy" scores each split by information gain, the same rule as ID3
# sklearn grows binary splits, so its tree can look different from the multi-way ID3 tree above
clf = DecisionTreeClassifier(criterion="entropy", random_state=0)
clf.fit(Xe, y)

names = list(enc.get_feature_names_out(["education", "employment", "marital"]))
print(export_text(clf, feature_names=names, decimals=3))`
        },
        {
          type: "tip",
          html: `<p>Number the steps from 1 to 7 and keep the split, the recursion and the stop rule in separate steps. In the numeric part, write the class counts above each entropy so the marker can follow the arithmetic. Finish with a verdict sentence that names the winner and its gain. Draw the partial tree even when the question does not ask, because a labelled root and two leaves take a minute and carry shape marks.</p>`
        }
      ],
      practice: [
        {
          q: "Every row in a training table has the same value for Employment Type. Explain what ID3 does with that attribute, what its information gain is, and why an implementation must guard the gain ratio here.",
          a: `<p>The attribute has one value, so the split creates a single child that contains every row of the parent. Nothing is partitioned, and the child's entropy equals the parent's entropy.</p>
<p>The weighted term is 1 &times; H(S), which cancels H(S), so the gain is exactly 0. ID3 compares gains, sees zero, and never chooses the attribute. In a recursive call the attribute is effectively dead weight, and if every remaining predictor behaves this way, the recursion stops with a majority-class leaf.</p>
<p>The split information is also zero, because &minus;1 log<sub>2</sub>1 = 0. Gain ratio then asks for 0 divided by 0, which is undefined. A sound implementation checks for SI = 0 and falls back to the gain, or skips the attribute before the division. Writing the ratio as a formula without that guard is a common way to lose a mark.</p>`,
          marks: 3,
          diff: "medium"
        },
        {
          q: "Education Level is the root of the loan tree. Take the four Graduate rows and find the next attribute with ID3. Both remaining attributes give the same gain, which is unusual, so explain the tie, choose one, and complete the tree. Then say what the finished tree tells you about the data.",
          a: `<p>The Graduate branch holds rows 1, 3, 6 and 8: (Salaried, Married, Yes), (Self-employed, Married, Yes), (Salaried, Single, Yes) and (Self-employed, Single, No). Three Yes and one No, so H = &minus;(0.75 log<sub>2</sub>0.75 + 0.25 log<sub>2</sub>0.25) = 0.811.</p>
<table class="tbl">
<tr><th>Sl.</th><th>Employment</th><th>Marital</th><th>Approval</th></tr>
<tr><td>1</td><td>Salaried</td><td>Married</td><td>Yes</td></tr>
<tr><td>3</td><td>Self-employed</td><td>Married</td><td>Yes</td></tr>
<tr><td>6</td><td>Salaried</td><td>Single</td><td>Yes</td></tr>
<tr><td>8</td><td>Self-employed</td><td>Single</td><td>No</td></tr>
</table>
<p><b>Employment Type.</b> Salaried holds two rows, both Yes, so H = 0 at weight 0.5. Self-employed holds one Yes and one No, so H = 1 at weight 0.5. Weighted entropy = 0.5, gain = 0.811 &minus; 0.500 = 0.311.</p>
<p><b>Marital Status.</b> Married holds two rows, both Yes, so H = 0 at weight 0.5. Single holds one Yes and one No, so H = 1 at weight 0.5. Weighted entropy = 0.5 again, gain = 0.311.</p>
<p>The tie comes from the shape of these four rows. Each attribute happens to put the two Married Yes rows together and mix the other two, so both produce the same one-pure, one-mixed partition. Their split information is also equal at 1.0, so gain ratio cannot break the tie either. ID3 must fall back on a rule: keep the attribute order given in the table, or pick either one and say so. Take Employment Type.</p>
<p><b>The rest of the tree.</b> Salaried becomes a leaf labelled Yes. Self-employed still holds row 3 (Married, Yes) and row 8 (Single, No), so Marital Status splits it into Married, a Yes leaf, and Single, a No leaf. The full tree reads: Education Level at the root, High School gives No, Postgraduate gives Yes, and Graduate asks about Employment Type, with Salaried giving Yes and Self-employed asking about Marital Status.</p>
<p><b>What it tells you.</b> The tree now classifies all ten training rows correctly, which sounds perfect and is the warning. Three attributes were enough to separate ten rows, so some leaves rest on a single example. The perfect training score is a sign of an overfitted tree on a small table, not proof that it will work on new applicants. State that limitation after the drawing, because it shows you know what a tree score means.</p>`,
          marks: 14,
          diff: "hard"
        }
      ]
    },
    {
      slug: "m3-issues",
      title: "Issues in Decision Tree Learning",
      sources: [
        "https://en.wikipedia.org/wiki/Decision_tree_learning",
        "https://en.wikipedia.org/wiki/ID3_algorithm",
        "https://en.wikipedia.org/wiki/C4.5_algorithm",
        "https://www.geeksforgeeks.org/machine-learning/decision-tree-algorithms/"
      ],
      blocks: [
        {
          type: "definition",
          text: "Decision tree learning runs into overfitting, biased gains, continuous attributes, missing cells, greedy splits, and branches that hold only a handful of rows."
        },
        {
          type: "text",
          html: `<p><b>1. Overfitting.</b> A tree grown to purity memorises noise as well as pattern. Training accuracy reaches 1.0 while a new sample does worse. Two fixes exist. Pre-pruning stops growth early with a depth limit, a minimum number of rows per leaf, or a minimum gain for a split. Post-pruning grows the full tree and then replaces weak subtrees with leaves, keeping the replacement only if accuracy on a separate validation set does not fall. Reduced-error pruning is the version to name.</p>
<p><b>2. Bias toward many-valued attributes.</b> Information gain rewards an attribute that cuts the data into many small pieces, because small pieces tend to look pure. A customer ID wins the comparison and predicts nothing. Gain ratio divides by split information to correct this, and C4.5 also ignores attributes whose gain is below average.</p>
<p><b>3. Continuous attributes.</b> ID3 works on discrete values, so a column such as age or salary has no natural branches. The standard treatment sorts the values, tries a threshold at the midpoint between each pair of neighbours, and keeps the threshold with the best gain. The test becomes "age &le; 34" against "age &gt; 34", a binary split. C4.5 does this automatically, and it costs one sort per attribute per node.</p>
<p><b>4. Missing values.</b> A blank cell can be handled three ways. Drop the row, which is simple and wasteful when blanks are common. Fill the blank with the column's mode or mean, which keeps the row but invents evidence. Or send the row down every branch with a weight equal to that branch's share of the training rows, which is what C4.5 does and what keeps the counts honest. Say which one you mean, because "handle the missing values" on its own earns nothing.</p>
<p><b>5. Greedy search.</b> Each split is chosen for its local gain, so the learner can miss a pair of splits that would have produced a smaller, better tree. Finding the optimal tree is NP-complete, so practical algorithms stay greedy and accept the loss. Pruning and ensembles are the usual compensation.</p>
<p><b>6. Data fragmentation.</b> Every split divides the rows again. After four or five levels a branch may hold three rows, and an entropy computed on three rows is mostly noise. Wide multi-way splits make this worse, because they create many thin branches at once. Set a minimum rows per leaf and prefer gain ratio, which penalises a split that shatters the table.</p>
<p><b>7. Attribute interaction.</b> A tree tests one attribute at a time. When the answer depends on two attributes together, as in XOR, the tree has to repeat the same subtree on both sides of a test, so the pattern costs depth and rows. Combining the two columns into one feature, or using a model that mixes features inside a single unit, avoids the duplication.</p>
<p><b>8. Instability.</b> A small change in the training rows can change the root and therefore the whole tree, which makes the model hard to explain to a committee. Bagging many trees is the standard answer.</p>`
        },
        {
          type: "example",
          html: `<p>An HR team builds a tree to predict attrition from 200 rows and includes the employee number. That column gives one row per branch, so its gain is the full parent entropy and it becomes the root. The tree then scores 100 percent on the training file and fails on every new employee, since the numbers are new. Swap in gain ratio and the column drops out, then add a minimum of ten rows per leaf so the remaining branches are not built from two or three people.</p>`
        },
        {
          type: "tip",
          html: `<p>Give each issue a name, a one-line mechanism and one fix, in that order. Never stop at six names, because a 6-mark question wants the sentence after each name. Use the phrases "memorises the training rows" for overfitting and "many-valued attribute" for the gain bias. Close with one line on pruning, since it answers the follow-up question.</p>`
        }
      ],
      practice: [
        {
          q: "A subtree of a grown tree covers 10 training rows and classifies 9 of them correctly. On a separate validation set of 4 rows it classifies 2 correctly. The majority class of the 10 rows is Yes, and 3 of the 4 validation rows are Yes. Should you replace the subtree with a Yes leaf? Show the comparison and state the rule you are applying.",
          a: `<p>Replace it. The replacement leaf predicts Yes for everything that reaches that point. On the validation rows it would be right on 3 of 4, which is 75 percent, against 50 percent for the subtree. On the training rows it would fall from 9 of 10 to the count of Yes rows, so training accuracy drops while validation accuracy rises.</p>
<table class="tbl">
<tr><th></th><th>Validation correct</th><th>Validation accuracy</th><th>Tree size</th></tr>
<tr><td>Keep subtree</td><td>2 of 4</td><td>0.50</td><td>larger</td></tr>
<tr><td>Replace with leaf</td><td>3 of 4</td><td>0.75</td><td>one node</td></tr>
</table>
<p>The rule is reduced-error pruning: replace a subtree with a leaf when the replacement does not lower accuracy on data the tree was not grown on, and prefer the smaller tree when the two are equal. The training count is not the criterion, which is the whole point of holding validation rows back.</p>
<p>Four validation rows are a thin basis for a decision, so repeat the check over several folds or a larger pruning set before trusting it. Prune bottom-up, because a parent can only be judged after its children have been settled.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m3-perceptron",
      title: "The Perceptron",
      sources: [
        "https://en.wikipedia.org/wiki/Perceptron"
      ],
      blocks: [
        {
          type: "definition",
          text: "A perceptron is one artificial neuron that weights its inputs, adds a bias, and sends the total through a threshold to pick a class."
        },
        {
          type: "text",
          html: `<p><b>The unit.</b> Frank Rosenblatt built the perceptron as a hardware classifier in the late 1950s, and the modern version is a single neuron with a step function. It takes inputs x<sub>1</sub> to x<sub>n</sub>, multiplies each by its own weight w<sub>i</sub>, adds a bias b, and passes the total through a threshold.</p>
<p>z = b + &Sigma; w<sub>i</sub>x<sub>i</sub></p>
<p>y = 1 if z &gt; 0, and y = &minus;1 otherwise.</p>
<p>The bias is a weight on a constant input of 1, so it shifts the decision boundary away from the origin without tilting it. That shift matters: without a bias, a boundary must pass through zero, and some simple patterns become impossible. Some texts use 1 and 0 with the Heaviside step instead of 1 and &minus;1; the arithmetic is the same, but check which convention the question uses before you write an update.</p>
<p><b>Training.</b> Start the weights at zero or small random values. For each training row, compute y and compare it with the target t. If they match, change nothing. If they differ, move every weight toward the correct side:</p>
<p>w<sub>i</sub> &larr; w<sub>i</sub> + &eta;(t &minus; y)x<sub>i</sub>, and b &larr; b + &eta;(t &minus; y)</p>
<p>Here &eta; is the learning rate, a small positive number. With targets of 1 and &minus;1, the factor (t &minus; y) is 2 when the unit is wrong, so each mistake produces a step of size 2&eta; in the input's direction. Repeat over the rows until a full pass makes no mistakes, or until a pass limit is reached.</p>
<p><b>The ceiling.</b> The perceptron convergence theorem says a single unit will find a separating line in a finite number of mistakes if one exists. When the classes overlap or form XOR, no such line exists, and training never settles. That limit is why a hidden layer is needed for non-linear problems. It is also why practical code carries a learning rate and a pass cap.</p>`
        },
        {
          type: "diagram",
          id: "perceptron"
        },
        {
          type: "example",
          html: `<p>A tutor builds a pass predictor with two inputs: attendance as a fraction (x<sub>1</sub>) and study hours per week (x<sub>2</sub>), with weights 0.5 and 0.2 and bias &minus;1.</p>
<p>A student at 0.8 attendance and 6 hours gives z = 0.5(0.8) + 0.2(6) &minus; 1 = 0.4 + 1.2 &minus; 1 = 0.6. Since z &gt; 0, the output is 1, so the unit predicts pass.</p>
<p>A second student at 0.4 attendance and 1 hour should pass, but the unit gives z = 0.2 + 0.2 &minus; 1 = &minus;0.6, so y = &minus;1 and it is wrong. With &eta; = 0.5, the factor t &minus; y is 2, and the update is:</p>
<p>w<sub>1</sub> = 0.5 + 0.5(2)(0.4) = 0.9, w<sub>2</sub> = 0.2 + 0.5(2)(1) = 1.2, b = &minus;1 + 0.5(2)(1) = 0.</p>
<p>The new total for that student is 0.9(0.4) + 1.2(1) + 0 = 1.56, which is positive, so the same row is now classified correctly. One correction fixed one row; the rest of the table still has to be checked, because a change that helps one row can break another.</p>`
        },
        {
          type: "tip",
          html: `<p>Draw inputs, weights on the arrows, a summation circle, the bias entering the circle and a threshold box, then label the output. Write the net input and the output rule under the drawing, followed by the learning rule. Substitute one wrong row into the update so the marker sees that t &minus; y equals 2 for plus and minus one targets. Mention the linearly separable condition, because it explains the ceiling of a single unit.</p>`
        }
      ],
      practice: [
        {
          q: "A perceptron is trained on two classes that overlap, so no straight line separates them. Describe what the weights do during training, why the loop never settles, and two ways to stop or fix it.",
          a: `<p>Every misclassified row pushes the weight vector by &eta;(t &minus; y)x, so the boundary swings toward that row. The next row can pull it back. With no separating line, at least one row is always on the wrong side of whatever boundary the unit currently holds, so the mistakes never stop and the weights keep moving.</p>
<p>The perceptron convergence theorem only promises a finite number of mistakes when the data is linearly separable. With overlap, the cycling theorem says the weights stay bounded but do not settle, so the training error oscillates instead of falling to zero. Watching for "no mistakes in a full pass" as the stop rule means the loop runs forever.</p>
<p>Two practical fixes. Cap the number of passes and keep the weight vector with the lowest training error, which is the pocket algorithm. Or accept the limit and change the model: add a feature that separates the classes, add a hidden layer, or use logistic regression, which returns a probability and trains smoothly on overlapping data. Report the error rate rather than claiming convergence.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A perceptron has weights 0.2 and &minus;0.4, bias 0.1 and learning rate 0.3. It receives x = [1, 1] with target 1 and currently predicts &minus;1. Apply one update, state each new value, and explain what a very large learning rate would do.",
          a: `<p>First the net input: z = 0.2(1) + (&minus;0.4)(1) + 0.1 = &minus;0.1. Since z is not greater than zero, y = &minus;1, which differs from t = 1.</p>
<p>The factor is t &minus; y = 1 &minus; (&minus;1) = 2, and &eta; = 0.3, so the step multiplier is 0.6.</p>
<ul>
<li>w<sub>1</sub> = 0.2 + 0.3(2)(1) = 0.8</li>
<li>w<sub>2</sub> = &minus;0.4 + 0.3(2)(1) = 0.2</li>
<li>b = 0.1 + 0.3(2)(1) = 0.7</li>
</ul>
<p>The new net input is 0.8 + 0.2 + 0.7 = 1.7, which is positive, so the row is now classified correctly.</p>
<p>A large &eta; makes each correction a big jump. The boundary can overshoot, a row that was right becomes wrong, and the weights oscillate instead of settling. A tiny &eta; has the opposite fault: training crawls and may need many passes. Start small, watch the error per pass, and lower &eta; if the error bounces.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m3-activation",
      title: "Activation Functions",
      sources: [
        "https://en.wikipedia.org/wiki/Activation_function"
      ],
      blocks: [
        {
          type: "definition",
          text: "An activation function turns a neuron's net input into its output and supplies the non-linearity a network needs to learn curved boundaries."
        },
        {
          type: "text",
          html: `<p><b>Where it sits.</b> A neuron first builds its net input, then applies the function.</p>
<p>z = &Sigma; w<sub>i</sub>x<sub>i</sub> + b, and y = f(z).</p>
<p>Without a non-linear f, depth buys nothing. Two linear layers collapse into one, because W<sub>2</sub>(W<sub>1</sub>x) = (W<sub>2</sub>W<sub>1</sub>)x, and the product of two matrices is another matrix. The network then draws a straight boundary no matter how many layers you stack. One non-linear layer is enough to approximate a wide class of continuous functions, which is the universal approximation idea.</p>
<table class="tbl">
<tr><th>Function</th><th>Equation</th><th>Range</th><th>Note</th></tr>
<tr><td>Linear</td><td>f(z) = z</td><td>all real numbers</td><td>no non-linearity, used in some output layers</td></tr>
<tr><td>Binary step</td><td>f(z) = 1 if z &ge; 0, else 0</td><td>{0, 1}</td><td>derivative is 0 almost everywhere</td></tr>
<tr><td>Binary sigmoid</td><td>f(z) = 1 / (1 + e<sup>&minus;z</sup>)</td><td>(0, 1)</td><td>smooth, derivative f(1 &minus; f)</td></tr>
<tr><td>Bipolar sigmoid</td><td>f(z) = 2 / (1 + e<sup>&minus;z</sup>) &minus; 1</td><td>(&minus;1, 1)</td><td>equals tanh(z/2), the binary curve shifted and stretched</td></tr>
<tr><td>tanh</td><td>f(z) = (e<sup>z</sup> &minus; e<sup>&minus;z</sup>) / (e<sup>z</sup>&nbsp;+&nbsp;e<sup>&minus;z</sup>)</td><td>(&minus;1, 1)</td><td>zero-centred, derivative 1 &minus; f<sup>2</sup></td></tr>
<tr><td>ReLU</td><td>f(z) = max(0, z)</td><td>[0, &infin;)</td><td>cheap, no saturation for positive z</td></tr>
<tr><td>Gaussian</td><td>f(z) = e<sup>&minus;z<sup>2</sup></sup></td><td>(0, 1]</td><td>peaks at z = 0, used in radial basis networks</td></tr>
</table>
<p><b>Reading the table.</b> The two sigmoids are the same S curve on different scales. The binary version squashes everything into 0 to 1, which suits a probability. The bipolar version and tanh run from &minus;1 to 1, which keeps the output centred and is why hidden layers often prefer them. The step function decides, but it cannot teach, because its derivative is zero on both sides and undefined at the jump. A gradient method multiplies by that derivative, so a step unit passes no learning signal back.</p>
<p><b>The cost of smoothness.</b> The sigmoid derivative peaks at 0.25 and shrinks toward zero for large positive or negative z. Stack several layers and the product of those small numbers fades, which is the vanishing gradient. ReLU avoids the fade on the positive side and became the default for deep networks, at the price of a kink at zero.</p>`
        },
        {
          type: "example",
          html: `<p>A neuron receives inputs [0.5, 0.7, 0.1] with weights [0.4, 0.6, 0.3] and bias 0.5.</p>
<p>z = 0.4(0.5) + 0.6(0.7) + 0.3(0.1) + 0.5 = 0.20 + 0.42 + 0.03 + 0.50 = 1.15.</p>
<p><b>Binary sigmoid.</b> e<sup>&minus;1.15</sup> = 0.3166, so f = 1 / (1 + 0.3166) = <b>0.7595</b>. The value sits between 0 and 1, as it must.</p>
<p><b>tanh.</b> e<sup>1.15</sup> = 3.1582, so f = (3.1582 &minus; 0.3166) / (3.1582 + 0.3166) = 2.8416 / 3.4748 = <b>0.8178</b>.</p>
<p>If the question also asks for the bipolar sigmoid, use 2(0.7595) &minus; 1 = 0.5190, which is the same as tanh(1.15 / 2) = tanh(0.575). Both answers are positive, but they are not the same number, so label them clearly and keep four decimals.</p>`
        },
        {
          type: "tip",
          html: `<p>Answer in triples: name, equation, range. That shape fits 3 marks and repeats cleanly for as many functions as the question lists. When a numeric output is asked, show z before substituting it into the function. Keep the two sigmoids apart, because the binary one stops at 1 while the bipolar one runs from minus one to plus one. Round to four decimals and attach each result to its function name.</p>`
        }
      ],
      practice: [
        {
          q: "A network uses f(z) = z in every layer, including the output. Show why three such layers behave like one, name the property that is lost, and give one pattern the network can no longer learn.",
          a: `<p>Write the three layers as y = W<sub>3</sub>(W<sub>2</sub>(W<sub>1</sub>x)). Matrix multiplication is associative, so this equals (W<sub>3</sub>W<sub>2</sub>W<sub>1</sub>)x, and the product is a single matrix W. The whole network is y = Wx, which is one linear layer with a different set of weights.</p>
<p>The lost property is non-linearity. Every decision boundary stays a straight line or plane in the input space, so the extra layers cannot bend it, and depth adds parameters without adding expressive power.</p>
<p>XOR is the standard example. No single straight line separates (0,1) and (1,0) from (0,0) and (1,1), so the collapsed network cannot learn it. A non-linear hidden activation, followed by a linear output, can.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "The step function worked for the perceptron. Explain why training a hidden layer needs a smooth activation instead, using the derivative, and state the cost that the sigmoid brings in a deep stack.",
          a: `<p>Gradient training asks how the error changes when a weight moves a little, so it needs the derivative of the activation. The step function is flat on both sides, with derivative 0, and undefined at the jump. A hidden unit using it therefore passes back zero, the weight receives no direction, and no amount of data fixes the layer. The perceptron rule escapes this only because it learns from the label on a mistake and never differentiates anything.</p>
<p>The sigmoid is smooth everywhere. Its derivative is f(z)(1 &minus; f(z)), which peaks at 0.25 when z = 0 and approaches 0 as z grows large in either direction. The backward pass multiplies these derivatives layer by layer, so a deep stack of sigmoids multiplies several numbers below 0.25 and the gradient shrinks toward zero. Early layers then learn far more slowly than late ones, which is the vanishing gradient.</p>
<p>ReLU keeps a derivative of 1 for positive z, so the signal survives the trip back. The price is a kink at zero and dead units for negative z, which is why leaky variants exist.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m3-backprop",
      title: "Backpropagation Training",
      sources: [
        "https://en.wikipedia.org/wiki/Backpropagation",
        "https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/"
      ],
      blocks: [
        {
          type: "definition",
          text: "Backpropagation trains a multilayer feed-forward network by sending the output error backwards and using each weight's share of it to update the weight."
        },
        {
          type: "text",
          html: `<p><b>Forward, then backward.</b> Backpropagation is the gradient method for a multilayer feed-forward network. The forward pass computes a prediction. The backward pass computes how much each weight contributed to the error, then gradient descent moves each weight a small step against that contribution. Strictly, backpropagation computes the gradient and the optimiser applies it; exams use the word for the whole loop, which is fine as long as the two halves are named.</p>
<p><b>Forward.</b> For each layer, z = W a + b and a = f(z), starting from the input row and ending at the output. Keep every z and every a, because the backward pass needs them.</p>
<p><b>Error.</b> With one output and a squared-error loss, E = &frac12;(t &minus; y)<sup>2</sup>. For a sigmoid output, the output delta folds the loss and the derivative into one term:</p>
<p>&delta;<sub>o</sub> = (y &minus; t) y (1 &minus; y)</p>
<p><b>Backward.</b> A hidden unit has no target of its own, so it collects the deltas of the units it feeds, weighted by the connections:</p>
<p>&delta;<sub>h</sub> = f&prime;(z<sub>h</sub>) &Sigma; w<sub>ho</sub> &delta;<sub>o</sub></p>
<p><b>Update.</b> Every weight then moves against its gradient:</p>
<p>w &larr; w &minus; &eta; &delta;<sub>j</sub> a<sub>i</sub>, where a<sub>i</sub> is the input the weight multiplied.</p>
<p>The order matters. The output deltas must exist before a hidden delta can be formed, so the pass runs from the output layer back to the input layer. Update after the deltas for that layer are known, and use the same weights for the whole backward pass, or the arithmetic mixes two different networks.</p>
<p><b>Training settings.</b> The learning rate &eta; sets the step size: too large and the error bounces or diverges, too small and training crawls. One epoch is one full pass over the training set. Online training updates after each row, batch training sums the gradients over all rows and updates once, and mini-batches sit in between. Training stops when the validation error stops improving, not when the training error reaches zero.</p>
<p><b>Limits.</b> The error surface is not convex, so gradient descent can stop in a local minimum or on a flat plateau. Saturating activations shrink the gradient in deep stacks. Normalising the inputs and choosing ReLU for hidden layers are the usual remedies.</p>`
        },
        {
          type: "diagram",
          id: "mlp"
        },
        {
          type: "example",
          html: `<p>An output neuron has just produced y = 0.7595 for a row whose target is 1. The weight from the last hidden unit into this neuron is 0.4, that hidden unit's output is 0.6, and the learning rate is 0.5.</p>
<p>Output delta: &delta;<sub>o</sub> = (0.7595 &minus; 1)(0.7595)(1 &minus; 0.7595) = (&minus;0.2405)(0.1827) = &minus;0.0439.</p>
<p>Gradient for the weight: &delta;<sub>o</sub> &times; a<sub>hidden</sub> = &minus;0.0439 &times; 0.6 = &minus;0.0264.</p>
<p>Update: w = 0.4 &minus; 0.5(&minus;0.0264) = 0.4 + 0.0132 = 0.4132.</p>
<p>The weight rises because the output was below the target and a larger weight on a positive input pushes it up. The change is small on purpose. One update is a single step, not a trained network, and the next row may pull the same weight the other way.</p>`
        },
        {
          type: "tip",
          html: `<p>Split the page into Forward and Backward before writing anything. Number the order as forward pass, output error, output delta, hidden delta, weight update, and never update a weight before its delta exists. Draw the network with the layers labelled and put the error arrow pointing backwards. Name the learning rate in the update line, because the marker looks for it.</p>`
        }
      ],
      practice: [
        {
          q: "In a two-layer network, explain why the hidden layer's delta cannot be computed until the output layer's delta is known, what the forward pass must keep for the backward pass, and what goes wrong if you update the output weights first.",
          a: `<p>A hidden weight has no direct line to the error. It matters only through the units it feeds, so its gradient is the sum of the downstream deltas, each weighted by its connection, multiplied by the derivative of its own activation. Write it as &delta;<sub>h</sub> = f&prime;(z<sub>h</sub>) &Sigma; w<sub>ho</sub>&delta;<sub>o</sub>. The sum cannot be evaluated until every &delta;<sub>o</sub> exists, which is why the computation starts at the output and moves left.</p>
<p>The forward pass must cache, for every unit, either its net input z or its output a, because f&prime; is evaluated at that value. It must also keep the weights used, because the hidden sum multiplies them. Recomputing them or reading updated values would mix two different networks in one gradient.</p>
<p>If you update the output weights before forming the hidden delta, the backward sum uses weights that no longer produced the output you measured. The gradient then belongs to neither the old nor the new network, and the step can point the wrong way. Form all deltas first, then apply all updates, or apply them per layer from the output backwards while keeping the old weights for the remaining sums. In batch training, accumulate the gradients over the rows and update once at the end.</p>`,
          marks: 7,
          diff: "hard"
        },
        {
          q: "Training error falls every epoch while validation error falls for a while and then rises. Name the problem, explain what an epoch is, and give two changes that would address it.",
          a: `<p>The network is overfitting. It keeps fitting the training rows, including their noise, while its performance on rows it has not seen gets worse. The gap between the two curves is the signal, and the best checkpoint is near the point where validation error turns upward.</p>
<p>An epoch is one complete pass over the training set, during which every row is used once and the weights are updated according to the chosen batch size. Ten epochs mean ten passes. An epoch is not a fixed amount of learning, because the step size also depends on the learning rate and the batch size.</p>
<p>Two changes help. Use early stopping: keep the weights from the epoch with the lowest validation error and stop when it has not improved for several epochs. Add regularisation, such as weight decay or dropout, so the network cannot rely on narrow coincidences in the training rows. More data or a smaller network would help for the same reason, since both reduce the capacity to memorise.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    }
  ]
};
