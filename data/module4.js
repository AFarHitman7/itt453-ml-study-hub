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
          text: "Linearly separable data can be split into its classes by one straight line in two dimensions, or one hyperplane in higher dimensions."
        },
        {
          type: "text",
          html: `<p><b>The test.</b> Two sets are linearly separable when one hyperplane puts every point of one class on one side and every point of the other class on the other side. Write the boundary as <i>w</i>·<i>x</i>+<i>b</i>=0, where <i>w</i> is the normal vector and <i>b</i> is the offset. A point lies on the positive side when <i>w</i>·<i>x</i>+<i>b</i> &gt; 0 and on the negative side when <i>w</i>·<i>x</i>+<i>b</i> &lt; 0. With labels <i>y</i> = +1 and −1, the whole training set is separated when <i>y</i>(<i>w</i>·<i>x</i>+<i>b</i>) &gt; 0 for every point.</p>
<p><b>The convex hull view.</b> A strict separating line exists exactly when the convex hulls of the two classes do not overlap or touch. Picture a rubber band stretched around each class: if the bands stay apart, a line fits between them; if they cross, no straight line can separate every point. This is a quick visual check, and it explains why one noisy point deep inside the other class can make a separable-looking problem inseparable.</p>
<p><b>Many boundaries, one choice.</b> Separability says that at least one line works. Usually a whole band of lines works, and some pass very close to a point while others leave a wide gap. The gap is the margin, and SVM picks the line in the middle of the widest gap. Separation alone does not choose a boundary.</p>
<p><b>What it does not promise.</b> Separability describes the sample you hold, so it says little about new data. A thin margin, noisy labels, or a shifted test distribution can all break the same boundary. Data that needs a curve, such as one class inside a ring of the other, is not separable in the original space at all, and that is where kernels enter.</p>`
        },
        {
          type: "diagram",
          id: "linear-sep"
        },
        {
          type: "example",
          html: `<p>A placement cell plots attendance on the x axis and marks on the y axis, and labels each student placed (+1) or not placed (−1). Suppose a line <i>w</i>·<i>x</i>+<i>b</i>=0 is drawn between the groups. You check it student by student: one placed student gives 4.2, another gives 0.8, and a not-placed student gives −1.9, so the signs match the labels and this sample is separated by that line.</p>
<p>Now a new applicant gives exactly 0. That student sits on the boundary, so the line does not classify them with confidence. The practical answer is to look at the distance from the line, not just the sign, and to prefer a boundary that leaves a wider gap between the nearest placed and not-placed students.</p>`
        },
        {
          type: "tip",
          html: `<p>Open with the one-line definition, then write the condition <i>y</i>(<i>w</i>·<i>x</i>+<i>b</i>) &gt; 0 because it earns the technical mark. Add the convex hull test for 5 or 7 marks, since it shows why overlap kills a straight boundary. Sketch the two point sets and the separating line for presentation marks. Finish with one limit of separability, such as a thin margin or noisy labels, so the answer does not claim more than the definition gives.</p>`
        }
      ],
      practice: [
        {
          q: "A colleague hands you a candidate boundary w·x+b=0 and asks whether it separates a two-class training set. Describe the check you would run, what a zero value means, and what the convex hulls of the two classes must look like for any separating boundary to exist.",
          a: `<p>Label the classes +1 and −1. For every training point compute <i>f</i>(<i>x</i>)=<i>w</i>·<i>x</i>+<i>b</i> and then <i>y f</i>(<i>x</i>). The line separates the set when every <i>y f</i>(<i>x</i>) is positive: positive-class points give <i>f</i> &gt; 0 and negative-class points give <i>f</i> &lt; 0. A point with <i>f</i>(<i>x</i>)=0 sits on the boundary, so the separation is not strict and that point is undecided.</p>
<p>The convex hull test gives the geometric answer. Build the hull of each class. A strict separating line exists only when the two hulls are disjoint with a gap between them. If the hulls overlap or touch, no line can separate every point, and the sign check will find at least one point on the wrong side or on the line.</p>
<p>Run the check on scaled features and use a small tolerance instead of exact zero, because floating-point noise can turn a true zero into 1e-16.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "Perfect separation on the training set does not promise good accuracy on new data. Give two distinct reasons, one sentence each.",
          a: `<p>First, separation says nothing about the margin: a boundary that grazes a training point can flip that point with a tiny change in the input, so the model is unstable. Second, the training labels can be noisy or the test distribution can differ, and a line fitted to a separable sample still splits new points incorrectly when the classes genuinely overlap there.</p>
<p>A third practical reason is overfitting to quirks of the sample, such as one unusual point that forces a tilted boundary. Report test accuracy and margin width, not training accuracy alone.</p>`,
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
          text: "A support vector machine is a classifier that picks the separating hyperplane with the widest margin, set by the nearest points."
        },
        {
          type: "text",
          html: `<p><b>The setting.</b> Take labelled points (<i>x<sub>i</sub></i>, <i>y<sub>i</sub></i>) with <i>y<sub>i</sub></i> in {+1, −1}. A linear classifier uses the sign of <i>w</i>·<i>x</i>+<i>b</i>. The boundary itself is <i>w</i>·<i>x</i>+<i>b</i>=0. The vector <i>w</i> is perpendicular to that boundary, and <i>b</i> moves it away from the origin.</p>
<p><b>Margin.</b> The perpendicular distance from a point to the boundary is |<i>w</i>·<i>x</i>+<i>b</i>| / ||<i>w</i>||. Scale <i>w</i> and <i>b</i> so the nearest points on each side satisfy |<i>w</i>·<i>x</i>+<i>b</i>|=1. The two margin boundaries are then <i>w</i>·<i>x</i>+<i>b</i>=+1 and <i>w</i>·<i>x</i>+<i>b</i>=−1, and the gap between them is 2/||<i>w</i>||. Widening the gap therefore means shrinking ||<i>w</i>||.</p>
<p><b>The optimisation problem.</b> For every point, require <i>y<sub>i</sub></i>(<i>w</i>·<i>x<sub>i</sub></i>+<i>b</i>) ≥ 1. Then minimise ½||<i>w</i>||² subject to those constraints. The answer gives the optimal separating hyperplane, the one with the maximum margin. The points that touch the margin boundaries are the support vectors. Move a point that lies far outside the margin and the solution does not change, because its constraint is already slack.</p>
<p><b>Soft margin.</b> Real data overlap, so a hard margin may have no solution. Add a slack variable ξ<sub>i</sub> ≥ 0 per point and relax the constraint to <i>y<sub>i</sub></i>(<i>w</i>·<i>x<sub>i</sub></i>+<i>b</i>) ≥ 1 − ξ<sub>i</sub>. The objective becomes ½||<i>w</i>||² + <i>C</i> Σ ξ<sub>i</sub>. A point outside the margin has ξ=0, a point inside the margin but correctly classified has 0 &lt; ξ &lt; 1, and a misclassified point has ξ ≥ 1. Large <i>C</i> punishes violations and narrows the margin; small <i>C</i> accepts more violations for a wider, smoother boundary. This is the same trade-off as the hinge loss max(0, 1 − <i>y f</i>(<i>x</i>)).</p>
<p><b>Support vectors and the dual.</b> The dual problem expresses the classifier through inner products and coefficients α<sub>i</sub>. Points on the margin, inside it, or on the wrong side get α<sub>i</sub> &gt; 0; the rest get α<sub>i</sub>=0. Prediction is sign(Σ α<sub>i</sub> <i>y<sub>i</sub></i> <i>K</i>(<i>x<sub>i</sub></i>, <i>x</i>) + <i>b</i>), summed over support vectors only. That sparsity is why an SVM can be memory efficient even with many training rows.</p>
<p><b>Practice points.</b> Standardise features first, because the margin depends on distances and SVM is not scale invariant. Tune <i>C</i> and, for an RBF kernel, gamma on a log grid with cross-validation. In scikit-learn, <code>SVC</code> handles multiclass by training one binary classifier per pair of classes, while <code>LinearSVC</code> uses one-vs-rest.</p>`
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
          html: `<p>Two lines separate the same six points. The first passes within a hair of the nearest positive point; the second sits halfway between the nearest points of each class. Both score 100% on this training set, so accuracy cannot choose between them. The second line has the larger margin, which means a small measurement error is less likely to push a point across the boundary.</p>
<p>The three nearest points, two positive and one negative, are the support vectors. Delete any other point and refit: the same line comes back. Move one support vector inward and the line shifts, because the margin is now set by a different closest point. That is the sense in which the boundary is supported by a handful of examples rather than by the whole table.</p>`
        },
        {
          type: "tip",
          html: `<p>For a formulation answer, write five things in order: the hyperplane <i>w</i>·<i>x</i>+<i>b</i>=0, the two margin boundaries at ±1, the constraint <i>y<sub>i</sub></i>(<i>w</i>·<i>x<sub>i</sub></i>+<i>b</i>) ≥ 1, the objective minimise ½||<i>w</i>||², and a labelled diagram with the support vectors marked. Add the soft-margin slack version when the question mentions overlap or noise. State that the margin width is 2/||<i>w</i>|| and that only support vectors affect the boundary. For a numerical or applied part, mention feature scaling before tuning <i>C</i>.</p>`
        }
      ],
      practice: [
        {
          q: "Two hyperplanes separate the same training data. H1 passes very close to one positive point; H2 leaves the widest gap it can. (a) Explain why H2 usually generalises better, using a small perturbation argument. (b) Explain why a new point far outside the training cloud, on the correct side, leaves the boundary unchanged.",
          a: `<p>(a) The margin is a buffer. Under H1 the nearest positive point sits almost on the boundary, so a small measurement error or a slight shift of that point can move it to the wrong side. Under H2 the same shift is absorbed by the gap before any point crosses the line, so the classifier changes its prediction less often. The maximum-margin choice therefore lowers sensitivity to small perturbations, which is the usual route to better generalisation.</p>
<p>(b) The optimal hyperplane is fixed by the points on the margin, the support vectors. A point far beyond the margin satisfies <i>y</i>(<i>w</i>·<i>x</i>+<i>b</i>) &gt; 1 comfortably, so its constraint is inactive and its dual coefficient is zero. Moving it, or adding another point like it, changes nothing in the solution. The same point on the wrong side would matter, because it would violate the margin and become a support vector, and a soft-margin model would then pay a slack penalty for it.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "A soft-margin SVM is trained on overlapping data with C = 0.01 and again with C = 1000. Describe the margin, the violations and the bias-variance behaviour in each case. State the slack conditions, and say which setting you would start with when missing a positive case is expensive.",
          a: `<p>Small C puts little weight on errors, so the model buys a wide margin and tolerates many points inside it or on the wrong side. That is a high-bias, low-variance fit: smooth, stable, and likely to underfit. Large C punishes every violation, so the margin narrows and the model bends to classify the training points. That is low bias and high variance, and it can overfit label noise.</p>
<p>With slack variables the constraints are <i>y<sub>i</sub></i>(<i>w</i>·<i>x<sub>i</sub></i>+<i>b</i>) ≥ 1 − ξ<sub>i</sub> and ξ<sub>i</sub> ≥ 0. ξ<sub>i</sub>=0 means the point is outside the margin and correct, 0 &lt; ξ<sub>i</sub> &lt; 1 means it is inside the margin but still correct, and ξ<sub>i</sub> ≥ 1 means it is misclassified. The objective is ½||<i>w</i>||² + <i>C</i> Σ ξ<sub>i</sub>, so C sets the price of the total slack.</p>
<p>When a missed positive case is expensive, start with a larger C and add <code>class_weight="balanced"</code>, then tune on cross-validation with a metric that weights recall or cost. A large C alone can overfit, so pair it with a proper validation split.</p>`,
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
          text: "A kernel function returns the inner product of two points in a higher-dimensional space without computing their coordinates there."
        },
        {
          type: "text",
          html: `<p><b>Why a kernel.</b> A linear SVM can only draw a straight boundary. Some classes need a curve, for example one class in the centre and the other in a ring around it. The fix is to map each point through some φ(<i>x</i>) into a richer space and fit a linear boundary there. In the original space that boundary can look curved.</p>
<p><b>The trick.</b> The dual SVM never needs the coordinates φ(<i>x</i>) on their own. It needs inner products between pairs. A kernel <i>K</i>(<i>x</i>, <i>z</i>) = φ(<i>x</i>)·φ(<i>z</i>) supplies that inner product directly, so the high-dimensional space stays implicit and you avoid building it by hand.</p>
<table class="tbl">
<tr><th>Kernel</th><th>Formula</th><th>Shape and main parameter</th></tr>
<tr><td>Linear</td><td><i>K</i>(<i>x</i>, <i>z</i>) = <i>x</i>·<i>z</i></td><td>straight boundary; fast, good for sparse text</td></tr>
<tr><td>Polynomial</td><td><i>K</i>(<i>x</i>, <i>z</i>) = (γ <i>x</i>·<i>z</i> + <i>r</i>)<sup><i>d</i></sup></td><td>curves and feature interactions; degree <i>d</i></td></tr>
<tr><td>RBF (Gaussian)</td><td><i>K</i>(<i>x</i>, <i>z</i>) = exp(−γ||<i>x</i>−<i>z</i>||²)</td><td>local bumps, very flexible; gamma</td></tr>
<tr><td>Sigmoid</td><td><i>K</i>(<i>x</i>, <i>z</i>) = tanh(γ <i>x</i>·<i>z</i> + <i>r</i>)</td><td>neural-network style; not always a valid kernel</td></tr>
</table>
<p><b>Reading the parameters.</b> In the RBF kernel, large gamma makes each point's influence local, so the boundary can wrap tightly around single points. Small gamma makes the influence broad and the boundary smooth. In the polynomial kernel, degree 2 already adds products such as <i>x</i><sub>1</sub><i>z</i><sub>2</sub>, so it can represent interactions that a linear kernel cannot. Very high degree or very high gamma can memorise the training set.</p>
<p><b>What makes a kernel valid.</b> For the implicit space to behave like an inner product, the kernel must be symmetric and its Gram matrix <i>K<sub>ij</sub></i> = <i>K</i>(<i>x<sub>i</sub></i>, <i>x<sub>j</sub></i>) must be positive semi-definite. Mercer's condition captures this. In practice, standard kernels already satisfy it, and custom similarity functions should be checked.</p>
<p><b>Cost and caution.</b> Training builds an N by N kernel matrix, so memory grows with N² and exact solvers roughly with N³. Kernel SVMs are therefore best on hundreds to a few thousand rows, and approximations are used beyond that. Always scale features first, because the RBF kernel measures distance and an unscaled column can dominate it.</p>`
        },
        {
          type: "diagram",
          id: "kernels"
        },
        {
          type: "example",
          html: `<p>The points (0,0), (1,0), (0,1) belong to class −1 and sit near the origin; (2,2), (3,2), (2,3) belong to class +1 and sit farther out. No straight line separates the two groups in the plane. Map each point to (<i>x</i><sub>1</sub>, <i>x</i><sub>2</sub>, <i>x</i><sub>1</sub>²+<i>x</i><sub>2</sub>²). The first group lands at heights 0, 1 and 1, while the second lands at 8, 13 and 13, so a horizontal plane separates them. A polynomial kernel of degree 2 produces the needed products without you writing the map.</p>
<p>An RBF kernel reaches the same separation by measuring closeness: points near the origin share high similarity with one another and low similarity with the outer points. The resulting boundary in the original plane is a curve around the inner group.</p>`
        },
        {
          type: "tip",
          html: `<p>Name the kernel, write its formula, and say what its parameter does, because those three pieces carry the marks. Show the ring or XOR picture and state that the map is implicit. For a comparison answer, pair each kernel with a data shape: linear for text, polynomial for feature products, RBF for smooth local structure. Mention that gamma high means a tight boundary and gamma low means a smooth one. Add the N² cost when the question asks about limits.</p>`
        }
      ],
      practice: [
        {
          q: "An RBF-kernel SVM scores 99% on training data and 71% on test data. Name the parameter most likely responsible, the direction to move it, and the effect on the boundary. Name the other parameter that controls the penalty for errors.",
          a: `<p>The likely culprit is gamma. A large gamma makes each training point influence only its immediate neighbourhood, so the boundary grows tight islands around individual points and the model memorises noise. Lower gamma widens the influence of each point and gives a smoother boundary, which usually closes the train-test gap.</p>
<p>C is the other parameter. It prices margin violations: a large C insists on classifying training points correctly and can overfit, while a small C accepts more violations for a wider margin. Tune C and gamma together on a logarithmic grid with cross-validation, and standardise the features first because the RBF kernel uses distances.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A binary class depends on the product x1·x2. Compare a degree-2 polynomial kernel with an RBF kernel for this data: what each computes, which is the more natural fit, and one reason to choose a linear kernel anyway.",
          a: `<p>A degree-2 polynomial kernel computes (γ <i>x</i>·<i>z</i> + <i>r</i>)². Expanded, it contains the terms <i>x</i><sub>1</sub><i>z</i><sub>1</sub>, <i>x</i><sub>2</sub><i>z</i><sub>2</sub> and the cross terms <i>x</i><sub>1</sub><i>z</i><sub>2</sub> + <i>x</i><sub>2</sub><i>z</i><sub>1</sub>, so a linear boundary in that feature space can represent a condition such as <i>x</i><sub>1</sub><i>x</i><sub>2</sub> &gt; <i>c</i> in the original space. The product interaction is built into the kernel, which makes the polynomial kernel the natural first choice here.</p>
<p>An RBF kernel computes exp(−γ||<i>x</i>−<i>z</i>||²), a similarity that falls with distance. It can approximate the same curved boundary, but it does so through many local bumps and needs careful tuning of gamma. It is the more flexible option, and the less interpretable one.</p>
<p>Choose a linear kernel when the data are already close to linearly separable, when there are many sparse features such as text, or when training time and interpretability matter. Kernel methods build an N by N Gram matrix, so cost grows quickly with sample size, and a linear model avoids that.</p>`,
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
          text: "A discrete Markov process moves between a finite set of states, and the next state depends only on the current one."
        },
        {
          type: "text",
          html: `<p><b>States and steps.</b> A discrete Markov process has a finite set of states S<sub>1</sub>, S<sub>2</sub>, ..., S<sub>N</sub> and moves between them at discrete time steps. The state at time <i>t</i> is written <i>q<sub>t</sub></i>. The whole model is a state space, a transition matrix, and an initial distribution over the states.</p>
<p><b>The Markov property.</b> The next state depends on the present state and not on the full history: P(<i>q<sub>t+1</sub></i>=S<sub>j</sub> | <i>q<sub>t</sub></i>=S<sub>i</sub>, <i>q<sub>t−1</sub></i>, ...) = P(<i>q<sub>t+1</sub></i>=S<sub>j</sub> | <i>q<sub>t</sub></i>=S<sub>i</sub>). The present state is a sufficient summary. This is the memoryless property, and it is the sentence an examiner looks for.</p>
<p><b>The transition matrix.</b> For a homogeneous process the probabilities stay the same at every step, so they form a matrix <b>P</b> with <i>p<sub>ij</sub></i> = P(<i>q<sub>t+1</sub></i>=<i>j</i> | <i>q<sub>t</sub></i>=<i>i</i>). Every entry is non-negative and every row sums to 1. Here is a two-state weather model.</p>
<table class="tbl">
<tr><th>From / To</th><th>Sunny</th><th>Rainy</th></tr>
<tr><td>Sunny</td><td>0.8</td><td>0.2</td></tr>
<tr><td>Rainy</td><td>0.3</td><td>0.7</td></tr>
</table>
<p><b>Several steps.</b> The two-step transition matrix is <b>P</b>², because the process passes through one intermediate state and the law of total probability adds over it. In general the <i>n</i>-step matrix is <b>P</b><sup><i>n</i></sup> (the Chapman-Kolmogorov relation). Repeated powers often settle toward a stationary distribution π that satisfies π<b>P</b>=π and sums to 1.</p>`
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
          html: `<p>Start on Monday with Sun. The matrix above gives P(Tue Sun)=0.8 and P(Tue Rain)=0.2. The probability of the three-day sequence Sun, Sun, Rain is the product along that path: 1 × 0.8 × 0.2 = 0.16. Multiplying the matrix by itself gives the two-step probabilities,
<b>P</b>² = [[0.8·0.8 + 0.2·0.3, 0.8·0.2 + 0.2·0.7], [0.3·0.8 + 0.7·0.3, 0.3·0.2 + 0.7·0.7]] = [[0.70, 0.30], [0.45, 0.55]].</p>
<p>So after two days, P(Wed Sun)=0.70 and P(Wed Rain)=0.30. The 0.70 is the sum of two routes, Sun→Sun→Sun (0.64) and Sun→Rain→Sun (0.06). In the long run the chain settles at π=(0.6, 0.4), which you can check from π<b>P</b>=π. The starting day matters for the first few steps and fades after enough steps.</p>`
        },
        {
          type: "tip",
          html: `<p>Draw the two states with labelled arrows first, because the diagram carries easy marks. State the Markov property in one plain sentence, then write the transition matrix and say that each row sums to 1. For a numerical question, multiply along the path for one sequence and use <b>P</b>² for a two-step state probability. Distinguish a sequence probability from a state probability, since they answer different questions. Mention the stationary distribution only when the question asks about long-run behaviour.</p>`
        }
      ],
      practice: [
        {
          q: "A machine is either Working (W) or Broken (B). From W it stays W with probability 0.9 and fails with 0.1. From B it is repaired to W with 0.6 and stays B with 0.4. It starts Working. (a) Write the transition matrix and compute the two-step matrix. (b) Find the probability it is Working after two days. (c) Find the long-run fraction of days it is Broken.",
          a: `<p>(a) Rows are the current state and columns the next state: <b>P</b> = [[0.9, 0.1], [0.6, 0.4]]. Each row sums to 1. The two-step matrix is <b>P</b>² = [[0.9·0.9 + 0.1·0.6, 0.9·0.1 + 0.1·0.4], [0.6·0.9 + 0.4·0.6, 0.6·0.1 + 0.4·0.4]] = [[0.87, 0.13], [0.78, 0.22]].</p>
<p>(b) Starting in W, the first row of <b>P</b>² gives Working 0.87 and Broken 0.13 after two days. The walk is W→W→W (0.81) or W→B→W (0.06), and 0.81 + 0.06 = 0.87.</p>
<p>(c) Let π=(π<sub>W</sub>, π<sub>B</sub>) satisfy π<b>P</b>=π. The first equation is π<sub>W</sub>=0.9π<sub>W</sub>+0.6π<sub>B</sub>, so 0.1π<sub>W</sub>=0.6π<sub>B</sub> and π<sub>W</sub>=6π<sub>B</sub>. With π<sub>W</sub>+π<sub>B</sub>=1, 7π<sub>B</sub>=1, so π<sub>B</sub>=1/7 ≈ 0.143 and π<sub>W</sub>=6/7 ≈ 0.857. About 14.3% of days are Broken in the long run.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "State the Markov property in one sentence. Explain why a process whose next state depends on the last two states is not a first-order Markov chain, and how you would turn it into one.",
          a: `<p>The Markov property says the next state depends only on the present state, not on the earlier history. A process that looks back two steps breaks that condition because the previous state alone is not enough to give the next-state probabilities.</p>
<p>Convert it by enlarging the state: make each state a pair (current, previous). The pair at time <i>t</i> plus the pair at time <i>t</i>+1 still carries the needed two-step memory, and the enlarged chain is first order. The cost is a larger state space, N² pairs for N original states.</p>`,
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
          text: "A hidden Markov model is a Markov chain of unseen states, where each state emits an observable symbol with a fixed probability."
        },
        {
          type: "text",
          html: `<p><b>Two layers.</b> An HMM has a hidden Markov chain <i>X<sub>t</sub></i> and an observable sequence <i>Y<sub>t</sub></i>. The hidden state moves according to the Markov property. The observation at time <i>t</i> depends only on the hidden state at time <i>t</i>, not on earlier states or earlier observations. You see the symbols and infer the states.</p>
<p><b>The parameters.</b> An HMM is usually written λ=(π, A, B). π is the initial state distribution. A is the N×N transition matrix, with <i>a<sub>ij</sub></i>=P(state <i>j</i> at <i>t</i>+1 | state <i>i</i> at <i>t</i>). B holds the emission probabilities, <i>b<sub>i</sub></i>(<i>k</i>)=P(symbol <i>k</i> | state <i>i</i>). Each row of A and each row of B sums to 1. If there are M possible symbols, B has N rows and M columns.</p>
<p><b>The joint probability.</b> For a hidden path <i>q</i><sub>1</sub>, ..., <i>q<sub>T</sub></i> and observations <i>o</i><sub>1</sub>, ..., <i>o<sub>T</sub></i>, the joint probability is π(<i>q</i><sub>1</sub>) × <i>b</i>(<i>q</i><sub>1</sub>, <i>o</i><sub>1</sub>) × <i>a</i>(<i>q</i><sub>1</sub>, <i>q</i><sub>2</sub>) × <i>b</i>(<i>q</i><sub>2</sub>, <i>o</i><sub>2</sub>) × ... × <i>a</i>(<i>q</i><sub>T−1</sub>, <i>q<sub>T</sub></i>) × <i>b</i>(<i>q<sub>T</sub></i>, <i>o<sub>T</sub></i>). Multiply the start, the emissions, and the transitions along the path. Summing this over all N<sup>T</sup> paths gives the likelihood of the observations, which is exponential without dynamic programming.</p>
<p><b>Why hide the states.</b> The interesting unit is often not measurable. In speech the phone is hidden behind the waveform; in weather the sky is hidden behind a friend's activity. The HMM lets you reason about the hidden sequence through the visible evidence, and it keeps the state space small because the chain is first order.</p>`
        },
        {
          type: "diagram",
          id: "hmm-states"
        },
        {
          type: "example",
          html: `<p>A friend tells you what he did each day: walk, shop or clean. The weather is hidden. Suppose the initial probabilities are Rainy 0.6 and Sunny 0.4, the transitions are Rainy→Rainy 0.7, Rainy→Sunny 0.3, Sunny→Rainy 0.4, Sunny→Sunny 0.6, and the emissions are Rainy: walk 0.1, shop 0.4, clean 0.5; Sunny: walk 0.6, shop 0.3, clean 0.1.</p>
<p>Take the path Rainy then Sunny and the observations walk then clean. Its joint probability is 0.6 × 0.1 × 0.3 × 0.1 = 0.0018. The path Sunny then Sunny gives 0.4 × 0.6 × 0.6 × 0.1 = 0.0144, which is eight times larger. The likelihood of the two observations is the sum over all four two-day paths, not just the best one.</p>`
        },
        {
          type: "tip",
          html: `<p>Draw two layers and label them hidden and observed, because the picture separates an HMM from a plain Markov chain. Name the three parameter groups π, A and B, and say which rows sum to 1. Write the joint probability of one path as a product, then say that the total likelihood sums over paths. For a 7-mark example, use a small two-state weather story and show one path with its arithmetic. Avoid claiming that the hidden states are known; they are inferred.</p>`
        }
      ],
      practice: [
        {
          q: "An HMM has states S1 and S2, symbols A and B, initial probabilities π = (0.6, 0.4), transition rows S1: (0.7, 0.3) and S2: (0.4, 0.6), and emissions S1: A 0.8, B 0.2; S2: A 0.3, B 0.7. Compute P(A, B) by listing the four hidden paths.",
          a: `<p>Four paths produce A then B. Multiply initial probability, first emission, transition, and second emission for each path.</p>
<p>S1,S1: 0.6 × 0.8 × 0.7 × 0.2 = 0.0672<br>
S1,S2: 0.6 × 0.8 × 0.3 × 0.7 = 0.1008<br>
S2,S1: 0.4 × 0.3 × 0.4 × 0.2 = 0.0096<br>
S2,S2: 0.4 × 0.3 × 0.6 × 0.7 = 0.0504</p>
<p>Add them: 0.0672 + 0.1008 + 0.0096 + 0.0504 = 0.228. The forward algorithm computes the same number in O(N²T) time instead of enumerating N<sup>T</sup> paths.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A speech recogniser uses one HMM per word. Explain why the model needs hidden states at all, what the emission distribution represents, and why adding more hidden states does not always improve recognition.",
          a: `<p>The recording gives a sequence of feature frames, but the units that produced them, such as phones or parts of a syllable, are not labelled in the audio. The hidden states stand for those unseen units, and the transition matrix lets the model move through them in order. Without hidden states the model would treat every frame as an independent symbol and would lose the sequence structure that separates one word from another.</p>
<p>The emission distribution gives the probability of a visible frame given a hidden state, for example a Gaussian or a discrete table over symbols. It is the link between the unseen process and what the microphone records, and it is what makes the likelihood of a recording computable.</p>
<p>More states give finer units and can fit the training recordings more closely, but they also multiply the parameters and the paths. With limited data the extra states fit speaker or recording quirks, and recognition on new speakers falls. Start with the smallest number that covers the sounds, then increase only when validation accuracy improves.</p>`,
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
          text: "The three HMM problems ask for the likelihood of an observation sequence, the best hidden path, and the model parameters."
        },
        {
          type: "text",
          html: `<p><b>The three questions.</b> Once an HMM is written down, three different questions come up. Each has its own answer and its own standard algorithm.</p>
<table class="tbl">
<tr><th>Problem</th><th>Question</th><th>Answer</th><th>Algorithm</th></tr>
<tr><td>Evaluation</td><td>How likely is this observation sequence under the model?</td><td>P(O | λ)</td><td>Forward</td></tr>
<tr><td>Decoding</td><td>Which hidden state sequence most likely produced it?</td><td>argmax<sub>Q</sub> P(Q, O | λ)</td><td>Viterbi</td></tr>
<tr><td>Learning</td><td>Which parameters best explain the observations?</td><td>π, A, B</td><td>Baum-Welch</td></tr>
</table>
<p><b>Evaluation by forward.</b> Let α<sub>t</sub>(<i>i</i>) be the probability of the first <i>t</i> observations and ending in state <i>i</i>. Initialise α<sub>1</sub>(<i>i</i>)=π<sub><i>i</i></sub><i>b<sub>i</sub></i>(<i>o</i><sub>1</sub>). Then update α<sub><i>t</i>+1</sub>(<i>j</i>)=[Σ<sub><i>i</i></sub> α<sub><i>t</i></sub>(<i>i</i>)<i>a<sub>ij</sub></i>] <i>b<sub>j</sub></i>(<i>o</i><sub><i>t</i>+1</sub>). At the end sum α<sub><i>T</i></sub>(<i>i</i>) over states. The cost is O(N²T), not O(N<sup>T</sup>).</p>
<p><b>Decoding by Viterbi.</b> Let δ<sub><i>t</i></sub>(<i>i</i>) be the best probability of a path ending in state <i>i</i> at time <i>t</i>. The recursion takes a maximum instead of a sum, δ<sub><i>t</i>+1</sub>(<i>j</i>)=max<sub><i>i</i></sub>[δ<sub><i>t</i></sub>(<i>i</i>)<i>a<sub>ij</sub></i>] <i>b<sub>j</sub></i>(<i>o</i><sub><i>t</i>+1</sub>), and stores the winning previous state. At the end it picks the best final state and traces the backpointers to recover the whole path.</p>
<p><b>Learning by Baum-Welch.</b> This is expectation-maximisation for an HMM. The E step runs forward-backward to estimate how often each transition and each emission was used, given the current parameters. The M step re-estimates π, A and B from those expected counts. Repeat until the likelihood stops improving. It finds a local maximum, so the starting values matter, and it does not need labelled hidden states.</p>
<p><b>The distinction that earns marks.</b> Forward sums over every path to get the total probability of the observations. Viterbi takes the maximum over paths to get the single best path. They answer different questions and can return different numbers.</p>`
        },
        {
          type: "example",
          html: `<p>A speech team has a trained HMM for the word "cat" and a new recording. To compare the recording with two word models, it needs the evaluation problem and the forward algorithm, because the score is P(O | λ) summed over all state paths.</p>
<p>To show an aligner which frames belong to which sound, it needs decoding and Viterbi, because it wants one state path. To train the word model from a folder of unlabelled recordings, it needs learning and Baum-Welch. One recording can therefore need all three algorithms, depending on the question.</p>`
        },
        {
          type: "tip",
          html: `<p>Name all three problems in one table with the question and the algorithm, because the pairing is what the examiner checks. Add the quantity each one returns: P(O | λ), the best path, and the updated parameters. Mention the cost O(N²T) for forward and Viterbi to show why dynamic programming matters. State that forward sums and Viterbi maximises, then give one sentence on Baum-Welch as EM. Do not describe the algorithms as interchangeable.</p>`
        }
      ],
      practice: [
        {
          q: "Name the HMM problem and the algorithm for each task. (a) Score a recorded word against a trained model. (b) Recover the most likely weather path from a sequence of activities. (c) Fit transition and emission probabilities from unlabelled recordings. Then explain why Viterbi is the wrong tool for (a).",
          a: `<p>(a) Evaluation: compute P(O | λ), the probability of the observation sequence under the model. The forward algorithm does it by summing partial probabilities over states at each time step.</p>
<p>(b) Decoding: find the single most likely hidden-state sequence. The Viterbi algorithm keeps the best partial path into each state and a backpointer, then traces the path back from the best final state.</p>
<p>(c) Learning: estimate π, A and B from data. Baum-Welch, the EM algorithm for HMMs, alternates forward-backward expectations with re-estimation until the likelihood stops improving.</p>
<p>Viterbi returns the probability of one path, the maximum over paths. Evaluation needs the total probability of the observations, which is the sum over every path. Using Viterbi for scoring would ignore all the other ways the recording could have been produced and would give a different, smaller number.</p>`,
          marks: 7,
          diff: "medium"
        },
        {
          q: "Explain why the forward algorithm sums where Viterbi takes a maximum. Then describe a case where the most likely single path differs from the sequence of states that are individually most likely at each time.",
          a: `<p>Forward answers how likely the observations are under the model, so every hidden path that could produce them contributes. At each step it replaces the explicit sum over paths with a sum over the previous states, which is the dynamic-programming step. Viterbi answers which one path is most likely, so at each step it keeps only the best predecessor for each state and discards the rest.</p>
<p>The two can disagree because a sequence of per-time winners need not be a coherent path. Suppose state A is most likely at time 1 and state B is most likely at time 2, but the transition A→B has probability near zero. Posterior decoding would report A then B, while Viterbi would prefer a slightly less likely start that makes the pair coherent. Viterbi maximises the whole path, not each column separately.</p>
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
          text: "Ensemble learning trains several base learners and combines their predictions into one decision that is usually more accurate than any single learner."
        },
        {
          type: "text",
          html: `<p><b>The idea.</b> A single model carries one set of assumptions and one set of errors. Several models make different errors, and a combination can cancel some of them. The individual models are the base learners, and the useful condition is diversity: models that fail on different rows give the combination something to correct. Identical learners add cost and no information.</p>
<p><b>Voting.</b> Voting combines learners that are already trained, with no resampling and no second stage. Hard voting takes the majority label. Soft voting averages the predicted class probabilities and takes the largest average, so a confident model counts for more. Weights let you trust a stronger model more. Voting is the simplest combiner and works best when the base models are comparable in accuracy.</p>
<p><b>Bagging.</b> Bagging means bootstrap aggregating. Draw m samples of size n from the training set with replacement, fit one copy of the same learner to each, then vote or average. About 63.2% of the rows appear at least once in a bootstrap sample, and the rows left out form the out-of-bag set, which gives a free error estimate. The copies train independently, so bagging runs in parallel. It mainly cuts variance, which is why it suits deep decision trees. Random forests add a random subset of features at each split to decorrelate the trees further.</p>
<p><b>Boosting.</b> Boosting trains learners one after another. Start with equal weights on the rows, fit a weak learner, then raise the weights of the rows it got wrong and lower the rest. The next learner therefore focuses on the previous mistakes. Each learner also gets a say in the final vote, usually stronger for the ones with lower error. AdaBoost is the classic version, and gradient boosting fits each new tree to the remaining loss. Boosting mainly cuts bias, but it can chase label noise and overfit if run too long.</p>
<p><b>Stacking.</b> Stacking trains a meta-learner on the predictions of several base models. To avoid leakage, those predictions must be out-of-fold: each base model predicts rows it did not train on. The meta-learner then learns where each base model is reliable. It is more flexible than voting, and more work to validate.</p>
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
          html: `<p>A bank compares a random forest and AdaBoost on the same churn table. The forest grows 300 deep trees on bootstrap samples and averages their probabilities. Its individual trees overfit, but their errors are only partly correlated, so the average is steadier than one tree. The training score stays high while the test score improves, which is the variance reduction at work.</p>
<p>AdaBoost starts with 300 shallow stumps. The first stump makes many mistakes, so those rows gain weight. The second stump concentrates on them, and so on. The training error falls quickly because the sequence keeps fixing its own bias. Push it to thousands of rounds on noisy labels and the test error can rise again, because the later rounds start fitting rows that are simply mislabelled.</p>`
        },
        {
          type: "tip",
          html: `<p>Answer by contrasting how the learners are built, because that contrast is what earns the method marks. Say voting combines already-trained models, bagging trains copies on bootstrap samples in parallel, and boosting trains sequentially with each learner focused on earlier mistakes. Add bias and variance: bagging cuts variance, boosting cuts bias. For 14 marks, include a table, one failure mode for each method, and a note on out-of-fold predictions if you mention stacking. Keep single-learner weaknesses to one line.</p>`
        }
      ],
      practice: [
        {
          q: "A churn team has three trained models: random forest 88% accuracy, gradient-boosted trees 89%, logistic regression 84%. Design an ensemble for the task. Compare how the forest and the booster are built, say which error each mainly reduces, choose a combination method, explain how to avoid leakage in stacking, and say how you would decide the ensemble is worth deploying.",
          a: `<p><b>How the two are built.</b> A random forest is bagging: draw many bootstrap samples with replacement, fit a deep tree to each, and average or vote. The trees are independent, so they can be trained in parallel. A gradient-boosted model is sequential: each new shallow tree is fitted to the errors or gradients left by the current model, and its contribution is scaled by a learning rate. The forest mainly cuts variance because averaging decorrelated trees cancels their individual noise. The booster mainly cuts bias because each stage corrects what the current model gets wrong.</p>
<p><b>Combination.</b> With three different model families, soft voting is the safe start: average the predicted churn probabilities, optionally weighting the stronger models, and take the class with the larger average. Stacking can do better because a meta-learner can learn where each model is reliable, but it needs out-of-fold predictions. If the models are similar in accuracy, hard voting throws away confidence and is the weakest choice.</p>
<p><b>Leakage.</b> Never fit the meta-learner on predictions made from the same rows it trained on. Use K-fold out-of-fold predictions, or scikit-learn's <code>StackingClassifier</code>, which builds them for you, and keep the final test set untouched until the end.</p>
<p><b>Worth deploying?</b> Compare the ensemble with the best single model on a held-out set using a metric that matches the business cost, such as recall at a fixed false-positive rate. Report a confidence interval or run a paired test, because a one-point gain can be noise. Check inference cost and interpretability too: if the booster alone is within noise of the ensemble, the extra complexity buys nothing.</p>`,
          marks: 14,
          diff: "hard"
        },
        {
          q: "Three classifiers give these probabilities for one sample, classes A and B: (0.9, 0.1), (0.4, 0.6), (0.45, 0.55). Compute the hard-vote and soft-vote result. Explain why they differ and when soft voting is the better choice.",
          a: `<p>Hard voting counts labels. The first model votes A, the second B, the third B, so the majority is B.</p>
<p>Soft voting averages probabilities. A: (0.9 + 0.4 + 0.45) / 3 = 1.75 / 3 ≈ 0.583. B: (0.1 + 0.6 + 0.55) / 3 = 1.25 / 3 ≈ 0.417. The average probability is higher for A, so soft voting returns A.</p>
<p>They differ because hard voting gives every model one equal vote, while soft voting lets a confident model count for more. Soft voting is better when the base models are well calibrated and one of them is much more confident on this case. Hard voting is safer when probabilities are unreliable, for example from an SVM without calibration.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    }
  ]
};
