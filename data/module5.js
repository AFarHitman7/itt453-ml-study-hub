window.ML_MODULES = window.ML_MODULES || {};
window.ML_MODULES[5] = {
  num: 5,
  title: "Unsupervised Learning",
  hours: 7,
  topics: [
    {
      slug: "m5-clustering",
      title: "Unsupervised Learning and K-Means",
      sources: [
        "https://en.wikipedia.org/wiki/K-means_clustering",
        "https://scikit-learn.org/stable/modules/clustering.html",
        "https://en.wikipedia.org/wiki/Unsupervised_learning",
        "https://en.wikipedia.org/wiki/Cluster_analysis"
      ],
      blocks: [
        {
          type: "definition",
          text: "Unsupervised learning finds structure in unlabelled data, and k-means splits points into k groups around the nearest mean."
        },
        {
          type: "text",
          html: `<p><b>No labels, so the data has to speak for itself.</b> A supervised model learns from a target column. An unsupervised model has no target, so it hunts for structure inside the feature matrix: groups of similar rows, fewer directions that carry the variance, dense regions, and rows that fit no pattern. Clustering is the part this module examines.</p>
<p><b>What counts as a cluster depends on the method.</b> There is no single definition, which is why the family is large. The split worth remembering:</p>
<table class="tbl">
<thead><tr><th>Cluster model</th><th>Idea</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Connectivity</td><td>Nearby objects belong together; distance decides the links.</td><td>Hierarchical clustering</td></tr>
<tr><td>Centroid</td><td>Each cluster is one mean vector, and members sit nearest to it.</td><td>K-means</td></tr>
<tr><td>Distribution</td><td>Clusters are draws from statistical distributions.</td><td>Gaussian mixture with EM</td></tr>
<tr><td>Density</td><td>Clusters are connected regions of high point density.</td><td>DBSCAN, OPTICS</td></tr>
<tr><td>Subspace</td><td>Clusters use only some of the features.</td><td>Biclustering</td></tr>
</tbody></table>
<p><b>The k-means loop.</b> Pick k. Place k centroids. Assign every point to the nearest centroid. Move each centroid to the mean of the points that chose it. Repeat until the assignments stop changing. One complete pass is an iteration or epoch.</p>
<p><b>The objective is squared error.</b> K-means minimises the within-cluster sum of squares, also called inertia. Take every point's squared distance from its own centroid and add the lot: J = Σ ||x - μ||² over all points x assigned to centre μ. The mean is the point that minimises squared distance, which is why squared Euclidean distance sits inside the method.</p>
<p><b>Why the loop stops.</b> Each pass either keeps the assignments or lowers J, so the sequence is finite and the algorithm ends. The endpoint can be a local minimum, and a different seed can reach a different one. K-means++ spaces the starting centres out to reduce that risk. Cost is O(n k d i) for n points, k clusters, d features and i iterations, which is why the method handles large tables.</p>
<p><b>Choosing k.</b> The elbow plot puts inertia against k and looks for the bend where extra clusters stop buying much. Silhouette measures how much closer a point sits to its own cluster than to the next one, on a scale near -1 to 1. The gap statistic compares the result with a null reference, and Davies-Bouldin is lower when clusters are tight and well separated. The elbow is a visual judgement, so state a second criterion beside it.</p>
<p><b>Where it breaks.</b> Inertia assumes convex, roughly equal, isotropic blobs, so two moons or a ring come out cut across the middle. Outliers pull the mean, because a mean has no resistance. Categorical columns have no useful mean. Clusters of very different size get split to equalise the error. Scale the features first, or a column measured in thousands will outvote a column measured in single digits.</p>`
        },
        {
          type: "code",
          lang: "python",
          html: `from sklearn.cluster import KMeans

X = [[2, 6], [3, 8], [1, 3], [5, 4], [7, 2], [8, 4]]
km = KMeans(n_clusters=2, init=[[1, 6], [6, 2]], n_init=1, random_state=0)
km.fit(X)

print(km.cluster_centers_.round(2))
print(km.labels_)

# [[2.   5.67]
#  [6.67 3.33]]
# [0 0 0 1 1 1]`
        },
        { type: "diagram", id: "kmeans-iter" },
        {
          type: "example",
          html: `<p><b>Nov 2025, Q19(a), 8 marks.</b> Cluster the six points into two groups from C1 = (1,6) and C2 = (6,2), then report the membership and the updated centres after the first iteration. The points are D1(2,6), D2(3,8), D3(1,3), D4(5,4), D5(7,2) and D6(8,4).</p>
<p><b>Formula.</b> d(P,C) = √[(x<sub>P</sub> - x<sub>C</sub>)² + (y<sub>P</sub> - y<sub>C</sub>)²].</p>
<table class="tbl">
<thead><tr><th>Point</th><th>d to C1 (1,6)</th><th>d to C2 (6,2)</th><th>Nearer</th><th>Cluster</th></tr></thead>
<tbody>
<tr><td>D1 (2,6)</td><td>√(1 + 0) = 1.000</td><td>√(16 + 16) = 5.657</td><td>C1</td><td>1</td></tr>
<tr><td>D2 (3,8)</td><td>√(4 + 4) = 2.828</td><td>√(9 + 36) = 6.708</td><td>C1</td><td>1</td></tr>
<tr><td>D3 (1,3)</td><td>√(0 + 9) = 3.000</td><td>√(25 + 1) = 5.099</td><td>C1</td><td>1</td></tr>
<tr><td>D4 (5,4)</td><td>√(16 + 4) = 4.472</td><td>√(1 + 4) = 2.236</td><td>C2</td><td>2</td></tr>
<tr><td>D5 (7,2)</td><td>√(36 + 16) = 7.211</td><td>√(1 + 0) = 1.000</td><td>C2</td><td>2</td></tr>
<tr><td>D6 (8,4)</td><td>√(49 + 4) = 7.280</td><td>√(4 + 4) = 2.828</td><td>C2</td><td>2</td></tr>
</tbody></table>
<p><b>Working for one row.</b> Take D2(3,8). To C1: (3-1)² + (8-6)² = 4 + 4 = 8, so d = 2.828. To C2: (3-6)² + (8-2)² = 9 + 36 = 45, so d = 6.708. D2 joins C1.</p>
<p><b>Updated centres.</b> Cluster 1 holds D1, D2 and D3, so mean x = (2 + 3 + 1)/3 = 2 and mean y = (6 + 8 + 3)/3 = 17/3 = 5.67. Cluster 2 holds D4, D5 and D6, so mean x = (5 + 7 + 8)/3 = 20/3 = 6.67 and mean y = (4 + 2 + 4)/3 = 10/3 = 3.33.</p>
<p><b>Answer.</b> After iteration 1: cluster 1 = {D1, D2, D3} with centre (2, 5.67), and cluster 2 = {D4, D5, D6} with centre (6.67, 3.33).</p>
<p><b>Iteration 2 check.</b> The closest call is D4. From the new C1 it sits √(9 + 2.789) = 3.43 away, and from the new C2 it sits 1.79 away, a margin of 1.64. D3 is 2.85 against 5.68, a wider margin of 2.83. Every other point also keeps its cluster, so the memberships from iteration 1 are final.</p>`
        },
        {
          type: "tip",
          html: `<p>Write the distance table before any conclusion, because the credit usually sits with the two distances per point, the assignment and the new centre, not only the final pair. Label "Iteration 1" and "Iteration 2" as separate blocks so the examiner can find each step. Keep centres as fractions while you work, such as 17/3, and give the decimal beside them. Draw the six points and both centroids when the question carries 8 marks; the diagram above is the shape to copy.</p>`
        }
      ],
      practice: [
        {
          q: "K-means minimises a sum of squared distances. Explain why feature scaling changes the clusters it finds.",
          a: `<p>The objective adds squared gaps across all features, so a column with a wide numeric range takes a much larger share of the error. Distance is then dominated by that one column and the others barely affect the assignment.</p>
<p>Income in rupees ranges over lakhs while age ranges over decades. Two customers who differ by 20,000 in income and 2 years in age look far apart, although the age gap may matter more to the business question. Dividing each column by its standard deviation, or rescaling it to 0 to 1, puts the features on one footing, and the partition can change.</p>
<p>Scaling is therefore part of the model, not cosmetic pre-processing. Report the scaling used beside the result.</p>`,
          marks: 3,
          diff: "medium"
        },
        {
          q: "You run k-means with k = 6 on data that really contains three groups. Describe the partition you are likely to get, and how you would detect that k is too large.",
          a: `<p>K-means must place six centroids, so it splits the real groups instead of leaving three centres empty. A large group usually gets cut into two or three slices along a line, and the smaller groups may stay whole or split as well. The six clusters then look like pieces of the three true groups, with several centroids sitting inside the same dense region.</p>
<p>Signs to check:</p>
<ul>
<li>Inertia keeps falling as k rises, so a low value proves nothing on its own. The elbow bends where extra clusters stop paying, and a k past the bend adds little.</li>
<li>Silhouette scores drop when points sit almost as close to a neighbouring cluster as to their own, which is what a forced split produces.</li>
<li>Two centroids land very close together, and a boundary runs through the middle of one blob.</li>
<li>Cluster sizes become small and similar while the data holds one large natural group.</li>
</ul>
<p>Fix it by rerunning across a range of k, comparing silhouette or the gap statistic, and checking the separation between centroids. Choosing k from domain meaning as well as the metric is normal practice.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A retail chain has 40,000 loyalty customers with annual spend, visits per month, average basket value and months since last purchase. Design a k-means segmentation study end to end, and name the main risk in the result.",
          a: `<p><b>1. Frame the question.</b> Segmentation should change an action: which offer, which channel, which customer to keep. Decide that before touching the data, because it sets the features that matter and the number of segments the business can serve. Four to six is usually workable.</p>
<p><b>2. Prepare the features.</b> Spend and basket value are skewed, so use a log or a square root. Put all four features on one scale, for example by standardising to mean 0 and standard deviation 1, or by min-max scaling to 0 to 1. Check missing values and cap extreme spenders, since the mean does not resist them. Recency and visits are already bounded and comparable.</p>
<p><b>3. Choose k.</b> Run k = 2 to 10, record inertia, and plot the elbow. Cross-check with average silhouette and the gap statistic. A k where two centroids nearly coincide is too high. Keep the smallest k that separates groups the business can name.</p>
<p><b>4. Fit and validate.</b> Run k-means several times with different seeds and keep the run with the lowest inertia, because the algorithm finds local minima. With 40,000 rows this is cheap. Hold out a sample, assign it to the nearest centroid, and confirm that each cluster profile is stable. Name each segment from its centroid, such as frequent small-basket or lapsed high-spend, and report its size.</p>
<p><b>5. Report.</b> Give a table of centroid values in original units, the count and revenue share per segment, and one action per segment. Add the diagnostic used to choose k.</p>
<p><b>Risk.</b> K-means assumes convex groups of similar size and uses squared Euclidean distance, so the segments may slice a continuous spread of customers rather than find real types. The result also reacts to the scaling chosen in step 2, and a different but defensible scaling can move a customer between segments. Check the segments against an outside variable, such as next-quarter spend, before campaigns are built on them.</p>`,
          marks: 14,
          diff: "hard"
        }
      ]
    },
    {
      slug: "m5-similarity",
      title: "Similarity and Distance Measures",
      sources: [
        "https://en.wikipedia.org/wiki/Minkowski_distance",
        "https://en.wikipedia.org/wiki/Manhattan_distance",
        "https://en.wikipedia.org/wiki/Jaccard_index",
        "https://en.wikipedia.org/wiki/Cosine_similarity"
      ],
      blocks: [
        {
          type: "definition",
          text: "A distance measure turns two data objects into one number that is small when they are alike, so a clustering algorithm can compare rows."
        },
        {
          type: "text",
          html: `<p><b>The measure decides what similar means.</b> A clustering algorithm never sees a row. It sees the number your measure produces, so two rows can be neighbours under Euclidean distance and strangers under cosine. Choose the measure from the data type first, then the algorithm.</p>
<p><b>One family covers the numeric metrics.</b> The Minkowski distance of order p is D<sub>p</sub>(x,y) = (Σ |x<sub>i</sub> - y<sub>i</sub>|<sup>p</sup>)<sup>1/p</sup>. Set p = 1 and you have Manhattan distance. Set p = 2 and you have Euclidean. Let p grow without bound and the largest coordinate gap takes over, which is Chebyshev or chessboard distance. So one formula covers all three named measures.</p>
<table class="tbl">
<thead><tr><th>Measure</th><th>Formula and behaviour</th><th>Reach for it when</th></tr></thead>
<tbody>
<tr><td>Manhattan (L1)</td><td>Σ|x<sub>i</sub> - y<sub>i</sub>|<br>Adds the gaps along each axis, like a grid path.</td><td>Features are sparse or high-dimensional, or outliers should not dominate.</td></tr>
<tr><td>Euclidean (L2)</td><td>√Σ(x<sub>i</sub> - y<sub>i</sub>)²<br>Straight-line distance, so large gaps count more.</td><td>Dense continuous features on a comparable scale. Default for k-means.</td></tr>
<tr><td>Chebyshev (L∞)</td><td>max |x<sub>i</sub> - y<sub>i</sub>|<br>Only the worst single coordinate counts.</td><td>The largest mismatch is what matters, as in a king move or a tolerance check.</td></tr>
<tr><td>Minkowski, general p</td><td>(Σ|x<sub>i</sub> - y<sub>i</sub>|<sup>p</sup>)<sup>1/p</sup><br>A dial between the three named cases.</td><td>You want to tune how strongly big gaps are penalised.</td></tr>
</tbody></table>
<p><b>Manhattan has its own job.</b> It adds absolute gaps instead of squares, so one large gap cannot take over the total. On sparse vectors most coordinates are zero, and the L1 sum stays cheap and stable while L2 squares the few large gaps and lets them dominate.</p>
<p><b>Jaccard compares sets.</b> J(A,B) = |A ∩ B| / |A ∪ B|, which runs from 0 for disjoint sets to 1 for identical sets. It counts shared presence only, so joint absence is ignored. That suits market baskets, tags and presence data, where sharing "not bought" says nothing. Two 3-item baskets that share 2 items score 2/4 = 0.5. The simple matching coefficient on a 1,000-product store counts the 996 products neither customer bought and reports 0.998. That hides the real difference. Jaccard distance is 1 - J.</p>
<p><b>Cosine compares direction.</b> cos θ = (A · B) / (||A|| ||B||). It divides out length, so a short note and a long article on the same topic can score 1. For non-negative counts the value runs from 0 to 1. That is why text mining builds a term-frequency or TF-IDF vector per document and clusters on cosine. Cosine distance is 1 - cos θ, and it is not a true metric because it can break the triangle inequality.</p>
<p><b>Pick by data type.</b> Numeric and dense: Euclidean after scaling. Numeric, sparse or outlier-heavy: Manhattan. Sets or presence/absence: Jaccard. Text counts: cosine. Correlated features in different units: Mahalanobis. Write the formula before substituting, because the formula itself carries marks.</p>`
        },
        {
          type: "example",
          html: `<p><b>Nov 2025, Q10, 3 marks.</b> A(5,8,11) and B(1,2,7). Find the Manhattan and Euclidean distances.</p>
<p>Coordinate differences, in order: (5-1, 8-2, 11-7) = (4, 6, 4).</p>
<p>Manhattan: |4| + |6| + |4| = 14.</p>
<p>Euclidean: √(4² + 6² + 4²) = √(16 + 36 + 16) = √68 = 8.246, about 8.25.</p>
<p><b>Dec 2023, Q10, 3 marks.</b> A(12,3,9) and B(6,5,15). Find city block, chessboard and Euclidean distance.</p>
<p>Differences: (12-6, 3-5, 9-15) = (6, -2, -6). Absolute values: 6, 2, 6.</p>
<p>City block: 6 + 2 + 6 = 14.</p>
<p>Chessboard: max(6, 2, 6) = 6.</p>
<p>Euclidean: √(36 + 4 + 36) = √76 = 8.718, about 8.72.</p>
<p><b>Why the two Euclidean answers differ.</b> Both pairs are 14 apart under L1, but the Nov 2025 gaps (4, 6, 4) are spread more evenly, so their squares add to 68. The Dec 2023 gaps (6, 2, 6) concentrate more in two axes, so their squares add to 76 and the straight line is longer.</p>`
        },
        {
          type: "tip",
          html: `<p>Lead with the formula and name it, then list the coordinate differences in a row, then substitute. A 3-mark answer usually needs the formula, the substitution and the value, so a bare number throws away most of the credit. Keep signs inside the bracket and take absolute values only where the formula asks for them. Round to two decimals and keep the exact surd beside the decimal, as in √68 = 8.25.</p>`
        }
      ],
      practice: [
        {
          q: "Two documents are stored as word-count vectors. Explain why cosine similarity suits this representation, and give one case where it misleads.",
          a: `<p>Cosine compares the angle between the vectors and ignores their lengths. A 200-word note and a 4,000-word report on the same topic point in almost the same direction even though their magnitudes differ by a factor of 20, so cosine scores them near 1. Euclidean distance would call them far apart for the length difference alone.</p>
<p>Term-frequency vectors are sparse and high-dimensional. Cosine needs only the non-zero coordinates, so it stays cheap, and for non-negative counts its value falls in the range 0 to 1, which is easy to read.</p>
<p>Where it misleads:</p>
<ul>
<li><b>Shared function words.</b> Two documents that both repeat "the", "of" and "and" score high on raw counts. Stop-word removal or TF-IDF weighting removes most of that.</li>
<li><b>Opposite meaning, same words.</b> A review and a reply that quotes it share vocabulary and score high, although the stance is opposite. Cosine sees words, not negation.</li>
<li><b>Very short texts.</b> A one-word query and a document containing that word once score 1, which overstates the match.</li>
</ul>
<p>Use cosine with TF-IDF weighting, and do not read a high score as agreement in a sentiment task.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "Customer A bought {bread, milk, eggs} and customer B bought {bread, milk, butter}. The store stocks 1,000 products. Compute the Jaccard similarity and distance, and explain why the simple matching coefficient is a poor choice here.",
          a: `<p>Intersection A ∩ B = {bread, milk}, size 2. Union A ∪ B = {bread, milk, eggs, butter}, size 4.</p>
<p>J(A,B) = |A ∩ B| / |A ∪ B| = 2/4 = 0.5, so the Jaccard distance is 1 - 0.5 = 0.5.</p>
<p>For the simple matching coefficient on 1,000 binary product attributes: M11 = 2, M10 = 1, M01 = 1, and M00 = 1,000 - 4 = 996. SMC = (M11 + M00) / 1,000 = 998/1,000 = 0.998.</p>
<p>The SMC calls the two customers almost identical because both failed to buy the same 996 products. Absence is not evidence of similar taste in a sparse catalogue, and almost every pair would score above 0.99. Jaccard drops M00 and measures what the baskets share against what either bought, which is the question a recommendation task actually asks.</p>
<p>Use the SMC only when 0 and 1 carry equal information, such as a symmetric yes/no attribute where both answers are meaningful.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "Write the Minkowski distance formula and use it to relate Manhattan, Euclidean and chessboard distance.",
          a: `<p>For points x and y in n dimensions, D<sub>p</sub>(x,y) = (Σ |x<sub>i</sub> - y<sub>i</sub>|<sup>p</sup>)<sup>1/p</sup>, with p at least 1.</p>
<p>p = 1 gives D<sub>1</sub> = Σ |x<sub>i</sub> - y<sub>i</sub>|, the Manhattan or city-block distance, which adds the gap along each axis. p = 2 gives D<sub>2</sub> = √Σ (x<sub>i</sub> - y<sub>i</sub>)², the Euclidean straight line. As p tends to infinity the largest term dominates and D<sub>∞</sub> = max |x<sub>i</sub> - y<sub>i</sub>|, the Chebyshev or chessboard distance.</p>
<p>So the three named measures are one family read at three settings of p, and p is a dial between "every small gap counts" and "only the worst gap counts".</p>`,
          marks: 3,
          diff: "easy"
        }
      ]
    },
    {
      slug: "m5-hierarchical",
      title: "Agglomerative Hierarchical Clustering",
      sources: [
        "https://en.wikipedia.org/wiki/Hierarchical_clustering",
        "https://en.wikipedia.org/wiki/Single-linkage_clustering",
        "https://en.wikipedia.org/wiki/Dendrogram"
      ],
      blocks: [
        {
          type: "definition",
          text: "Agglomerative clustering starts with every point alone and repeatedly merges the two closest clusters, recording each merge as a dendrogram."
        },
        {
          type: "text",
          html: `<p><b>Bottom-up, one merge at a time.</b> Hierarchical clustering does not return a single partition. It returns a tree of partitions, so you can choose the cut after seeing the structure. Agglomerative methods build from the leaves upward, while divisive methods start with one cluster and split downward. The exam questions stay on the agglomerative side.</p>
<p><b>The algorithm.</b></p>
<ol>
<li>Treat each object as its own cluster and compute the pairwise distance matrix.</li>
<li>Find the smallest distance between any two clusters.</li>
<li>Merge that pair and record the distance as the height of the new node.</li>
<li>Update the matrix: replace the two rows and columns with one row and column for the new cluster.</li>
<li>Repeat until one cluster remains, or until the required number of clusters is reached.</li>
</ol>
<p>The update step is where linkage enters, because it decides the number you write into the new row.</p>
<table class="tbl">
<thead><tr><th>Linkage</th><th>Distance between clusters</th><th>Shape it finds</th><th>Weakness</th></tr></thead>
<tbody>
<tr><td>Single (nearest neighbour)</td><td>min d(a,b) across the two clusters</td><td>Elongated and irregular groups</td><td>Chaining: one close pair can bridge two real clusters.</td></tr>
<tr><td>Complete (farthest neighbour)</td><td>max d(a,b)</td><td>Compact groups of similar diameter</td><td>One distant point inflates the distance.</td></tr>
<tr><td>Average (UPGMA)</td><td>mean of all cross-cluster pairs</td><td>Compact groups, as a compromise</td><td>Still biased toward globular clusters.</td></tr>
<tr><td>Ward</td><td>pair that adds the least within-cluster variance</td><td>Even, compact groups</td><td>Needs squared Euclidean distance.</td></tr>
</tbody></table>
<p><b>Reading the dendrogram.</b> Leaves sit at height 0. Each bar sits at the distance at which its two groups merged, so a low join means similar groups and a high join means different ones. Cut across the tree at one height and the vertical lines you cross are the clusters. A large empty band between two heights is a natural cut, because the merges below it are tight and the next one is a jump.</p>
<p><b>Cost and the chaining trap.</b> The textbook algorithm is O(n³) in time and O(n²) in memory, because it searches and rewrites an n by n matrix at every merge. Single linkage can be done in O(n²) time with SLINK, and complete linkage in O(n²) with CLINK, which is why those versions reach larger sets. Single linkage still suffers from chaining: a thin bridge of points pulls two groups into one long cluster. Complete linkage resists the bridge, though one distant point can still inflate its merge height.</p>`
        },
        { type: "diagram", id: "dendrogram" },
        {
          type: "example",
          html: `<p><b>Dec 2023, Q19(a), 8 marks.</b> The paper gives this matrix for six objects and asks for single-linkage clustering with a dendrogram.</p>
<table class="tbl">
<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr></thead>
<tbody>
<tr><td>A</td><td>0</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>B</td><td>0.71</td><td>0</td><td></td><td></td><td></td><td></td></tr>
<tr><td>C</td><td>5.66</td><td>4.95</td><td>0</td><td></td><td></td><td></td></tr>
<tr><td>D</td><td>3.61</td><td>2.92</td><td>2.24</td><td>0</td><td></td><td></td></tr>
<tr><td>E</td><td>4.24</td><td>3.54</td><td>1.411</td><td>1.00</td><td>0</td><td></td></tr>
<tr><td>F</td><td>3.20</td><td>2.50</td><td>2.50</td><td>0.50</td><td>1.12</td><td>0</td></tr>
</tbody></table>
<p><b>Step 1.</b> The smallest entry is 0.50, between D and F, so merge {D,F} at height 0.50. Under single linkage the new distances are minima: to A min(3.61, 3.20) = 3.20, to B min(2.92, 2.50) = 2.50, to C min(2.24, 2.50) = 2.24, and to E min(1.00, 1.12) = 1.00.</p>
<p><b>Step 2.</b> The smallest remaining entry is 0.71, between A and B, so merge {A,B} at 0.71. Distances from {A,B}: to C min(5.66, 4.95) = 4.95, to E min(4.24, 3.54) = 3.54, and to {D,F} min(3.20, 2.50) = 2.50.</p>
<p><b>Step 3.</b> The smallest entry is now 1.00, between E and {D,F}, so merge {D,E,F} at 1.00. Distances: to C min(2.24, 1.411, 2.50) = 1.411, and to {A,B} min(3.61, 2.92, 4.24, 3.54, 3.20, 2.50) = 2.50.</p>
<p><b>Step 4.</b> The smallest entry is 1.411, between C and {D,E,F}, so merge {C,D,E,F} at 1.411. The distance to {A,B} is min(4.95, 2.50) = 2.50.</p>
<p><b>Step 5.</b> One entry remains, 2.50, so join {A,B} with {C,D,E,F} at 2.50 and stop.</p>
<table class="tbl">
<thead><tr><th>Merge</th><th>Pair</th><th>Height</th></tr></thead>
<tbody>
<tr><td>1</td><td>D + F</td><td>0.50</td></tr>
<tr><td>2</td><td>A + B</td><td>0.71</td></tr>
<tr><td>3</td><td>E + {D,F}</td><td>1.00</td></tr>
<tr><td>4</td><td>C + {D,E,F}</td><td>1.411</td></tr>
<tr><td>5</td><td>{A,B} + {C,D,E,F}</td><td>2.50</td></tr>
</tbody></table>
<p><b>Dendrogram.</b> Place A, B, C, D, F, E along the base. D and F join at 0.50, E joins them at 1.00, C joins at 1.411, A and B join at 0.71, and the final bar sits at 2.50. The diagram on this page is that tree.</p>`
        },
        {
          type: "tip",
          html: `<p>Show the matrix after every merge, because the marks sit on the updated numbers, not only on the final tree. State the minimum before you merge, then name the rule in one line, as in "single link takes the smaller of the two old distances". Keep the leaves in an order that lets each cluster appear as a continuous branch. Close with the merge heights in a numbered list, since that list is what the examiner checks first.</p>`
        }
      ],
      practice: [
        {
          q: "Explain what the vertical axis of a dendrogram measures and how the gap between merge heights helps you choose the number of clusters.",
          a: `<p>The vertical axis is the distance at which two groups were joined. A leaf sits at 0 because it starts alone. A low bar joins groups that were already similar, and a high bar joins groups that were far apart. Heights are monotone as you move up, because each merge is at least as large as the ones below it.</p>
<p>A large empty band between two heights marks a jump in dissimilarity: everything below the band is tight, and the merge above it mixes groups that do not belong together. Cutting just below that band keeps the tight groups and gives a defensible k. A cut through the middle of a busy band is arbitrary, since the next merge is barely different.</p>
<p>Example: with merges at 0.50, 0.71, 1.00, 1.411 and 2.50, a cut at 1.2 falls in the gap between 1.00 and 1.411 and gives three groups: {A,B}, {C} and {D,E,F}. The widest band is 1.411 to 2.50, so if two segments are enough, cut there.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "Six points lie in a rough chain, each about 1 unit from the next. A seventh point sits 20 units from the nearest one. Compare what single linkage and average linkage produce, and say which dendrogram you would trust.",
          a: `<p><b>Single linkage</b> measures a cluster by its closest pair, so the chain is built link by link. Each merge joins the next 1-unit pair and the height stays near 1 until the far point is reached. The chain becomes one long cluster at a low height, and the outlier joins last at about 20. The tree has one tall final join and little structure below it, which is the chaining effect: a bridge of close points is enough to merge groups whose far ends are very different.</p>
<p><b>Average linkage</b> uses the mean of all cross-cluster distances. As the chain grows, the mean distance between the chain and the next point rises, so later merges sit higher and the tree opens out. A compact group of three still merges early, while a stretched group merges later. The outlier stays separate until the root.</p>
<p><b>Which to trust.</b> If the chain is a genuine elongated cluster, such as a road or a river, single linkage is right and average linkage may break it into pieces. If the chain is an artefact, such as points along a noisy sensor sweep, average linkage gives the more honest picture and is less driven by one close pair.</p>
<p>Practical call: plot both, and check whether the single-link joins match real adjacency in the data. With an outlier 20 units away, neither method hides it; it joins at the top, which is the signal that it may be noise rather than a cluster member.</p>`,
          marks: 7,
          diff: "hard"
        },
        {
          q: "You must cluster 500,000 records. Explain why the textbook agglomerative algorithm is a poor fit, and name two ways to make a hierarchy practical.",
          a: `<p>The naive algorithm keeps an n by n distance matrix and searches it at each of the n - 1 merges, which costs O(n³) time and O(n²) memory. At n = 500,000 the matrix alone holds 2.5 x 10<sup>11</sup> entries, far beyond memory, and the merge loop is worse. The method is built for hundreds or a few thousand objects, where the tree can be read by eye.</p>
<p>Two practical routes:</p>
<ul>
<li><b>Use an O(n²) algorithm for the linkage you need.</b> SLINK does single linkage in O(n²) time and O(n) space, and CLINK gives O(n²) time for complete linkage. That removes the cubic search but still needs a pass over pairs.</li>
<li><b>Reduce before you merge.</b> Cluster a sample, or pre-aggregate with a method such as BIRCH, then run the hierarchy on the summaries. Alternatively restrict merges with a connectivity graph built from k nearest neighbours, so only nearby groups are considered.</li>
</ul>
<p>If a flat partition is all the business needs, run k-means or DBSCAN on the full table and keep the hierarchy for a sample. The dendrogram is a presentation and exploration tool, not usually a serving model.</p>`,
          marks: 5,
          diff: "medium"
        }
      ]
    },
    {
      slug: "m5-density",
      title: "Density-Based Clustering: DBSCAN",
      sources: [
        "https://en.wikipedia.org/wiki/DBSCAN",
        "https://scikit-learn.org/stable/modules/clustering.html"
      ],
      blocks: [
        {
          type: "definition",
          text: "DBSCAN groups points in dense neighbourhoods and marks points in sparse regions as noise, without being told the number of clusters."
        },
        {
          type: "text",
          html: `<p><b>Density instead of distance to a centre.</b> A density-based method asks how many points sit close together. A cluster is a connected region where points are packed, and a sparse gap ends it. Nothing assumes a round shape, so a crescent, a ring or two interleaved spirals can be recovered. Points in the gaps belong to no cluster, and the method says so instead of forcing them somewhere.</p>
<p><b>Two parameters set the meaning of dense.</b></p>
<ul>
<li><b>eps (ε)</b> is the radius of the neighbourhood around a point.</li>
<li><b>MinPts</b> is the minimum number of points that neighbourhood must hold, counting the point itself.</li>
</ul>
<p><b>Three kinds of point follow from those two numbers.</b></p>
<ul>
<li><b>Core point:</b> at least MinPts points lie within eps of it, itself included. It can grow a cluster.</li>
<li><b>Border point:</b> fewer than MinPts in its own neighbourhood, but it lies inside the eps neighbourhood of a core point. It joins that cluster and cannot extend it.</li>
<li><b>Noise point:</b> neither core nor within reach of a core point. It stays outside every cluster.</li>
</ul>
<p>A point q is <b>directly density reachable</b> from p when q is within eps of p and p is a core point. Chain that relation through core points and q becomes density reachable. Two points are density connected when both are reachable from one core point, and that symmetric relation is what makes a cluster well defined.</p>
<p><b>Algorithm.</b></p>
<ol>
<li>Choose eps and MinPts.</li>
<li>Take an unvisited point and fetch its eps neighbourhood.</li>
<li>If the neighbourhood holds fewer than MinPts points, mark the point as noise for now.</li>
<li>Otherwise start a cluster, label the point core, and put its neighbours in a seed list.</li>
<li>For each seed, add it to the cluster. If it is itself core, add its neighbours to the seed list and keep expanding.</li>
<li>A point marked noise earlier becomes a border point if a core neighbourhood reaches it.</li>
<li>When the seed list empties, start again from an unvisited point until none are left.</li>
</ol>
<p><b>Choosing the numbers.</b> MinPts = 1 makes every point core, and MinPts of 2 collapses the method toward single-link clustering, so use at least 3. A common starting rule is MinPts at least D + 1 for D dimensions, with 2D used in practice. For eps, plot each point's distance to its k-th nearest neighbour, sort the values, and look for the knee; that distance is a reasonable eps. Too small an eps labels most points as noise, while too large an eps merges everything into one cluster.</p>
<p><b>What it is good at, and where it hurts.</b> It needs no k, finds arbitrary shapes, tolerates outliers because it has a noise label, and takes only two parameters. It struggles when densities differ across the data, because one eps and MinPts pair cannot be right for a tight cluster and a loose one. Border points can switch cluster if the input order changes. In high dimensions distance flattens until eps loses meaning. With a spatial index the average cost is about O(n log n), and without one it is O(n²).</p>`
        },
        {
          type: "code",
          lang: "python",
          html: `import numpy as np
from sklearn.cluster import DBSCAN

X = np.array([[1.0, 1.0], [1.1, 1.1], [0.9, 1.0], [1.0, 0.9],
              [6.0, 6.0], [6.1, 6.0], [6.0, 6.2],
              [12.0, 2.0]])
labels = DBSCAN(eps=0.5, min_samples=3).fit_predict(X)
print(labels)

# [0 0 0 0 1 1 1 -1]
# -1 means noise`
        },
        { type: "diagram", id: "dbscan-points" },
        {
          type: "example",
          html: `<p><b>A small run you can check by hand.</b> Seven points: P1(1,1), P2(1.5,1), P3(1,1.5), P4(1.5,1.5), P5(3,3), P6(5,5) and P7(1.6,2.2). Take eps = 0.8 and MinPts = 3.</p>
<table class="tbl">
<thead><tr><th>Point</th><th>Neighbours within 0.8, itself included</th><th>Count</th><th>Type</th></tr></thead>
<tbody>
<tr><td>P1 (1,1)</td><td>P1, P2, P3, P4</td><td>4</td><td>core</td></tr>
<tr><td>P2 (1.5,1)</td><td>P1, P2, P3, P4</td><td>4</td><td>core</td></tr>
<tr><td>P3 (1,1.5)</td><td>P1, P2, P3, P4</td><td>4</td><td>core</td></tr>
<tr><td>P4 (1.5,1.5)</td><td>P1, P2, P3, P4, P7</td><td>5</td><td>core</td></tr>
<tr><td>P5 (3,3)</td><td>P5</td><td>1</td><td>noise</td></tr>
<tr><td>P6 (5,5)</td><td>P6</td><td>1</td><td>noise</td></tr>
<tr><td>P7 (1.6,2.2)</td><td>P4, P7</td><td>2</td><td>border</td></tr>
</tbody></table>
<p><b>How to read it.</b> P1 to P4 each have at least three points inside 0.8, so they are core and one cluster grows from them. P7 has only two points in its own neighbourhood, so it cannot start a cluster, but it sits 0.707 from core point P4 and joins as a border point. P5 and P6 have no neighbour inside 0.8 and no core point reaches them, so both stay noise.</p>
<p><b>Result.</b> One cluster, {P1, P2, P3, P4, P7}, with P7 as border. P5 and P6 are noise. If eps rose to 2.2, P5 would fall inside reach of P4 and join the cluster, which shows how much the radius decides.</p>`
        },
        {
          type: "tip",
          html: `<p>Draw eps as a circle around one core point and put the neighbour count inside it, because a labelled sketch earns more than a paragraph. Define core, border and noise in that order, then state both parameters before the algorithm steps. In a comparison question, give the no-k, arbitrary-shape and noise-label strengths, then one limitation, since a one-sided answer caps the marks. Keep "directly density reachable" separate from plain "density reachable" in the definition.</p>`
        }
      ],
      practice: [
        {
          q: "With eps fixed, what happens to the noise count as MinPts rises? With MinPts fixed, what happens as eps falls? Explain both directions.",
          a: `<p><b>MinPts rises, eps fixed.</b> Each neighbourhood must hold more points to count as dense, so fewer points qualify as core. Some former core points become border or noise, clusters shrink, and the noise count rises. At a high enough MinPts almost every point fails the test and the whole set becomes noise.</p>
<p><b>eps falls, MinPts fixed.</b> Each neighbourhood covers less space, so it collects fewer points. Again fewer cores survive, clusters fragment, and noise rises. With a tiny eps every point is its own island and all are noise.</p>
<p>Both changes therefore push the same way, which is why the two parameters are tuned together. Raising MinPts while also raising eps can keep the cluster count steady, because the larger radius compensates for the stricter count. The k-distance plot is the useful diagnostic: the knee sets eps for a chosen MinPts, so the pair is read together.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A dataset holds a tight cluster of 100 points and a loose cluster of 100 points spread over ten times the area. Explain why one eps and MinPts pair cannot serve both, and give one remedy.",
          a: `<p>Density is points per area, so the loose cluster needs a larger eps to reach the same neighbour count. Set eps for the tight cluster and the loose one produces too few neighbours, so it becomes noise or breaks into fragments. Set eps for the loose cluster and the tight one becomes one dense blob, and any nearby group inside that radius is swallowed too. MinPts creates the same tension: a value that suits 100 tight points rejects the loose ones.</p>
<p>This is a global-threshold problem. DBSCAN assumes one density level across the data, so clusters at very different densities cannot both be described well.</p>
<p>Remedy: use a method that works across density scales, such as OPTICS or HDBSCAN, which build a hierarchy over eps instead of fixing one value. A cheaper fix is to run DBSCAN separately on subsets after a density estimate, or to transform the features so the densities become comparable. Report the route you took, because changing the method changes the cluster count.</p>`,
          marks: 5,
          diff: "hard"
        },
        {
          q: "A city collects 20,000 GPS reports of potholes. Most form clusters along roads, and some are one-off errors. Explain how you would set eps and MinPts, and how you would use the noise label.",
          a: `<p><b>Set MinPts first.</b> The data is two-dimensional, so a starting rule is MinPts at least D + 1 = 3, with 2D = 4 to 8 common in practice. A pothole cluster should need four or five separate reports before the city sends a repair crew, so MinPts = 5 is defensible on operational grounds rather than geometry alone.</p>
<p><b>Set eps from the data, not by guesswork.</b> Compute each report's distance to its 5th nearest neighbour, sort those distances, and plot them. The knee of that curve is a natural eps: below it, reports are close enough to count as neighbours, and above it the curve flattens into isolated points. In metres, this is the radius within which two reports describe the same stretch of road, so check the value against road width and GPS error.</p>
<p><b>Read the output.</b> Core points are reports with at least five neighbours inside eps, border points are fringe reports attached to a core, and noise points have no dense support. Clusters give candidate repair sites, and the core count gives an evidence weight.</p>
<p><b>Use the noise label carefully.</b> Do not delete noise rows. Route them to a review queue, because a real pothole on an empty road may have only one report. A report that stays noise across two eps settings is stronger evidence of an error than one that flips to border when eps grows by 10 percent. Keep the raw coordinates so a human can inspect the map before closing the report.</p>`,
          marks: 7,
          diff: "medium"
        }
      ]
    }
  ]
};
