window.ML_MODULES = window.ML_MODULES || {};
window.ML_MODULES[2] = {
  num: 2,
  title: "Supervised Learning: Classification",
  hours: 7,
  topics: [
    {
      slug: "m2-learning-class",
      title: "Learning a Class from Examples",
      sources: [
        "https://en.wikipedia.org/wiki/Binary_classification",
        "https://en.wikipedia.org/wiki/Version_space_learning"
      ],
      blocks: [
        {
          type: "definition",
          text: "Learning a class from examples means using labelled training rows to find a rule that separates positive cases from negative cases."
        },
        {
          type: "text",
          html: `<h4>What the learner is trying to find</h4>
<p>Binary classification assigns each input to one of two classes, such as renewed or not renewed. Each training example has a feature vector (its measured properties) and the correct label. The learner searches for a rule that gets the training labels right and can also work on unseen rows.</p>
<p>A <b>hypothesis</b> is one candidate rule. It is <b>consistent</b> when it labels every training row correctly. The <b>hypothesis space</b> contains all rules the learner is allowed to consider.</p><p>The chosen rule language determines the space. A conjunction, or combination, of feature values is small enough to inspect by hand. A neural network searches a much larger space.</p>
<h4>Version space and its boundaries</h4>
<p>The <b>most specific hypothesis</b> covers the positive examples seen so far and as little else as possible. It keeps the most feature restrictions. The <b>most general hypothesis</b> removes as many restrictions as it can while still excluding every known negative example.</p>
<p>The <b>version space</b> is the set of all hypotheses in the chosen hypothesis space that remain consistent with every example seen so far. S and G are its boundaries: S marks the specific edge and G the general edge. The hypotheses between them are still possible explanations of the data.</p>
<table class="tbl">
<tr><th>Boundary</th><th>What it allows</th><th>Why it stops there</th></tr>
<tr><td>Most specific (S)</td><td>covers known positives with as few other inputs as the rule language permits</td><td>making it more specific would exclude a known positive</td></tr>
<tr><td>Most general (G)</td><td>covers known positives while excluding known negatives</td><td>making it more general would admit a known negative</td></tr>
</table>
<h4>Candidate elimination, one example at a time</h4>
<ol>
<li>Begin with S as the narrowest rule and G as the widest rule that admits every row.</li>
<li>For a positive example, generalise S just enough to cover it. Remove any rules in G that reject it.</li>
<li>For a negative example, specialise G just enough to reject it. Remove any rules in S that accept it.</li>
<li>Keep only rules consistent with every example. These rules form the remaining version space.</li>
</ol>
<p>If S and G meet, only one rule remains. If a mislabelled example makes the boundaries cross, no consistent rule remains and the version space is empty. This is why candidate elimination is fragile when the data contains noise.</p>
<h4>Why generalisation matters</h4>
<p>A model should work on new rows, not only remember its training data. A lookup table can store every training row and get them all right, then fail on the next row.</p><p>Learning relies on assumptions that favour some rules over others, such as preferring simple rules and expecting future examples to resemble past ones. These assumptions form the learner's <b>inductive bias</b>.</p>
<h4>Estimate prediction error</h4>
<ol>
<li>Set aside labelled rows as a test set.</li>
<li>Train the model on the remaining rows.</li>
<li>Use the model to predict labels for the held-out rows.</li>
<li>Divide the number of wrong predictions by the number of test rows. This is the error rate.</li>
</ol>
<p>One split can give a noisy estimate when the dataset is small. <b>Cross-validation</b> repeats the train-and-test split and averages the results.</p>`
        },
        {
          type: "example",
          html: `<h4>Training examples</h4><p>A subscription team records three features for each customer and whether the customer renewed.</p>
<table class="tbl">
<tr><th>Customer</th><th>Plan</th><th>Usage</th><th>Support calls</th><th>Renewed</th></tr>
<tr><td>1</td><td>Premium</td><td>High</td><td>Few</td><td>Yes</td></tr>
<tr><td>2</td><td>Premium</td><td>Low</td><td>Few</td><td>No</td></tr>
<tr><td>3</td><td>Premium</td><td>Low</td><td>Many</td><td>No</td></tr>
<tr><td>4</td><td>Basic</td><td>High</td><td>Many</td><td>Yes</td></tr>
</table>
<h4>Walk through candidate elimination</h4>
<ol>
<li><b>Start with row 1 (positive).</b> S = (Premium, High, Few). G = (any, any, any).</li>
<li><b>Use row 2 (negative).</b> It differs from row 1 only in Usage. G must keep Usage = High to exclude row 2, but can remove its Plan and Support restrictions. G becomes (any, High, any).</li>
<li><b>Use row 3 (negative).</b> It also has Low usage, so G stays (any, High, any).</li>
</ol>
<p>At this stage, four rules remain in the version space: (Premium, High, Few), (Premium, High, any), (any, High, Few) and (any, High, any).</p>
<ol start="4"><li><b>Use row 4 (positive).</b> The row has Basic plan and Many calls, so S must drop both restrictions to cover it. S becomes (any, High, any), which matches G. One hypothesis remains: renewed customers have High usage.</li></ol>
<p>Suppose a fifth row is (Basic, High, Few) and its label is No. It contradicts the remaining rule, so the version space becomes empty. Check the label or the feature set: the examples no longer agree on any rule in this hypothesis space.</p>`
        },
        {
          type: "tip",
          html: `<h4>Build an exam answer</h4><ol><li>Define hypothesis, S (the specific boundary), G (the general boundary) and version space.</li><li>Draw G above S and label both boundaries.</li><li>For a longer answer, trace one positive and one negative example. State which boundary moves and why.</li><li>Finish by explaining that prediction error is estimated on a separate test set.</li></ol>`
        }
      ],
      practice: [
        {
           q: "A factory trains a defect detector using 5,000 photos of cracked parts but no photos of good parts. What can the model learn, what can it not learn, and what is the smallest needed change to the training data?",
           a: `<h4>What the examples teach</h4><p>The model can learn patterns found in cracked parts, such as their edges, texture and typical size. It can compare a new photo with those examples.</p><h4>What is missing</h4><p>Without examples of good parts, the model cannot learn the boundary between cracked and good. It also cannot estimate the false alarm rate, because it has no healthy examples to test.</p><h4>Minimum change</h4><p>Add labelled photos of good parts. If those examples cannot be collected, the task is one-class anomaly detection rather than supervised classification. Evaluate it on held-out examples of both classes.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
           q: "In 2021, a bank approved loans for High- or Medium-income applicants with no prior default. By 2024 it often rejects the same profiles. Explain what changed and name two signals that could have warned the team. ",
           a: `<h4>Identify the change</h4><p>This is <b>concept drift</b>: the relationship between the features and the correct label has changed. A change only in the input distribution is data drift. Here, the approval policy, economy or applicant pool may have changed, so the old decision boundary no longer matches recent labels.</p><h4>Two warning signals</h4><ol><li><b>Recent error rate:</b> collect decisions with their true outcomes and compare the error with the 2021 test rate. A sustained rise across weeks suggests drift.</li><li><b>Input and prediction patterns:</b> track approval share, mean income and default rate by segment. A rise in rejected Medium-income applicants, or fewer approvals without a change in defaults, signals a mismatch.</li></ol><p>Retrain with recent labelled data and keep a rolling test window to detect future changes.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m2-multiclass",
      title: "Learning Multiple Classes: One-vs-All and One-vs-One",
      sources: [
        "https://en.wikipedia.org/wiki/Multiclass_classification",
        "https://scikit-learn.org/stable/modules/multiclass.html"
      ],
      blocks: [
        {
          type: "definition",
          text: "Multiclass classification assigns each input to exactly one of three or more classes, whereas binary classification has only two."
        },
        {
          type: "text",
          html: `<h4>What multiclass means</h4><p>A multiclass problem has K possible classes, and each input gets exactly one label. Fruit grading into apple, orange and pear is multiclass; apple versus not apple is binary.</p><p>Decision trees, k nearest neighbours, naive Bayes, multinomial logistic regression and neural networks can handle multiple classes directly.</p>
<p>Classical support vector machines (SVMs) are designed for two classes. To use one for K classes, split the task into several binary classification problems. Two common strategies are one-vs-all and one-vs-one.</p>
<h4>One-vs-all (OvA)</h4><ol><li>Train one classifier for each class, giving K classifiers.</li><li>For classifier k, label class k as positive and all other classes as negative.</li><li>For a new input, run all K classifiers and choose the class with the highest score.</li></ol><p>The scores need to be comparable, but different classifiers may use different score scales. Each training problem is also unbalanced because its negative class contains all the other classes.</p>
<h4>One-vs-one (OvO)</h4><ol><li>Train one classifier for each pair of classes. This gives K(K - 1) / 2 classifiers.</li><li>Each classifier sees only examples from its two classes, so its training set is smaller. The two classes can still have unequal numbers of examples.</li><li>For a new input, each classifier votes for one of its two classes. The class with the most votes wins. Confidence scores can be used to break ties.</li></ol><p>The number of models grows quickly: 10 classes need 45 classifiers, while 100 classes need 4,950.</p>
<table class="tbl">
<tr><th>Classes K</th><th>OvA classifiers</th><th>OvO classifiers</th></tr>
<tr><td>3</td><td>3</td><td>3</td></tr>
<tr><td>4</td><td>4</td><td>6</td></tr>
<tr><td>10</td><td>10</td><td>45</td></tr>
<tr><td>100</td><td>100</td><td>4,950</td></tr>
</table>
<h4>Other multiclass strategies</h4><p><b>Error-correcting output codes</b> assign a binary code to each class and train one classifier per bit. The code can correct some wrong bit predictions.</p><p><b>Hierarchical classification</b> arranges labels in a tree and predicts through the tree. This can suit a large label set when one flat model would be expensive.</p>`
        },
        {
          type: "code",
          lang: "python",
          html: `from sklearn.datasets import load_iris
from sklearn.multiclass import OneVsRestClassifier
from sklearn.svm import LinearSVC

X, y = load_iris(return_X_y=True)
model = OneVsRestClassifier(LinearSVC(random_state=0, max_iter=5000))
model.fit(X, y)
print(model.predict(X[:3]))   # [0 0 0]`
        },
        {
          type: "example",
          html: `<h4>Compare the training sets</h4><p>A ticket desk sorts 40,000 support tickets into 8 categories, with about 5,000 in each. OvA trains 8 classifiers, each using 5,000 positive and 35,000 negative rows. OvO trains 28 classifiers, each using two categories, or about 10,000 rows split evenly.</p>
<p>A kernel SVM gets slower as its training set grows. So 28 small, balanced problems can finish faster than 8 large, unbalanced problems, despite using more classifiers.</p><p>For each prediction, OvA compares scores from 8 models; OvO counts votes from 28. With 100 categories, OvO needs 4,950 votes per input. OvO can therefore suit small K or expensive kernel models.</p>`
        },
        {
          type: "tip",
          html: `<h4>Build an exam answer</h4><ol><li>Define OvA and OvO, then give their model counts: K and K(K - 1) / 2.</li><li>For a longer answer, walk through an example with three or eight classes.</li><li>Explain how each method chooses its final label.</li><li>Give a limitation: class imbalance in OvA, and model count or vote ties in OvO.</li><li>Show the formula before substituting numbers.</li></ol>`
        }
      ],
      practice: [
        {
           q: "A 5-class task uses error-correcting output codes with 7-bit class codes. How many binary classifiers are needed? Explain how the model labels a new row and how it can still classify a row when a bit is wrong.",
          a: `<h4>Train one classifier per bit</h4><p>Error-correcting output codes (ECOC) give each of K classes a code word of L binary bits. For bit j, label training rows positive if their class has a 1 in that position and negative if it has a 0.</p><p>Train one binary classifier for each bit. With 5 classes and 7-bit codes, train <b>7 classifiers</b>.</p><h4>Predict the class</h4><ol><li>Run the 7 classifiers on the new row to produce a 7-bit output.</li><li>Compare the output with each class code word using <b>Hamming distance</b>, the number of bit positions that differ.</li><li>Choose the class with the smallest distance.</li></ol><h4>How one wrong bit can be corrected</h4><p>Choose code words that are far apart. If their minimum distance is at least 3, an output with one flipped bit remains closer to the true word than to any other. A minimum distance of 2 can detect a single error but cannot guarantee correction.</p><p>A longer code can correct more errors, but it requires more classifiers. ECOC suits a binary base learner with a moderate class count; the individual classifiers still need to work well.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
           q: "An online store sorts products into 40 detailed categories. Compare a single flat classifier with a two-level category hierarchy. Give a situation where the hierarchy would be the better choice.",
          a: `<h4>Flat model</h4><p>A flat classifier chooses among all 40 labels at once. A prediction can land in any category, and decision boundaries for classes with few examples can be hard to estimate.</p><h4>Two-level hierarchy</h4><p>The first model chooses a broad group, such as Electronics, Clothing, Home or Grocery. A second model then chooses a fine category within that group. Each second-level model has a smaller problem, often with more balanced classes, though the system uses more models.</p><p>A hierarchy is useful when the groups are meaningful and items are easier to confuse within a group than across groups. A new phone accessory category may require retraining only the Electronics branch; a flat model may need retraining across all 40 categories.</p><h4>Limitation</h4><p><b>Error propagation</b> means an incorrect first-level group prevents the second level from choosing the correct category. The first-level model therefore needs to be accurate. A flat classifier does not have this particular routing failure.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m2-bayes",
      title: "Bayes' Theorem",
      sources: [
        "https://en.wikipedia.org/wiki/Bayes%27_theorem"
      ],
      blocks: [
        {
          type: "definition",
          text: "Bayes' theorem updates the probability of a cause after new evidence by combining its prior probability with the likelihood of that evidence."
        },
        {
          type: "text",
          html: `<h4>What probability are we asking for?</h4><p>Conditional probability is the chance of one event when another is already known. The notation P(A | B) means "the probability of A, given B." Bayes' theorem uses evidence B to update the probability of a possible cause or class A.</p>
<h4>The formula</h4><p>Bayes' theorem combines these terms as follows:</p><p><b>P(A | B) = [ P(B | A) × P(A) ] / P(B)</b></p>
<p>A is the cause or class; B is the evidence. The vertical bar means "given that." So P(A | B) asks how likely A is now that B is known.</p>
<table class="tbl">
<tr><th>Term</th><th>Symbol</th><th>Meaning</th></tr>
<tr><td>Prior</td><td>P(A)</td><td>the chance of A before the evidence arrives</td></tr>
<tr><td>Likelihood</td><td>P(B | A)</td><td>the chance of seeing B when A is true</td></tr>
<tr><td>Evidence</td><td>P(B)</td><td>the overall chance of seeing B, from every cause</td></tr>
<tr><td>Posterior</td><td>P(A | B)</td><td>the updated chance of A after B is seen</td></tr>
</table>
<h4>Calculate the evidence probability</h4><p>P(B) is often not supplied directly. Count the two possible cases, A and not A:</p><p><b>P(B) = P(B | A) P(A) + P(B | not A) P(not A)</b></p><p>For a medical test, the first term is the true-positive branch and the second is the false-positive branch.</p>
<h4>Why the prior matters</h4><p>If A is rare, its prior probability P(A) is small. Even a small false-positive rate can then produce many false alarms because the healthy group is much larger. A test with 99% sensitivity can still give a positive result with a low posterior.</p><p>Ignoring the prior is the <b>base rate fallacy</b>.</p>
<h4>Odds form</h4><p>Odds compare the chance of A with the chance of not A. Bayes' theorem can update odds without calculating P(B):</p><p><b>Posterior odds = prior odds × P(B | A) / P(B | not A)</b></p><p>The fraction is the <b>likelihood ratio</b>. A ratio of 20 means the evidence multiplies the prior odds by 20.</p>
<p>People use this update in spam filtering, medical screening, fault diagnosis and risk scoring. It also underlies the Naive Bayes classifier in the next topic.</p>`
        },
        {
          type: "example",
          html: `<h4>Question</h4><p>A screening test has disease prevalence 0.1%, sensitivity 99% and specificity 95%. A patient tests positive. What is the chance that the patient has the disease?</p>
<ol><li><b>Name the events.</b> Let D mean disease and + mean a positive test. We need P(D | +), the chance of disease given a positive result.</li>
<li><b>List the known probabilities.</b> P(D) = 0.001 and P(not D) = 0.999. P(+ | D) = 0.99. Specificity is P(- | not D) = 0.95, so P(+ | not D) = 0.05.</li>
<li><b>Find the overall chance of a positive test.</b> P(+) = P(+ | D) P(D) + P(+ | not D) P(not D) = (0.99 × 0.001) + (0.05 × 0.999) = 0.00099 + 0.04995 = 0.05094.</li>
<li><b>Apply Bayes' theorem.</b> P(D | +) = 0.00099 / 0.05094 = 0.01943, about <b>1.94%</b>, or roughly 1 in 51.</li></ol>
<p>The same result is easier to trust as counts out of 100,000 people.</p>
<table class="tbl">
<tr><th></th><th>Test positive</th><th>Test negative</th><th>Total</th></tr>
<tr><td>Has disease</td><td>99</td><td>1</td><td>100</td></tr>
<tr><td>No disease</td><td>4,995</td><td>94,905</td><td>99,900</td></tr>
<tr><td>Total</td><td>5,094</td><td>94,906</td><td>100,000</td></tr>
</table>
<h4>Read the counts</h4><p>Of 5,094 positive results, only 99 are true positives: 99 / 5,094 = 1.94%. The test finds almost every sick person, but a 5% false-positive rate applied to the much larger healthy group produces about 50 times more false alarms than true positives.</p>
<h4>Update after a second test</h4><p>If an independent second test is also positive, use the first posterior as the new prior. The posterior rises to about 28.2%. A second positive provides stronger evidence, which explains why screening programmes may repeat a test before treatment.</p>`
        },
        {
          type: "tip",
          html: `<h4>Bayes calculation checklist</h4><ol><li>Name the events, such as D for disease and + for a positive test.</li><li>Write Bayes' theorem and expand the denominator into the disease and no-disease cases.</li><li>Substitute the given values and show the calculation.</li><li>State the posterior in a sentence, such as about 1 in 51 positive results.</li></ol><p>Do not answer 99%. That is the sensitivity, not the posterior probability that a positive result is correct.</p>`
        }
      ],
      practice: [
        {
           q: "A test has 99% sensitivity and 95% specificity. A doctor says a positive result means the patient has a 99% chance of disease. What is wrong with that claim, and what does the 99% actually mean?",
          a: `<h4>Identify the probability error</h4><p>The doctor has confused P(positive | disease) with P(disease | positive). Sensitivity is P(positive | disease): 99% of patients who have disease test positive. The posterior P(disease | positive) is the chance that a patient has disease after a positive result, and it also depends on prevalence.</p><h4>Why the posterior can be low</h4><p>For a rare disease, many more people are healthy than sick. Even a small false-positive rate applied to this large healthy group can create more positive results than the true cases. The posterior is:</p><p>P(D | +) = P(+ | D) P(D) / [P(+ | D) P(D) + P(+ | not D) P(not D)]. The second denominator term is the false-positive branch.</p><p>The 99% describes how often the test detects disease when disease is present; it does not say that 99% of positive results are correct. Treating it as the patient's chance is the base rate fallacy. The prevalence is needed to calculate the posterior.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
           q: "Write Bayes' theorem using odds. Explain why one positive from a strong test can still leave a low posterior probability, and how a second independent positive changes it.",
          a: `<h4>Write the odds form</h4><p>For hypothesis H and evidence E:</p><p><b>O(H | E) = O(H) × P(E | H) / P(E | not H)</b></p><p>Prior odds O(H) = P(H) / P(not H). The likelihood ratio is P(E | H) / P(E | not H). The evidence probability cancels when the posterior odds are formed.</p><h4>One positive result</h4><p>A likelihood ratio of 20 multiplies prior odds by 20. If prior odds are 1 to 999, as for a fault occurring in 1 of 1,000 runs, posterior odds become 20 to 999, about 2%. The test changes the odds greatly relative to the starting point, yet the posterior remains low because the prior chance was tiny.</p><h4>A second independent positive</h4><p>Multiply the odds by the same likelihood ratio again. Posterior odds become 400 to 999, about 29%. Applying the update twice gives the same result as applying the combined likelihood ratio once.</p><p>A likelihood ratio is not the posterior. The prior sets the starting odds, and the evidence updates them. For a low-prevalence condition, a second positive is a reason to test further, not a diagnosis by itself.</p>`,
          marks: 7,
          diff: "hard"
        }
      ]
    },
    {
      slug: "m2-naive-bayes",
      title: "The Naive Bayes Classifier",
      sources: [
        "https://en.wikipedia.org/wiki/Naive_Bayes_classifier"
      ],
      blocks: [
        {
          type: "definition",
          text: "Naive Bayes picks the most likely class from its prior and the feature probabilities, assuming features are independent given the class."
        },
        {
          type: "text",
          html: `<h4>What Naive Bayes calculates</h4><p>Naive Bayes is a probabilistic classifier. For a new row with features x1 to xn, it estimates the probability of each possible class and selects the largest. With discrete features, training uses counts from the labelled examples.</p>
<p>The <b>class prior</b> P(Ck) is how common class Ck is before we inspect the new row. A <b>likelihood</b> such as P(x1 | Ck) is the chance of seeing feature value x1 among rows in class Ck.</p><p>Multiply the prior by the feature likelihoods to obtain an unnormalised <b>posterior score</b>: evidence for the class after seeing the row. The denominator P(x) is equal for every class, so it is unnecessary when we only compare classes.</p>
<p><b>Decision rule:</b></p><p><b>P(Ck | x) ∝ P(Ck) × P(x1 | Ck) × ... × P(xn | Ck)</b></p><p>Here Ck names one class, x is the full feature set, and ∝ means "is proportional to." Choose the class with the largest score. This is the <b>maximum a posteriori</b> (MAP) rule.</p>
<h4>Why the name is naive</h4><p>The method assumes that features are independent once the class is known. For example, it may multiply evidence from a fruit's red colour, round shape and 10 cm size as if those properties do not affect one another. Real features can be related, so the probability estimates may be rough even when the class ranking is right.</p>
<h4>Algorithm</h4>
<ol>
<li>Collect the labelled training rows.</li>
<li>List the possible classes.</li>
<li>Compute each prior: rows in the class divided by all rows.</li>
<li>For every feature value and class, compute the conditional: rows with that value in the class divided by rows in the class.</li>
<li>Take the new row and note its feature values.</li>
<li>For each class, multiply the prior by the conditionals for that row.</li>
<li>Compare the products.</li>
<li>Return the class with the largest product.</li>
</ol>
<h4>Handle unseen values with smoothing</h4><p>If a feature value never occurred in one class, its conditional probability is zero. Multiplying by zero makes the class score zero, regardless of the other evidence.</p><p><b>Add-one smoothing</b> adds 1 to each count and adds the number of possible values to the class total. The estimate then stays above zero, with a smaller effect when counts are large.</p>
<h4>Why implementations use logs</h4><p>Multiplying many small probabilities can cause <b>underflow</b>: the computer rounds a tiny result to zero. Adding logarithms avoids that problem and gives the same class ranking.</p><p>Scikit-learn's CategoricalNB uses Laplace smoothing by default. Its probabilities therefore differ from the unsmoothed hand calculation below.</p>
<table class="tbl">
<tr><th>Event model</th><th>Feature type</th><th>Typical use</th></tr>
<tr><td>Multinomial</td><td>word or event counts</td><td>document and spam classification</td></tr>
<tr><td>Bernoulli</td><td>present or absent</td><td>short text, binary word features</td></tr>
<tr><td>Gaussian</td><td>continuous values</td><td>measurements such as height or temperature</td></tr>
</table>
<h4>Strengths and limits</h4><p>Naive Bayes trains quickly, can work with little training data and handles many features. It is often a useful baseline for text classification. Its independence assumption is often false: correlated features can count the same evidence twice, making the probability estimates overconfident even when the predicted class is correct.</p>`
        },
        {
          type: "code",
          lang: "python",
          html: `from sklearn.naive_bayes import CategoricalNB
from sklearn.preprocessing import OrdinalEncoder

X = [["High", "Young", "Excellent", "Yes"],
     ["Medium", "Middle", "Fair", "No"],
     ["Low", "Senior", "Fair", "No"],
     ["Medium", "Young", "Excellent", "No"],
     ["High", "Senior", "Fair", "Yes"],
     ["Low", "Young", "Fair", "No"],
     ["Medium", "Senior", "Excellent", "Yes"],
     ["High", "Middle", "Fair", "No"],
     ["Medium", "Middle", "Excellent", "Yes"],
     ["Medium", "Senior", "Fair", "Yes"]]
y = ["Yes", "Yes", "No", "Yes", "Yes", "No", "Yes", "No", "No", "Yes"]

enc = OrdinalEncoder()
model = CategoricalNB().fit(enc.fit_transform(X), y)
new = enc.transform([["Medium", "Young", "Fair", "Yes"]])
print(model.classes_)            # ['No' 'Yes']
print(model.predict(new))        # ['Yes']
print(model.predict_proba(new))  # [[P(No), P(Yes)]]`
        },
        {
          type: "example",
          html: `<h4>Question and training data</h4><p>This table records whether a person buys a new car. Classify a person with Income = Medium, Age = Young, Credit Rating = Fair and Previous Car Owner = Yes.</p>
<table class="tbl">
<tr><th>Sl.No</th><th>Income</th><th>Age</th><th>Credit Rating</th><th>Previous Car Owner</th><th>Purchase</th></tr>
<tr><td>1</td><td>High</td><td>Young</td><td>Excellent</td><td>Yes</td><td>Yes</td></tr>
<tr><td>2</td><td>Medium</td><td>Middle</td><td>Fair</td><td>No</td><td>Yes</td></tr>
<tr><td>3</td><td>Low</td><td>Senior</td><td>Fair</td><td>No</td><td>No</td></tr>
<tr><td>4</td><td>Medium</td><td>Young</td><td>Excellent</td><td>No</td><td>Yes</td></tr>
<tr><td>5</td><td>High</td><td>Senior</td><td>Fair</td><td>Yes</td><td>Yes</td></tr>
<tr><td>6</td><td>Low</td><td>Young</td><td>Fair</td><td>No</td><td>No</td></tr>
<tr><td>7</td><td>Medium</td><td>Senior</td><td>Excellent</td><td>Yes</td><td>Yes</td></tr>
<tr><td>8</td><td>High</td><td>Middle</td><td>Fair</td><td>No</td><td>No</td></tr>
<tr><td>9</td><td>Medium</td><td>Middle</td><td>Excellent</td><td>Yes</td><td>No</td></tr>
<tr><td>10</td><td>Medium</td><td>Senior</td><td>Fair</td><td>Yes</td><td>Yes</td></tr>
</table>
<h4>Calculate the class scores in stages</h4><ol><li><b>Find the priors.</b> Six rows say Yes and four say No. Thus P(Yes) = 6/10 = 0.6 and P(No) = 4/10 = 0.4.</li>
<li><b>Find feature likelihoods for Yes.</b> Among the 6 Yes rows, Income is Medium in rows 2, 4, 7 and 10: P(Medium | Yes) = 4/6. Age is Young in rows 1 and 4: P(Young | Yes) = 2/6. Credit is Fair in rows 2, 5 and 10: P(Fair | Yes) = 3/6. Owner is Yes in rows 1, 5, 7 and 10: P(Owner Yes | Yes) = 4/6.</li>
<li><b>Find feature likelihoods for No.</b> Among the 4 No rows, Income is Medium only in row 9: P(Medium | No) = 1/4. Age is Young only in row 6: P(Young | No) = 1/4. Credit is Fair in rows 3, 6 and 8: P(Fair | No) = 3/4. Owner is Yes only in row 9: P(Owner Yes | No) = 1/4.</li>
<li><b>Multiply prior and likelihoods for each class.</b></li></ol>
<p>Product for Yes = (6/10) × (4/6) × (2/6) × (3/6) × (4/6) = 2/45 = 0.04444.</p>
<p>Product for No = (4/10) × (1/4) × (1/4) × (3/4) × (1/4) = 3/640 = 0.0046875.</p>
<h4>Compare and conclude</h4><p>0.04444 is larger than 0.0046875, so predict Yes. Normalising the scores by their sum gives P(Yes | query) = 256/283 = 90.5% and P(No | query) = 27/283 = 9.5%.</p><p>The predicted class is purchase. The Yes score is about 9.5 times the No score, so the comparison is not close.</p>`
        },
        {
          type: "tip",
          html: `<h4>Show the full method</h4><ol><li>Write each class prior.</li><li>List the conditional probabilities for every query feature in each class.</li><li>Multiply the prior and conditionals to get one score per class.</li><li>Compare the scores and state the predicted class.</li></ol><p>Show fractions before decimals, such as 4/6 before 0.67. If a feature value has zero count, explain how smoothing avoids a zero score.</p>`
        }
      ],
      practice: [
        {
           q: "A spam filter has 8 spam emails and 12 ham emails. 'Refund' appears in 6 spam emails and no ham emails. Find P(refund | ham) without smoothing and with add-one smoothing for the two possible values, present and absent. Explain the effect on classification.",
           a: `<h4>1. Calculate the raw estimate</h4><p>P(refund | ham) = 0 / 12 = 0. A refund email then gives the ham class a score of zero. Multiplying by other ham-like feature probabilities cannot raise that score.</p><h4>2. Apply add-one smoothing</h4><p>There are two possible values, present and absent. For ham, the smoothed estimate is (0 + 1) / (12 + 2) = 1/14 = 0.0714. For spam, it is (6 + 1) / (8 + 2) = 7/10 = 0.70.</p><p>The ham estimate is now small but nonzero, so the other features can still affect the class comparison. Smoothing adds a count to each possible value. This shifts rare estimates upward and common estimates downward a little.</p><p>The smoothing constant is a hyperparameter. Add-one is common; a smaller value such as 0.1 may suit a large dataset with trusted counts.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
           q: "A spam filter treats 'viagra' and 'viagra.com' as separate features. It also uses 'free' and 'free offer'. Explain how the independence assumption affects its scores, then give two ways to address the problem.",
           a: `<h4>How the assumption changes the score</h4><p>Naive Bayes multiplies P('viagra' | spam) by P('viagra.com' | spam) as if each feature were separate evidence. Since 'viagra.com' usually includes 'viagra', the same clue is counted twice. The spam score can become too large, making the posterior overconfident.</p><p>Likewise, a message containing 'free offer' triggers both 'free' and 'free offer'. The model counts related evidence twice. Its ranking may still be useful, but its probability estimates can be too close to 0 or 1.</p><h4>Two ways to address it</h4><ol><li><b>Remove duplicate evidence.</b> Keep 'viagra' and drop 'viagra.com', or keep the phrase 'free offer' and drop the single-word feature.</li><li><b>Calibrate the scores.</b> Use a held-out dataset with isotonic or Platt scaling, then report the calibrated probability rather than the raw score.</li></ol><p>Other options include regularising counts or using a model that represents dependencies, such as a Bayesian network. Those choices reduce Naive Bayes' simplicity.</p>`,
          marks: 7,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m2-metrics",
      title: "Confusion Matrix, Precision and Recall",
      sources: [
        "https://en.wikipedia.org/wiki/Confusion_matrix",
        "https://en.wikipedia.org/wiki/Precision_and_recall",
        "https://en.wikipedia.org/wiki/F-score"
      ],
      blocks: [
        {
          type: "definition",
          text: "A confusion matrix counts correct and incorrect predictions, while precision and recall summarise those errors from different viewpoints."
        },
        {
          type: "text",
          html: `<h4>Read the confusion matrix</h4><p>A confusion matrix compares actual labels with predicted labels in a binary problem. Rows show the actual class; columns show the predicted class. Its four cells count true positives, false positives, false negatives and true negatives.</p>
<ul>
<li><b>True positive (TP)</b>: actual positive, predicted positive.</li>
<li><b>False positive (FP)</b>: actual negative, predicted positive. This is a false alarm.</li>
<li><b>False negative (FN)</b>: actual positive, predicted negative. This is a missed case.</li>
<li><b>True negative (TN)</b>: actual negative, predicted negative.</li>
</ul>
<table class="tbl">
<tr><th>Measure</th><th>Formula</th><th>Question it answers</th></tr>
<tr><td>Accuracy</td><td>(TP + TN) / (TP + TN + FP + FN)</td><td>how many calls were correct?</td></tr>
<tr><td>Precision</td><td>TP / (TP + FP)</td><td>how many flagged rows were real?</td></tr>
<tr><td>Recall (TPR)</td><td>TP / (TP + FN)</td><td>how many real rows were flagged?</td></tr>
<tr><td>Specificity (TNR)</td><td>TN / (TN + FP)</td><td>how many negatives were cleared?</td></tr>
<tr><td>False positive rate (FPR)</td><td>FP / (FP + TN)</td><td>how many negatives were wrongly flagged?</td></tr>
<tr><td>F1</td><td>2 × Precision × Recall / (Precision + Recall)</td><td>a balance of precision and recall</td></tr>
</table>
<h4>Choose the metric that answers your question</h4><p><b>Accuracy</b> is the share of all predictions that are correct. It can look high when one class is much more common than the other. If 99 of 100 cases are negative, a model that always predicts negative gets 99% accuracy but catches no positives. Precision and recall separate these error types.</p>
<p><b>Precision</b> asks: among the rows flagged as positive, how many are truly positive? <b>Recall</b> asks: among all actual positives, how many did the model find?</p>
<p>A spam filter may flag only clear spam to raise precision, but this can miss more spam and lower recall. A cancer screen may flag more people to raise recall, at the cost of more false alarms and lower precision. Choose based on which error is more costly.</p>
<p><b>F1</b> is the harmonic mean of precision and recall, so a low value for either measure pulls F1 down. Fβ weights recall β² times as much as precision. β = 2 favours recall; β = 0.5 favours precision.</p>
<p>With K classes, the confusion matrix has K rows and K columns. <b>Macro averaging</b> averages the class scores, giving every class equal weight. <b>Micro averaging</b> pools counts first, so larger classes carry more weight. State which average you report.</p>`
        },
        {
          type: "diagram",
          id: "confusion-matrix"
        },
        {
          type: "example",
          html: `<h4>Question</h4><p>A Pass/Fail model is tested on 200 students. There are 140 actual Pass and 60 actual Fail students. It predicts Pass for 130 students, and 120 of those predictions are correct.</p>
<h4>Fill the matrix in stages</h4><ol><li>TP = 120: these are actual Pass students predicted Pass.</li><li>FP = 130 - 120 = 10: the other predicted Pass students actually failed.</li><li>FN = 140 - 120 = 20: actual Pass students the model missed.</li><li>TN = 60 - 10 = 50: actual Fail students predicted Fail.</li></ol><p>Check the totals: actual Pass 120 + 20 = 140; actual Fail 10 + 50 = 60; predicted Pass 120 + 10 = 130; predicted Fail 20 + 50 = 70.</p>
<table class="tbl">
<tr><th></th><th>Predicted Pass</th><th>Predicted Fail</th><th>Total</th></tr>
<tr><td>Actual Pass</td><td>TP = 120</td><td>FN = 20</td><td>140</td></tr>
<tr><td>Actual Fail</td><td>FP = 10</td><td>TN = 50</td><td>60</td></tr>
<tr><td>Total</td><td>130</td><td>70</td><td>200</td></tr>
</table>
<h4>Calculate each measure</h4><ol><li><b>Accuracy</b> = (TP + TN) / total = (120 + 50) / 200 = 170 / 200 = <b>0.85</b>, or 85%.</li><li><b>Precision</b> = TP / (TP + FP) = 120 / (120 + 10) = 120 / 130 = <b>0.923</b>, or 92.3%.</li><li><b>Recall</b> = TP / (TP + FN) = 120 / (120 + 20) = 120 / 140 = <b>0.857</b>, or 85.7%.</li><li><b>F1 check</b> = 2 × 0.923 × 0.857 / (0.923 + 0.857) = 0.889.</li></ol><p>Precision is higher than recall. The model is more reliable when it predicts Pass than it is at finding every student who passed. It misses 20 of the 140 actual Pass students.</p>`
        },
        {
          type: "code",
          lang: "python",
          html: `from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.metrics import precision_score, recall_score

y_true = ["Pass"] * 140 + ["Fail"] * 60
y_pred = ["Pass"] * 120 + ["Fail"] * 20 + ["Pass"] * 10 + ["Fail"] * 50

print(confusion_matrix(y_true, y_pred, labels=["Pass", "Fail"]))
print(accuracy_score(y_true, y_pred))
print(precision_score(y_true, y_pred, pos_label="Pass"))
print(recall_score(y_true, y_pred, pos_label="Pass"))`
        },
        {
          type: "tip",
          html: `<h4>Present a calculation clearly</h4><ol><li>Draw and label the confusion matrix.</li><li>Write each metric formula using TP, FP, FN and TN.</li><li>Substitute the counts, then give the decimal or percentage.</li><li>Keep the same positive class throughout, since changing it changes the answer.</li></ol><p>Put each metric on its own line so every calculation is easy to follow.</p>`
        }
      ],
      practice: [
        {
          q: "A bank processes 200,000 card transactions each day, and 0.2% are fraudulent. Model A has recall 0.35 and precision 0.70; Model B has recall 0.80 and precision 0.138. A team can review 500 alerts daily. Compare the models using counts, recommend a deployment, and state what to report to management.",
          a: `<h4>1. Find the class totals</h4><p>Fraud cases = 200,000 × 0.2% = 400. Genuine transactions = 200,000 - 400 = 199,600.</p><h4>2. Calculate Model A counts</h4><ol><li>Recall 0.35 gives TP = 140 and FN = 260.</li><li>Precision 0.70 means 140 / (140 + FP) = 0.70, so FP = 60.</li><li>TN = 199,600 - 60 = 199,540. Total alerts = 140 + 60 = 200, within team capacity.</li><li>Accuracy = (140 + 199,540) / 200,000 = 99.84%.</li></ol><h4>3. Calculate Model B counts</h4><ol><li>Recall 0.80 gives TP = 320 and FN = 80.</li><li>Precision 0.138 gives about 2,000 FP, so alerts = 2,320 and TN = 197,600.</li><li>Accuracy = (320 + 197,600) / 200,000 = 98.96%.</li></ol><p>Model B catches 180 more frauds each day, but its 2,320 alerts exceed the 500-alert review capacity. If the team reviews only the top 500 scores, precision at that cutoff will differ from 0.138. Measure it on a validation set before reporting recall at that operating point.</p><h4>Recommendation and management report</h4><p>Do not choose A only because its accuracy is higher. The 199,600 genuine transactions dominate accuracy, so A can miss 65% of fraud and still score 99.84%. Use B as a ranking model, set a threshold that produces about 500 alerts per day, and measure recall and precision at that threshold. Compare expected fraud losses avoided with review costs.</p><p>Report confusion counts, recall, precision, daily alert volume and estimated savings after review costs. State the threshold and test period so the figures can be reproduced.</p>`,
          marks: 14,
          diff: "hard"
        },
        {
          q: "A model labels every transaction as fraudulent and gets recall 1.0. What does recall alone hide? For 1,000 transactions with 10 frauds, calculate precision and accuracy.",
          a: `<h4>What recall hides</h4><p>Recall counts only the actual positives. Predicting positive for everything finds all 10 frauds and scores 1.0, but it says nothing about the 990 genuine transactions that were also flagged.</p><h4>Calculate the other measures</h4><p>TP = 10, FP = 990, FN = 0, TN = 0. Precision = 10 / (10 + 990) = 1%. Accuracy = 10 / 1,000 = 1%. The model is right on every fraud and wrong on almost every genuine transaction.</p><h4>Why the pair matters</h4><p>A team that acts on alerts would face 1,000 reviews for 10 real cases. The cost of those reviews can exceed the fraud loss. This is why recall is paired with precision, and why a precision-recall curve or a fixed alert budget says more than recall at one threshold.</p><p>The same trap appears when the positive class is rare. A model can look excellent on recall and useless in operation. Always report the base rate and the false positive count next to the recall.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "A 3-class model has recall values 0.90, 0.80 and 0.30, with class sizes 100, 100 and 20. Calculate macro and micro recall, then explain why they differ.",
          a: `<p><b>Macro recall</b> is the unweighted mean: (0.90 + 0.80 + 0.30) / 3 = 0.6667, or 66.7%.</p><p><b>Micro recall</b> pools the counts first. True positives are 90, 80 and 6, so TP = 176. Support totals 100 + 100 + 20 = 220, so micro recall = 176 / 220 = 0.80, or 80%.</p><p>The gap comes from the weights. Macro gives the 20-row class the same weight as each 100-row class, so its 0.30 drags the average down. Micro lets the two large classes dominate, and both are strong.</p><p>Report both when class sizes differ. Macro answers how well the model does on a typical class. Micro answers how well it does on a typical row. A model that ignores a small but important class can look fine on micro and poor on macro.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m2-roc",
      title: "ROC Space and ROC Curves",
      sources: [
        "https://en.wikipedia.org/wiki/Receiver_operating_characteristic"
      ],
      blocks: [
        {
          type: "definition",
          text: "An ROC curve plots a binary classifier's true positive rate against its false positive rate as the threshold changes."
        },
        {
          type: "text",
          html: `<h4>ROC space and its axes</h4><p>ROC means receiver operating characteristic. The graph shows how a classifier's performance changes across thresholds, rather than showing only one threshold.</p>
<p>The <b>false positive rate (FPR)</b> is on the x-axis. It is FPR = FP / (FP + TN), the share of actual negatives wrongly flagged.</p>
<p>The <b>true positive rate (TPR)</b> is on the y-axis. It is TPR = TP / (TP + FN), the share of actual positives found. TPR is also called recall or sensitivity; FPR equals 1 minus specificity. Each point corresponds to one threshold and its confusion matrix.</p>
<h4>How to trace the curve</h4><ol><li>Start with a high score threshold. Few rows qualify as positive, so both rates are low.</li><li>Lower the threshold. More rows are predicted positive, so both TPR and FPR can rise.</li><li>Plot each pair (FPR, TPR) and join the points to form the ROC curve.</li></ol><p>A curve closer to the top-left corner is better because it finds more positives while falsely flagging fewer negatives.</p>
<table class="tbl">
<tr><th>Point</th><th>Classifier</th><th>Why</th></tr>
<tr><td>(0, 0)</td><td>never predicts positive</td><td>finds no positives, so TPR = 0, and flags no negatives, so FPR = 0</td></tr>
<tr><td>(1, 1)</td><td>always predicts positive</td><td>finds every positive, but also flags every negative</td></tr>
<tr><td>(0, 1)</td><td>perfect</td><td>all positives found and no negatives flagged</td></tr>
<tr><td>diagonal</td><td>random guessing</td><td>TPR equals FPR, so the score carries no information</td></tr>
</table>
<p>A point below the diagonal performs worse than random guessing. Reversing the score direction moves it above the diagonal.</p>
<h4>Area under the curve (AUC)</h4><p>AUC reduces the whole curve to one number. It is also the chance that a randomly chosen positive receives a higher score than a randomly chosen negative. AUC 0.5 is random ranking, 1.0 is perfect ranking, and a value below 0.5 means the ranking is reversed. Reversing the scores can help.</p>
<h4>Choose a threshold for the task</h4><p>The ROC curve does not choose a threshold for you. A screening programme may accept a higher FPR to keep recall high. A spam filter may accept lower recall to protect precision. Choose a point based on the costs of the two kinds of error.</p>
<h4>Limits of AUC</h4><p>AUC does not show precision or account for class balance. If positives make up less than 0.5% of the data, a model can rank cases well but still produce mostly false alarms at a useful threshold. A precision-recall curve can be more informative in that situation.</p>
<p>AUC also hides where errors occur. Performance in a low-FPR region may matter more than the average area.</p>`
        },
        {
          type: "diagram",
          id: "roc-curve"
        },
        {
          type: "example",
          html: `<p>Ten patients take a test that returns a score. Five have the disease and five do not. A row is called positive when its score is at least the threshold.</p>
<table class="tbl">
<tr><th>Patient</th><th>Score</th><th>Actual</th></tr>
<tr><td>1</td><td>0.95</td><td>Disease</td></tr>
<tr><td>2</td><td>0.88</td><td>Disease</td></tr>
<tr><td>3</td><td>0.81</td><td>Disease</td></tr>
<tr><td>4</td><td>0.74</td><td>No disease</td></tr>
<tr><td>5</td><td>0.67</td><td>Disease</td></tr>
<tr><td>6</td><td>0.60</td><td>No disease</td></tr>
<tr><td>7</td><td>0.53</td><td>Disease</td></tr>
<tr><td>8</td><td>0.46</td><td>No disease</td></tr>
<tr><td>9</td><td>0.32</td><td>No disease</td></tr>
<tr><td>10</td><td>0.21</td><td>No disease</td></tr>
</table>
<p>Sweep the threshold and count the four cells at each cut. TP and FP are the positive calls that are right and wrong. FN and TN are the negative calls that are wrong and right.</p>
<table class="tbl">
<tr><th>Threshold</th><th>TP</th><th>FP</th><th>FN</th><th>TN</th><th>TPR</th><th>FPR</th></tr>
<tr><td>0.90</td><td>1</td><td>0</td><td>4</td><td>5</td><td>0.2</td><td>0.0</td></tr>
<tr><td>0.60</td><td>4</td><td>2</td><td>1</td><td>3</td><td>0.8</td><td>0.4</td></tr>
<tr><td>0.40</td><td>5</td><td>3</td><td>0</td><td>2</td><td>1.0</td><td>0.6</td></tr>
<tr><td>0.10</td><td>5</td><td>5</td><td>0</td><td>0</td><td>1.0</td><td>1.0</td></tr>
</table>
<p>The first row is (FPR, TPR) = (0, 0.2), the second is (0.4, 0.8), the third is (0.6, 1.0), and the last is the always-positive corner (1, 1). The curve is a staircase between these points.</p>
<p>Threshold 0.90 is cautious and misses four cases. Threshold 0.60 finds four of five positives with two false alarms. Threshold 0.40 finds every positive but flags three of the five healthy patients. Threshold 0.10 flags everyone.</p>
<p>If a missed case is dangerous, 0.40 is defensible even with the false alarms. If a positive leads to an invasive test, 0.60 is the better balance. The curve shows the trade; the clinic supplies the cost.</p>`
        },
        {
          type: "tip",
          html: `<p>Label both axes with words and symbols, FPR on x and TPR on y, then mark (0,0), (1,1), (0,1) and the diagonal. For 5 or 7 marks, explain how the threshold moves the point and define AUC in one line.</p>
<p>If the question names special points, give the reason for each coordinate. The marks go to the reason, not the label.</p>`
        }
      ],
      practice: [
        {
          q: "At threshold 0.5, a model has recall 0.72 and precision 0.55. At threshold 0.3, recall rises to 0.91 and precision falls to 0.28. Explain how TP, FP and FN change, when the lower threshold is appropriate, and what to check before deployment.",
          a: `<p>Lowering the threshold makes the model call more rows positive. TP and FP both rise, because more real positives and more real negatives clear the bar. FN falls, since fewer positives are left below it.</p><p>Recall is TP / (TP + FN), so it rises. Precision is TP / (TP + FP), and the extra false positives pull it down. The reported pair, 0.72 to 0.91 and 0.55 to 0.28, has exactly that shape.</p><p>Make the move when a missed positive costs more than a false alarm. A cancer screen, a fraud alert or a safety check usually fits: the cost of a miss is large and the cost of a review is bounded.</p><p>Keep the higher threshold when a false alarm triggers expensive or risky action. A spam filter that must not bin a real invoice is one example.</p><p>Before shipping, check the capacity of the team that handles alerts. A recall gain that produces more alerts than the team can review is not a real gain. Measure precision at the actual review budget, not over all alerts.</p><p>Recheck the calibration of the scores, because a threshold is only meaningful if the probabilities are honest. Validate on a recent held-out period rather than the training set.</p><p>Finally, state the chosen threshold and the resulting confusion counts in the model card. The next team then knows which operating point the reported recall belongs to.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "A model has AUC 0.93, yet precision is 0.08 at its chosen threshold when only 0.5% of cases are positive. Explain how both values can be true and what else you would report.",
          a: `<p>AUC measures ranking over all thresholds. It asks how often a random positive gets a higher score than a random negative, and 0.93 says the ranking is strong. Precision measures one threshold and depends on how many negatives exist.</p><p>At a 0.5% positive rate there are 199 negatives for every positive. Precision 0.08 means about 11.5 false alarms for each true positive.</p><p>Spread over 199 negatives, that is a false positive rate near 5.8%. That sounds modest for the model and still produces a heavy alert load for the team. A good ranker can therefore have poor precision at a usable cut.</p><p>Report the confusion counts and precision at the operating threshold, the recall at that threshold, and the alert volume. Add a precision-recall curve, which shows the precision cost as recall rises and is more informative than AUC when positives are rare.</p><p>If the decision needs a fixed alert budget, report precision at that budget and the recall it buys. AUC is still useful for comparing two rankers before a threshold is chosen.</p><p>AUC is not a substitute for the operating point, and it should never be the only number in a deployment review.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A model reports AUC 0.35. Explain what this indicates and name the first change you would test.",
          a: `<p>AUC 0.35 sits below the 0.5 random line. The model ranks negatives above positives more often than the reverse, so it has learned a signal but the score points the wrong way.</p><p>First, invert the scores, which turns 0.35 into 0.65. Then check for a label encoding error, because swapping the positive and negative class often produces exactly this pattern.</p><p>If the inverted model still performs poorly, inspect the features or the training window.</p>`,
          marks: 3,
          diff: "easy"
        }
      ]
    }
  ]
};
