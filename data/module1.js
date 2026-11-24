window.ML_MODULES = window.ML_MODULES || {};
window.ML_MODULES[1] = {
  num: 1,
  title: "Overview of Machine Learning",
  hours: 6,
  topics: [
    {
      slug: "m1-intro",
      title: "Machine Learning and Its Applications",
      sources: [
        "https://en.wikipedia.org/wiki/Machine_learning",
        "https://www.ibm.com/topics/machine-learning"
      ],
      blocks: [
        {
          type: "definition",
          text: "Machine learning builds models that learn patterns from data and improve with experience, instead of following hand-written rules."
        },
        {
          type: "text",
          html: `<p><b>Machine learning</b> is a branch of artificial intelligence. Instead of writing a rule for every case, you give the computer examples, and it builds a model that turns those examples into predictions for new cases. Wikipedia describes the field as statistical algorithms that learn from data and generalise to unseen data. IBM calls it the subset of AI whose algorithms learn the patterns of training data and then infer new data.</p>
<p>The term is old. Arthur Samuel coined it in 1959 while working on a checkers program at IBM, so the history starts well before the current wave of large models.</p>
<p><b>Rules versus learning.</b> In ordinary programming a person writes the rules, and data flows through them to produce an answer. In machine learning, data and answers go in together, and training produces the rules as a model. A spam filter shows the difference: nobody can list every spam phrase, but a model can learn word patterns from thousands of emails already marked spam or not spam.</p>
<p>A working system needs three things: training data, a learning algorithm, and an error measure that says how far each prediction sits from the right answer. Training adjusts the model to reduce that error, then you test it on rows it has never seen. A model that scores well only on its training rows has memorised them, which is <b>overfitting</b>.</p>
<p><b>Where it is used.</b> The application usually follows the data type.</p>
<table class="tbl">
<tr><th>Data</th><th>Task area</th><th>Typical use</th></tr>
<tr><td>Images and video</td><td>Computer vision</td><td>X-ray screening, face recognition, self-driving cars</td></tr>
<tr><td>Text and speech</td><td>Natural language processing</td><td>Chatbots, speech recognition, translation, sentiment analysis</td></tr>
<tr><td>Numbers over time</td><td>Time series</td><td>Demand forecasting, anomaly detection</td></tr>
<tr><td>User behaviour</td><td>Recommendation and ranking</td><td>Product suggestions, spam filtering, fraud checks</td></tr>
</table>`
        },
        {
          type: "example",
          html: `<p>A college wants to flag first-year students who may struggle. The old rule is simple: flag anyone with school marks below 50. It misses a student with strong school marks who now commutes four hours a day and works evenings. It also flags a student who scored badly years ago but has since settled.</p>
<p>A learning version uses attendance, school marks, commute time, hours of part-time work and the results of previous batches as labelled examples. The model learns which combinations came before a poor semester, and it outputs a risk score for each new student. The college still decides what help to offer, because the model ranks risk and does not choose the intervention.</p>`
        },
        {
          type: "tip",
          html: `<p>Open with the definition, then show the programming contrast, because that contrast separates machine learning from a rule engine. For 3 marks, add two applications. For 8 marks, give four applications with the data type and one sentence each. Name Samuel only if the question asks for history, and keep the overfitting line for the end.</p>`
        }
      ],
      practice: [
        {
          q: "A vendor advertises a machine learning module that scores loan applications using a fixed points table written by its staff, with no training step. Does this meet the definition of machine learning? Justify your answer with two points.",
          a: `No. Machine learning is a field of AI whose algorithms learn from data and generalise to unseen data. IBM describes it as learning the patterns of training data instead of following hard-coded instructions. A fixed points table is a hand-written rule: a person chose every weight and threshold, and the system does not adjust them when new data arrives.
There is no training data, no error measure, and no model that improves with experience. It may still be a useful scoring system, but it is rule-based programming.
The practical test is where the decision boundary comes from and whether it changes when you show the system more examples. Here it does not.`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "Pick two machine learning applications, one where a wrong prediction costs a few rupees and one where it costs a life. For each, name the task and explain how the cost of an error should change the way the system is evaluated.",
          a: `<p><b>Application 1: product recommendation on a shopping site.</b> The task is ranking or classification of items a user may click. A wrong recommendation costs a lost click, so the team can evaluate with offline click metrics and run many A/B tests. A false positive is cheap and fast to correct.</p>
<p><b>Application 2: screening a scan for a condition that needs urgent treatment.</b> The task is image classification. A missed case is dangerous, while a false alarm costs a review, so the team must report recall or sensitivity on held-out images and choose a threshold that keeps misses low. A clinician confirms every positive before treatment.</p>
<p>The general point is that the evaluation metric follows the cost of the two error types, and the decision threshold follows the same cost. Overall accuracy is a poor headline when one error is far more serious than the other.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m1-associations",
      title: "Learning Associations",
      sources: [
        "https://en.wikipedia.org/wiki/Association_rule_learning"
      ],
      blocks: [
        {
          type: "definition",
          text: "Association learning finds rules that describe which items or events occur together often in a large dataset."
        },
        {
          type: "text",
          html: `<p>An association rule has the form <code>X &rarr; Y</code>, where X is the antecedent and Y is the consequent. The rule says the two appear together often enough to be worth noting. It does not say that X causes Y. Wikipedia's supermarket example, <code>{onions, potatoes} &rarr; {burger}</code>, means a shopper who buys onions and potatoes is likely to buy burger meat too, which is useful for placement and promotions.</p>
<p><b>Three measures</b> decide whether a rule is worth keeping.</p>
<ul>
<li><b>Support</b> is how often the whole itemset appears: <code>supp(X &rarr; Y) = count(X and Y) / N</code>. It tells you whether the rule covers enough business to matter.</li>
<li><b>Confidence</b> is the share of X baskets that also hold Y: <code>conf(X &rarr; Y) = supp(X &rarr; Y) / supp(X)</code>. It is the conditional probability P(Y | X).</li>
<li><b>Lift</b> compares confidence with the base rate of Y: <code>lift = supp(X &rarr; Y) / (supp(X) &times; supp(Y))</code>. Lift above 1 means the items pull together, 1 means they are independent, and below 1 means they occur together less often than chance.</li>
</ul>
<p><b>Mining the rules.</b> Apriori works in two stages. First it finds itemsets whose support clears a minimum, using downward closure: if an itemset is too rare, every larger set containing it is also too rare, so those branches are pruned. Then it turns frequent itemsets into rules that clear a minimum confidence. Eclat and FP-Growth solve the same problem with different data structures.</p>
<p><b>Where it is used.</b> Market basket analysis, cross-selling, product placement and combo offers are the common retail uses. Wikipedia also lists web usage mining, intrusion detection, continuous production and bioinformatics.</p>`
        },
        {
          type: "example",
          html: `<p>Ten canteen bills are enough to see the arithmetic.</p>
<table class="tbl">
<tr><th>Bill</th><th>Items</th></tr>
<tr><td>1</td><td>milk, bread, butter</td></tr>
<tr><td>2</td><td>milk, bread, butter</td></tr>
<tr><td>3</td><td>milk, bread</td></tr>
<tr><td>4</td><td>milk, bread</td></tr>
<tr><td>5</td><td>butter</td></tr>
<tr><td>6</td><td>butter</td></tr>
<tr><td>7</td><td>apple</td></tr>
<tr><td>8</td><td>apple</td></tr>
<tr><td>9</td><td>rice</td></tr>
<tr><td>10</td><td>rice</td></tr>
</table>
<p>Let X be {milk, bread} and Y be {butter}. Two bills hold all three items, four hold milk and bread, and four hold butter. Support is 2/10 = 0.20. Confidence is 2/4 = 0.50, so half the milk-and-bread baskets also take butter. Lift is 0.20 / (0.40 &times; 0.40) = 1.25, so butter turns up with this basket 25% more often than its own base rate suggests.</p>
<p>A lift of 1.25 is a weak pull. Before acting, the canteen should check whether breakfast time explains both purchases, because a shared cause can produce a rule with no practical use.</p>`
        },
        {
          type: "tip",
          html: `<p>Write the rule with the arrow and label the antecedent and consequent before anything else. For 3 marks, define association and give one rule. For 9 marks, split the answer as concept, three metrics with formulas, and five applications, because that is how the marks are usually grouped. Show one substitution for support, confidence and lift, then interpret lift as above, at, or below 1. Finish by saying the rule describes co-occurrence, so it cannot prove cause.</p>`
        }
      ],
      practice: [
        {
          q: "A canteen finds the rule {coffee} &rarr; {samosa} with high confidence. The manager says coffee sales cause samosa sales, so raising the coffee price will raise samosa sales. Give two reasons the rule cannot support that claim.",
          a: `First, an association rule describes co-occurrence in past bills, not cause. Coffee and samosas may both be bought at break time, so a third factor such as time of day, hunger or a combo counter drives both.
Second, confidence does not establish direction. Samosa buyers may also buy coffee, and the data cannot tell which came first. The rule also says nothing about price: it measures how often the items appear together, not how demand responds to a price change.
To test the manager's claim you need an experiment or a price-change study, not a rule mined from historical baskets.`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A supermarket chain has two years of billing data from 40 stores and wants to use association rules for shelf placement and combo offers. Describe the full analysis: how you would prepare the transactions, how you would mine and filter rules, how you would decide which rules to act on, and two ways the result could mislead the buyer.",
          a: `<p><b>1. Prepare the baskets.</b> Make one basket per bill, normalise item ids so the same product is not split across spellings, remove returns and voided lines, and merge duplicate scans. Add a store id and a timestamp. Flag promotion periods, because a discount can create co-occurrence that disappears at full price.</p>
<p><b>2. Mine frequent itemsets.</b> Choose a minimum support that leaves enough baskets for a rule to be reliable, then run Apriori or FP-Growth. Apriori prunes with downward closure: if a set is below the support floor, every superset is below it too. Form rules from the frequent sets and keep those above a minimum confidence.</p>
<p><b>3. Filter and rank.</b> Prefer rules with lift above 1, a support floor that reflects real volume, and stability across months and stores. Drop trivial rules whose consequent is bought by almost every customer, because confidence will look high while the rule adds nothing. Check the reverse rule too, since direction matters for placement.</p>
<p><b>4. Validate before acting.</b> Hold out the most recent months and re-mine. A rule that exists only in an old promotion is not a plan. Test a small set of placements or combo offers against a control group and measure basket value as well as units of the promoted item.</p>
<p><b>5. Act on the result.</b> Place related items near each other, design combo offers, and use the rules to choose cross-sell prompts. Keep the support, confidence and lift beside each decision so the buyer can see the evidence.</p>
<p><b>Where it can mislead.</b> (a) Confounding: coffee and samosas sell together at 4 p.m. because both suit a break, so moving one next to the other may change nothing. (b) Promotion and season effects: a temporary discount, a festival or a supply shortage can create a rule that does not hold in a normal month. (c) Volume: a high-lift rule with three baskets a month is not worth shelf space.</p>`,
          marks: 14,
          diff: "hard"
        }
      ]
    },
    {
      slug: "m1-classification",
      title: "Classification",
      sources: [
        "https://en.wikipedia.org/wiki/Statistical_classification"
      ],
      blocks: [
        {
          type: "definition",
          text: "Classification assigns an input to one of a fixed set of categories after learning from labelled examples."
        },
        {
          type: "text",
          html: `<p>Classification is the supervised task of putting an input into one of a fixed set of classes. The function that does the mapping is a <b>classifier</b>. Training needs examples with their correct labels, because the whole point is to learn the boundary between the known classes.</p>
<p>An observation becomes a <b>feature vector</b>. Features can be categorical (blood group), ordinal (small, medium, large), integer (word count in an email) or real valued (blood pressure). The choice of features matters a great deal, because a weak representation can hide the pattern whatever the algorithm.</p>
<p><b>Two shapes.</b> Binary classification has two classes, such as spam and not spam. Multiclass classification has several, such as the genre of a film. Many algorithms are designed for two classes, so a multiclass problem is often built from several binary classifiers.</p>
<p><b>How a project runs.</b> Collect labelled examples, split them into training and test sets, train the classifier, and score it on rows it has not seen. Then inspect the errors by class, because an average can hide a class that is always wrong. In production, monitor the input distribution, since a model trained on last year's data can quietly stop matching this year's.</p>
<p>A classifier can only output a class it was trained on. That closed set is a strength when the classes are stable. It becomes a weakness when a new category appears, which is why rejection thresholds and an "other" class are common in practice.</p>`
        },
        {
          type: "example",
          html: `<p>A streaming catalogue wants to tag each film with a genre from its plot summary. The training rows are plots already labelled by editors, and the features are the words and phrases in those plots. A multiclass classifier learns that "spaceship", "crew" and "orbit" pull toward science fiction, while "wedding", "vows" and "reception" pull toward romance.</p>
<p>For a new film the model returns one of the known genres with a score. If the plot is a documentary about a wedding on a spaceship, the model still has to choose one label, even when neither genre fits well. That is the closed-set limit, and it is why a confidence threshold or a human review step belongs in the pipeline.</p>`
        },
        {
          type: "tip",
          html: `<p>Name the task and the label set first, because "classification" alone earns little. State whether it is binary or multiclass, then name the features and the source of the labels. For 5 or 7 marks, draw the flow from labelled examples to training to a held-out test to prediction. Use one named example throughout, and mention the closed-set limit when the question asks about a new or unknown category.</p>`
        }
      ],
      practice: [
        {
          q: "A defect classifier scores 97% at the factory where it was trained and 61% at a second factory with newer machines. Name the problem and give one change in data collection that would have exposed it before deployment.",
          a: `This is distribution shift, also called dataset shift. The second factory's images come from different machines, lighting and defect patterns, so the training sample no longer matches the deployment data. The 97% figure was measured on rows from the same distribution, which is why it looked safe.
Hold out a sample from every site, or test on the second factory before release, and report the score per site. Stratified sampling with a site column in the test set would have shown the gap.
The next step is to label images from both factories and retrain, then keep the per-site score in the release check.`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A classifier is trained to label machine parts as good, cracked or warped. A new fault type, rusted, appears in production. Explain what the classifier will output and describe two design choices that reduce the damage.",
          a: `The classifier assigns one of the three known classes, because its output layer and training labels define a closed set. A rusted part will be forced into good, cracked or warped, often with a confident score, so the error is silent.
Two design choices help.
<ul>
<li><b>A rejection option.</b> The model abstains when its confidence is below a threshold and sends the part to a human. This catches inputs that fit none of the classes well.</li>
<li><b>Collect and label the new fault.</b> Add a fourth class, retrain, and monitor for inputs that differ from the training distribution. An "other" class helps only when it has examples, because an empty class teaches the model nothing.</li>
</ul>
Report per-class recall as well, so a new failure shows up instead of being averaged away.`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m1-regression",
      title: "Regression",
      sources: [
        "https://en.wikipedia.org/wiki/Regression_analysis",
        "https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html"
      ],
      blocks: [
        {
          type: "definition",
          text: "Regression predicts a numeric output, such as a price or temperature, from one or more input features."
        },
        {
          type: "text",
          html: `<p>Regression estimates the relationship between a dependent variable and one or more independent variables. In machine learning terms, it predicts a number: a price, a temperature, a delivery time or a demand count.</p>
<p>The common form is linear regression, <code>y = a + bx</code>. Ordinary least squares chooses the line that minimises the sum of squared differences between the observed values and the line. With several inputs the line becomes a hyperplane, and each coefficient says how much the prediction moves when that feature rises by one unit while the others stay fixed.</p>
<p>The coefficients carry the interpretation. Suppose the target is price in thousands, and age has a coefficient of -8.2. One extra year then lowers the predicted price by about 8.2 thousand, holding the other features constant. A model with a good fit on training rows can still fail on new rows, so the error that matters is measured on held-out data.</p>
<p><b>Regression and classification</b> are both supervised, and the output separates them.</p>
<table class="tbl">
<tr><th>Task</th><th>Output</th><th>Example</th><th>Usual error measure</th></tr>
<tr><td>Regression</td><td>A number</td><td>Price of 4,50,000 rupees</td><td>Average error in the target units</td></tr>
<tr><td>Classification</td><td>A class label</td><td>Spam or not spam</td><td>Accuracy, precision, recall</td></tr>
</table>
<p><b>Prediction is not proof of cause.</b> A fitted relationship describes one dataset. Using it for a new period or a new city needs a reason to believe the relationship travels. Using it to claim cause needs more than a regression, because an omitted variable can drive both the input and the output.</p>`
        },
        {
          type: "code",
          lang: "python",
          html: `import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

df = pd.read_csv("laptops.csv")
X = df[["age_years", "ram_gb", "storage_gb"]]
y = df["price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print("price change per year:", round(model.coef_[0], 2))
print("average error:", round(mean_absolute_error(y_test, pred), 2))`
        },
        {
          type: "example",
          html: `<p>Five used laptops of the same model sold at ages 1 to 5 years for 61, 51, 45, 35 and 28 thousand rupees. A least-squares fit gives <code>price = 68.6 - 8.2 &times; age</code>. The fitted values are 60.4, 52.2, 44.0, 35.8 and 27.6, which sit close to the actual prices, and the fit explains about 99.5% of the variation in this small sample.</p>
<p>Read the slope as well as the fit. Each extra year is associated with about 8.2 thousand rupees less, so the model predicts 19.4 thousand at age 6. That is an extrapolation, because no six-year-old laptop appears in the data, so treat it as an estimate and check it against newer sales.</p>`
        },
        {
          type: "tip",
          html: `<p>Write the equation and define the slope before the example, because the interpretation earns marks that a bare formula does not. For 5 marks, add one application and the supervised justification. For 8 marks comparing regression with classification, use a table with output, example and error measure. End with the caution that a fit on one dataset does not prove cause or guarantee a new context.</p>`
        }
      ],
      practice: [
        {
          q: "A regression model for delivery time uses distance, weather and city. The city column holds text such as Kochi and Kozhikode. Explain why the raw column cannot go into the model and how you would encode it.",
          a: `Regression computes a weighted sum, so every input must be numeric. A text column has no order or distance, and assigning codes such as 1 and 2 would tell the model that Kozhikode's effect is twice Kochi's, which has no meaning.
Use one-hot encoding: make one binary column per city, with 1 for the row's city and 0 for the rest. Drop one column to avoid redundant information, since the dropped city is implied when all the others are 0. The model then learns a separate intercept shift for each city.
If a city has too few rows, group it as "other" so the column stays stable. The target, delivery time, remains numeric, which is what makes this a regression problem.`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A team reports that its delivery-time regression has a small average error on the training orders but a much larger error on orders placed in the last month. Give three likely causes and one check for each.",
          a: `<p><b>1. Overfitting.</b> The model has memorised training noise. Check by comparing training and held-out error as model complexity rises, and use cross-validation instead of one split.</p>
<p><b>2. Distribution shift.</b> Last month's orders differ from the training period, perhaps through new delivery areas, festival demand or longer routes. Check feature distributions month by month and score the model per segment.</p>
<p><b>3. Leakage.</b> A feature such as delivery completion time or the final route is only known after the delivery. Check the timestamp of every feature and rebuild each row as it looked at order time.</p>
<p>A seasonal effect that the features do not capture can cause the same gap. The first fix is an honest time-based split: train on older orders and test on the newest, because a random split mixes the future into training and hides the problem.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m1-paradigms",
      title: "Supervised, Unsupervised and Reinforcement Learning",
      sources: [
        "https://en.wikipedia.org/wiki/Supervised_learning",
        "https://en.wikipedia.org/wiki/Unsupervised_learning",
        "https://en.wikipedia.org/wiki/Reinforcement_learning",
        "https://scikit-learn.org/stable/modules/generated/sklearn.semi_supervised.SelfTrainingClassifier.html"
      ],
      blocks: [
        {
          type: "definition",
          text: "Supervised, unsupervised and reinforcement learning differ in their feedback: labels, no labels, or rewards from actions."
        },
        {
          type: "text",
          html: `<p>The three main paradigms differ in what the learner receives. Supervised learning gets input-output pairs, so it learns a mapping from features to answers. Unsupervised learning gets inputs only, so it looks for structure. Reinforcement learning gets no labelled pairs: an agent acts, the environment changes, and a reward comes back.</p>
<p><b>Supervised.</b> The labels are the teacher. Classification predicts a class and regression predicts a number. The cost is labelling, because a human has to supply the correct answer for enough examples.</p>
<p><b>Unsupervised.</b> There is no correct answer to compare against, so the algorithm finds clusters, low-dimensional structure or association rules. Evaluation is harder, because a cluster is useful only if it means something to the person using it.</p>
<p><b>Reinforcement.</b> The agent observes a state, chooses an action, and receives a reward or penalty. It has to balance exploration, which tries new actions, against exploitation, which uses what it already knows. The correct action is never handed over, and the reward can arrive long after the action that earned it.</p>
<p><b>Semi-supervised</b> sits between supervised and unsupervised. A small labelled set fixes the meaning of the classes, and a much larger unlabelled set shows the shape of the data. It suits problems where labelling is expensive but raw data is plentiful.</p>
<table class="tbl">
<tr><th>Basis</th><th>Supervised</th><th>Unsupervised</th><th>Reinforcement</th></tr>
<tr><td>Training signal</td><td>Labelled input-output pairs</td><td>Unlabelled inputs</td><td>Rewards from actions</td></tr>
<tr><td>Goal</td><td>Predict an output</td><td>Find structure</td><td>Learn a policy that maximises reward</td></tr>
<tr><td>Typical task</td><td>Classification, regression</td><td>Clustering, dimensionality reduction</td><td>Sequential decisions</td></tr>
<tr><td>Example</td><td>Spam filter</td><td>Customer segmentation</td><td>Game-playing agent</td></tr>
</table>`
        },
        {
          type: "example",
          html: `<p>Four module scenarios sort cleanly once you ask what feedback is available.</p>
<ul>
<li><b>Estimating the selling price of a used laptop.</b> Past sales carry a known price, and the output is a number, so this is supervised regression.</li>
<li><b>Grouping customers based on purchase behaviour.</b> There are no group labels to learn from, so this is unsupervised clustering.</li>
<li><b>Predicting the genre of a movie from its plot.</b> Editors have already labelled plots with genres, and the output is a class, so this is supervised classification.</li>
<li><b>Grouping people in a social network.</b> Connections and interests exist, but no group is given, so this is unsupervised clustering.</li>
</ul>
<p>The question to ask first is simple: does each training row come with the right answer, and is that answer a number or a class? If there is no answer at all, the task is unsupervised. If the feedback arrives as a reward after an action, it is reinforcement learning.</p>`
        },
        {
          type: "tip",
          html: `<p>Answer with the feedback signal first, because that is the distinction the examiner is testing. Name the paradigm and the task, then justify with the presence of labels, the absence of labels, or a reward. For 7 or 8 marks comparing paradigms, draw the table and add one example per row. Keep semi-supervised as a fourth line, and say plainly that it uses a small labelled set with a large unlabelled set.</p>`
        }
      ],
      practice: [
        {
          q: "A support team has 400,000 old tickets and can afford to label 3,000 of them by hand. Describe a semi-supervised approach, how you would use the unlabelled tickets, and one risk.",
          a: `<p>Semi-supervised learning sits between supervised and unsupervised. A small labelled set fixes the meaning of the classes, and a large unlabelled set shows the shape of the data.</p>
<p><b>Steps.</b></p>
<ol>
<li>Define a small label set, such as billing, login, refund and other, and label 3,000 tickets with a written guide. Double-check a sample so the labels are consistent.</li>
<li>Represent each ticket as TF-IDF or an embedding, which turns the text into numeric features.</li>
<li>Train a classifier on the labelled set, then predict labels for the unlabelled tickets.</li>
<li>Add the most confident predictions as pseudo-labels and retrain. A method such as self-training repeats this in rounds.</li>
<li>Keep a held-out labelled set untouched, and check per-class precision and recall after every round.</li>
</ol>
<p>The unlabelled tickets help because they show the vocabulary and the clusters that 3,000 labels may miss, so the decision boundary follows the real data instead of the small sample.</p>
<p><b>Risk: confirmation bias.</b> A wrong pseudo-label can reinforce itself, especially for a rare class. Keep a confidence threshold, cap the pseudo-labelled set, and audit samples by hand. Also watch for drift, since old tickets may describe products that no longer exist.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "A warehouse robot receives a reward only when a full order is packed correctly, several minutes after the actions that mattered. Explain why this delayed reward makes learning harder, and name one way to soften the problem.",
          a: `In reinforcement learning the agent must work out which earlier actions led to the final reward. With one reward at the end of a long episode, many actions sit between cause and feedback, so the credit is spread over the whole sequence. The agent may repeat a good policy without knowing which step was good, or change a harmless step and see no difference. This is the credit assignment problem.
The reward is also sparse. Most episodes give little signal, so random exploration rarely reaches a good outcome, and learning takes many attempts.
One way to soften it is to add intermediate rewards for safe sub-goals such as pick, move, scan and pack, while keeping the final reward as the real objective. Intermediate rewards like this guide exploration, but they have to be designed with care because the agent will optimise whatever you measure. Learning from demonstrations can also start the agent near a workable policy.`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m1-pca",
      title: "Dimensionality Reduction and PCA",
      sources: [
        "https://en.wikipedia.org/wiki/Principal_component_analysis",
        "https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html",
        "https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html"
      ],
      blocks: [
        {
          type: "definition",
          text: "Principal component analysis replaces many correlated features with a few new axes that keep most of the variation."
        },
        {
          type: "text",
          html: `<p>Dimensionality is the number of features used to describe each row. A patient record with 100 measurements is a 100-dimensional dataset. More features can improve a model, but they also add computation, storage and noise, and some of them repeat information that another column already carries.</p>
<p><b>Why reduce.</b> Fewer features make a dataset easier to explore and faster to train. Redundant columns can be collapsed, visualisation becomes possible in two or three dimensions, and dropping noisy directions can reduce overfitting. The trade is direct: a reduction that removes signal will hurt accuracy, so the number of components has to be checked against the task.</p>
<p><b>What PCA does.</b> Principal component analysis is a linear method. It builds new axes as linear combinations of the original features. The first component, PC1, is the direction along which the projected data has the largest variance. PC2 is the direction with the next largest variance that is orthogonal to PC1, and each later component follows the same rule. The components are the eigenvectors of the covariance matrix, and each eigenvalue gives the variance along its eigenvector.</p>
<p><b>The procedure, in order.</b></p>
<ol>
<li>Collect the data and choose the numeric features.</li>
<li>Standardise each feature to mean 0 and standard deviation 1, so units do not decide the result.</li>
<li>Compute the covariance matrix, which is p &times; p for p features.</li>
<li>Find its eigenvalues and eigenvectors.</li>
<li>Sort the eigenvalues from largest to smallest, keeping each eigenvector with its eigenvalue.</li>
<li>Keep the top k eigenvectors, where k is the number of components you want.</li>
<li>Project the standardised data onto those eigenvectors.</li>
<li>Use the projected values as the reduced dataset.</li>
</ol>
<p>Two practical notes. Scikit-learn's PCA centres the data but does not scale it, so <code>StandardScaler</code> has to run first when the units differ. The choice of k can follow a variance target or a held-out score, because the components with the most variance are not always the ones a classifier needs.</p>`
        },
        {
          type: "diagram",
          id: "pca-axes"
        },
        {
          type: "example",
          html: `<p>Take six products scored on two features, price and quality: (1,1), (2,2), (3,2), (4,4), (5,5) and (6,5). Standardise both columns, then take the covariance matrix. Its eigenvectors point along the diagonal of the cloud, because the two features rise together.</p>
<p>The eigenvalues are about 1.96 and 0.04, so PC1 holds about 98% of the total variance. One score per product now carries almost all of the information, and PC2 is mostly the small up-and-down wobble around the diagonal. The dataset has gone from two dimensions to one with little loss.</p>`
        },
        {
          type: "code",
          lang: "python",
          html: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

df = pd.read_csv("sensor_readings.csv")
X = StandardScaler().fit_transform(df)

pca = PCA(n_components=0.95, svd_solver="full")
X_reduced = pca.fit_transform(X)

print(df.shape[1], "features ->", X_reduced.shape[1], "components")
print("variance kept:", round(pca.explained_variance_ratio_.sum(), 3))`
        },
        {
          type: "tip",
          html: `<p>Write the steps in order and number them, because PCA answers are marked on procedure. Put standardisation before the covariance matrix and explain why, then name eigenvectors as directions and eigenvalues as variance. For 8 or 9 marks, add the price-and-quality example and say how many components you keep. If the question asks for significance, list four reasons with one line each, and finish with the loss from dropping components.</p>`
        }
      ],
      practice: [
        {
          q: "PCA is a linear method. Describe one dataset where it would fail to give a useful one-dimensional summary, and explain why.",
          a: `Take points arranged on a circle in two dimensions. The variance is the same in every direction, so no single line captures more spread than another. PC1 and PC2 each explain about half, and projecting onto PC1 folds opposite sides of the circle together.
A linear projection cannot unroll the circle, because the useful coordinate is the angle, which is a nonlinear function of x and y. The same happens with a Swiss roll or another curved manifold.
A nonlinear method such as kernel PCA, t-SNE or an autoencoder is needed when the low-dimensional structure is curved. Plain PCA will still describe the spread, but that summary will not separate the points.`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "Explain why PCA usually needs standardised features. What happens if you skip it when one column is annual income in rupees and another is years of education?",
          a: `PCA picks directions that maximise variance. Variance depends on the units, so a column measured in rupees has a numerical spread in the thousands while years of education spread over a handful of values. Without scaling, the first principal component points almost entirely along income, because that one feature dominates the variance. The analysis then reports what is already obvious, and the education signal is buried.
Standardisation replaces each value with <code>(x - mean) / standard deviation</code>, so every feature has mean 0 and variance 1 and no column wins on units alone. The covariance matrix then behaves like a correlation matrix.
In scikit-learn, PCA centres the data but does not scale it, so <code>StandardScaler</code> must run first. Fit the scaler on the training data and apply the same means and standard deviations to the test data, otherwise information leaks across the split.`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A team keeps the first two of twelve principal components, and its classifier's recall falls sharply on the test set. Explain what was lost, and describe two principled ways to choose the number of components instead of picking two.",
          a: `<p>PCA keeps the directions with the largest variance, and it never looks at the labels. A direction can carry little variance and still separate the classes, so dropping components 3 to 12 can remove exactly the signal the classifier needs. The two retained components summarise the bulk of the spread, which may be driven by a nuisance factor such as overall size or brightness. The class difference can sit in a smaller direction. Variance retained is not the same as information retained for the task.</p>
<p><b>Way 1: a variance target.</b> Plot the explained variance ratio, keep enough components to reach a target such as 90 or 95 percent, and report how many that takes. In scikit-learn this is <code>PCA(n_components=0.95, svd_solver="full")</code>.</p>
<p><b>Way 2: task-based validation.</b> Put PCA inside cross-validation, try k = 2, 5, 10 and so on, and choose the k with the best held-out recall or F1. This tests the components that matter to the classifier instead of the components that carry the most variance.</p>
<p>Report both the variance kept and the downstream score, because either number alone can hide this failure.</p>`,
          marks: 7,
          diff: "hard"
        }
      ]
    }
  ]
};
