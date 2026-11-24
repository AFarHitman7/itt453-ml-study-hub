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
          text: "A decision tree learns from labelled examples, then follows feature tests to a leaf that predicts a class or a number."
        },
        {
          type: "text",
          html: `<h4>The four parts</h4><p>Read a decision tree from the top down, like a flowchart. The <b>root node</b> holds all training rows and asks the first question. An <b>internal node</b> tests one attribute, and a <b>branch</b> is one answer to that test.</p>
<p>A <b>leaf</b> gives the prediction. A full path becomes a rule: if attendance is good and study hours are high, predict pass.</p>
<h4>How the tree grows</h4><p>The learner uses <b>recursive partitioning</b>, also called top-down induction. At each node it scores the unused attributes, picks the best split, and divides the rows by that attribute's values. It then repeats the step on each child.</p>
<p>Growth stops when all rows in a node share a class, no attributes remain, or a subset is empty. A mixed node with no attributes left predicts its majority class. An empty child uses its parent's majority class.</p>
<p>The search is <b>greedy</b>: each split is chosen for its score now, without checking the whole future tree.</p>
<h4>Classification and regression trees</h4><p>The target column decides which kind you have. The algorithm does not.</p>
<table class="tbl">
<tr><th></th><th>Classification tree</th><th>Regression tree</th></tr>
<tr><td>Target</td><td>a class or label</td><td>a continuous number</td></tr>
<tr><td>Leaf holds</td><td>class label, or class counts</td><td>mean of the training values in that leaf</td></tr>
<tr><td>Split score</td><td>entropy, Gini, gain ratio</td><td>reduction in squared error (variance)</td></tr>
<tr><td>Example</td><td>spam or not spam</td><td>house price, delivery minutes</td></tr>
</table>
<h4>Names and leaf evidence</h4><p><b>Classification and regression tree (CART)</b> is an umbrella term for both kinds. ID3, C4.5 and CART are tree-building algorithms, not separate tree types. A random forest or boosted tree combines many trees, so it is an ensemble.</p><p>A leaf may show class counts instead of only a label. For example, “3 Yes, 1 No” shows how many training rows support the prediction.</p>`
        },
        {
          type: "example",
          html: `<h4>Follow one delivery</h4><p>A courier company wants to flag late deliveries. Its training table holds distance, weather, time of day and a late flag. The company grows a depth-three tree from last year's trips.</p>
<p>A new order is 32 km away and the rain is heavy. It follows two branches to a leaf marked “late, 11 of 14 rows.” The dispatcher sees the prediction and the count behind it.</p>
<p>The target is yes or no, so this is a classification tree.</p>`
        },
        {
          type: "tip",
          html: `<h4>Build an exam answer</h4><p>Sketch the root at the top. Label the root, internal node, branch and leaf, then explain each in a sentence. For a 3-mark question, compare classification and regression in a two-row table and state what each leaf stores.</p><p>For a longer answer, add how recursive partitioning grows the tree. If asked only for tree types, keep the focus there rather than spending most of the answer on ID3.</p>`
        }
      ],
      practice: [
        {
          q: "A courier company predicts delivery time in minutes from distance, weather and time of day. Is its tree a classification or regression tree? Explain what each leaf stores and which split criterion to use.",
          a: `<h4>Identify the tree</h4><p>This is a regression tree because its target, delivery time, is a continuous number. Each leaf stores the mean time for the training rows that reach it. A leaf could read “38 minutes, 12 rows.”</p>
<h4>Choose a split</h4><p>Use reduction in squared error. First, find each row's difference from the node's mean time, square it, and add the squares.</p>
<p>After a candidate split, calculate the same error in each child and take their weighted average. The split that removes the most squared error wins.</p>
<p>Entropy and Gini score class labels, so they do not fit a numeric target unless you first turn minutes into ranges. Binning loses the order and detail in the original times.</p>
<h4>If the target changes</h4><p>If the company instead predicts “late” or “not late,” the target is a class. The leaves then hold labels, and entropy is a suitable split score.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A loan officer's tree first asks whether the amount exceeds 5000. If yes, it approves existing customers and rejects others. If no, it approves applicants who repaid on time last year and rejects others. Write all four rules. Predict for an existing customer requesting 8000 with an on-time record, and explain what the leaf does not reveal.",
          a: `<h4>Write one rule per leaf</h4><ol>
<li>Amount above 5000 and existing customer: approve.</li>
<li>Amount above 5000 and not an existing customer: reject.</li>
<li>Amount 5000 or less and repaid on time last year: approve.</li>
<li>Amount 5000 or less and did not repay on time last year: reject.</li>
</ol>
<h4>Classify the applicant</h4><p>The applicant asks for 8000 and is an existing customer. They follow “yes” at the amount test and “yes” at the customer test, reaching rule 1: approve. The on-time record does not affect this path.</p>
<h4>What the leaf leaves out</h4><p>A leaf gives a decision, not its confidence. A bare label does not show how many applicants followed the path or whether their labels were mixed.</p><p>Two rows and two thousand rows could both appear as “approve.” Store class counts or probabilities when the officer needs that evidence.</p><p>For a combination absent from training, the tree still follows its tests. At a missing child, it uses the majority class of the parent.</p>`,
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
          text: "Entropy measures how mixed a node's classes are, information gain measures the mix a split removes, and gain ratio divides gain by split information."
        },
        {
          type: "text",
          html: `<h4>Entropy: how mixed is this node?</h4><p>Picture a node as a bag of labelled rows. If every row has the same label, you can guess the label with no uncertainty. If the labels are evenly mixed, a guess is a coin toss.</p>
<p>Entropy turns that feeling into a number. It is a measure of impurity. A pure bag scores 0, and a bag with two equal classes scores 1, the most mixed case for two classes. Entropy falls as the labels become more one-sided.</p>
<p>H(S) = &minus;&Sigma; p<sub>i</sub> log<sub>2</sub>(p<sub>i</sub>)</p>
<p>Here <b>S</b> is the set of rows, <b>i</b> names a class, and <b>p<sub>i</sub></b> is that class's fraction of the rows. A pure node has H = 0 because its only term is &minus;1 log<sub>2</sub>1 = 0.</p>
<p>With c classes the maximum is log<sub>2</sub>c, so four equally sized classes give 2 bits.</p>
<h4>Information gain: how much did a split help?</h4><p>A split turns the parent into children, and each child has its own entropy. A big child should count for more than a small one.</p>
<p>So multiply each child's entropy by its share of the rows, then add these figures. That sum is a weighted average of the child entropies.</p>
<p>IG(S, A) = H(S) &minus; &Sigma;<sub>v</sub> (|S<sub>v</sub>| / |S|) H(S<sub>v</sub>)</p>
<p>In the formula, <b>A</b> is the attribute, <b>v</b> is one of its values, and <b>S<sub>v</sub></b> is the child holding the rows with that value. The fraction |S<sub>v</sub>| / |S| is the child's share.</p>
<p>Subtract the weighted average from the parent's entropy. The answer is the gain, and it is never negative because the children cannot be more mixed than the parent. ID3 picks the attribute with the largest gain.</p>
<h4>Why plain gain can mislead</h4><p>Suppose each row has its own customer number. The split makes one child per row, and every child is pure with entropy 0. The weighted average is 0, so the gain equals all of the parent's entropy.</p>
<p>The number looks perfect, but a new customer brings a number the tree has never seen.</p>
<h4>Gain ratio: account for the split size</h4><p>Split information measures how widely an attribute divides the rows. An attribute that shaves the data into many tiny pieces gets a large value.</p>
<p>SI(A) = &minus;&Sigma;<sub>v</sub> (|S<sub>v</sub>| / |S|) log<sub>2</sub>(|S<sub>v</sub>| / |S|)</p>
<p>Gain ratio = IG(A) / SI(A). For ten unique customer numbers, SI = log<sub>2</sub>10 = 3.32, which pulls the ratio down.</p>
<p>C4.5 first drops attributes with below-average gain, then compares ratios. This guard matters because a tiny denominator can make a weak split look good.</p>
<p>If an attribute has one value, SI = 0 and the ratio is undefined. Its gain is also 0, so use gain or skip the attribute.</p>
<h4>Gini as another impurity score</h4><p>Gini(S) = 1 &minus; &Sigma; p<sub>i</sub><sup>2</sup>. It is 0 for a pure node and 0.5 for two equally sized classes. CART uses it because it needs no logarithm, and it usually ranks attributes much like entropy does.</p>
<table class="tbl">
<tr><th>log<sub>2</sub></th><th>value</th><th>log<sub>2</sub></th><th>value</th><th>log<sub>2</sub></th><th>value</th></tr>
<tr><td>0.2</td><td>&minus;2.322</td><td>0.4</td><td>&minus;1.322</td><td>0.6</td><td>&minus;0.737</td></tr>
<tr><td>0.25</td><td>&minus;2.000</td><td>0.5</td><td>&minus;1.000</td><td>0.7</td><td>&minus;0.515</td></tr>
<tr><td>0.3</td><td>&minus;1.737</td><td>0.75</td><td>&minus;0.415</td><td>0.8</td><td>&minus;0.322</td></tr>
</table>`
        },
        {
          type: "example",
          html: `<h4>Start with the parent</h4><p>There are eight emails: four spam and four normal. The classes are even, so the parent entropy is H(S) = 1 bit.</p>
<p>“Contains a link” makes one child of five emails (four spam, one normal) and another of three (all normal).</p>
<h4>Calculate the link split</h4><p>H(link) = &minus;(0.8 log<sub>2</sub>0.8 + 0.2 log<sub>2</sub>0.2) = 0.722. H(no link) = 0 because that child is pure.</p>
<p>Weight each child by its share: (5/8)(0.722) + (3/8)(0) = 0.451. Gain = 1 &minus; 0.451 = 0.549.</p>
<h4>Compare with known sender</h4><p>“Known sender” creates six rows (two spam, four normal) and two spam rows. Its weighted entropy is (6/8)(0.918) = 0.689, so its gain is 0.311. The link split wins.</p>
<p>The ratio check agrees: link SI = 0.954 and ratio 0.575; sender SI = 0.811 and ratio 0.384.</p>`
        },
        {
          type: "tip",
          html: `<h4>Show the arithmetic clearly</h4><p>Start a numeric answer with H(S), even when asked only for gain. Write the child fractions in the weighted sum so the reader can see each child's contribution. Put candidate gains in a small table and state the winner in a sentence.</p><p>Round logarithms to three decimals and state “bits” once. A written calculation is easier to check than a jump straight to the final total.</p>`
        }
      ],
      practice: [
        {
          q: "Add a unique customer number to each row of the ten-row loan table. Explain why information gain favours this column and show how split information changes its ranking against Education Level.",
          a: `<h4>Why the customer number wins on gain</h4><p>Give each of the ten applicants a different number. The split creates ten one-row subsets. Each subset is pure, so every H(S<sub>v</sub>) is 0 and the weighted child entropy is 0. Gain is the full parent entropy, 0.971, higher than Education Level's 0.646. Yet the number says nothing useful about a new applicant.</p>
<h4>Use split information to compare fairly</h4><p>Ten equal subsets give SI = &minus;10 &times; 0.1 log<sub>2</sub>0.1 = log<sub>2</sub>10 = 3.322. The customer-number ratio is 0.971 / 3.322 = 0.292. Education Level's ratio is 0.646 / 1.571 = 0.411, so it ranks higher.</p>
<h4>Why C4.5 adds a guard</h4><p>Many small branches make the denominator large, which lowers the ratio. C4.5 first keeps attributes with at least average gain, then chooses the best ratio among them. Without that filter, a split with very uneven branches can have a small denominator and an inflated ratio despite explaining little.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "Five deliveries have late flags: four are on time and one is late. Weather splits them into three clear days, all on time, and two rainy days, one on time and one late. Calculate the parent entropy, each child entropy and the split's information gain.",
          a: `<h4>1. Entropy before the split</h4><p>Four of five deliveries are on time and one is late, so the class fractions are 0.8 and 0.2.</p><p>H(S) = &minus;(0.8 log<sub>2</sub>0.8 + 0.2 log<sub>2</sub>0.2) = &minus;(0.8 &times; &minus;0.322 + 0.2 &times; &minus;2.322) = 0.258 + 0.464 = 0.722 bits.</p>
<h4>2. Entropy in each child</h4><p>All three clear-day deliveries are on time, so H(clear) = 0. The rainy child has one row from each class, so H(rain) = 1.</p>
<h4>3. Weighted entropy and gain</h4><p>The clear child has 3/5 of the rows and the rainy child has 2/5. Weighted entropy = (3/5)(0) + (2/5)(1) = 0.4. Gain = 0.722 &minus; 0.4 = 0.322 bits.</p><p>The gain is positive but based on only five deliveries. Check more rows before treating this small-table result as reliable evidence.</p>`,
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
          text: "ID3 builds a decision tree by choosing the highest-gain attribute at each node and repeating the process on its child subsets."
        },
        {
          type: "text",
          html: `<h4>Name and core idea</h4><p>ID3 means Iterative Dichotomiser 3. Ross Quinlan published it in 1986; it is the direct ancestor of C4.5. The “3” marks his third attempt at an entropy-based learner. Despite its name, ID3 can split a multi-valued attribute into three or more branches.</p><p>At each node, ID3 chooses the attribute that removes the most uncertainty, splits rows by its values, then repeats on each child.</p>
<h4>ID3, step by step</h4>
<ol>
<li>Place the full training set at the root.</li>
<li>Compute H(S) for the current set.</li>
<li>Compute the information gain of every attribute that has not been used on the path above.</li>
<li>Select the attribute with the largest gain and make it a decision node.</li>
<li>Split S into subsets, one per value of that attribute.</li>
<li>Recurse on each non-empty subset with the attribute removed.</li>
<li>Stop when a subset is pure, when no attributes remain, or when the subset is empty.</li>
</ol>
<h4>What each stopping rule means</h4><p>A pure subset becomes a leaf with its class. If rows remain but no attributes do, use the majority class. If a subset is empty, use the parent's majority class because the empty child has no evidence of its own.</p>
<h4>Limits and comparison</h4><p>ID3 is greedy: each step can be locally good without producing the smallest whole tree. Finding the globally optimal tree is NP-complete. ID3 can overfit small or noisy tables, needs categorical values, and has no built-in missing-value method.</p><p>C4.5 adds gain ratio, continuous splits, missing-value handling and pruning. These are useful points to contrast in an exam answer.</p>`
        },
        {
          type: "example",
          html: `<h4>Worked ID3 example: loan approval</h4><p>The predictors are Education Level, Employment Type and Marital Status. Loan Approval is the target.</p>
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
<h4>Step 1: parent entropy</h4><p>There are six Yes and four No rows. H(S) = &minus;(0.6 log<sub>2</sub>0.6 + 0.4 log<sub>2</sub>0.4) = 0.442 + 0.529 = 0.971 bits.</p>
<h4>Step 2: Education Level</h4><p>Graduate has 3 Yes and 1 No, so H = 0.811. High School has 0 Yes and 3 No; Postgraduate has 3 Yes and 0 No. Both are pure, with H = 0.</p>
<table class="tbl">
<tr><th>Value</th><th>Rows</th><th>Yes</th><th>No</th><th>H</th><th>Weight</th><th>Weight &times; H</th></tr>
<tr><td>Graduate</td><td>4</td><td>3</td><td>1</td><td>0.811</td><td>0.4</td><td>0.324</td></tr>
<tr><td>High School</td><td>3</td><td>0</td><td>3</td><td>0</td><td>0.3</td><td>0</td></tr>
<tr><td>Postgraduate</td><td>3</td><td>3</td><td>0</td><td>0</td><td>0.3</td><td>0</td></tr>
</table>
<h4>Step 3: Education gain</h4><p>Weighted entropy = 0.324, so gain = 0.971 &minus; 0.324 = <b>0.646</b> using unrounded values. Subtracting the displayed rounded values gives 0.647; keep extra digits during the calculation to avoid this rounding difference.</p>
<h4>Step 4: Employment Type</h4><p>Salaried has 4 Yes and 2 No, giving H = 0.918 at weight 0.6. Self-employed has 2 Yes and 2 No, giving H = 1 at weight 0.4. Weighted entropy = 0.551 + 0.400 = 0.951; gain = <b>0.020</b>.</p>
<h4>Step 5: Marital Status</h4><p>Married has 4 Yes and 1 No, giving H = 0.722 at weight 0.5. Single has 2 Yes and 3 No, giving H = 0.971 at weight 0.5. Weighted entropy = 0.361 + 0.485 = 0.846; gain = <b>0.124</b>.</p>
<table class="tbl">
<tr><th>Attribute</th><th>Weighted entropy</th><th>Information gain</th><th>Split information</th><th>Gain ratio</th></tr>
<tr><td>Education Level</td><td>0.324</td><td>0.646</td><td>1.571</td><td>0.411</td></tr>
<tr><td>Employment Type</td><td>0.951</td><td>0.020</td><td>0.971</td><td>0.021</td></tr>
<tr><td>Marital Status</td><td>0.846</td><td>0.124</td><td>1.000</td><td>0.124</td></tr>
</table>
<h4>Step 6: choose the root</h4><p>Education Level has the highest gain, 0.646, and the highest gain ratio. It becomes the root. Two of its three branches are pure, so only the four Graduate rows need another test.</p>`
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
          html: `<h4>Present the algorithm and calculation</h4><p>Number the ID3 steps. Keep choosing a split, recursing on children and stopping as separate actions. For calculations, write class counts before each entropy so the arithmetic is easy to follow.</p><p>End by naming the winning attribute and its gain. A small labelled tree can make the result clearer, even when the question does not require a drawing.</p>`
        }
      ],
      practice: [
        {
          q: "Every training row has the same Employment Type. Explain how this affects an ID3 split and its information gain. Why must an implementation check the gain ratio before dividing?",
          a: `<h4>What the split does</h4><p>One attribute value creates one child containing every parent row. No partition occurs, so the child's entropy equals the parent's.</p><h4>Information gain</h4><p>The weighted child entropy is 1 &times; H(S). It cancels the parent entropy, leaving gain = 0. ID3 will not select this attribute over one with positive gain. If all remaining attributes have this form, ID3 makes a majority-class leaf.</p><h4>Why the ratio needs a guard</h4><p>Split information is zero because &minus;1 log<sub>2</sub>1 = 0. The gain ratio would be 0/0, which is undefined. An implementation must check SI = 0 and skip the ratio or fall back to gain.</p>`,
          marks: 3,
          diff: "medium"
        },
        {
          q: "Education Level is the loan tree's root. For its four Graduate rows, calculate ID3 gains for the remaining attributes. Explain their tie, choose an attribute and complete the tree. What does the finished tree tell you about the data?",
          a: `<h4>1. Set up the Graduate subset</h4><p>The Graduate branch holds rows 1, 3, 6 and 8: (Salaried, Married, Yes), (Self-employed, Married, Yes), (Salaried, Single, Yes) and (Self-employed, Single, No). There are three Yes and one No, so H = &minus;(0.75 log<sub>2</sub>0.75 + 0.25 log<sub>2</sub>0.25) = 0.811.</p>
<table class="tbl">
<tr><th>Sl.</th><th>Employment</th><th>Marital</th><th>Approval</th></tr>
<tr><td>1</td><td>Salaried</td><td>Married</td><td>Yes</td></tr>
<tr><td>3</td><td>Self-employed</td><td>Married</td><td>Yes</td></tr>
<tr><td>6</td><td>Salaried</td><td>Single</td><td>Yes</td></tr>
<tr><td>8</td><td>Self-employed</td><td>Single</td><td>No</td></tr>
</table>
<h4>2. Calculate both candidate gains</h4><p><b>Employment Type:</b> Salaried has two Yes rows, so H = 0 at weight 0.5. Self-employed has one Yes and one No, so H = 1 at weight 0.5. Weighted entropy = 0.5; gain = 0.811 &minus; 0.500 = 0.311.</p><p><b>Marital Status:</b> Married has two Yes rows, so H = 0 at weight 0.5. Single has one Yes and one No, so H = 1 at weight 0.5. Weighted entropy = 0.5; gain = 0.311.</p>
<h4>3. Explain and resolve the tie</h4><p>Both attributes create one pure child and one mixed child of the same size, so their gains match. They group different rows together: Salaried contains rows 1 and 6, while Married contains rows 1 and 3. Split information is 1.0 for both, so gain ratio cannot break the tie.</p><p>ID3 needs a tie rule: follow the table's attribute order or choose either attribute and say which. We choose Employment Type.</p>
<h4>4. Complete the tree</h4><p>Salaried becomes a Yes leaf. Self-employed contains row 3 (Married, Yes) and row 8 (Single, No), so split it on Marital Status. Married gives Yes and Single gives No. The full tree starts with Education Level: High School gives No, Postgraduate gives Yes, and Graduate tests Employment Type. Salaried gives Yes; Self-employed tests Marital Status.</p>
<h4>5. Interpret the result</h4><p>The tree classifies all ten training rows correctly, but some leaves rely on one example. A perfect training score on this small table can indicate overfitting. It does not prove the tree will work on new applicants.</p>`,
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
          text: "Decision trees can overfit, favour many-valued attributes, and struggle with continuous or missing values and branches with few rows."
        },
        {
          type: "text",
          html: `<h4>1. Overfitting</h4><p>A tree grown until every leaf is pure can memorise noise as well as useful patterns. It may score 1.0 on training data but do worse on new rows.</p><p><b>Pre-pruning</b> stops growth early, for example with a depth limit, minimum leaf size or minimum gain. <b>Post-pruning</b> first grows the tree, then replaces weak subtrees with leaves if validation accuracy does not fall. Reduced-error pruning is one post-pruning method.</p>
<h4>2. Bias toward many-valued attributes</h4><p>Information gain can favour an attribute that creates many small groups, since small groups often look pure. A customer ID can win despite predicting nothing useful. Gain ratio divides gain by split information; C4.5 also filters out attributes with below-average gain.</p>
<h4>3. Continuous attributes</h4><p>ID3 expects discrete values, so age or salary needs a threshold. Sort the values, test midpoints between neighbours, then keep the threshold with the best gain. For example, “age &le; 34” versus “age &gt; 34” makes a binary split. C4.5 does this automatically and sorts each attribute at each node.</p>
<h4>4. Missing values</h4><p>One option is to drop rows with blanks, which wastes data when blanks are common. Another is to fill a blank with the column's mode or mean, though this invents a value. C4.5 can instead send a row down each branch with a weight based on that branch's share of training rows. State which method you mean.</p>
<h4>5. Greedy search</h4><p>A split with the best local gain can block a better whole-tree arrangement. Finding the globally optimal tree is NP-complete, so practical learners use greedy search. Pruning and ensembles can reduce the cost of that choice.</p>
<h4>6. Data fragmentation</h4><p>Each split leaves fewer rows in each branch. After several levels, a branch may contain only three rows, so its entropy estimate is noisy. Multi-way splits can create many thin branches at once. Set a minimum leaf size and consider gain ratio to avoid shattering the table.</p>
<h4>7. Attribute interaction</h4><p>A tree tests one attribute at a time. For an XOR pattern, the useful answer depends on two attributes together, so the tree repeats a subtree on both sides of a test. That costs depth and rows. A combined feature or a model that mixes features inside a unit can avoid the repetition.</p>
<h4>8. Instability</h4><p>A few changed training rows can change the root and much of the rest of the tree. This makes explanations less stable. Bagging many trees is a standard response.</p>`
        },
        {
          type: "example",
          html: `<h4>Employee numbers create a misleading split</h4><p>An HR team predicts attrition from 200 rows and includes employee number. Each number identifies one row, so its split has the full parent entropy as gain and becomes the root.</p><p>The tree scores 100 percent on the training file but cannot use new employee numbers. Gain ratio reduces the appeal of that column. A minimum of ten rows per leaf also prevents branches from relying on only two or three people.</p>`
        },
        {
          type: "tip",
          html: `<h4>Structure an answer about tree limits</h4><p>For each issue, name it, explain how it happens, then give a fix. A list of names alone does not explain the problem. Use “memorises the training rows” for overfitting and “many-valued attribute” for gain bias.</p><p>For a longer response, include pruning and explain how it controls tree growth.</p>`
        }
      ],
      practice: [
        {
          q: "A subtree correctly classifies 9 of 10 training rows and 2 of 4 separate validation rows. Its training majority class is Yes; 3 of the 4 validation rows are Yes. Should a Yes leaf replace the subtree? Compare the results and name the pruning rule.",
          a: `<h4>Compare validation performance</h4><p>Replace the subtree with a Yes leaf. The leaf gets 3 of 4 validation rows right, or 75 percent. The subtree gets 2 of 4 right, or 50 percent. On training data, the leaf may score below the subtree's 9 of 10 because it predicts Yes for every row.</p>
<table class="tbl">
<tr><th></th><th>Validation correct</th><th>Validation accuracy</th><th>Tree size</th></tr>
<tr><td>Keep subtree</td><td>2 of 4</td><td>0.50</td><td>larger</td></tr>
<tr><td>Replace with leaf</td><td>3 of 4</td><td>0.75</td><td>one node</td></tr>
</table>
<h4>Apply reduced-error pruning</h4><p>Replace a subtree when the leaf does not lower accuracy on held-out validation data. If both versions tie, prefer the smaller tree. Training accuracy is not the pruning criterion; validation rows were held back to test generalisation.</p><p>Four validation examples are few, so repeat the check across folds or use a larger pruning set. Prune from the bottom up so each parent is judged after its children.</p>`,
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
          text: "A perceptron is a single artificial neuron that combines weighted inputs and a bias, then uses a threshold to choose a class."
        },
        {
          type: "text",
          html: `<h4>One neuron makes a decision</h4><p>Frank Rosenblatt built the perceptron as a hardware classifier in the late 1950s. Imagine a neuron that combines evidence from several inputs, then chooses a class. Each input has a weight that controls its contribution, and a bias shifts the total before the threshold test.</p><h4>Calculate the output</h4><p>For inputs x<sub>1</sub> to x<sub>n</sub>, the neuron multiplies each x<sub>i</sub> by its weight w<sub>i</sub> and adds bias b. The total is the net input z:</p>
<p>z = b + &Sigma; w<sub>i</sub>x<sub>i</sub></p>
<p>y = 1 if z &gt; 0, and y = &minus;1 otherwise.</p>
<p>The output y is 1 when the total is positive and &minus;1 otherwise. The bias acts as a weight on a constant input of 1. It shifts the decision boundary away from the origin without tilting it; without a bias, the boundary must pass through zero.</p><p>Some texts use a Heaviside step with outputs 1 and 0 instead of 1 and &minus;1. Check the question's convention before calculating an update.</p>
<h4>Learn from a mistake</h4><p>Start weights at zero or small random values. For each row, calculate the prediction y and compare it with the correct target t. If they match, leave the weights alone; if they differ, adjust each weight and the bias:</p>
<p>w<sub>i</sub> &larr; w<sub>i</sub> + &eta;(t &minus; y)x<sub>i</sub>, and b &larr; b + &eta;(t &minus; y)</p>
<p>Here &eta; is a small positive learning rate, and x<sub>i</sub> is the corresponding input. With targets 1 and &minus;1, a mistake makes t &minus; y either 2 or &minus;2. Repeat until a full pass makes no mistakes or a pass limit is reached.</p>
<h4>What one perceptron cannot do</h4><p>The perceptron convergence theorem promises a separating boundary after finitely many mistakes when the data is linearly separable. Overlapping classes and XOR have no such boundary, so the mistake-driven loop cannot reach zero errors. A hidden layer can represent nonlinear patterns such as XOR; a pass limit also prevents an endless run.</p>`
        },
        {
          type: "diagram",
          id: "perceptron"
        },
        {
          type: "example",
          html: `<h4>1. Set up the predictor</h4><p>A tutor predicts pass using attendance as a fraction (x<sub>1</sub>) and weekly study hours (x<sub>2</sub>). The weights are 0.5 and 0.2, and the bias is &minus;1.</p>
<p>A student at 0.8 attendance and 6 hours gives z = 0.5(0.8) + 0.2(6) &minus; 1 = 0.4 + 1.2 &minus; 1 = 0.6. Since z &gt; 0, the output is 1, so the unit predicts pass.</p>
<h4>2. Correct a wrong prediction</h4><p>A second student has 0.4 attendance and 1 hour. The correct target is pass, but z = 0.2 + 0.2 &minus; 1 = &minus;0.6, so y = &minus;1. With &eta; = 0.5, t &minus; y = 2:</p>
<p>w<sub>1</sub> = 0.5 + 0.5(2)(0.4) = 0.9, w<sub>2</sub> = 0.2 + 0.5(2)(1) = 1.2, b = &minus;1 + 0.5(2)(1) = 0.</p>
<h4>3. Check the correction</h4><p>The new total is 0.9(0.4) + 1.2(1) + 0 = 1.56. It is positive, so the unit now classifies this row correctly. Check the other rows too: an update that helps one row can hurt another.</p>`
        },
        {
          type: "tip",
          html: `<h4>Explain a perceptron in an exam</h4><p>Draw the inputs, weighted arrows, summation, bias, threshold and output. Under the drawing, give the net input, output rule and learning rule. Work through a mistaken row with target 1 and prediction &minus;1, so t &minus; y = 2.</p><p>Explain that the convergence guarantee needs linearly separable classes. This condition shows the limit of one unit.</p>`
        }
      ],
      practice: [
        {
          q: "A perceptron learns from two overlapping classes that no straight line separates. What happens to its weights, why can a mistake-free training loop continue indefinitely, and what two responses could you use?",
          a: `<h4>Why updates continue</h4><p>Each mistake changes the weight vector by &eta;(t &minus; y)x, moving the decision boundary. Another row can move it back. Since no line separates the classes, every boundary misclassifies at least one row, so a stop rule requiring a mistake-free pass will never trigger.</p><p>The perceptron convergence theorem guarantees finitely many mistakes only for linearly separable data. For overlapping data, updates can cycle rather than settling at zero training error.</p><h4>Two practical responses</h4><p>First, limit the number of passes and keep the best training-error weights: this is the pocket algorithm. Second, change the representation or model: try a separating feature, a hidden layer, or logistic regression, which trains on overlapping data and outputs a probability. Report the error rate rather than claiming perfect separation.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A perceptron has weights 0.2 and &minus;0.4, bias 0.1 and learning rate 0.3. For x = [1, 1], its target is 1 and its prediction is &minus;1. Calculate one update for both weights and the bias. What effect can a very large learning rate have?",
          a: `<h4>1. Calculate the prediction</h4><p>The net input is z = 0.2(1) + (&minus;0.4)(1) + 0.1 = &minus;0.1. It is not positive, so y = &minus;1. The target t is 1, making this a mistake.</p>
<h4>2. Update weights and bias</h4><p>The error factor is t &minus; y = 1 &minus; (&minus;1) = 2. With learning rate &eta; = 0.3, the step multiplier is 0.6:</p>
<ul>
<li>w<sub>1</sub> = 0.2 + 0.3(2)(1) = 0.8</li>
<li>w<sub>2</sub> = &minus;0.4 + 0.3(2)(1) = 0.2</li>
<li>b = 0.1 + 0.3(2)(1) = 0.7</li>
</ul>
<h4>3. Check and interpret</h4><p>The new net input is 0.8 + 0.2 + 0.7 = 1.7, so this row is now correct. A large &eta; makes a larger jump and may make previously correct rows wrong, especially when data is not separable. A tiny &eta; makes smaller updates. Monitor errors per pass and use a pass limit.</p>`,
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
          text: "An activation function converts a neuron's net input to an output. Nonlinear activations help networks learn curved decision boundaries."
        },
        {
          type: "text",
          html: `<h4>What an activation does</h4><p>A neuron combines its inputs into a total, then an activation function turns that total into its output. A nonlinear activation lets a network learn patterns that a straight boundary cannot separate.</p>
<p>z = &Sigma; w<sub>i</sub>x<sub>i</sub> + b, and y = f(z).</p>
<p>Here x<sub>i</sub> is an input, w<sub>i</sub> its weight, b the bias, z the net input, f the activation and y the output.</p><h4>Why nonlinearity matters</h4><p>Two linear layers collapse into one: W<sub>2</sub>(W<sub>1</sub>x) = (W<sub>2</sub>W<sub>1</sub>)x. The matrices W<sub>1</sub> and W<sub>2</sub> combine into one matrix, so stacking linear layers still gives a straight decision boundary.</p><p>With enough units and a suitable nonlinear activation, one hidden layer can approximate a wide class of continuous functions. This is the universal approximation idea.</p><h4>Compare common functions</h4>
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
<h4>Read the ranges and derivatives</h4><p>Binary sigmoid maps its input between 0 and 1, which suits a probability output. Bipolar sigmoid and tanh range from &minus;1 to 1 and are centred at zero. Bipolar sigmoid equals tanh(z/2), not tanh(z).</p><p>The step function has derivative zero on either side and is undefined at the jump. Gradient training multiplies by derivatives, so this step provides no useful learning signal through the hidden unit.</p>
<h4>Vanishing gradients</h4><p>The sigmoid derivative is at most 0.25 and approaches zero for large positive or negative z. Multiplying small derivatives through many layers can shrink the learning signal: this is the vanishing gradient. ReLU avoids saturation for positive inputs, although it has a kink at zero.</p>`
        },
        {
          type: "example",
          html: `<h4>1. Calculate the net input</h4><p>A neuron receives inputs [0.5, 0.7, 0.1], weights [0.4, 0.6, 0.3] and bias 0.5. Multiply each input by its weight and add the bias:</p>
<p>z = 0.4(0.5) + 0.6(0.7) + 0.3(0.1) + 0.5 = 0.20 + 0.42 + 0.03 + 0.50 = 1.15.</p>
<h4>2. Apply binary sigmoid</h4><p>e<sup>&minus;1.15</sup> = 0.3166, so f = 1 / (1 + 0.3166) = <b>0.7595</b>. This lies between 0 and 1.</p>
<h4>3. Compare tanh and bipolar sigmoid</h4><p>For tanh, e<sup>1.15</sup> = 3.1582, so f = (3.1582 &minus; 0.3166) / (3.1582 + 0.3166) = 2.8416 / 3.4748 = <b>0.8178</b>.</p><p>For bipolar sigmoid, use 2(0.7595) &minus; 1 = 0.5190. This equals tanh(1.15 / 2) = tanh(0.575), not tanh(1.15). Label each result and keep four decimals.</p>`
        },
        {
          type: "tip",
          html: `<h4>Present each activation</h4><p>Give its name, equation and range. For a numerical question, show z before substituting it into the activation. Label binary sigmoid, bipolar sigmoid and tanh separately, and round outputs to four decimals.</p><p>Remember that binary sigmoid ranges from 0 to 1, while bipolar sigmoid ranges from &minus;1 to 1.</p>`
        }
      ],
      practice: [
        {
          q: "Every layer of a network, including its output, uses f(z) = z. Show why three layers reduce to one, identify the missing property, and give a pattern the network cannot learn.",
          a: `<h4>Combine the layers</h4><p>Write the three layers as y = W<sub>3</sub>(W<sub>2</sub>(W<sub>1</sub>x)), where x is the input and each W is a layer's weight matrix. Matrix multiplication is associative, so this equals (W<sub>3</sub>W<sub>2</sub>W<sub>1</sub>)x. Their product is one matrix W, giving y = Wx.</p><h4>What the network loses</h4><p>Without nonlinearity, the decision boundary remains a line or plane. Extra linear layers cannot bend it. In XOR, no single line separates (0,1) and (1,0) from (0,0) and (1,1). A nonlinear hidden activation followed by a linear output can learn the pattern.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A perceptron uses a step function. Use its derivative to explain why it is unsuitable for gradient training in a hidden layer. What problem can sigmoid activations cause in a deep network?",
          a: `<h4>Why the step is difficult to train</h4><p>Gradient training asks how error changes when a weight changes, so it uses the activation's derivative. The step derivative is 0 away from the jump and undefined at the jump. It therefore passes no useful gradient through a hidden unit. The perceptron rule instead learns directly from a mistaken label without differentiating the step.</p>
<h4>Sigmoid and vanishing gradients</h4><p>Sigmoid is smooth. Its derivative f(z)(1 &minus; f(z)) reaches 0.25 at z = 0 and approaches 0 for large positive or negative z. Backpropagation multiplies derivatives across layers; repeated small factors can make the gradient almost zero. Early layers then learn slowly: this is the vanishing gradient.</p><h4>A common alternative</h4><p>ReLU has derivative 1 for positive z, so it avoids that particular shrinkage there. It has a kink at zero, and units can become inactive for negative inputs. Leaky variants address the latter issue.</p>`,
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
          text: "Backpropagation sends a loss signal backward through a network to calculate weight gradients. An optimiser then uses those gradients to update the weights."
        },
        {
          type: "text",
          html: `<h4>The whole training loop first</h4><p>A multilayer feed-forward network makes a prediction, checks how wrong it is, and uses that error to improve. Think of one training round in four stages:</p><ol><li><b>Forward prediction:</b> pass the input through the layers to get an output.</li><li><b>Error:</b> compare the output with the target using a loss function.</li><li><b>Backward pass:</b> send the error signal backwards to calculate each weight's gradient, or effect on the loss.</li><li><b>Update:</b> move each weight in the direction that reduces the loss.</li></ol><p>Strictly, backpropagation calculates gradients; an optimiser such as gradient descent applies the updates. Repeat these stages across training rows.</p>
<h4>1. Forward prediction</h4><p>At each layer, calculate z = W a + b, then a = f(z). Here W is the weight matrix, a on the right is the previous layer's output, b is the bias, z is the net input, and f is the activation. Save each z and output a for the backward pass.</p>
<h4>2. Measure the error</h4><p>For one output, squared-error loss is E = &frac12;(t &minus; y)<sup>2</sup>. E is the loss, t the target and y the prediction. For a sigmoid output, combine the loss and activation derivatives into the output delta:</p><p>&delta;<sub>o</sub> = (y &minus; t) y (1 &minus; y)</p><p>The delta &delta;<sub>o</sub> measures how the loss changes with the output neuron's net input.</p>
<h4>3. Send the signal backwards</h4><p>A hidden unit has no target of its own. Collect the output deltas from the units it feeds, weighting each by its connection, then multiply by the hidden activation's derivative:</p><p>&delta;<sub>h</sub> = f&prime;(z<sub>h</sub>) &Sigma; w<sub>ho</sub> &delta;<sub>o</sub></p><p>Here &delta;<sub>h</sub> is the hidden delta, f&prime;(z<sub>h</sub>) is the derivative at that unit's net input, and w<sub>ho</sub> connects hidden unit h to output unit o. The sum covers the output units fed by h.</p>
<h4>4. Update the weights</h4><p>Move each weight against its gradient: w &larr; w &minus; &eta; &delta;<sub>j</sub> a<sub>i</sub>. Here w connects unit i to unit j, a<sub>i</sub> is the input to that weight, &delta;<sub>j</sub> is the receiving unit's delta, and &eta; is the learning rate.</p><p>Calculate output deltas before hidden deltas. Use the original forward-pass weights for the entire backward calculation, then update; otherwise the calculation mixes two networks.</p>
<h4>Training settings and limits</h4><p>The learning rate sets the step size. Too large can make error bounce or diverge; too small can slow training. One epoch is a full pass over the training set. Online training updates after each row, batch training sums gradients over all rows before updating, and mini-batches fall between these.</p><p>Early stopping uses validation error to decide when to stop instead of waiting for zero training error. The loss surface can contain local minima or flat plateaus, and saturating activations can shrink gradients in deep networks. Input normalisation and ReLU hidden units are common remedies.</p>`
        },
        {
          type: "diagram",
          id: "mlp"
        },
        {
          type: "example",
          html: `<h4>1. Prediction and target</h4><p>A sigmoid output neuron predicts y = 0.7595, while the target is 1. Its incoming weight is 0.4, the hidden unit's output is 0.6, and the learning rate is 0.5.</p>
<h4>2. Calculate the output delta</h4><p>&delta;<sub>o</sub> = (0.7595 &minus; 1)(0.7595)(1 &minus; 0.7595) = (&minus;0.2405)(0.1827) = &minus;0.0439.</p>
<h4>3. Calculate the weight gradient</h4><p>Multiply the output delta by the hidden output: &delta;<sub>o</sub> &times; a<sub>hidden</sub> = &minus;0.0439 &times; 0.6 = &minus;0.0264.</p>
<h4>4. Update the weight</h4><p>w = 0.4 &minus; 0.5(&minus;0.0264) = 0.4 + 0.0132 = 0.4132. The weight rises because the output was below target and the hidden output is positive. This is one step; a later row may move the weight in the other direction.</p>`
        },
        {
          type: "tip",
          html: `<h4>Show the order in your answer</h4><p>Number the forward pass, output error, output delta, hidden delta and weight update. Draw the labelled network and an error arrow pointing backwards. Define the learning rate in the update and calculate deltas using the original weights before updating them.</p>`
        }
      ],
      practice: [
        {
          q: "For a two-layer network, explain why the output delta must be known before the hidden delta. What must the forward pass save, and what goes wrong if output weights are updated before the hidden delta is calculated?",
          a: `<h4>Why output deltas come first</h4><p>A hidden unit affects the loss through the units it feeds. Its delta combines those downstream signals, multiplied by the corresponding connection weights and its own activation derivative:</p><p>&delta;<sub>h</sub> = f&prime;(z<sub>h</sub>) &Sigma; w<sub>ho</sub>&delta;<sub>o</sub>.</p><p>Here &delta;<sub>o</sub> is an output delta, w<sub>ho</sub> connects hidden unit h to output o, and f&prime;(z<sub>h</sub>) is the hidden activation derivative. The sum needs the output deltas first, so calculate backwards from the output.</p>
<h4>What to save</h4><p>Keep each unit's net input z or enough information from its output a to evaluate the activation derivative. Keep the forward-pass activations needed for weight gradients and the original weights needed for hidden deltas.</p>
<h4>Why update order matters</h4><p>If output weights change before the hidden delta is formed, the sum uses weights that did not produce the measured prediction. That mixes networks and can give the wrong gradient. Calculate all deltas before updating, or retain the old weights for remaining sums. In batch training, accumulate row gradients and update once at the end.</p>`,
          marks: 7,
          diff: "hard"
        },
        {
          q: "Training error falls each epoch, but validation error first falls and then rises. Name the problem, define an epoch, and describe two ways to address the problem.",
          a: `<h4>Identify the problem</h4><p>The network is overfitting: it continues to fit training rows, including noise, while its validation performance gets worse. The gap between the curves signals the problem. The best checkpoint is near the minimum validation error.</p>
<h4>Define an epoch</h4><p>An epoch is one complete pass over the training set. Ten epochs mean ten passes, with weight updates scheduled by the batch size. The learning rate and batch size also affect how much the weights change.</p>
<h4>Two ways to respond</h4><p>Use early stopping: save the weights with the lowest validation error and stop after several epochs without improvement. Add regularisation such as weight decay or dropout to discourage reliance on training coincidences. More data or a smaller network can also reduce overfitting.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    }
  ]
};
