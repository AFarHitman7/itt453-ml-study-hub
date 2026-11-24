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
          text: "Learning a class from examples means finding a rule that separates positive from negative cases using labelled training data."
        },
        {
          type: "text",
          html: `<p>Binary classification puts each input into one of two classes. A training example pairs a feature vector with its correct label, and the learner looks for a rule that reproduces those labels and also works on rows it has not seen.</p>
<p>A <b>hypothesis</b> is one candidate rule. It is consistent with the training set when it labels every training row correctly. The hypothesis space is the set of rules the learner is allowed to search. That set is a design choice: a conjunction of feature values is small enough to inspect by hand, while a neural network searches a much larger space.</p>
<p>The <b>most specific hypothesis</b> covers the positive rows and as little else as possible, because every feature is pinned to an observed value. The <b>most general hypothesis</b> still excludes every negative row, so it removes as many restrictions as it can. The <b>version space</b> is every hypothesis that sits between these two boundaries.</p>
<table class="tbl">
<tr><th>Boundary</th><th>What it allows</th><th>Why it stops there</th></tr>
<tr><td>Most specific (S)</td><td>only the positive rows seen so far</td><td>relaxing it would cover more than the evidence supports</td></tr>
<tr><td>Most general (G)</td><td>every row that is not a known negative</td><td>relaxing it further would admit a negative example</td></tr>
</table>
<p><b>Candidate elimination.</b> Start with the narrowest rule for the first positive row and the widest rule that admits everything. A positive example forces the specific boundary to generalise until it covers the row, and it can remove general rules that reject the row. A negative example forces the general boundary to specialise, and it removes specific rules that accept the row. Each example shrinks the version space. When the two boundaries meet, one rule remains. A single mislabelled row can push them past each other and leave the space empty, which is why the method is fragile on noisy data.</p>
<p><b>Why generalisation is the point.</b> Zero training error is not the goal. A lookup table that stores every training row scores perfectly and fails on the next row. Learning assumes that the future resembles the past, so a simple rule that fits the data has a better chance on unseen cases. That assumption is the learner's inductive bias, and no learner can avoid one.</p>
<p><b>Estimating the error.</b> Hold back part of the labelled data as a test set, train on the rest, then count wrong predictions on the held-back rows. The error rate is wrong predictions divided by test rows. One split is noisy on small data, so cross-validation repeats the split and averages the result.</p>`
        },
        {
          type: "example",
          html: `<p>A subscription team records three features for four customers and whether the customer renewed.</p>
<table class="tbl">
<tr><th>Customer</th><th>Plan</th><th>Usage</th><th>Support calls</th><th>Renewed</th></tr>
<tr><td>1</td><td>Premium</td><td>High</td><td>Few</td><td>Yes</td></tr>
<tr><td>2</td><td>Premium</td><td>Low</td><td>Few</td><td>No</td></tr>
<tr><td>3</td><td>Premium</td><td>Low</td><td>Many</td><td>No</td></tr>
<tr><td>4</td><td>Basic</td><td>High</td><td>Many</td><td>Yes</td></tr>
</table>
<p>After row 1, the specific boundary is S = (Premium, High, Few) and the general boundary is G = (any, any, any). Row 2 is negative and differs from row 1 only in usage, so G must keep usage as High and can drop the other two restrictions: G becomes (any, High, any). Row 3 is also low usage, so G stays where it is.</p>
<p>The version space now holds four rules: (Premium, High, Few), (Premium, High, any), (any, High, Few) and (any, High, any). Row 4 is positive with Basic plan and Many calls, so S has to drop both pinned values to cover it. S becomes (any, High, any), which is the same as G. The version space has collapsed to one hypothesis: usage is high.</p>
<p>Now suppose a fifth row reads (Basic, High, Few) and is labelled No. That row contradicts the remaining rule, so the version space would become empty. The correct response is to question the label or the feature set, because the examples no longer agree on any rule in this language.</p>`
        },
        {
          type: "tip",
          html: `<p>For 3 marks define hypothesis, the specific boundary, the general boundary and the version space, then draw G above S. For 5 or 7 marks walk one positive and one negative row through candidate elimination and state which boundary moved. Close with error estimation on a separate test set. The marks sit in the labels and the direction of movement, so keep the drawing plain.</p>`
        }
      ],
      practice: [
        {
          q: "A factory trains a defect detector on 5,000 photos of cracked parts and no photos of good parts. Explain what the model can learn and what it cannot, and state the minimum change to the training set.",
          a: `<p>With only positive examples, the model can learn what cracks look like: their edges, texture and typical size. It can score a new photo by similarity to that set.</p><p>It cannot learn the boundary between cracked and good parts, because no good part defines the other side. Any unusual but healthy texture can look far from the positive set, so the false alarm rate is unknown and cannot be estimated.</p><p>The minimum change is to add labelled good parts to the training set. If good parts truly cannot be collected, the task becomes one-class anomaly detection rather than supervised classification, and the evaluation must use a held-out set that contains both classes.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A bank learned in 2021 that a loan is approved when income is High or Medium and there is no prior default. By 2024 the same profiles are often rejected. Explain what has changed and give two monitoring signals that would have warned the team.",
          a: `<p>The rule has not become wrong in logic; the relation between the features and the label has moved. That is <b>concept drift</b>. A change in the input distribution alone is data drift, while a change in which class is correct for the same input is concept drift. Here the approval policy, the economy or the applicant pool changed, so the old boundary no longer matches the labels.</p><p><b>Signal one: live error.</b> Collect recent decisions with their true outcomes and compare the error rate with the rate on the 2021 test set. A rise that persists across weeks points to drift.</p><p><b>Signal two: the distribution of predictions and inputs.</b> Track the share of approvals, the mean income and the default rate by segment. A jump in rejected Medium-income applicants, or a fall in approvals with no change in defaults, means the model and the world have separated.</p><p>The response is to retrain on recent labelled data, and to keep a rolling test window so the next drift is caught. A model that is never retrained slowly becomes a record of the year it was built.</p>`,
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
          text: "Multiclass classification assigns each input to exactly one of three or more classes, unlike binary classification which has only two."
        },
        {
          type: "text",
          html: `<p>A multiclass problem has K classes and each input gets exactly one label. Fruit grading with apple, orange and pear is multiclass; apple versus not apple is binary. Some algorithms handle K directly: decision trees, k nearest neighbours, naive Bayes, multinomial logistic regression and neural networks all output one of K labels without help.</p>
<p>Classical support vector machines are binary by design, so a K-class problem is split into binary ones. Two standard splits are one-vs-all and one-vs-one.</p>
<p><b>One-vs-all (OvA).</b> Train one classifier per class. Classifier k treats class k as positive and every other class as negative, so there are K classifiers. To predict, run all K and take the class whose classifier gives the highest score. The scores must be comparable, which is not automatic: one classifier may produce scores on a different scale from another, and each sees a lopsided training set because the negatives outnumber the positives.</p>
<p><b>One-vs-one (OvO).</b> Train one classifier for each pair of classes, so there are K(K - 1) / 2 classifiers. Each one sees only the rows from its two classes, which keeps its training set balanced and small. To predict, every classifier votes for one of its two classes, and the class with most votes wins. A tie is broken by adding the confidence scores. The price is the count: 10 classes need 45 classifiers, and 100 classes need 4,950.</p>
<table class="tbl">
<tr><th>Classes K</th><th>OvA classifiers</th><th>OvO classifiers</th></tr>
<tr><td>3</td><td>3</td><td>3</td></tr>
<tr><td>4</td><td>4</td><td>6</td></tr>
<tr><td>10</td><td>10</td><td>45</td></tr>
<tr><td>100</td><td>100</td><td>4,950</td></tr>
</table>
<p>Two other routes exist. Error-correcting output codes give each class a binary code and train one classifier per bit, so some wrong bits can be corrected. Hierarchical classification splits the labels into a tree, which suits large label sets where a flat model would be expensive.</p>`
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
          html: `<p>A ticket desk sorts 40,000 support tickets into 8 categories, about 5,000 each. OvA trains 8 classifiers, and each one sees 5,000 positives plus 35,000 negatives. OvO trains 28 classifiers, and each sees two categories, so about 10,000 rows split evenly.</p>
<p>A kernel SVM becomes slow as rows grow, so 28 small balanced problems can finish faster than 8 large unbalanced ones even though there are more models. The difference shows at prediction: OvA runs 8 models per ticket and compares 8 scores, while OvO runs 28 models and counts 28 votes. With 100 categories the vote count reaches 4,950 per ticket, which is why OvO suits small K or expensive kernel models.</p>`
        },
        {
          type: "tip",
          html: `<p>For 3 marks give both definitions and the counts K and K(K - 1) / 2. For 6 or 7 marks add a three-class or eight-class walk-through, say how the final label is chosen, and name one weakness of each: imbalance in OvA, cost and ties in OvO. Write the formulas before the numbers so the examiner can see where they come from.</p>`
        }
      ],
      practice: [
        {
          q: "Describe error-correcting output codes for a 5-class problem with a 7-bit code. How many binary classifiers are trained, how is a new row classified, and why can the method survive a wrong bit?",
          a: `<p>ECOC replaces the K-class problem with L binary problems. Each class gets a code word of length L, with each bit 0 or 1. For bit j, the training set is relabelled: rows whose class has bit 1 are positive and rows whose class has bit 0 are negative. One binary classifier is trained per bit, so a 5-class problem with a 7-bit code needs <b>7 classifiers</b>, not 5 and not 10.</p><p>At prediction time, the 7 classifiers produce a 7-bit output for the new row. Compare that output with each class code word and pick the class at the smallest Hamming distance, which is the number of differing bits.</p><p>The code is chosen so the class words are far apart. If one classifier flips, the output moves one bit away from the true word but is still closer to it than to any other word, provided the minimum distance between words is at least 3. That is the error-correcting part. A code with all words at distance 2 can only detect a single error, while a longer code can correct more, at the cost of more classifiers.</p><p>ECOC is useful when the base learner is binary and the class count is moderate. It does not remove the need for a good base classifier; it only spreads the risk of one bad decision across several bits.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "An online store must classify products into 40 fine categories. Compare a flat 40-class model with a two-level hierarchy, and give one situation where the hierarchy is the better choice.",
          a: `<p>A flat model treats 40 labels as one problem. Every training row competes against all other categories, and a mistake can land anywhere in the label set. Some classes have few rows, so their decision boundaries are poorly estimated.</p><p>A hierarchy first predicts a coarse group, such as Electronics, Clothing, Home or Grocery, then predicts the fine category inside that group. Each second-level model sees only the rows of its group, so it solves a smaller and often more balanced problem. The total number of models rises, but each one is simpler and easier to explain.</p><p>The hierarchy wins when the labels already form real groups and the fine categories inside a group are easy to confuse with each other but hard to confuse with categories in another group. It also wins when new fine categories appear: a new phone accessory only retrains the Electronics branch, while a flat model must be rebuilt over all 40 labels.</p><p>The cost is error propagation. A row sent to the wrong group cannot be recovered by the second level, so the first-level accuracy must be high. A flat model has no such single point of failure.</p>`,
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
          text: "Bayes' theorem updates the probability of a cause after seeing evidence, by combining the prior with the likelihood of that evidence."
        },
        {
          type: "text",
          html: `<p>A conditional probability asks about one event when another is known. P(A | B) = P(A and B) / P(B), provided P(B) is not zero. Bayes' theorem turns that around, so a known effect can update the chance of its cause.</p>
<p><b>P(A | B) = [ P(B | A) × P(A) ] / P(B)</b></p>
<p>Here A is the cause or class and B is the evidence. The vertical bar means "given that", so P(A | B) is the probability of A once B is known.</p>
<table class="tbl">
<tr><th>Term</th><th>Symbol</th><th>Meaning</th></tr>
<tr><td>Prior</td><td>P(A)</td><td>the chance of A before the evidence arrives</td></tr>
<tr><td>Likelihood</td><td>P(B | A)</td><td>the chance of seeing B when A is true</td></tr>
<tr><td>Evidence</td><td>P(B)</td><td>the overall chance of seeing B, from every cause</td></tr>
<tr><td>Posterior</td><td>P(A | B)</td><td>the updated chance of A after B is seen</td></tr>
</table>
<p>P(B) is rarely given directly. Split it by the two cases: P(B) = P(B | A) P(A) + P(B | not A) P(not A). In a test, the first term counts true positives and the second counts false positives.</p>
<p><b>The base rate matters.</b> When A is rare, P(A) is tiny and the false positive term can dominate. A test that is 99% sensitive can still leave a positive result with a low posterior, because there are far more healthy people than sick ones. The prior does most of the work, and ignoring it is the base rate fallacy.</p>
<p><b>Odds form.</b> Posterior odds = prior odds × P(B | A) / P(B | not A). The denominator disappears, and the ratio is the likelihood ratio. A ratio of 20 means a positive result multiplies the prior odds by 20, which is easy to say in words.</p>
<p>Spam filtering, medical screening, fault diagnosis and risk scoring all use the same update. The theorem is also the base of the Naive Bayes classifier in the next topic.</p>`
        },
        {
          type: "example",
          html: `<p>A screening test for a rare disease has prevalence 0.1%, sensitivity 99% and specificity 95%. A patient tests positive. What is the chance the patient actually has the disease?</p>
<p><b>Name the events.</b> D means the patient has the disease, and + means the test is positive. The question asks for P(D | +).</p>
<p><b>Write down what is known.</b> P(D) = 0.001, so P(not D) = 0.999. P(+ | D) = 0.99. Specificity is P(- | not D) = 0.95, so the false positive rate is P(+ | not D) = 0.05.</p>
<p><b>Expand the denominator.</b> P(+) = P(+ | D) P(D) + P(+ | not D) P(not D) = (0.99 × 0.001) + (0.05 × 0.999) = 0.00099 + 0.04995 = 0.05094.</p>
<p><b>Apply the theorem.</b> P(D | +) = 0.00099 / 0.05094 = 0.01943, which is about <b>1.94%</b>, or roughly 1 in 51.</p>
<p>The same result is easier to trust as counts out of 100,000 people.</p>
<table class="tbl">
<tr><th></th><th>Test positive</th><th>Test negative</th><th>Total</th></tr>
<tr><td>Has disease</td><td>99</td><td>1</td><td>100</td></tr>
<tr><td>No disease</td><td>4,995</td><td>94,905</td><td>99,900</td></tr>
<tr><td>Total</td><td>5,094</td><td>94,906</td><td>100,000</td></tr>
</table>
<p>Only 99 of the 5,094 positive results are true, and 99 / 5,094 = 1.94%. The test finds almost every sick person, but the healthy group is so large that its 5% false positive rate produces about 50 times more alarms.</p>
<p>If the same patient takes an independent second test and it is positive again, the first posterior becomes the new prior. The posterior rises to about 28.2%. Two positives are much stronger than one, which is why a screening programme repeats a positive result before treatment.</p>`
        },
        {
          type: "tip",
          html: `<p>Name the events first, for example D for disease and + for a positive test. Write the theorem, then expand the denominator into the diseased and healthy branches. Substitute the numbers, keep four decimal places, and finish with one sentence that translates the result, such as about 1 in 51 positives. Do not answer 99%, because that is the sensitivity, not the posterior.</p>`
        }
      ],
      practice: [
        {
          q: "A test is 99% sensitive and 95% specific. A doctor says a positive result means the patient has a 99% chance of the disease. Identify the error and explain what the 99% actually describes.",
          a: `<p>The doctor has swapped P(positive | disease) with P(disease | positive). The first is <b>sensitivity</b>, a property of the test: 99% of diseased patients test positive. The second is the <b>posterior</b> for this patient, and it also depends on prevalence.</p><p>For a rare disease the healthy group is far larger than the diseased group. A small false positive rate applied to that large group can produce more positive results than the true cases, so the posterior stays low. The correct expression is P(D | +) = P(+ | D) P(D) / [P(+ | D) P(D) + P(+ | not D) P(not D)], and the second term in the denominator is the false positive branch.</p><p>The 99% describes how well the test finds disease when it is there. It does not describe how likely a positive result is to be correct. Quoting it as the patient's chance is the base rate fallacy, and the fix is to ask for prevalence before interpreting the result.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "Write Bayes' theorem in odds form. Use it to explain why one positive result from a strong test can still leave a low posterior, and what a second independent positive does.",
          a: `<p>For a hypothesis H and evidence E, Bayes in odds form is O(H | E) = O(H) × P(E | H) / P(E | not H). The prior odds are O(H) = P(H) / P(not H), and the ratio on the right is the likelihood ratio. The denominator P(E) cancels because it appears in both the numerator and the denominator of the odds.</p><p>The likelihood ratio says how much the evidence should move belief. A ratio of 20 multiplies the prior odds by 20. If the prior odds are 1 to 999, as they are for a rare fault that affects 1 in 1,000 runs, the posterior odds become 20 to 999, which is about 2%. A strong test has moved belief a lot in relative terms and still leaves a low absolute chance, because the starting point was tiny.</p><p>A second independent positive multiplies the odds again by the same ratio. The posterior odds become 400 to 999, about 29%. Two positives are much stronger than one, but the order matters only for convenience: applying the update twice gives the same result as using the combined likelihood ratio once.</p><p>The lesson is that a likelihood ratio is not a posterior. The prior sets the scale, and the test moves you along it. This is why screening programmes repeat a positive test before treatment, and why a single positive in a low-prevalence group is a reason for a second test rather than a diagnosis.</p>`,
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
          text: "Naive Bayes classifies a record by multiplying the class prior by each feature's conditional probability, assuming features are independent once the class is known."
        },
        {
          type: "text",
          html: `<p>Naive Bayes is a probabilistic classifier. For a new row with features x1 to xn, it computes the probability of each class and returns the largest. For discrete features the model is built from counts, so training is one pass over the data.</p>
<p><b>Decision rule.</b> P(Ck | x) is proportional to P(Ck) × P(x1 | Ck) × ... × P(xn | Ck). The denominator P(x) is the same for every class, so the comparison can ignore it. The class with the largest product wins. This is the maximum a posteriori rule.</p>
<p><b>Why naive.</b> The word naive refers to one assumption: once the class is known, the features are treated as independent. A fruit is called an apple from red, round and about 10 cm, and the model multiplies those three pieces of evidence as if they never influence each other. Real features often do, which is why the probabilities are rough even when the ranking is right.</p>
<p><b>Algorithm.</b></p>
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
<p><b>Zero counts.</b> If a value never appears with a class, its conditional is zero and the whole product becomes zero. Add-one smoothing fixes that: replace each count by count + 1 and the class total by class total + the number of values. The estimate is never zero, and the change is small when counts are large.</p>
<p><b>Log space.</b> Multiplying many small numbers underflows on a computer, so implementations add logs instead. The class with the largest log score is the same class as before, because log is monotonic. Scikit-learn's CategoricalNB applies Laplace smoothing by default, so its printed probabilities differ slightly from the hand calculation, which uses no smoothing.</p>
<table class="tbl">
<tr><th>Event model</th><th>Feature type</th><th>Typical use</th></tr>
<tr><td>Multinomial</td><td>word or event counts</td><td>document and spam classification</td></tr>
<tr><td>Bernoulli</td><td>present or absent</td><td>short text, binary word features</td></tr>
<tr><td>Gaussian</td><td>continuous values</td><td>measurements such as height or temperature</td></tr>
</table>
<p><b>Strengths and limits.</b> The model is fast, needs little training data and handles many features well, which is why it is still a strong baseline for text. The independence assumption is often false, correlated features double count their evidence, and the probability estimates can be overconfident even when the predicted class is right.</p>`
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
          html: `<p>The Nov 2025 paper gives this training table for whether a person buys a new car. The query is Income = Medium, Age = Young, Credit Rating = Fair, Previous Car Owner = Yes.</p>
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
<p><b>Step 1: priors.</b> Six rows say Yes and four say No, so P(Yes) = 6/10 = 0.6 and P(No) = 4/10 = 0.4.</p>
<p><b>Step 2: conditionals for the Yes class.</b> Among the 6 Yes rows, Income is Medium in rows 2, 4, 7 and 10, so P(Medium | Yes) = 4/6. Age is Young in rows 1 and 4, so P(Young | Yes) = 2/6. Credit is Fair in rows 2, 5 and 10, so P(Fair | Yes) = 3/6. Owner is Yes in rows 1, 5, 7 and 10, so P(Owner Yes | Yes) = 4/6.</p>
<p><b>Step 3: conditionals for the No class.</b> Among the 4 No rows, Income is Medium only in row 9, so P(Medium | No) = 1/4. Age is Young only in row 6, so P(Young | No) = 1/4. Credit is Fair in rows 3, 6 and 8, so P(Fair | No) = 3/4. Owner is Yes only in row 9, so P(Owner Yes | No) = 1/4.</p>
<p><b>Step 4: multiply for each class.</b></p>
<p>Product for Yes = (6/10) × (4/6) × (2/6) × (3/6) × (4/6) = 2/45 = 0.04444.</p>
<p>Product for No = (4/10) × (1/4) × (1/4) × (3/4) × (1/4) = 3/640 = 0.0046875.</p>
<p><b>Step 5: compare.</b> 0.04444 is larger than 0.0046875, so the predicted class is Yes. Normalising the two products by their sum gives P(Yes | query) = 256/283 = 90.5% and P(No | query) = 27/283 = 9.5%.</p>
<p><b>Conclusion.</b> The person is predicted to purchase a new car. The yes product is about 9.5 times the no product, so the result is not close.</p>`
        },
        {
          type: "tip",
          html: `<p>Write the priors first, then a small table of conditionals for each attribute, then the two products, then the comparison. Show the fraction before the decimal, because 4/6 earns more than 0.67 when the method is marked. Finish with one line: the class with the larger product wins. If a value is missing from a class, say how smoothing would handle it instead of writing zero and stopping.</p>`
        }
      ],
      practice: [
        {
          q: "A spam filter has 8 spam and 12 ham training emails. The word 'refund' appears in 6 spam and 0 ham. Compute P(refund | ham) raw and with add-one smoothing over the two values present and absent. Explain why the raw value breaks the classifier.",
          a: `<p><b>Raw estimate:</b> 0 / 12 = 0. Any email containing 'refund' then gets a ham score of zero, no matter how many other ham-like words it contains, because one zero wipes out the product.</p><p><b>Add-one smoothing</b> with two possible values, present and absent, gives (0 + 1) / (12 + 2) = 1/14 = 0.0714. The spam side becomes (6 + 1) / (8 + 2) = 7/10 = 0.70.</p><p>The smoothed value is small but not zero, so the other features can still outvote it. Smoothing adds a fake count to every value, which pulls rare values up and common values down a little. The cost is a small bias; the benefit is that the classifier survives a value it has never seen with a class.</p><p>In practice the smoothing constant is a hyperparameter. Add-one is the common default, and a smaller value such as 0.1 is used when the training set is large and the counts are trusted.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A spam filter uses both 'viagra' and 'viagra.com' as separate features, and also 'free' and 'free offer'. Explain how the independence assumption affects the score, and give two fixes that keep the model useful.",
          a: `<p>The model multiplies P('viagra' | spam) by P('viagra.com' | spam) as if the two were separate pieces of evidence. In reality the second almost always follows the first, so the same fact is counted twice. The spam score is pushed up by a product of two large numbers, and the posterior becomes overconfident.</p><p>The same happens with 'free' and 'free offer'. A message with the phrase 'free offer' triggers both features, so the evidence is double-counted. The ranking of messages may still be roughly right, which is why the classifier can work, but the probability it reports is too close to 0 or 1.</p><p><b>Fix one:</b> collapse the correlated features into one. Use 'viagra' and drop 'viagra.com', or use a phrase feature 'free offer' and drop the single word 'free'. This removes the duplicate evidence at the source.</p><p><b>Fix two:</b> keep the features but calibrate the output on a held-out set, for example with isotonic or Platt scaling, and report the calibrated probability rather than the raw score. A third option is to regularise the counts or use a model that handles dependence, such as a Bayesian network, but that gives up the simplicity that made Naive Bayes attractive.</p>`,
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
          text: "A confusion matrix counts true and false positives and negatives, and precision and recall summarise the errors from two different viewpoints."
        },
        {
          type: "text",
          html: `<p>A confusion matrix is a table with two rows and two columns for a binary problem. Rows hold the actual class, columns hold the predicted class, and the four cells count TP, FP, FN and TN.</p>
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
<p><b>Accuracy can mislead.</b> It is the share of all calls that are correct, so it looks strong when one class dominates. If 99 of 100 cases are negative, a model that always says negative scores 99% and catches nothing. Precision and recall separate the two error types, so they survive that case.</p>
<p><b>Precision or recall.</b> Precision asks how many of the flagged rows are real. Recall asks how many of the real rows were flagged. A spam filter can raise precision by flagging only obvious spam, which lowers recall. A cancer screen can raise recall by flagging more people, which lowers precision. The right balance depends on which error costs more.</p>
<p>F1 is the harmonic mean of precision and recall, so it falls when either one is low. Fβ weights recall β² times as much as precision; β = 2 favours recall and β = 0.5 favours precision.</p>
<p>For K classes the matrix becomes K by K. Macro averaging takes the mean of the per-class scores, so every class counts equally. Micro averaging pools the counts first, so large classes dominate. Report which one you used.</p>`
        },
        {
          type: "diagram",
          id: "confusion-matrix"
        },
        {
          type: "example",
          html: `<p>The Nov 2025 paper describes a Pass/Fail model on 200 students. 140 students passed and 60 failed. The model predicted 130 as Pass, and 120 of those were correct.</p>
<p><b>Fill the matrix.</b> TP = 120, because 120 Pass students were predicted Pass. The other 10 predicted Pass must be Fail students, so FP = 10. Of the 140 real Pass students, 120 were found, so FN = 20. The 60 Fail students split into 10 predicted Pass and 50 predicted Fail, so TN = 50. Check the row and column totals: 120 + 20 = 140 actual Pass, 10 + 50 = 60 actual Fail, 120 + 10 = 130 predicted Pass, and 20 + 50 = 70 predicted Fail.</p>
<table class="tbl">
<tr><th></th><th>Predicted Pass</th><th>Predicted Fail</th><th>Total</th></tr>
<tr><td>Actual Pass</td><td>TP = 120</td><td>FN = 20</td><td>140</td></tr>
<tr><td>Actual Fail</td><td>FP = 10</td><td>TN = 50</td><td>60</td></tr>
<tr><td>Total</td><td>130</td><td>70</td><td>200</td></tr>
</table>
<p><b>Accuracy</b> = (TP + TN) / total = (120 + 50) / 200 = 170 / 200 = <b>0.85</b>, or 85%.</p>
<p><b>Precision</b> = TP / (TP + FP) = 120 / (120 + 10) = 120 / 130 = <b>0.923</b>, or 92.3%.</p>
<p><b>Recall</b> = TP / (TP + FN) = 120 / (120 + 20) = 120 / 140 = <b>0.857</b>, or 85.7%.</p>
<p>As a check, F1 = 2 × 0.923 × 0.857 / (0.923 + 0.857) = 0.889. The model is stronger on precision than on recall, which means it is cautious about calling a student Pass and misses 20 of the 140 who did pass.</p>`
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
          html: `<p>Draw the labelled matrix before any formula, because the examiner can see TP, FP, FN and TN in one glance. Write each formula with symbols, then substitute, then give the decimal. Keep the positive class fixed: precision and recall both use the row or column tied to that class, and swapping it silently changes the answer. End each metric on its own line so a marker can award part marks.</p>`
        }
      ],
      practice: [
        {
          q: "A bank scores 200,000 card transactions a day and 0.2% are fraudulent. Model A has recall 0.35 and precision 0.70. Model B has recall 0.80 and precision 0.138. The review team can handle 500 alerts a day. Compare the two models with counts, recommend a deployment, and say what you would report to management.",
          a: `<p>At 200,000 transactions, 0.2% fraud means 400 fraudulent and 199,600 genuine transactions.</p><p><b>Model A.</b> Recall 0.35 gives TP = 140 and FN = 260. Precision 0.70 gives 140 / (140 + FP) = 0.70, so FP = 60. Then TN = 199,540. Alerts = 200, which fits the team. Accuracy = (140 + 199,540) / 200,000 = 99.84%.</p><p><b>Model B.</b> Recall 0.80 gives TP = 320 and FN = 80. Precision 0.138 gives about 2,000 false positives, so alerts = 2,320 and TN = 197,600. Accuracy = (320 + 197,600) / 200,000 = 98.96%.</p><p>Model B catches 180 more frauds a day than A, but it produces 2,320 alerts for a team that can review 500. If the team reviews only the top 500 scores, the precision at that cut is not the 0.138 measured over all 2,320 alerts; it will be higher, and the bank must measure it on a validation set before promising a recall figure.</p><p><b>Recommendation.</b> Do not deploy A just because its accuracy is higher. Accuracy is dominated by the 199,600 genuine transactions, so a model that misses 65% of fraud still looks 99.84% correct. Deploy B as a ranking model, choose the threshold that yields about 500 alerts a day, and report recall and precision at that operating point. Then compare the expected saved loss with the review cost. If each fraud costs far more than a review, the extra true positives justify the work; if reviews are expensive, a smaller alert budget may be right.</p><p><b>What to tell management.</b> Report the confusion counts at the chosen threshold, the recall (share of fraud caught), the precision (share of alerts that are real), the daily alert volume, and the estimated money saved against the review cost. Keep accuracy out of the headline, and state the threshold and the test period so the numbers can be reproduced.</p>`,
          marks: 14,
          diff: "hard"
        },
        {
          q: "A model that predicts every transaction as fraudulent reaches recall 1.0. Explain what recall alone hides, and give the precision and accuracy for a set of 1,000 transactions with 10 frauds.",
          a: `<p>Recall counts only the actual positives, so predicting positive for everything finds all 10 frauds and scores 1.0. It says nothing about the 990 genuine transactions that were also flagged.</p><p>TP = 10, FP = 990, FN = 0, TN = 0. Precision = 10 / (10 + 990) = 1%. Accuracy = 10 / 1,000 = 1%. The model is right on every fraud and wrong on almost every genuine transaction.</p><p>Recall alone hides the false alarm load. A team that acts on alerts would face 1,000 reviews for 10 real cases, and the cost of those reviews can exceed the fraud loss. This is why recall is paired with precision, and why a precision-recall curve or a fixed alert budget is more informative than recall at a single threshold.</p><p>The same trap appears when the positive class is rare. A model can look excellent on recall and useless in operation, so always report the base rate and the false positive count next to the recall.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "A 3-class model reports recall 0.90, 0.80 and 0.30 on class supports of 100, 100 and 20. Compute macro and micro recall and explain the gap.",
          a: `<p>Macro recall is the unweighted mean: (0.90 + 0.80 + 0.30) / 3 = 0.6667, or 66.7%.</p><p>Micro recall pools the counts. True positives are 90, 80 and 6, so TP = 176. The support total is 100 + 100 + 20 = 220. Micro recall = 176 / 220 = 0.80, or 80%.</p><p>The gap comes from the weights. Macro gives the 20-row class the same weight as each 100-row class, so its 0.30 drags the average down. Micro lets the two large classes dominate, and both are strong.</p><p>Report both when the classes differ in size. Macro answers how well the model does on a typical class, while micro answers how well it does on a typical row. A model that ignores a small but important class can look fine on micro and poor on macro.</p>`,
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
          text: "An ROC curve plots the true positive rate against the false positive rate for every threshold of a binary classifier."
        },
        {
          type: "text",
          html: `<p>ROC stands for receiver operating characteristic. The name comes from radar operators in the Second World War, who had to separate aircraft from noise. The plot survived because it shows a classifier at every threshold, not just one.</p>
<p><b>ROC space.</b> The false positive rate sits on the x axis and the true positive rate sits on the y axis. TPR is TP / (TP + FN), the share of real positives found, and it is also called recall or sensitivity. FPR is FP / (FP + TN), the share of real negatives wrongly flagged, which is 1 minus specificity. Each point is one confusion matrix, which means one threshold.</p>
<p><b>The curve.</b> A classifier that outputs a score is swept from a high threshold to a low one. At a high threshold few rows pass, so both rates are low. As the threshold falls, more rows pass, and both rates rise. Joining the points gives the ROC curve. A curve closer to the top left is better, because it reaches a high TPR at a low FPR.</p>
<table class="tbl">
<tr><th>Point</th><th>Classifier</th><th>Why</th></tr>
<tr><td>(0, 0)</td><td>never predicts positive</td><td>finds no positives, so TPR = 0, and flags no negatives, so FPR = 0</td></tr>
<tr><td>(1, 1)</td><td>always predicts positive</td><td>finds every positive, but also flags every negative</td></tr>
<tr><td>(0, 1)</td><td>perfect</td><td>all positives found and no negatives flagged</td></tr>
<tr><td>diagonal</td><td>random guessing</td><td>TPR equals FPR, so the score carries no information</td></tr>
</table>
<p>A point below the diagonal is worse than random, and flipping the score moves it above the diagonal.</p>
<p><b>AUC.</b> The area under the curve compresses the whole curve into one number. AUC is also the chance that a random positive gets a higher score than a random negative. 0.5 is random, 1.0 is perfect, and below 0.5 means the ranking is reversed, so flipping the score helps.</p>
<p><b>Choosing a threshold.</b> The curve does not choose for you. A screening programme accepts a higher FPR to keep recall high, while a spam filter accepts lower recall to keep precision high. Pick the point whose error mix matches the cost of the two mistakes.</p>
<p><b>Limits.</b> AUC ignores precision and the class balance. When positives are under 0.5% of the data, a model can rank well and still produce mostly false alarms at a usable threshold, so a precision-recall curve says more. AUC also hides where the errors sit, and a high score in the low-FPR region may matter more than average area.</p>`
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
<p>The first row is (FPR, TPR) = (0, 0.2), the second is (0.4, 0.8), the third is (0.6, 1.0), and the last is the always-positive corner (1, 1). The curve is a staircase between these points. Threshold 0.90 is cautious and misses four cases. Threshold 0.60 finds four of five positives with two false alarms. Threshold 0.40 finds every positive but flags three of the five healthy patients. Threshold 0.10 flags everyone.</p>
<p>If a missed case is dangerous, 0.40 is defensible even with the false alarms. If a positive leads to an invasive test, 0.60 is the better balance. The curve shows the trade; the clinic supplies the cost.</p>`
        },
        {
          type: "tip",
          html: `<p>Label both axes with words and symbols, FPR on x and TPR on y, then mark (0,0), (1,1), (0,1) and the diagonal. For 5 or 7 marks explain how the threshold moves the point and define AUC in one line. If the question says special points, give the reason for each coordinate, because the marks are for the reason, not the label.</p>`
        }
      ],
      practice: [
        {
          q: "A model currently uses a 0.5 threshold and gets recall 0.72 and precision 0.55. Lowering the threshold to 0.3 raises recall to 0.91 and drops precision to 0.28. Explain what happens to TP, FP and FN, when you would make the move, and what you would check before shipping it.",
          a: `<p>Lowering the threshold makes the model call more rows positive. TP rises because more real positives clear the bar, and FP rises because more real negatives clear it too. FN falls because fewer positives are left below the bar. Recall is TP / (TP + FN), so it rises; precision is TP / (TP + FP), and the extra false positives pull it down. The reported pair, 0.72 to 0.91 and 0.55 to 0.28, has exactly that shape.</p><p>Make the move when a missed positive costs more than a false alarm. A cancer screen, a fraud alert or a safety check usually fits, because the cost of a miss is large and the cost of a review is bounded. Keep the higher threshold when a false alarm triggers expensive or risky action, as with a spam filter that must not bin a real invoice.</p><p>Before shipping, check the capacity of the team that handles alerts. A recall gain that produces more alerts than the team can review is not a real gain. Measure precision at the actual review budget, not over all alerts. Recheck the calibration of the scores, because a threshold is only meaningful if the probabilities are honest, and validate on a recent held-out period rather than the training set.</p><p>Finally, state the chosen threshold and the resulting confusion counts in the model card, so the next team knows which operating point the reported recall belongs to.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "A model has AUC 0.93, but at the chosen threshold on a 0.5% positive rate its precision is 0.08. Explain how both can be true and what you would report instead.",
          a: `<p>AUC measures ranking over all thresholds. It asks how often a random positive gets a higher score than a random negative, and 0.93 says the ranking is strong. Precision measures one threshold, and it depends on how many negatives exist.</p><p>At a 0.5% positive rate there are 199 negatives for every positive. Precision 0.08 means about 11.5 false alarms for each true positive. Spread over 199 negatives, that is a false positive rate near 5.8%, which sounds modest for the model and still produces a heavy alert load for the team. A good ranker can therefore have poor precision at a usable cut.</p><p>Report the confusion counts and precision at the operating threshold, the recall at that threshold, and the alert volume. Add a precision-recall curve, which shows the precision cost as recall rises and is more informative than AUC when positives are rare. If the decision needs a fixed alert budget, report precision at that budget and the recall it buys.</p><p>AUC is still useful for comparing two rankers before a threshold is chosen. It is not a substitute for the operating point, and it should never be the only number in a deployment review.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A model reports AUC 0.35. What does that mean, and what is the first thing you would try?",
          a: `<p>AUC 0.35 is below the 0.5 random line, so the model ranks negatives above positives more often than the reverse. It has learned a signal, but the score points the wrong way.</p><p>The first thing to try is to invert the scores, which turns 0.35 into 0.65. Then check for a label encoding error, because swapping the positive and negative class often produces exactly this pattern. If the inverted model still performs poorly, the features or the training window need attention.</p>`,
          marks: 3,
          diff: "easy"
        }
      ]
    }
  ]
};
