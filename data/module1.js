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
          text: "Machine learning trains a model on examples so it can find patterns and make predictions for new cases."
        },
        {
          type: "text",
          html: `<h4>Core idea</h4><p><b>Machine learning</b> is a branch of artificial intelligence. You provide examples, and an algorithm uses them to build a model. The model then makes predictions for new cases. Generalising means working on examples the model did not train on.</p>
<h4>Rules and learning</h4><p>In ordinary programming, a person writes rules and the computer applies them to data. In machine learning, the computer uses training examples to find useful patterns and represent them in a model. A spam filter can learn word patterns from emails labelled spam or not spam, rather than relying on a person to list every spam phrase.</p>
<p>A working system needs training data, a learning algorithm, and an error measure. The error measure compares predictions with correct answers. Training adjusts the model to reduce that error, then testing checks rows the model has not seen. If a model performs well only on training rows because it memorised them, it is <b>overfitting</b>.</p>
<h4>Applications</h4><p>The data type often points to the task area.</p>
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
          html: `<h4>Illustrative example: student support</h4><p>A college wants to identify first-year students who may struggle. A fixed rule flags anyone whose school marks are below 50. It can miss someone with strong marks who now commutes four hours a day and works evenings. It can also flag someone whose old low marks no longer reflect their situation.</p>
<p>A model could use attendance, school marks, commute time and part-time work, along with labelled outcomes from previous batches. It learns combinations linked with a poor semester and gives each new student a risk score. Staff decide what support to offer; the model only helps rank cases for review.</p>`
        },
        {
          type: "tip",
          html: `<h4>Exam plan</h4><ol><li>Define machine learning.</li><li>Contrast a learned model with hand-written rules.</li><li>Explain training data, the algorithm and the error measure.</li><li>Add applications that match the question's mark value.</li></ol><p>For an application, name its data and task. Mention Arthur Samuel only when asked about history. Explain overfitting if the question asks how a model can fail.</p>`
        }
      ],
      practice: [
        {
          q: "A vendor's loan-scoring module uses a fixed points table written by staff and has no training step. Does it meet the definition of machine learning? Give two reasons.",
          a: `<h4>Exam-ready answer</h4><p>No. The module applies rules written by people; it does not learn those rules from examples.</p><ol><li>It has no training data or learning step.</li><li>Its points and thresholds do not change when it receives new examples, so it does not learn a pattern that can generalise to new cases.</li></ol><p>It may still be useful, but it is a rule-based scoring system rather than a machine-learning model.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "Choose two machine-learning applications, one where a wrong prediction costs little and one where it could cost a life. For each, name the task and explain how error costs affect evaluation.",
          a: `<h4>1. Product recommendations</h4><p>A shopping site ranks products a user may click. A poor suggestion may lose a click, so the team can compare click metrics and run controlled A/B tests.</p><h4>2. Urgent medical screening</h4><p>A model classifies medical scans. Missing a serious case can be dangerous, while a false alarm may lead to an extra review. The team should measure recall, also called sensitivity, on held-out scans and choose a threshold that limits missed cases. A clinician reviews positive results.</p><h4>Evaluation principle</h4><p>Choose metrics and a decision threshold to reflect the relative costs of false positives and false negatives. Accuracy alone can hide a serious error when the two error types have very different consequences.</p>`,
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
          text: "Association learning finds patterns showing which items or events often appear together in data."
        },
        {
          type: "text",
          html: `<h4>Read an association rule</h4><p>A rule has the form <code>X &rarr; Y</code>. X is the <b>antecedent</b>, the item or event on the left. Y is the <b>consequent</b>, the item or event on the right.</p><p>The rule describes items that appear together; it does not show that X causes Y. For example, <code>{onions, potatoes} &rarr; {burger}</code> says shoppers who buy onions and potatoes often also buy burger meat.</p>
<h4>Measure a rule's strength</h4><p>Use three measures to decide whether the pattern is frequent and informative.</p>
<ul>
<li><b>Support</b> is the fraction of all transactions containing both X and Y: <code>supp(X &rarr; Y) = count(X and Y) / N</code>. Here, <code>N</code> is the total number of transactions.</li>
<li><b>Confidence</b> is the fraction of transactions containing X that also contain Y: <code>conf(X &rarr; Y) = supp(X &rarr; Y) / supp(X)</code>. It is the conditional probability <code>P(Y | X)</code>.</li>
<li><b>Lift</b> compares that confidence with how common Y is overall: <code>lift = supp(X &rarr; Y) / (supp(X) &times; supp(Y))</code>. Lift above 1 means X and Y occur together more often than independence predicts; 1 means independence; below 1 means they co-occur less often.</li>
</ul>
<h4>How rule mining works</h4><ol><li>Apriori finds itemsets whose support meets a chosen minimum.</li><li>It uses downward closure: if an itemset is too rare, any larger set containing it must also be too rare. Apriori can skip those larger sets.</li><li>It forms rules from the frequent itemsets and keeps rules that meet a minimum confidence.</li></ol><p>Eclat and FP-Growth solve the same task with different data structures.</p><p>Common uses include market-basket analysis, cross-selling, product placement, combo offers, web-usage mining, intrusion detection, production monitoring and bioinformatics.</p>`
        },
        {
          type: "example",
          html: `<h4>Illustrative example: canteen bills</h4><p>Use these ten transactions to calculate the three measures.</p>
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
<ol><li>Let X = {milk, bread} and Y = {butter}. Two bills contain all three items, four contain X, and four contain butter.</li><li>Support = 2/10 = 0.20. Two of ten bills contain the full rule.</li><li>Confidence = 2/4 = 0.50. Half of the milk-and-bread bills also contain butter.</li><li>Lift = 0.20 / (0.40 &times; 0.40) = 1.25. The items co-occur more often than independence predicts.</li></ol><p>This is an illustrative association, not proof of cause. For example, a shared breakfast-time pattern could explain both purchases.</p>`
        },
        {
          type: "tip",
          html: `<h4>Exam plan</h4><ol><li>Define association learning and write a rule using <code>X &rarr; Y</code>.</li><li>Label X as antecedent and Y as consequent.</li><li>Explain support, confidence and lift. Write each formula, define its terms, and interpret the result.</li><li>Give an example and the applications asked for.</li></ol><p>State that a rule shows co-occurrence, not causation. For a calculation, show the counts before substituting them into each formula.</p>`
        }
      ],
      practice: [
        {
          q: "A canteen finds a high-confidence rule {coffee} &rarr; {samosa}. Its manager claims coffee sales cause samosa sales and proposes raising coffee prices to increase samosa sales. Give two reasons the rule does not support that claim.",
          a: `<h4>Exam-ready answer</h4><ol><li><b>Association does not prove cause.</b> Break time or a combo counter could increase sales of both items.</li><li><b>The rule does not measure price effects.</b> Confidence counts co-occurrence in past bills; it does not show how demand changes when a price changes. It also does not establish which item is bought first.</li></ol><p>The manager would need a price-change study or experiment to test the claim.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A supermarket has two years of billing data from 40 stores and wants association rules to guide shelf placement and combo offers. Explain how to prepare transactions, mine and filter rules, choose actions, and identify two ways the results could mislead the buyer.",
          a: `<h4>Exam-ready answer</h4><p>Association rules identify products that often appear in the same transactions. The supermarket can use them to suggest placements or offers, then test whether those actions help.</p><h4>1. Prepare transactions</h4><ol><li>Make one basket for each bill.</li><li>Standardise product IDs, remove returns and voided lines, and combine duplicate scans.</li><li>Keep store and date information. Mark promotion periods so the team can check whether discounts explain a pattern.</li></ol><h4>2. Mine and filter rules</h4><ol><li>Choose a minimum support to exclude patterns that occur too rarely to be useful.</li><li>Use Apriori or FP-Growth to find frequent itemsets. Apriori uses downward closure: if a set misses the support minimum, its larger supersets will also miss it.</li><li>Form rules from frequent sets and keep those that meet a minimum confidence.</li><li>Review support, confidence and lift together. Prefer rules with lift above 1 that recur across months and stores. A high confidence can add little if the consequent is already bought by almost everyone.</li></ol><h4>3. Validate and act</h4><p>Check the rule on recent months not used to find it. Test a small number of placements or combo offers against a control group. Measure basket value and units sold, then keep only changes that improve the chosen outcome.</p><h4>Ways results can mislead</h4><ol><li><b>Confounding:</b> coffee and samosas may sell together at 4 p.m. because customers take a break. Moving one near the other may not change sales.</li><li><b>Time effects:</b> a discount, festival or shortage may create a pattern that does not hold in an ordinary month.</li><li><b>Low volume:</b> a high-lift rule based on three baskets a month may not justify shelf space.</li></ol>`,
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
          text: "Classification learns from labelled examples to assign each new input to a known category."
        },
        {
          type: "text",
          html: `<h4>What classification predicts</h4><p>Classification is supervised learning that assigns an input to one of a set of classes. The trained mapping is a <b>classifier</b>. It learns from examples that already have correct labels.</p><p>Each example is represented by a <b>feature vector</b>, a list of measured properties. Features may be categories such as blood group, ordered values such as small/medium/large, counts such as email word count, or measurements such as blood pressure. Useful features help the model distinguish the classes.</p><h4>Binary and multiclass tasks</h4><p>Binary classification has two possible classes, such as spam and not spam. Multiclass classification has more than two, such as film genres. Some methods handle several classes directly; others combine binary classifiers.</p><h4>Training and checking</h4><ol><li>Collect examples with labels.</li><li>Split examples into training and test sets.</li><li>Train the classifier on the training set.</li><li>Measure performance on the held-out test set, and inspect errors for each class.</li><li>After deployment, monitor the inputs. New machines or changing data can make future cases differ from the training examples.</li></ol><p>A classifier normally predicts only classes in its training labels. This is a <b>closed set</b>. If a new class appears, a rejection threshold can send uncertain cases for review. An "other" class needs representative examples to be useful.</p>`
        },
        {
          type: "example",
          html: `<h4>Illustrative example: film genres</h4><p>A streaming catalogue trains on plot summaries labelled with genres by editors. Words and phrases become features. A multiclass model may learn that "spaceship", "crew" and "orbit" are associated with science fiction, while "wedding", "vows" and "reception" are associated with romance.</p><p>For a new film, it returns one of the known genres and a score. A documentary about a wedding on a spaceship may fit neither class well, but a closed-set model still chooses a known label. A confidence threshold or human review can catch uncertain cases.</p>`
        },
        {
          type: "tip",
          html: `<h4>Exam plan</h4><ol><li>Define classification and identify the possible class labels.</li><li>Say whether the task is binary or multiclass.</li><li>Give an example, its features and where its labels come from.</li><li>For a longer answer, show the flow: labelled examples, training, held-out test, prediction.</li></ol><p>If the question concerns an unknown category, explain the closed-set limit and describe rejection or human review.</p>`
        }
      ],
      practice: [
        {
          q: "A defect classifier scores 97% at the factory where it was trained but 61% at a second factory with newer machines. Name the problem and give one data-collection change that could have revealed it before deployment.",
          a: `<h4>Answer</h4><p>This is <b>distribution shift</b>: the second factory's images differ from the training images, perhaps because of different machines, lighting or defect patterns.</p><p>Collect and label images from both factories, then keep a sample from each site in the test set. Report each site's score separately. That test would have shown that the model's strong score did not transfer to the second factory.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A classifier labels machine parts as good, cracked or warped. Rusted parts begin to appear. Explain what the classifier will predict and give two design choices that could reduce harm.",
          a: `<h4>Likely prediction</h4><p>The model was trained on three labels, so it will assign a rusted part to good, cracked or warped. It may do so with high confidence even though none fits.</p><h4>Two safeguards</h4><ol><li><b>Allow rejection.</b> Send low-confidence predictions to a person for inspection.</li><li><b>Add labelled rust examples.</b> Create a rusted class, retrain and monitor performance. An "other" class only helps when it contains examples that represent other faults.</li></ol><p>Track recall for each class so poor detection of a fault is not hidden by an overall average.</p>`,
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
          text: "Regression uses input features to predict a numeric value, such as a price or temperature."
        },
        {
          type: "text",
          html: `<h4>What regression predicts</h4><p>Regression estimates a relationship between input features and a numeric target. The target, also called the dependent variable, might be price, temperature, delivery time or demand. The inputs are the independent variables.</p><h4>Linear regression</h4><p>A simple linear model is <code>y = a + bx</code>. Here, <code>y</code> is the predicted value, <code>x</code> is an input feature, <code>a</code> is the intercept and <code>b</code> is the slope. Ordinary least squares chooses the line that minimises the sum of squared differences between observed values and predictions.</p><p>With several inputs, the model uses one coefficient per input. Each coefficient describes the predicted change when its feature rises by one unit and the other features stay fixed. For example, if price is measured in thousands and age has coefficient -8.2, one extra year predicts a price about 8.2 thousand lower, holding other features fixed.</p><p>Check error on held-out data to see how well the model predicts new cases.</p><h4>Regression and classification</h4><p>Both are supervised learning. Their outputs differ.</p>
<table class="tbl">
<tr><th>Task</th><th>Output</th><th>Example</th><th>Usual error measure</th></tr>
<tr><td>Regression</td><td>A number</td><td>Price of 4,50,000 rupees</td><td>Average error in the target units</td></tr>
<tr><td>Classification</td><td>A class label</td><td>Spam or not spam</td><td>Accuracy, precision, recall</td></tr>
</table>
<h4>Interpret results with care</h4><p>A fitted relationship describes the data used to estimate it. It may not hold in a new period or city. A regression by itself also does not prove cause; an unmeasured factor could affect both an input and the target.</p>`
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
          html: `<h4>Illustrative example: laptop prices</h4><p>Five used laptops of the same model sold at ages 1 to 5 years for 61, 51, 45, 35 and 28 thousand rupees. A least-squares fit gives <code>price = 68.6 - 8.2 &times; age</code>. The fitted values are 60.4, 52.2, 44.0, 35.8 and 27.6.</p><p>The fit explains about 99.5% of variation in this small sample. The slope says each additional year is associated with a predicted decrease of about 8.2 thousand rupees. At age 6, the model predicts 19.4 thousand. This is an illustrative extrapolation beyond the observed ages, so check it against newer sales.</p>`
        },
        {
          type: "tip",
          html: `<h4>Exam plan</h4><ol><li>Define regression and identify the numeric target.</li><li>State that it is supervised because training examples include target values.</li><li>Write the equation if asked, then define every symbol and interpret the slope.</li><li>For a comparison, contrast the outputs, give examples and name suitable error measures.</li><li>For applications, explain what number the model predicts.</li></ol><p>Conclude that a fitted relationship does not by itself prove cause or guarantee accurate predictions in a new setting.</p>`
        }
      ],
      practice: [
        {
          q: "A delivery-time regression uses distance, weather and a city column containing names such as Kochi and Kozhikode. Why should the raw text not be used as a numeric input, and how can the city be encoded?",
          a: `<h4>Answer</h4><p>The model needs numeric features. City names have no natural numerical order, so codes such as 1 and 2 would create a false meaning.</p><p>Use one-hot encoding: create a binary column for each city, with 1 for the matching city and 0 otherwise. One column can be dropped because its city is implied when the remaining columns are all zero. If some cities have very few examples, group them as "other". Delivery time remains a numeric target, so this is regression.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "A delivery-time regression has low average error on training orders but much higher error on orders from the last month. Give three possible causes and a check for each.",
          a: `<h4>Possible causes and checks</h4><ol><li><b>Overfitting:</b> the model learned noise in its training examples. Compare training and held-out errors as model complexity changes, and use cross-validation.</li><li><b>Distribution shift:</b> recent orders may involve new areas, festival demand or longer routes. Compare feature distributions by month and score each segment.</li><li><b>Data leakage:</b> a feature such as completion time may only be known after delivery. Check when each feature becomes available and rebuild each training row using only information available when the order was placed.</li></ol><p>Use a time-based test: train on older orders and test on the newest. A random split could mix future patterns into training and hide a seasonal change.</p>`,
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
          text: "These learning types differ by feedback: labelled answers, unlabelled data, or rewards after actions."
        },
        {
          type: "text",
          html: `<h4>How the feedback differs</h4><p>The learning type depends on what feedback the algorithm receives. Supervised learning uses input-output examples. Unsupervised learning uses inputs without answer labels. Reinforcement learning learns from rewards that follow an agent's actions.</p><h4>Supervised learning</h4><p>Labels provide the correct answers during training. The model learns to predict a class through classification or a number through regression. Preparing enough labelled examples can take time and human effort.</p><h4>Unsupervised learning</h4><p>The examples have no target labels. The algorithm searches for structure, such as clusters, lower-dimensional representations or association rules. A person must judge whether the discovered structure is useful for the task.</p><h4>Reinforcement learning</h4><p>An agent observes a state, chooses an action and receives a reward or penalty from the environment. <b>Exploration</b> means trying actions to learn what happens. <b>Exploitation</b> means choosing actions based on what the agent has learned. Rewards may arrive well after the actions that caused them.</p><h4>Semi-supervised learning</h4><p>This approach combines a small labelled set with a larger unlabelled set. Labels identify the classes; unlabelled examples provide more information about the data. It is useful when raw examples are plentiful but labelling is costly.</p>
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
          html: `<h4>Illustrative examples</h4><p>Identify the feedback first, then choose the learning type.</p>
<ul>
<li><b>Estimating the selling price of a used laptop.</b> Past sales carry a known price, and the output is a number, so this is supervised regression.</li>
<li><b>Grouping customers based on purchase behaviour.</b> There are no group labels to learn from, so this is unsupervised clustering.</li>
<li><b>Predicting the genre of a movie from its plot.</b> Editors have already labelled plots with genres, and the output is a class, so this is supervised classification.</li>
<li><b>Grouping people in a social network.</b> Connections and interests exist, but no group is given, so this is unsupervised clustering.</li>
</ul>
<p>For a new problem, check whether each example has a correct answer. If so, ask whether the answer is a number or class. Without answers, look for unsupervised learning. If feedback comes as a reward after an action, use the reinforcement-learning category.</p>`
        },
        {
          type: "tip",
          html: `<h4>Exam plan</h4><ol><li>State the feedback each method receives.</li><li>Explain what it learns to do.</li><li>Give a matching task and example.</li><li>For a comparison, use a table with feedback, goal, task and example.</li></ol><p>If semi-supervised learning is relevant, explain that it combines a small labelled set with a larger unlabelled set.</p>`
        }
      ],
      practice: [
        {
          q: "A support team has 400,000 old tickets and can label 3,000 by hand. Describe a semi-supervised method, explain how it uses the unlabelled tickets, and give one risk.",
          a: `<h4>Approach</h4><p>Semi-supervised learning combines a small labelled set with a larger unlabelled set.</p><ol>
<li>Define a small label set, such as billing, login, refund and other, and label 3,000 tickets with a written guide. Double-check a sample so the labels are consistent.</li>
<li>Represent each ticket as TF-IDF or an embedding, which turns the text into numeric features.</li>
<li>Train a classifier on the labelled set, then predict labels for the unlabelled tickets.</li>
<li>Add the most confident predictions as pseudo-labels and retrain. A method such as self-training repeats this in rounds.</li>
<li>Keep a held-out labelled set untouched, and check per-class precision and recall after every round.</li>
</ol>
<p>The unlabelled tickets add examples of vocabulary and data patterns that 3,000 labelled tickets may not cover. This can help the classifier fit the broader set of tickets.</p><h4>Risk: confirmation bias</h4><p>A wrong pseudo-label may be added to training and reinforced in later rounds, especially for a rare class. Use a confidence threshold, limit pseudo-labels and audit samples by hand. Old tickets may also describe products that no longer exist.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "A warehouse robot is rewarded only when it packs a full order correctly, several minutes after the important actions. Explain why this delay makes learning harder and name one way to help.",
          a: `<h4>Why delay is difficult</h4><p>The agent must connect the final reward to the earlier actions that helped produce it. When many actions occur before feedback, it is hard to assign credit to the useful steps. The reward is also sparse: most attempts provide little feedback, so useful learning may take many trials.</p><h4>One way to help</h4><p>Add intermediate rewards for safe sub-goals such as picking, moving, scanning and packing, while retaining the final reward for completing the order. These rewards can guide exploration, but the team must choose them carefully because the agent learns to maximise the rewards it receives. Demonstrations can also give it examples of workable actions.</p>`,
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
          text: "PCA combines related features into fewer new axes while retaining as much variation as possible."
        },
        {
          type: "text",
          html: `<h4>Why reduce the number of features?</h4><p><b>Dimensionality</b> is the number of features used to describe each example. A patient record with 100 measurements has 100 dimensions. More features can add computation, storage and noise. Some may repeat information already present in other columns.</p><p>Fewer features can make data easier to explore and models faster to train. A two- or three-dimensional representation is also easier to plot. Removing useful signal can hurt predictions, so check the reduced data against the task.</p><h4>What PCA does</h4><p><b>Principal component analysis (PCA)</b> is a linear method that creates new axes from combinations of the original features. The first principal component, PC1, points in the direction with the largest variance in the projected data. PC2 captures the next largest variance while staying perpendicular to PC1.</p><p>Later components follow the same rule. The component directions are eigenvectors of the covariance matrix; each eigenvalue gives the variance along its matching direction.</p><h4>PCA procedure</h4><ol>
<li>Choose the numeric features to analyse.</li>
<li>Standardise each feature to mean 0 and standard deviation 1 when their units or scales differ.</li>
<li>Compute the covariance matrix. For <code>p</code> features, it has <code>p &times; p</code> entries.</li>
<li>Find the matrix's eigenvalues and eigenvectors. Each eigenvector is a component direction; its eigenvalue is the variance along that direction.</li>
<li>Sort eigenvalues from largest to smallest, keeping each eigenvector paired with its value.</li>
<li>Keep the first <code>k</code> eigenvectors, where <code>k</code> is the chosen number of components.</li>
<li>Project the standardised data onto the retained directions.</li>
<li>Use the projected values as the reduced dataset.</li>
</ol>
<h4>Practical choices</h4><p>Scikit-learn's PCA centres data but does not scale it. If feature units differ, apply <code>StandardScaler</code> first. Choose <code>k</code> using a variance target or a held-out task score. The directions with most variance do not always help a classifier most.</p>`
        },
        {
          type: "diagram",
          id: "pca-axes"
        },
        {
          type: "example",
          html: `<h4>Illustrative example: product scores</h4><p>Consider six products with price and quality scores: (1,1), (2,2), (3,2), (4,4), (5,5) and (6,5). Standardise the two columns and calculate their covariance matrix.</p><p>Since the features tend to rise together, the eigenvectors point along and across the diagonal of the data cloud. The eigenvalues are about 1.96 and 0.04. PC1 therefore holds about 98% of the total variance. Keeping one score per product reduces the data from two dimensions to one, with little of the measured variation lost.</p>`
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
          html: `<h4>Exam plan</h4><ol><li>Explain why reducing features can help and note the risk of losing useful information.</li><li>Describe PCA as a method that creates new directions from the original features.</li><li>Write the computation steps in order. Explain standardisation when scales differ.</li><li>Define eigenvectors as component directions and eigenvalues as variance along those directions.</li><li>Use an example or explain how the retained components are chosen, if asked.</li></ol>`
        }
      ],
      practice: [
        {
          q: "PCA is linear. Describe a dataset for which PCA would not provide a useful one-dimensional summary, and explain why.",
          a: `<h4>Illustrative example: points on a circle</h4><p>Imagine points arranged around a circle in two dimensions. Their spread is similar in every direction, so no single line captures the circular pattern. Projecting onto one principal component places points from opposite sides near the same position.</p><p>A linear projection cannot straighten this curved pattern into a useful one-dimensional representation. A nonlinear method may be more suitable when the structure follows a curve.</p>`,
          marks: 3,
          diff: "easy"
        },
        {
          q: "Why does PCA often require standardised features? Explain what may happen if you use annual income in rupees and years of education without scaling.",
          a: `<h4>Why scale?</h4><p>PCA finds directions with the greatest variance, and variance depends on measurement units. Income measured in rupees may have much larger numerical values than years of education.</p><p>Without scaling, income can dominate the first component because of its units. The component may mostly reflect income and give little attention to education.</p><h4>Standardisation</h4><p>For each value, calculate <code>(x - mean) / standard deviation</code>. This gives each feature mean 0 and variance 1. Scikit-learn's PCA centres data but does not scale it, so apply <code>StandardScaler</code> first when scales differ. Fit the scaler on training data, then use those same training means and standard deviations on test data.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A team keeps two of twelve principal components, and test-set recall drops sharply. Explain what information may have been lost and give two principled ways to choose the number of components.",
          a: `<h4>What may have been lost?</h4><p>PCA ranks directions by variance without using class labels. A low-variance direction can still distinguish classes. Dropping components 3 to 12 may remove that signal, while the first two capture variation caused by something less useful, such as size or brightness.</p><h4>Choose components using evidence</h4><ol><li><b>Variance target:</b> inspect explained variance and retain enough components to reach a chosen target, such as 90 or 95 percent. The corresponding scikit-learn setting is <code>PCA(n_components=0.95, svd_solver="full")</code>.</li><li><b>Task-based validation:</b> include PCA in cross-validation, test several values of <code>k</code>, and choose the one with the best held-out recall or F1.</li></ol><p>Report both retained variance and the classifier's score. Each describes a different part of the result.</p>`,
          marks: 7,
          diff: "hard"
        }
      ]
    }
  ]
};
