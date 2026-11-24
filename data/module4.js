window.ML_MODULES = window.ML_MODULES || {};
window.ML_MODULES[4] = {
  num: 4,
  title: "Classification using SVM and HMM",
  hours: 7,
  topics: [
    {
      slug: "m4-linear",
      title: "Linearly Separable Data",
      sources: [
        "https://en.wikipedia.org/wiki/Linear_separability"
      ],
      blocks: [
        {
          type: "definition",
          text: "Linearly separable data can be split by one straight line, or one hyperplane in higher dimensions, with every point on its correct side."
        },
        {
          type: "text",
          html: `<h4>Picture the boundary first</h4><p>Imagine two groups of dots on a page. A straight line separates them if every dot in one group sits on one side and every dot in the other group sits on the other side. With many features, the same flat divider is called a hyperplane.</p>
<h4>Write the test</h4><p>The boundary is <i>w</i>·<i>x</i>+<i>b</i>=0. Here <i>x</i> is a data point, <i>w</i> is a vector perpendicular to the boundary, the dot means a dot product, and <i>b</i> shifts the boundary.</p><p>A positive value is on one side, a negative value on the other. With class labels <i>y</i>=+1 and −1, separation means <i>y</i>(<i>w</i>·<i>x</i>+<i>b</i>)&gt;0 for every training point.</p>
<h4>Check the class shapes</h4><p>A convex hull is the smallest rubber-band shape that encloses a class's points. A strict separating boundary exists exactly when the two class hulls do not overlap or touch. If they overlap, no straight boundary can separate every point.</p>
<h4>Why SVM chooses a particular line</h4><p>Many lines may separate the same sample. The margin is the gap between the closest points on either side. A support vector machine (SVM) chooses a line centered in the widest such gap, rather than treating every separating line as equally good.</p>
<h4>What separation cannot tell you</h4><p>Perfect separation on the training sample does not guarantee success on new data. A narrow gap, incorrect labels, or a changed test sample can cause errors. A ring-shaped pattern may need a curved boundary, so it cannot be separated in the original feature space by one line.</p>`
        },
        {
          type: "diagram",
          id: "linear-sep"
        },
        {
          type: "example",
          html: `<h4>Check the sample</h4><p>A placement cell plots attendance on the x axis and marks on the y axis. It labels placed students +1 and not-placed students −1. For a proposed line <i>w</i>·<i>x</i>+<i>b</i>=0, three students give values 4.2, 0.8 and −1.9. Their signs agree with their labels, so these points are on the correct sides.</p>
<h4>Read a boundary value</h4><p>A new applicant gives exactly 0, which places them on the line. The sign alone gives no class decision there. Distance from the line matters too, and a wider gap between the nearest students leaves more room for small measurement changes.</p>`
        },
        {
          type: "tip",
          html: `<h4>Build an exam answer</h4><ol><li>Define separation in words: all points of each class must lie on their own side.</li><li>Write <i>y</i>(<i>w</i>·<i>x</i>+<i>b</i>)&gt;0 and identify <i>y</i> as the class label, <i>x</i> as the point, <i>w</i> as the perpendicular vector, and <i>b</i> as the shift.</li><li>For a longer answer, explain that non-overlapping convex hulls allow a strict separator, and sketch the two groups.</li><li>State one limit: a narrow margin or noisy labels can hurt performance on new data.</li></ol>`
        }
      ],
      practice: [
        {
          q: "Given a proposed boundary w·x+b=0 for two labelled classes, explain how you would test every training point. Say what a result of zero means, and describe the two convex hulls when a strict separating boundary exists.",
          a: `<h4>Test the signs</h4><p>Label the classes +1 and −1. For each point <i>x</i>, calculate its score <i>f</i>(<i>x</i>)=<i>w</i>·<i>x</i>+<i>b</i>, then multiply by its label <i>y</i>. The line separates the training set if every product <i>y f</i>(<i>x</i>) is positive.</p><p>Positive-class points must have <i>f</i>&gt;0 and negative-class points must have <i>f</i>&lt;0. A score of zero places a point on the boundary, so separation is not strict.</p>
<h4>Check the hulls</h4><p>Imagine a rubber band around each class. These convex hulls must be separate, with a gap, for a strict separating line to exist. If they touch or overlap, no line strictly separates all points.</p>
<p>For numerical checks, use scaled features and a small tolerance around zero: floating-point rounding can represent a true zero as 1e-16.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A boundary separates every training point correctly. Give two different reasons why it could still make errors on new data, using one sentence for each reason.",
          a: `<h4>Two reasons</h4><ol><li>A narrow margin leaves little room for measurement changes, so a new point can cross the boundary.</li><li>Labels may be noisy or the test distribution may differ, so the training boundary may not match new cases.</li></ol><p>Overfitting to an unusual training point can also tilt the boundary. Check test accuracy and margin width as well as training accuracy.</p>`,
          marks: 3,
          diff: "easy"
        }
      ]
    },
    {
      slug: "m4-svm",
      title: "SVM and the Optimal Separating Hyperplane",
      sources: [
        "https://en.wikipedia.org/wiki/Support_vector_machine",
        "https://scikit-learn.org/stable/modules/svm.html"
      ],
      blocks: [
        {
          type: "definition",
          text: "A support vector machine (SVM) picks the flat boundary with the widest margin, set by the closest training points."
        },
        {
          type: "text",
          html: `<h4>Start with the geometry</h4><p>Imagine two groups of points with several possible straight dividers. Some dividers pass close to a point; others leave a wider clear strip. That strip is the margin. The SVM chooses the divider with the widest margin, because small changes in a point are less likely to push it across.</p>
<h4>Describe the boundary</h4><p>Write a training example as (<i>x<sub>i</sub></i>, <i>y<sub>i</sub></i>). Here <i>x<sub>i</sub></i> is its feature vector, <i>y<sub>i</sub></i> is its class label (+1 or −1), and <i>i</i> identifies the example.</p><p>The decision boundary is <i>w</i>·<i>x</i>+<i>b</i>=0. The vector <i>w</i> points perpendicular to the boundary; <i>b</i> shifts it. The sign of the expression predicts the class.</p>
<h4>Turn the gap into an equation</h4><p>The perpendicular distance from point <i>x</i> to the boundary is |<i>w</i>·<i>x</i>+<i>b</i>|/||<i>w</i>||. The bars mean absolute value, and ||<i>w</i>|| is the length of vector <i>w</i>.</p><p>We choose a scale so the closest points satisfy |<i>w</i>·<i>x</i>+<i>b</i>|=1. The margin edges are then <i>w</i>·<i>x</i>+<i>b</i>=+1 and =−1, with gap 2/||<i>w</i>||.</p>
<h4>Hard-margin optimisation</h4><p>For each example, require <i>y<sub>i</sub></i>(<i>w</i>·<i>x<sub>i</sub></i>+<i>b</i>)≥1. The product is at least 1 when the point is correctly classified and outside the margin. Minimise ½||<i>w</i>||² subject to these constraints; reducing ||<i>w</i>|| widens the gap. The closest points are support vectors, meaning the examples that set the boundary.</p>
<h4>Allowing overlap</h4><p>When classes overlap, a hard-margin solution may not exist. Give each point a slack variable ξ<sub>i</sub>≥0, where ξ records how much it breaks the margin rule. Require <i>y<sub>i</sub></i>(<i>w</i>·<i>x<sub>i</sub></i>+<i>b</i>)≥1−ξ<sub>i</sub>.</p><p>Minimise ½||<i>w</i>||²+<i>C</i>Σξ<sub>i</sub>; <i>C</i> sets the penalty for violations. ξ=0 means outside the margin; 0&lt;ξ&lt;1 means inside but correctly classified; ξ≥1 means misclassified.</p><p>Large <i>C</i> penalises violations more and tends to narrow the margin. Small <i>C</i> accepts more violations for a wider margin. Hinge loss, max(0,1−<i>y f</i>(<i>x</i>)), gives the same per-point penalty.</p>
<h4>Support vectors and prediction</h4><p>The dual form uses inner products and coefficients α<sub>i</sub>, one per training example. Points that affect the margin have α<sub>i</sub>&gt;0; other points have α<sub>i</sub>=0. Prediction is sign(Σ α<sub>i</sub><i>y<sub>i</sub></i><i>K</i>(<i>x<sub>i</sub></i>,<i>x</i>)+<i>b</i>), summed over support vectors. The kernel <i>K</i> supplies a similarity calculation, introduced next.</p>
<h4>Practical choices</h4><p>Standardise features before fitting because feature units affect distances and margins. Tune <i>C</i> and, for an RBF kernel, gamma using cross-validation over a logarithmic grid. In scikit-learn, <code>SVC</code> builds one classifier per class pair; <code>LinearSVC</code> uses one-vs-rest for multiclass problems.</p>`
        },
        {
          type: "code",
          lang: "python",
          html: `from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

X = [[0, 0], [1, 1], [2, 2], [3, 3]]
y = [0, 0, 1, 1]

linear = make_pipeline(StandardScaler(), SVC(kernel="linear", C=1.0))
rbf = make_pipeline(StandardScaler(), SVC(kernel="rbf", C=1.0, gamma="scale"))
poly = make_pipeline(StandardScaler(), SVC(kernel="poly", degree=2, coef0=1.0))

for model in (linear, rbf, poly):
    model.fit(X, y)
    print(model.predict([[1.5, 1.5]]))`
        },
        {
          type: "diagram",
          id: "svm-margin"
        },
        {
          type: "diagram",
          id: "svm-optimal"
        },
        {
          type: "example",
          html: `<h4>Compare the two dividers</h4><p>Both lines separate the same six training points, so both score 100% on this sample. The first nearly touches the nearest positive point. The second sits halfway between the closest points of the classes, leaving a wider margin. A small measurement change is less likely to cross the second line.</p>
<h4>Find the support vectors</h4><p>The three nearest points, two positive and one negative, are the support vectors. Removing another point leaves the fitted line unchanged. Moving a support vector can shift the line because it changes which points define the closest edges.</p>`
        },
        {
          type: "tip",
          html: `<h4>Set up the answer in order</h4><ol><li>Draw and label the boundary <i>w</i>·<i>x</i>+<i>b</i>=0. Define <i>w</i> as the perpendicular vector and <i>b</i> as the shift.</li><li>Mark the margin edges at +1 and −1. Their gap is 2/||<i>w</i>||.</li><li>Write the constraint <i>y<sub>i</sub></i>(<i>w</i>·<i>x<sub>i</sub></i>+<i>b</i>)≥1, then minimise ½||<i>w</i>||².</li><li>Mark the support vectors, the closest examples that set the margin.</li><li>If points overlap, add slack variables ξ<sub>i</sub> and penalty <i>C</i>. Mention feature scaling before tuning <i>C</i>.</li></ol>`
        }
      ],
      practice: [
        {
          q: "Two separating boundaries fit the training set. H1 nearly touches a positive example, while H2 has the widest gap. (a) Explain why H2 may work better on new data by considering a small change to one point. (b) Explain why adding a correctly classified point far beyond the training cloud does not move the fitted boundary.",
          a: `<h4>(a) Margin as a buffer</h4><p>H1 passes close to a positive point, so a small measurement change could move that point across the line. H2 leaves a wider gap, so the same small change is less likely to change the prediction. This makes H2 less sensitive to small changes, though it does not guarantee better results on new data.</p>
<h4>(b) A point beyond the margin</h4><p>The support vectors are the points that set the maximum-margin boundary. A correctly classified point far outside the margin has <i>y</i>(<i>w</i>·<i>x</i>+<i>b</i>)&gt;1, so its constraint is inactive and its dual coefficient is zero.</p><p>Moving it while it remains beyond the margin, or adding a similar point, leaves the solution unchanged. A point on the wrong side violates the margin and can affect the solution; a soft-margin model also pays a slack penalty.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "A soft-margin SVM is fit to overlapping classes with C=0.01 and then C=1000. Compare the margin and tolerated violations in both fits, relate each to bias and variance, state what the slack values mean, and choose a starting setting when missing a positive example is costly.",
          a: `<h4>Compare the settings</h4><p>With C=0.01, violations have a small penalty, so the fit can use a wider margin and tolerate more violations. This tends toward higher bias, meaning a simpler fit that may underfit, and lower variance, meaning less sensitivity to the sample.</p><p>With C=1000, violations carry a high penalty, so the fit tends toward a narrower margin and fewer training violations. It can have lower bias and higher variance, and may overfit noisy labels.</p>
<h4>Write the soft-margin setup</h4><p>The constraints are <i>y<sub>i</sub></i>(<i>w</i>·<i>x<sub>i</sub></i>+<i>b</i>) ≥ 1 − ξ<sub>i</sub> and ξ<sub>i</sub> ≥ 0. Here ξ<sub>i</sub> measures the allowed violation for point <i>i</i>; the objective ½||<i>w</i>||² + <i>C</i> Σ ξ<sub>i</sub> balances margin width against total slack.</p><ul><li>ξ<sub>i</sub>=0: the point is on or beyond the margin.</li><li>0 &lt; ξ<sub>i</sub> &lt; 1: the point is inside the margin and on the correct side.</li><li>ξ<sub>i</sub> ≥ 1: the point is on or beyond the decision boundary.</li></ul>
<h4>When missed positives are costly</h4><p>Start by testing a larger C with <code>class_weight="balanced"</code>, and choose settings through cross-validation using recall or a cost-sensitive measure. A large C alone does not set the relative cost of missing positives and can overfit.</p>`,
          marks: 7,
          diff: "hard"
        }
      ]
    },
    {
      slug: "m4-kernels",
      title: "Kernel Functions and Non-Linear SVM",
      sources: [
        "https://en.wikipedia.org/wiki/Kernel_method",
        "https://scikit-learn.org/stable/modules/svm.html"
      ],
      blocks: [
        {
          type: "definition",
          text: "A kernel function gives the inner product two points would have after a feature map, without computing their new coordinates."
        },
        {
          type: "text",
          html: `<h4>Why use a kernel?</h4><p>A linear SVM draws a straight boundary. If one class sits inside a ring of another, a straight line cannot divide them. A feature map φ(<i>x</i>) turns each point <i>x</i> into new coordinates where a flat boundary may work.</p>
<p>That flat boundary can look curved when viewed back in the original data.</p>
<h4>How the kernel helps</h4><p>The SVM calculation needs inner products between transformed points, not the coordinates themselves. A kernel gives that value directly: <i>K</i>(<i>x</i>,<i>z</i>)=φ(<i>x</i>)·φ(<i>z</i>). Here <i>x</i> and <i>z</i> are two points, φ is the feature map, and the dot is their inner product.</p>
<p>The transformed space stays implicit, so you do not need to construct all its coordinates.</p>
<table class="tbl">
<tr><th>Kernel</th><th>Formula</th><th>Shape and main parameter</th></tr>
<tr><td>Linear</td><td><i>K</i>(<i>x</i>, <i>z</i>) = <i>x</i>·<i>z</i></td><td>straight boundary; fast, good for sparse text</td></tr>
<tr><td>Polynomial</td><td><i>K</i>(<i>x</i>, <i>z</i>) = (γ <i>x</i>·<i>z</i> + <i>r</i>)<sup><i>d</i></sup></td><td>curves and feature interactions; degree <i>d</i></td></tr>
<tr><td>RBF (Gaussian)</td><td><i>K</i>(<i>x</i>, <i>z</i>) = exp(−γ||<i>x</i>−<i>z</i>||²)</td><td>local bumps, very flexible; gamma</td></tr>
<tr><td>Sigmoid</td><td><i>K</i>(<i>x</i>, <i>z</i>) = tanh(γ <i>x</i>·<i>z</i> + <i>r</i>)</td><td>neural-network style; not always a valid kernel</td></tr>
</table>
<h4>Read the parameters</h4><p>For an RBF kernel, gamma controls how far each point's influence reaches. Large gamma makes the influence local, so the boundary can wrap tightly around single points. Small gamma makes it broad and smooth.</p><p>A degree-2 polynomial kernel adds pairwise products, so it can represent feature interactions. Very high degree or gamma can memorise the training data.</p>
<h4>Check that a kernel is valid</h4><p>A valid kernel must be symmetric, and its Gram matrix K<sub>ij</sub>=K(x<sub>i</sub>,x<sub>j</sub>) must be positive semi-definite. The Gram matrix lists kernel values for pairs of training points. Mercer's condition describes this requirement.</p><p>Standard kernels meet it; check any custom similarity function.</p>
<h4>Remember the cost</h4><p>Training stores an N by N kernel matrix, so memory grows with N² and exact solvers roughly with N³. Kernel SVMs suit hundreds to a few thousand rows; larger problems may need approximations. Scale features first, because RBF uses distances and a large-unit feature can dominate them.</p>`
        },
        {
          type: "diagram",
          id: "kernels"
        },
        {
          type: "example",
          html: `<h4>Map the points</h4><p>Class −1 has points (0,0), (1,0), and (0,1), near the origin. Class +1 has (2,2), (3,2), and (2,3), farther away. No straight line divides them in the plane.</p>
<p>Map each point to (x<sub>1</sub>,x<sub>2</sub>,x<sub>1</sub>²+x<sub>2</sub>²). The first group's third coordinates are 0, 1, 1. The second group's are 8, 13, 13. A horizontal plane separates these transformed groups.</p>
<p>A degree-2 polynomial kernel supplies the needed products without explicitly writing the map.</p>
<h4>Compare with RBF</h4><p>An RBF kernel compares distances. Points near the origin are more similar to one another than to the outer points, giving a curved boundary around the inner group in the original plane.</p>`
        },
        {
          type: "tip",
          html: `<h4>Explain and compare kernels</h4><ol><li>Name the kernel and write its formula. Identify each parameter that appears in the question.</li><li>Explain that the feature map is implicit: the kernel supplies inner products without building new coordinates.</li><li>Match the examples to their uses: linear for sparse text, polynomial for feature products, and RBF for local curved structure.</li><li>For RBF, say large gamma gives a tighter boundary and small gamma a smoother one.</li><li>When discussing limits, note the N² kernel matrix storage cost.</li></ol>`
        }
      ],
      practice: [
        {
          q: "An RBF SVM scores 99% on training data and 71% on test data. Which parameter might be too high? Say which direction you would adjust it and how that changes the boundary. Also name the parameter that controls the cost of margin violations.",
          a: `<h4>Change gamma</h4><p>A large gamma limits each point's influence to a small neighbourhood. The boundary can wrap around individual training points and fit noise, which may explain the training-test gap. Try a smaller gamma to broaden that influence and smooth the boundary.</p>
<h4>Also tune C</h4><p>C sets the penalty for margin violations. A large C can overfit, while a small C accepts more violations for a wider margin. Standardise features, then tune C and gamma together over a logarithmic grid using cross-validation.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A binary label depends on the product x1·x2. Compare what degree-2 polynomial and RBF kernels calculate, choose the more natural starting fit, and give one reason a linear kernel might still be preferable.",
          a: `<h4>Polynomial kernel</h4><p>A degree-2 polynomial kernel computes (γ<i>x</i>·<i>z</i>+<i>r</i>)², where <i>x</i> and <i>z</i> are points, γ is a scale and <i>r</i> is an offset.</p><p>Its feature space includes products such as <i>x</i><sub>1</sub><i>x</i><sub>2</sub>, so a linear rule there can represent <i>x</i><sub>1</sub><i>x</i><sub>2</sub>&gt;<i>c</i>, where <i>c</i> is a threshold. This makes it a natural first choice.</p>
<h4>RBF kernel</h4><p>RBF computes exp(−γ||<i>x</i>−<i>z</i>||²), a similarity that falls with distance. It can fit a curved boundary through local influences, but gamma needs careful tuning and the result is less interpretable.</p>
<h4>Linear kernel</h4><p>A linear kernel can be preferable for nearly separable data, many sparse text features, faster training or easier interpretation. Kernel methods can build an N by N Gram matrix of pairwise comparisons, so their cost grows with the number N of samples.</p>`,
          marks: 7,
          diff: "hard"
        }
      ]
    },
    {
      slug: "m4-markov",
      title: "The Discrete Markov Process",
      sources: [
        "https://en.wikipedia.org/wiki/Markov_chain"
      ],
      blocks: [
        {
          type: "definition",
          text: "A discrete Markov process moves among a finite set of states in steps. Its next state depends on its current state, not the full history."
        },
        {
          type: "text",
          html: `<h4>States and time steps</h4><p>A discrete Markov process has a finite set of states S<sub>1</sub>, ..., S<sub>N</sub>. It changes state at separate time steps. Write the state at time <i>t</i> as <i>q<sub>t</sub></i>. To describe the process, give the possible states, the transition matrix, and the starting probabilities.</p>
<h4>The Markov property</h4><p>The probability of the next state depends on the current state, not on earlier states: P(<i>q<sub>t+1</sub></i>=S<sub>j</sub>|<i>q<sub>t</sub></i>=S<sub>i</sub>, earlier states)=P(<i>q<sub>t+1</sub></i>=S<sub>j</sub>|<i>q<sub>t</sub></i>=S<sub>i</sub>). In other words, the current state is enough to calculate the next step. This is called the memoryless property.</p>
<h4>Transition matrix</h4><p>In a homogeneous process, transition probabilities stay the same at every step. In matrix <b>P</b>, entry <i>p<sub>ij</sub></i> means the probability of moving from state <i>i</i> to state <i>j</i>. Every entry is at least zero, and each row sums to 1. The table gives a two-state weather example.</p>
<table class="tbl">
<tr><th>From / To</th><th>Sunny</th><th>Rainy</th></tr>
<tr><td>Sunny</td><td>0.8</td><td>0.2</td></tr>
<tr><td>Rainy</td><td>0.3</td><td>0.7</td></tr>
</table>
<h4>More than one step</h4><p>To find two-step probabilities, multiply <b>P</b> by itself. This adds the probabilities of all possible intermediate states. In general, <b>P</b><sup><i>n</i></sup> gives transitions over <i>n</i> steps; this is the Chapman-Kolmogorov relation. A stationary distribution π stays unchanged after a transition: π<b>P</b>=π, and its probabilities sum to 1.</p>`
        },
        {
          type: "diagram",
          id: "markov-states"
        },
        {
          type: "code",
          lang: "python",
          html: `import numpy as np

P = np.array([[0.8, 0.2],
              [0.3, 0.7]])

print(P @ P)                 # two-step transition matrix
print(np.linalg.matrix_power(P, 10)[0])   # from Sunny after 10 days
print(np.linalg.eig(P.T))    # stationary vector is the eigenvector for 1`
        },
        {
          type: "example",
          html: `<h4>Calculation 1: one path</h4><p>Start on Monday with Sun. The chance of Sun on Tuesday is 0.8. The chance of the particular three-day path Sun, Sun, Rain is 1×0.8×0.2=0.16. Multiply the transition chances along this one route.</p>
<h4>Calculation 2: two-step matrix</h4><p>Multiply the transition matrix by itself. Each entry adds the routes through both possible intermediate states: <b>P</b>²=[[0.8·0.8+0.2·0.3, 0.8·0.2+0.2·0.7],[0.3·0.8+0.7·0.3, 0.3·0.2+0.7·0.7]]=[[0.70,0.30],[0.45,0.55]].</p>
<h4>Calculation 3: state after two days</h4><p>Starting Sunny, the first row says P(Wed Sun)=0.70 and P(Wed Rain)=0.30. The Sunny result adds two routes: Sun→Sun→Sun has probability 0.64, and Sun→Rain→Sun has probability 0.06. Their sum is 0.70.</p>
<h4>Long-run check</h4><p>The stationary distribution is π=(0.6,0.4), as π<b>P</b>=π. The starting state affects early steps, while the chain approaches this distribution over time.</p>`
        },
        {
          type: "tip",
          html: `<h4>Work through a Markov question</h4><ol><li>Draw and label the states and arrows.</li><li>State that the next state depends only on the current state.</li><li>Write the transition matrix. Check that each row sums to 1.</li><li>For one exact sequence, multiply the transition chances along that path.</li><li>For a state after two steps, use <b>P</b>² and add the possible routes.</li><li>Use a stationary distribution only when the question asks about long-run behaviour.</li></ol>`
        }
      ],
      practice: [
        {
          q: "A machine is Working (W) or Broken (B). From W it stays W with chance 0.9 or fails with chance 0.1. From B it is repaired with chance 0.6 or remains broken with chance 0.4. It starts in W. (a) Write the transition matrix and its two-step matrix. (b) Find the chance it is working after two days. (c) Find the long-run fraction of days it is broken.",
          a: `<h4>1. Write the matrix</h4><p>Rows give the current state and columns the next state, in W, B order. Thus <b>P</b>=[[0.9,0.1],[0.6,0.4]], and each row sums to 1.</p>
<h4>2. Calculate two steps</h4><p>Multiply the matrix by itself: <b>P</b>²=[[0.9·0.9+0.1·0.6, 0.9·0.1+0.1·0.4],[0.6·0.9+0.4·0.6, 0.6·0.1+0.4·0.4]]=[[0.87,0.13],[0.78,0.22]].</p>
<h4>3. Find the working probability</h4><p>Starting in W, read the first row: Working has probability 0.87 and Broken 0.13 after two steps. The working result adds W→W→W, probability 0.81, and W→B→W, probability 0.06. Thus 0.81+0.06=0.87.</p>
<h4>4. Find the long-run fraction</h4><p>Let π=(π<sub>W</sub>,π<sub>B</sub>) be the stationary distribution, so π<b>P</b>=π. The working-state equation is π<sub>W</sub>=0.9π<sub>W</sub>+0.6π<sub>B</sub>, giving π<sub>W</sub>=6π<sub>B</sub>.</p><p>The probabilities sum to 1, so 7π<sub>B</sub>=1. Therefore π<sub>B</sub>=1/7≈0.143 and π<sub>W</sub>=6/7≈0.857: about 14.3% of days are Broken in the long run.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "State the Markov property. Explain why a process that uses the previous two states is not first-order, then show how to represent it as a first-order chain.",
          a: `<h4>State the property</h4><p>The Markov property says the next state depends on the present state, not the earlier history. If the next-state probabilities also need the previous state, the original state alone is insufficient for a first-order chain.</p>
<h4>Enlarge the state</h4><p>Represent the current state as the pair (current, previous). That pair contains the two original states needed to predict the next pair, so the enlarged chain is first-order. With N original states there can be N² pairs, making the state space larger.</p>`,
          marks: 3,
          diff: "easy"
        }
      ]
    },
    {
      slug: "m4-hmm",
      title: "Hidden Markov Models",
      sources: [
        "https://en.wikipedia.org/wiki/Hidden_Markov_model"
      ],
      blocks: [
        {
          type: "definition",
          text: "A hidden Markov model is a Markov chain whose states are hidden and whose visible observations depend on the current state."
        },
        {
          type: "text",
          html: `<h4>Keep the two layers separate</h4><p>The hidden state <i>X<sub>t</sub></i> describes what is happening at time <i>t</i>, but you cannot observe it directly. The observation <i>Y<sub>t</sub></i> is the symbol or measurement you can see. For speech, a sound unit can be hidden while the recorded audio is observed. You use observations to infer the hidden states.</p><p>The state follows the Markov property: its next value depends on the current state. The observation at time <i>t</i> depends on the hidden state at that same time.</p>
<h4>Name the model parameters</h4><p>Write an HMM as λ=(π,A,B). Here λ names the whole model, π gives the starting chance of each state, A is the transition matrix, and B gives the emission probabilities. An emission is the chance of seeing a symbol from a particular hidden state.</p><p>A transition entry <i>a<sub>ij</sub></i> is the chance of moving from state <i>i</i> to state <i>j</i>. An emission entry <i>b<sub>i</sub></i>(<i>k</i>) is the chance of symbol <i>k</i> when the state is <i>i</i>.</p><p>Each row of A and B sums to 1. With N states and M possible symbols, B has N rows and M columns.</p>
<h4>Calculate one hidden path</h4><p>Let <i>q</i><sub>1</sub>,...,<i>q<sub>T</sub></i> be a proposed hidden path, and <i>o</i><sub>1</sub>,...,<i>o<sub>T</sub></i> the observations. Here <i>T</i> is the number of time steps. The path probability starts with π(<i>q</i><sub>1</sub>), the chance of its first state.</p><p>Multiply that starting chance by each emission and transition along the path. An emission gives the chance of the observed symbol; a transition gives the chance of the next state.</p><p>The product is π(<i>q</i><sub>1</sub>)×<i>b</i>(<i>q</i><sub>1</sub>,<i>o</i><sub>1</sub>)×<i>a</i>(<i>q</i><sub>1</sub>,<i>q</i><sub>2</sub>)×...×<i>a</i>(<i>q</i><sub>T−1</sub>,<i>q<sub>T</sub></i>)×<i>b</i>(<i>q<sub>T</sub></i>,<i>o<sub>T</sub></i>).</p><p>To get the observation likelihood, add all N<sup>T</sup> path probabilities. Dynamic programming avoids listing every path.</p>
<h4>Why use hidden states?</h4><p>Some useful events cannot be measured directly. In speech, a phone is hidden behind the waveform. In the weather example, weather is hidden while a friend's activity is visible. The HMM describes hidden causes through visible evidence.</p>`
        },
        {
          type: "diagram",
          id: "hmm-states"
        },
        {
          type: "example",
          html: `<h4>Identify what you see</h4><p>A friend reports one activity each day: walk, shop, or clean. These are the observations. The weather, Rainy or Sunny, is the hidden state.</p><p>The starting probabilities are Rainy 0.6 and Sunny 0.4. Transitions are Rainy→Rainy 0.7, Rainy→Sunny 0.3, Sunny→Rainy 0.4, and Sunny→Sunny 0.6. Emissions are Rainy: walk 0.1, shop 0.4, clean 0.5; Sunny: walk 0.6, shop 0.3, clean 0.1.</p>
<h4>Multiply a proposed path</h4><p>For hidden path Rainy then Sunny and observations walk then clean, multiply start, first emission, transition, and second emission: 0.6×0.1×0.3×0.1=0.0018. The path Sunny then Sunny has probability 0.4×0.6×0.6×0.1=0.0144, eight times larger. The full observation likelihood adds all four possible two-day paths, not only the most likely path.</p>`
        },
        {
          type: "tip",
          html: `<h4>Explain an HMM clearly</h4><ol><li>Draw one layer for hidden states and one for visible observations. Label which values can be seen.</li><li>Name π as starting probabilities, A as transition probabilities, and B as emission probabilities. Rows of A and B each sum to 1.</li><li>For one proposed path, multiply its start, transitions, and emissions.</li><li>For the observation likelihood, add the probabilities of all possible hidden paths.</li><li>Say that the states are inferred from observations; they are not directly known.</li></ol>`
        }
      ],
      practice: [
        {
          q: "An HMM has hidden states S1 and S2 and visible symbols A and B. The initial probabilities are π=(0.6,0.4), transition rows are S1:(0.7,0.3) and S2:(0.4,0.6), and emission chances are S1: A 0.8, B 0.2; S2: A 0.3, B 0.7. Find the observation likelihood P(A,B) by calculating and adding all four hidden paths.",
          a: `<p>Four hidden paths can produce A then B. For each path, multiply four chances: the start, the first emission, the transition, and the second emission.</p>
<p>S1,S1: 0.6 × 0.8 × 0.7 × 0.2 = 0.0672<br>
S1,S2: 0.6 × 0.8 × 0.3 × 0.7 = 0.1008<br>
S2,S1: 0.4 × 0.3 × 0.4 × 0.2 = 0.0096<br>
S2,S2: 0.4 × 0.3 × 0.6 × 0.7 = 0.0504</p>
<p>Add the four path probabilities: 0.0672 + 0.1008 + 0.0096 + 0.0504 = 0.228. The forward algorithm gets the same total in O(N²T) time instead of listing N<sup>T</sup> paths.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A speech recogniser uses one HMM for each word. Explain what the hidden states represent, what an emission distribution describes, and why adding states may fail to improve recognition.",
          a: `<p>A recording is a sequence of feature frames. The units that produced them, such as phones or parts of a syllable, are not labelled in the audio.</p>
<p>The hidden states stand for those unseen units. The transition matrix lets the model move through them in order. Without hidden states, the model would treat every frame as an independent symbol. It would then lose the sequence structure that separates one word from another.</p>
<p>An emission distribution gives the probability of a visible frame given a hidden state. It can be a Gaussian or a discrete table over symbols. This is the link between the unseen process and the recorded audio, and it makes the likelihood of a recording computable.</p>
<p>More states give finer units and can fit the training recordings more closely. They also multiply the parameters and the paths.</p>
<p>With limited data, the extra states fit speaker or recording quirks, and recognition on new speakers falls. Start with the smallest number that covers the sounds, then increase only when validation accuracy improves.</p>`,
          marks: 7,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m4-hmm-problems",
      title: "The Three Basic HMM Problems",
      sources: [
        "https://en.wikipedia.org/wiki/Hidden_Markov_model"
      ],
      blocks: [
        {
          type: "definition",
          text: "HMM work asks three questions: how likely are the observations, which hidden path is best, and which parameters fit the data."
        },
        {
          type: "text",
          html: `<h4>Three jobs, three different answers</h4><p>Keep the requested answer clear. Evaluation returns one likelihood for the visible observations. Decoding returns one proposed sequence of hidden states. Learning returns updated model probabilities. These are different jobs, so they use different algorithms.</p>
<table class="tbl">
<tr><th>Problem</th><th>Question</th><th>Answer</th><th>Algorithm</th></tr>
<tr><td>Evaluation</td><td>How likely is this observation sequence under the model?</td><td>P(O | λ)</td><td>Forward</td></tr>
<tr><td>Decoding</td><td>Which hidden state sequence most likely produced it?</td><td>argmax<sub>Q</sub> P(Q, O | λ)</td><td>Viterbi</td></tr>
<tr><td>Learning</td><td>Which parameters best explain the observations?</td><td>π, A, B</td><td>Baum-Welch</td></tr>
</table>
<h4>Job 1: evaluation with Forward</h4><p>Evaluation asks how likely the observed sequence is under the model. This is written P(O|λ): O is the observation sequence and λ is the model.</p>
<p>The forward variable α<sub>t</sub>(i) is the probability of the first t observations, ending in state i. Here α is a running partial probability, t is the time step, and i names a state; j names the next state.</p>
<p>Start with α<sub>1</sub>(i)=π<sub>i</sub>b<sub>i</sub>(o<sub>1</sub>). Then α<sub>t+1</sub>(j)=[Σ<sub>i</sub>α<sub>t</sub>(i)a<sub>ij</sub>]b<sub>j</sub>(o<sub>t+1</sub>). Sum α<sub>T</sub>(i) across all final states.</p>
<p>Forward adds all paths because all contribute to the total likelihood. Its cost is O(N²T), rather than O(N<sup>T</sup>).</p>
<h4>Job 2: decoding with Viterbi</h4><p>Decoding asks for the single most likely hidden path. Let δ<sub>t</sub>(i) be the best path probability that ends in state i at time t.</p>
<p>Use the same transitions and emissions as Forward, but take a maximum over previous states: δ<sub>t+1</sub>(j)=max<sub>i</sub>[δ<sub>t</sub>(i)a<sub>ij</sub>]b<sub>j</sub>(o<sub>t+1</sub>).</p>
<p>Store the winning previous state in a backpointer. At the end, choose the best final state and follow the pointers backward to recover the path.</p>
<h4>Job 3: parameter learning with Baum-Welch</h4><p>Learning asks which π, A, and B values best fit the observations when the hidden states are not labelled.</p>
<p>Baum-Welch is expectation-maximisation (EM). In the E step, forward-backward estimates expected transition and emission counts under the current parameters. In the M step, those counts update π, A, and B.</p>
<p>Repeat until the likelihood stops improving. The method can settle at a local maximum, so starting values matter.</p>
<h4>Why the algorithms differ</h4><p>Forward sums the probabilities of every path; Viterbi keeps only the best path; Baum-Welch updates the model probabilities. One HMM can need all three, depending on whether you want a score, a path, or fitted parameters.</p>`
        },
        {
          type: "example",
          html: `<h4>Choose by the result you need</h4><p>A speech team has a trained HMM for the word "cat" and a new recording. To compare this recording with two word models, it needs evaluation: Forward sums over paths to calculate P(O|λ).</p><p>To align audio frames with sounds, the team needs decoding: Viterbi finds one best state path. To estimate probabilities from unlabelled recordings, it needs learning: Baum-Welch updates the model. The same recording can be used for all three jobs, but each asks for a different result.</p>`
        },
        {
          type: "tip",
          html: `<h4>Keep the three jobs distinct</h4><ol><li>Evaluation: ask how likely the observations are; return P(O|λ) with Forward, which sums paths.</li><li>Decoding: ask which hidden path is most likely; return that path with Viterbi, which takes a maximum and stores backpointers.</li><li>Learning: ask which parameters fit unlabelled observations; update π, A, and B with Baum-Welch, an EM method.</li><li>For Forward and Viterbi, give the dynamic-programming cost O(N²T). Explain that the algorithms cannot replace one another because their answers differ.</li></ol>`
        }
      ],
      practice: [
        {
          q: "For each task, name the HMM problem and its algorithm: (a) score a recorded word under a trained model, (b) find the most likely weather path from observed activities, and (c) estimate transition and emission probabilities from unlabelled recordings. Explain why Viterbi does not answer task (a).",
          a: `<p>(a) Evaluation: this asks for P(O | λ), the probability of the observation sequence under the model. The forward algorithm computes it by summing partial probabilities over states at each time step.</p>
<p>(b) Decoding: this asks for the single most likely hidden-state sequence. Viterbi keeps the best partial path into each state plus a backpointer, then traces the path back from the best final state.</p>
<p>(c) Learning: this asks for π, A and B from data. Baum-Welch, the EM algorithm for HMMs, alternates forward-backward expectations with re-estimation until the likelihood stops improving.</p>
<p>Viterbi returns the probability of one path, the maximum over paths. Evaluation needs the total probability of the observations, the sum over every path.</p>
<p>Scoring with Viterbi would ignore every other way the recording could have been produced. It would give a different, smaller number.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "Explain why Forward adds probabilities while Viterbi takes a maximum. Give a situation where the single most likely full path differs from choosing the most likely state separately at each time.",
          a: `<p>Forward answers how likely the observations are under the model, so every hidden path that could produce them contributes. At each step, it replaces the explicit sum over paths with a sum over the previous states. That replacement is the dynamic-programming step.</p>
<p>Viterbi answers which one path is most likely. At each step, it keeps only the best predecessor for each state and discards the rest.</p>
<p>The two can disagree because a sequence of per-time winners need not be a coherent path. Suppose state A is most likely at time 1 and state B at time 2, but the transition A→B has probability near zero.</p>
<p>Posterior decoding would report A then B. Viterbi would prefer a slightly less likely start that makes the pair coherent, because it maximises the whole path, not each column separately.</p>
<p>Work in log space, because multiplying hundreds of small probabilities underflows.</p>`,
          marks: 5,
          diff: "hard"
        }
      ]
    },
    {
      slug: "m4-ensemble",
      title: "Combining Multiple Learners",
      sources: [
        "https://en.wikipedia.org/wiki/Ensemble_learning",
        "https://en.wikipedia.org/wiki/Bootstrap_aggregating",
        "https://en.wikipedia.org/wiki/Boosting_(machine_learning)",
        "https://scikit-learn.org/stable/modules/ensemble.html"
      ],
      blocks: [
        {
          type: "definition",
          text: "Ensemble learning combines predictions from several models, called base learners. It can improve results when the models make different errors."
        },
        {
          type: "text",
          html: `<h4>Why combine models?</h4><p>A base learner is one model in the group. If several models make different mistakes, combining their predictions can correct some of those mistakes. If they all make the same errors, the combination adds cost without much benefit.</p>
<h4>Voting: combine finished models</h4><p>Hard voting chooses the most common predicted label. Soft voting averages predicted class probabilities and chooses the larger average. Optional weights give some models more influence. Voting is a simple choice when the models have similar performance.</p>
<h4>Bagging: train copies independently</h4><p>Bagging means bootstrap aggregating. Draw m samples of size n with replacement, train the same kind of learner on each, then vote or average.</p>
<p>About 63.2% of rows appear at least once in a sample. Rows left out are out-of-bag and can estimate error. The copies train independently, often in parallel.</p>
<p>Bagging mainly reduces variance, so it often helps deep decision trees. A random forest also chooses a random subset of features at each split.</p>
<h4>Boosting: learn in sequence</h4><p>Boosting trains one learner after another. In AdaBoost, later learners give more attention to rows earlier learners got wrong, and their predictions are combined in a weighted vote.</p>
<p>Gradient boosting instead fits each new tree to the remaining loss. Boosting mainly reduces bias, but too many rounds can fit label noise.</p>
<h4>Stacking: train a combiner</h4><p>Stacking trains a meta-learner on predictions from several base models. To prevent leakage, each training prediction must be out-of-fold: the model making it did not train on that row. The meta-learner then learns how to combine the models. Stacking is flexible, but needs careful validation.</p>
<table class="tbl">
<tr><th>Method</th><th>How learners are built</th><th>Order</th><th>Main effect</th></tr>
<tr><td>Voting</td><td>already trained, different families</td><td>none</td><td>balances weaknesses</td></tr>
<tr><td>Bagging</td><td>same learner on bootstrap samples</td><td>parallel</td><td>cuts variance</td></tr>
<tr><td>Boosting</td><td>same learner, reweighted mistakes</td><td>sequential</td><td>cuts bias</td></tr>
<tr><td>Stacking</td><td>base models plus a meta-learner</td><td>two stages</td><td>learns the combination</td></tr>
</table>`
        },
        {
          type: "example",
          html: `<h4>Random forest example</h4><p>A bank trains 300 deep trees on bootstrap samples, then averages their probabilities. Each tree may overfit, but their errors differ. Averaging makes the result steadier, which is how bagging reduces variance.</p>
<h4>AdaBoost example</h4><p>AdaBoost trains 300 shallow stumps in sequence. After the first stump, the next one pays more attention to rows it missed. This can reduce bias and training error. Too many rounds can fit mislabeled rows, causing test error to rise.</p>`
        },
        {
          type: "tip",
          html: `<h4>Compare methods in a useful order</h4><ol><li>Voting combines models that are already trained.</li><li>Bagging trains copies on bootstrap samples independently and reduces variance.</li><li>Boosting trains in sequence, with later learners addressing earlier errors; it mainly reduces bias.</li><li>Stacking trains a meta-learner on out-of-fold predictions. Explain out-of-fold prediction to show how you avoid leakage.</li><li>Use the comparison table, then give one limitation for each method.</li></ol>`
        }
      ],
      practice: [
        {
          q: "A churn team has three trained models: random forest at 88% accuracy, gradient-boosted trees at 89%, and logistic regression at 84%. Propose an ensemble. Compare how the forest and booster are trained, identify which kind of error each mainly reduces, choose how to combine the predictions, explain how stacking avoids leakage, and state how you would test whether deployment is worthwhile.",
          a: `<p><b>How the two are built.</b> A random forest is bagging: draw many bootstrap samples with replacement, fit a deep tree to each, and average or vote. The trees are independent, so they train in parallel.</p>
<p>A gradient-boosted model is sequential. Each new shallow tree is fitted to the errors or gradients left by the current model, and its contribution is scaled by a learning rate.</p>
<p>The forest mainly cuts variance, because averaging decorrelated trees cancels their individual noise. The booster mainly cuts bias, because each stage corrects what the current model gets wrong.</p>
<p><b>Combination.</b> With three different model families, soft voting is the safe start. Average the predicted churn probabilities, optionally weighting the stronger models, and take the class with the larger average.</p>
<p>Stacking can do better because a meta-learner can learn where each model is reliable, but it needs out-of-fold predictions. If the models are similar in accuracy, hard voting throws away confidence and is the weakest choice.</p>
<p><b>Leakage.</b> Never fit the meta-learner on predictions made from the same rows it trained on. Use K-fold out-of-fold predictions, or scikit-learn's <code>StackingClassifier</code>, which builds them for you, and keep the final test set untouched until the end.</p>
<p><b>Worth deploying?</b> Compare the ensemble with the best single model on a held-out set, using a metric that matches the business cost, such as recall at a fixed false-positive rate.</p>
<p>Report a confidence interval or run a paired test, because a one-point gain can be noise. Check inference cost and interpretability too. If the booster alone is within noise of the ensemble, the extra complexity buys nothing.</p>`,
          marks: 14,
          diff: "hard"
        },
        {
          q: "Three classifiers give probabilities for classes A and B: (0.9,0.1), (0.4,0.6), and (0.45,0.55). Calculate the hard-vote and soft-vote predictions. Explain why they differ and when soft voting is a better choice.",
          a: `<p>Hard voting counts labels. The first model votes A, the second B, the third B, so the majority is B.</p>
<p>Soft voting averages probabilities. A: (0.9 + 0.4 + 0.45) / 3 = 1.75 / 3 ≈ 0.583. B: (0.1 + 0.6 + 0.55) / 3 = 1.25 / 3 ≈ 0.417. The average probability is higher for A, so soft voting returns A.</p>
<p>They differ because hard voting gives every model one equal vote. Soft voting lets a confident model count for more.</p>
<p>Soft voting is better when the base models are well calibrated and one of them is much more confident on this case. Hard voting is safer when probabilities are unreliable, for example from an SVM without calibration.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    }
  ]
};
