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
          text: "Unsupervised learning finds patterns in data with no answer labels, and k-means groups points around the nearest mean, called a centroid."
        },
        {
          type: "text",
          html: `<h4>What unsupervised learning finds</h4>
<p>A supervised model learns from examples that include a target, or answer, column. An unsupervised model has none, so it looks for patterns in the feature matrix, the table of input values.</p>
<p>It may find groups, directions that explain variation, dense regions, or unusual rows. This module focuses on clustering.</p>
<h4>What counts as a cluster</h4>
<p><b>The method decides.</b> There is no single definition, so the family is large. The table shows the main models and one example of each.</p>
<table class="tbl">
<thead><tr><th>Cluster model</th><th>Idea</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Connectivity</td><td>Nearby objects belong together; distance decides the links.</td><td>Hierarchical clustering</td></tr>
<tr><td>Centroid</td><td>Each cluster is one mean vector, and members sit nearest to it.</td><td>K-means</td></tr>
<tr><td>Distribution</td><td>Clusters are draws from statistical distributions.</td><td>Gaussian mixture with EM</td></tr>
<tr><td>Density</td><td>Clusters are connected regions of high point density.</td><td>DBSCAN, OPTICS</td></tr>
<tr><td>Subspace</td><td>Clusters use only some of the features.</td><td>Biclustering</td></tr>
</tbody></table>
<h4>K-means, one pass at a time</h4>
<ol><li>Choose k, the number of groups, and place k starting centroids.</li><li>Assign each point to its nearest centroid.</li><li>Recalculate each centroid as the coordinate-wise mean of its assigned points.</li><li>Repeat assignment and recalculation until assignments stop changing. One full pass is an iteration or epoch.</li></ol>
<h4>What k-means minimises</h4>
<p>K-means minimises within-cluster sum of squares, also called inertia. For each point x, subtract its cluster centroid μ and square the distance. Then add across all points: J = Σ ||x - μ||².</p>
<p>Here x is a data point, μ is its assigned centroid, and J is the total squared error. The mean is the point that minimises squared distance, which is why the method uses squared Euclidean distance.</p>
<h4>Stopping and starting points</h4>
<p>Each pass keeps J the same or lowers it. There are only so many ways to assign the points, so the loop must stop. It often stops at a local minimum: a good answer, but not the best possible one.</p>
<p>A different starting seed can reach a different local minimum. K-means++ spreads the starting centres apart to reduce that risk.</p>
<p>The usual cost is O(n k d i). Here n is the number of points, k the number of clusters, d the number of features, and i the number of iterations. This cost makes k-means practical for large tables.</p>
<h4>Choosing k</h4>
<p>An elbow plot shows inertia for several values of k. Look for the bend where another cluster gives only a small reduction. Silhouette compares how close a point is to its own cluster with how close it is to the next one; scores range roughly from -1 to 1.</p>
<p>The gap statistic compares the clustering with a random reference dataset. Davies-Bouldin scores are lower when clusters are compact and separated. The elbow needs visual judgement, so support it with another measure.</p>
<h4>Limits to keep in mind</h4>
<p>K-means works best for convex groups of roughly equal size and similar spread. It can cut across two moons or a ring, because those shapes do not fit that assumption. Outliers pull the mean, categorical columns have no useful mean, and very different group sizes may be split to reduce error.</p>
<p>Scale features before clustering. Otherwise a feature measured in thousands can outweigh one measured in single digits, even when both matter.</p>`
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
          html: `<h4>Task from the Nov 2025 paper, Q19(a), 8 marks</h4><p>Cluster six points into two groups. Start with C1 = (1,6) and C2 = (6,2), then report memberships and updated centres after the first iteration. The points are D1(2,6), D2(3,8), D3(1,3), D4(5,4), D5(7,2) and D6(8,4).</p>
<h4>Distance: meaning, formula, substitution</h4><p>Euclidean distance is the straight-line gap between two points. In d(P,C), P is a data point and C is a centroid; x and y are their two coordinates. Formula: d(P,C) = √[(x<sub>P</sub> - x<sub>C</sub>)² + (y<sub>P</sub> - y<sub>C</sub>)²].</p>
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
<h4>Substitute one point</h4><p>For D2(3,8), the distance to C1 is √[(3-1)² + (8-6)²] = √8 = 2.828. Its distance to C2 is √[(3-6)² + (8-2)²] = √45 = 6.708. Since 2.828 is smaller, D2 joins C1.</p>
<h4>Recalculate both centroids</h4><p>Cluster 1 contains D1, D2 and D3. Its mean x is (2 + 3 + 1)/3 = 2, and its mean y is (6 + 8 + 3)/3 = 17/3 = 5.67.</p>
<p>Cluster 2 contains D4, D5 and D6. Its mean x is (5 + 7 + 8)/3 = 20/3 = 6.67, and its mean y is (4 + 2 + 4)/3 = 10/3 = 3.33.</p>
<h4>Result after iteration 1</h4><p>Cluster 1 is {D1, D2, D3} with centre (2, 5.67). Cluster 2 is {D4, D5, D6} with centre (6.67, 3.33).</p>
<h4>Check iteration 2</h4><p>D4 is the closest call in iteration 2. It is √(9 + 2.778) = 3.43 from the new C1 and 1.79 from C2, a margin of 1.64, so it stays with C2.</p><p>D3 is 2.85 from C1 and 5.68 from C2, a margin of 2.83. The other points also keep their groups, so the assignments have settled.</p>`
        },
        {
          type: "tip",
          html: `<h4>Show the working clearly</h4><p>Start with a distance table. Show both distances for every point, its assignment, and the recalculated centre. A final pair of centres alone does not show how you got there.</p><p>Label each pass as iteration 1 or iteration 2. Keep exact fractions such as 17/3 in the working and add the decimal value. For an 8-mark question, draw the six points and both centroids.</p>`
        }
      ],
      practice: [
        {
          q: "K-means minimises a sum of squared distances. Explain why putting features on different scales can change the groups it finds.",
          a: `<h4>Why scale matters</h4><p>The objective adds squared gaps across the features. A column with a wide numeric range can contribute far more error, so distance is dominated by that column and other features have little effect on assignments.</p>
<p>Income in rupees may range over lakhs, while age varies over decades. A difference of 20,000 in income can outweigh a difference of 2 years in age, regardless of their importance to the question.</p><p>Divide each column by its standard deviation or rescale it to 0 to 1. This makes feature scales more comparable and can change the partition.</p>
<p>Scaling changes the model's distances, so it can change the final groups. State the scaling method with your result.</p>`,
          marks: 3,
          diff: "medium"
        },
        {
          q: "Suppose the data has three natural groups, but you run k-means with k = 6. What partition might you see, and how could you tell that k is too large?",
          a: `<h4>What six centres may do</h4><p>With six centres for three natural groups, k-means can divide a group into smaller pieces. Several centroids may end up in the same dense region. A large group may split into two or three slices, while smaller groups may remain whole or split too.</p>
<h4>Evidence to check</h4>
<ul>
<li>Inertia keeps falling as k rises, so a low value proves nothing on its own. The elbow bends where extra clusters stop paying, and a k past the bend adds little.</li>
<li>Silhouette scores drop when points sit almost as close to a neighbouring cluster as to their own, which is what a forced split produces.</li>
<li>Two centroids land very close together, and a boundary runs through the middle of one blob.</li>
<li>Cluster sizes become small and similar while the data holds one large natural group.</li>
</ul>
<p>Run the model for several values of k. Compare silhouette or the gap statistic, inspect centroid separation, and ask whether the groups make sense for the problem.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "A retail chain has 40,000 loyalty customers. For each, it records annual spend, monthly visits, average basket value and months since the last purchase. Design a k-means segmentation study from preparation to reporting, and identify its main risk.",
          a: `<h4>1. Decide the purpose</h4><p>Choose the action the segments should support, such as selecting an offer or identifying customers to retain. This guides the features and the number of segments the business can use. Four to six segments may be a workable starting point.</p>
<h4>2. Prepare the features</h4><p>Inspect missing values and extreme spenders, because means are sensitive to outliers. If spend or basket values are skewed, consider a log or square-root transform. Scale all four features, for example with standardisation to mean 0 and standard deviation 1, or min-max scaling to 0 to 1.</p>
<h4>3. Choose k</h4><p>Fit k = 2 to 10 and plot inertia to look for an elbow. Compare average silhouette and the gap statistic as well. Nearly coincident centres may suggest too many clusters; favour a small k whose groups have useful interpretations.</p>
<h4>4. Fit and check stability</h4><p>Run several starting seeds and retain the lowest-inertia result to reduce the effect of local minima. Hold out a sample, assign each customer to the nearest centre, and check whether the cluster profiles remain stable. Name groups from their centroids, such as frequent small-basket or lapsed high-spend customers, and report their sizes.</p>
<h4>5. Report and question the result</h4><p>Report centroid values in original units, customer counts, revenue shares, an action for each group, and the k-selection diagnostic. K-means can divide a continuous spread into artificial groups because it favours convex, similarly sized clusters under squared Euclidean distance.</p><p>Different reasonable scaling choices can move customers between clusters. Check the segments against an outside variable, such as next-quarter spend, before using them in campaigns.</p>`,
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
          text: "A distance measure turns two data objects into one number, small when they are alike, so clustering can compare rows."
        },
        {
          type: "text",
          html: `<h4>Choose what similarity means</h4><p>A clustering algorithm compares objects through the number produced by a distance or similarity measure. Two rows may be close under Euclidean distance but far apart under cosine similarity. Choose the measure to match the data type before choosing the clustering algorithm.</p>
<h4>Minkowski distance unifies numeric measures</h4><p>Minkowski distance of order p is D<sub>p</sub>(x,y) = (Σ |x<sub>i</sub> - y<sub>i</sub>|<sup>p</sup>)<sup>1/p</sup>. Here x and y are the objects, x<sub>i</sub> and y<sub>i</sub> are their values on feature i, and p controls how gaps count.</p><p>At p = 1 it is Manhattan distance; at p = 2 it is Euclidean distance. As p grows without bound, the largest coordinate gap dominates, giving Chebyshev or chessboard distance.</p>
<table class="tbl">
<thead><tr><th>Measure</th><th>Formula and behaviour</th><th>Reach for it when</th></tr></thead>
<tbody>
<tr><td>Manhattan (L1)</td><td>Σ|x<sub>i</sub> - y<sub>i</sub>|<br>Adds the gaps along each axis, like a grid path.</td><td>Features are sparse or high-dimensional, or outliers should not dominate.</td></tr>
<tr><td>Euclidean (L2)</td><td>√Σ(x<sub>i</sub> - y<sub>i</sub>)²<br>Straight-line distance, so large gaps count more.</td><td>Dense continuous features on a comparable scale. Default for k-means.</td></tr>
<tr><td>Chebyshev (L∞)</td><td>max |x<sub>i</sub> - y<sub>i</sub>|<br>Only the worst single coordinate counts.</td><td>The largest mismatch is what matters, as in a king move or a tolerance check.</td></tr>
<tr><td>Minkowski, general p</td><td>(Σ|x<sub>i</sub> - y<sub>i</sub>|<sup>p</sup>)<sup>1/p</sup><br>A dial between the three named cases.</td><td>You want to tune how strongly big gaps are penalised.</td></tr>
</tbody></table>
<h4>When common measures help</h4><p>Manhattan distance adds absolute gaps rather than squared gaps. A single large difference has less influence than it has under Euclidean distance. This can help with sparse vectors, where most coordinates are zero.</p>
<h4>Jaccard for sets and presence</h4><p>Jaccard similarity is J(A,B) = |A ∩ B| / |A ∪ B|. The intersection is what both sets contain; the union is everything in either set. J ranges from 0 for disjoint sets to 1 for identical sets, and ignores joint absence.</p><p>It suits baskets, tags, and presence data because two people both not buying an item does not show shared taste.</p><p>Two three-item baskets with two shared items score 2/4 = 0.5. For 1,000 products, the simple matching coefficient counts 996 products neither customer bought and reports 0.998, hiding the difference. Jaccard distance is 1 - J.</p>
<h4>Cosine for document direction</h4><p>Cosine similarity compares vector direction: cos θ = (A · B) / (||A|| ||B||). A and B are vectors, the dot is their dot product, and each norm || || is vector length.</p><p>Dividing by length lets a short note and a longer article on the same topic score near 1. For non-negative word counts, cosine lies from 0 to 1.</p><p>Text mining represents each document with term-frequency or TF-IDF values and can cluster with cosine. Cosine distance is 1 - cos θ. It is not a true metric because it can violate the triangle inequality.</p>
<h4>Match the measure to the data</h4><p>Use scaled Euclidean distance for dense numeric features, Manhattan for sparse or outlier-heavy numeric data, Jaccard for sets or presence, and cosine for text counts. Mahalanobis distance can account for correlated features measured in different units. In a calculation, write the formula before substituting values.</p>`
        },
        {
          type: "example",
          html: `<h4>Nov 2025, Q10, 3 marks</h4><p>For A(5,8,11) and B(1,2,7), find Manhattan and Euclidean distance. The coordinate differences are (5-1, 8-2, 11-7) = (4, 6, 4). In each formula, i identifies a coordinate and Σ means add across coordinates.</p>
<p>Manhattan distance adds the absolute coordinate gaps: Σ|A<sub>i</sub> - B<sub>i</sub>| = |4| + |6| + |4| = 14.</p>
<p>Euclidean distance is the straight-line gap: √Σ(A<sub>i</sub> - B<sub>i</sub>)² = √(4² + 6² + 4²) = √(16 + 36 + 16) = √68 = 8.246, about 8.25.</p>
<h4>Dec 2023, Q10, 3 marks</h4><p>For A(12,3,9) and B(6,5,15), find city-block, chessboard and Euclidean distance. The coordinate differences are (12-6, 3-5, 9-15) = (6, -2, -6), with absolute values 6, 2, 6.</p>
<p>City-block, also called Manhattan, adds absolute gaps: Σ|A<sub>i</sub> - B<sub>i</sub>| = 6 + 2 + 6 = 14. Chessboard, also called Chebyshev, takes the largest gap: max|A<sub>i</sub> - B<sub>i</sub>| = max(6, 2, 6) = 6.</p>
<p>Euclidean is the straight-line gap: √Σ(A<sub>i</sub> - B<sub>i</sub>)² = √(36 + 4 + 36) = √76 = 8.718, about 8.72.</p>
<h4>Compare the answers</h4><p>Both pairs have Manhattan distance 14. The Nov 2025 gaps (4, 6, 4) are more evenly spread and their squares sum to 68. The Dec 2023 gaps (6, 2, 6) put more of the difference on two axes, so the squares sum to 76 and the Euclidean distance is greater.</p>`
        },
        {
          type: "tip",
          html: `<h4>Present distance calculations</h4><p>Name the distance and write its formula. List the coordinate differences, substitute them, and then give the answer. Keep negative signs inside brackets and use absolute values where the formula requires them.</p><p>Show the exact square-root form as well as a rounded value, for example √68 = 8.25 to two decimal places. This makes the calculation easier to check than a bare number.</p>`
        }
      ],
      practice: [
        {
          q: "Two documents are represented by word-count vectors. Why might cosine similarity be useful, and when could its score be misleading?",
          a: `<h4>Why compare directions?</h4><p>Cosine compares vector direction rather than length. If a 200-word note and a 4,000-word report use words in similar proportions, their vectors point in similar directions and cosine is near 1. Euclidean distance would also reflect their difference in length.</p>
<p>Word-count vectors often have many coordinates but few non-zero entries. Sparse calculations can use those entries, and for non-negative counts the cosine score runs from 0 to 1.</p>
<h4>Where the score can mislead</h4>
<ul>
<li><b>Shared function words.</b> Two documents that both repeat "the", "of" and "and" score high on raw counts. Stop-word removal or TF-IDF weighting removes most of that.</li>
<li><b>Opposite meaning, same words.</b> A review and a reply that quotes it share vocabulary and score high, although the stance is opposite. Cosine sees words, not negation.</li>
<li><b>Very short texts.</b> A one-word query and a document containing only that word can score 1 even though they provide little context.</li>
</ul>
<p>Use cosine with TF-IDF weighting, and do not read a high score as agreement in a sentiment task.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "Customer A buys {bread, milk, eggs}; customer B buys {bread, milk, butter}. Of 1,000 products, calculate their Jaccard similarity and distance. Why is the simple matching coefficient less useful for comparing these baskets?",
          a: `<h4>Count shared and combined items</h4><p>The intersection A ∩ B contains items in both baskets: {bread, milk}, size 2. The union A ∪ B contains items in either basket: {bread, milk, eggs, butter}, size 4.</p>
<p>J(A,B) = |A ∩ B| / |A ∪ B| = 2/4 = 0.5, so the Jaccard distance is 1 - 0.5 = 0.5.</p>
<p>For the simple matching coefficient on 1,000 binary product attributes: M11 = 2, M10 = 1, M01 = 1, and M00 = 1,000 - 4 = 996. SMC = (M11 + M00) / 1,000 = 998/1,000 = 0.998.</p>
<p>The SMC calls the two customers almost identical because both failed to buy the same 996 products. Absence is not evidence of similar taste in a sparse catalogue, and almost every pair would score above 0.99. Jaccard drops M00 and measures what the baskets share against what either bought, which is the question a recommendation task actually asks.</p>
<p>Use the SMC only when 0 and 1 carry equal information, such as a symmetric yes/no attribute where both answers are meaningful.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "How does the Minkowski formula relate Manhattan, Euclidean and chessboard distances? Write the formula and explain each case.",
          a: `<h4>One family of distances</h4><p>Minkowski combines coordinate gaps into one distance. For points x and y in n dimensions, D<sub>p</sub>(x,y) = (Σ |x<sub>i</sub> - y<sub>i</sub>|<sup>p</sup>)<sup>1/p</sup>. Here i identifies a coordinate, Σ adds across coordinates, and p is at least 1.</p>
<ul><li>For p = 1, D<sub>1</sub> = Σ |x<sub>i</sub> - y<sub>i</sub>|: Manhattan, or city-block, adds absolute gaps.</li><li>For p = 2, D<sub>2</sub> = √Σ (x<sub>i</sub> - y<sub>i</sub>)²: Euclidean gives straight-line distance.</li><li>As p approaches infinity, D<sub>∞</sub> = max |x<sub>i</sub> - y<sub>i</sub>|: Chebyshev, or chessboard, uses the largest coordinate gap.</li></ul>`,
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
          text: "Agglomerative clustering starts with one cluster per point, then repeatedly joins the closest clusters. A dendrogram is a tree that records those joins."
        },
        {
          type: "text",
          html: `<h4>Build a hierarchy</h4><p>Hierarchical clustering produces a tree of nested groupings. You can cut the tree at a chosen height to select a partition. Agglomerative clustering builds upward from individual points; divisive clustering starts with one group and splits it.</p>
<h4>Agglomerative steps</h4>
<ol>
<li>Treat each object as its own cluster and compute the pairwise distance matrix.</li>
<li>Find the smallest distance between any two clusters.</li>
<li>Merge that pair and record the distance as the height of the new node.</li>
<li>Update the matrix: replace the two rows and columns with one row and column for the new cluster.</li>
<li>Repeat until one cluster remains, or until the required number of clusters is reached.</li>
</ol>
<h4>Choose a linkage rule</h4><p>Linkage tells you how to calculate distance between two groups. For single, complete and average linkage, d(a,b) is the distance between point a in one group and point b in the other. The rule determines the updated matrix entries.</p>
<table class="tbl">
<thead><tr><th>Linkage</th><th>Distance between clusters</th><th>Shape it finds</th><th>Weakness</th></tr></thead>
<tbody>
<tr><td>Single (nearest neighbour)</td><td>min d(a,b) across the two clusters</td><td>Elongated and irregular groups</td><td>Chaining: one close pair can bridge two real clusters.</td></tr>
<tr><td>Complete (farthest neighbour)</td><td>max d(a,b)</td><td>Compact groups of similar diameter</td><td>One distant point inflates the distance.</td></tr>
<tr><td>Average (UPGMA)</td><td>mean of all cross-cluster pairs</td><td>Compact groups, as a compromise</td><td>Still biased toward globular clusters.</td></tr>
<tr><td>Ward</td><td>pair that adds the least within-cluster variance</td><td>Even, compact groups</td><td>Needs squared Euclidean distance.</td></tr>
</tbody></table>
<h4>Read a dendrogram</h4><p>The leaves at height 0 represent individual objects. Each horizontal bar records the distance at which two groups merge: a low join indicates greater similarity than a high join. Draw a horizontal cut and count the branches it crosses to find the number of clusters.</p><p>A large gap between merge heights can suggest where to cut. The groups below the gap joined at smaller distances than the next merge.</p>
<h4>Cost and chaining</h4><p>The textbook method takes O(n³) time and O(n²) memory because it repeatedly searches and updates an n by n distance matrix. Here n is the number of objects. SLINK performs single linkage in O(n²) time, while CLINK performs complete linkage in O(n²) time.</p><p>Single linkage can create a long chain when a thin bridge of points connects otherwise separate groups. Complete linkage resists this bridge, but one distant point can increase its merge height.</p>`
        },
        { type: "diagram", id: "dendrogram" },
        {
          type: "example",
          html: `<h4>Task from the Dec 2023 paper, Q19(a), 8 marks</h4><p>The paper gives this distance matrix for six objects and asks for single-linkage clustering and a dendrogram.</p>
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
<h4>Merge 1: D and F</h4><p>The smallest entry is 0.50, so join D and F at height 0.50. Single linkage uses the smallest distance from any member of the new cluster to the other group.</p><p>For {D,F}, the updated distances are: to A min(3.61, 3.20) = 3.20; to B min(2.92, 2.50) = 2.50; to C min(2.24, 2.50) = 2.24; and to E min(1.00, 1.12) = 1.00.</p>
<h4>Merge 2: A and B</h4><p>The next smallest distance is 0.71, so join A and B at height 0.71. From {A,B}, the distances are: to C min(5.66, 4.95) = 4.95; to E min(4.24, 3.54) = 3.54; and to {D,F} min(3.20, 2.50) = 2.50.</p>
<h4>Merge 3: E and {D,F}</h4><p>The smallest remaining distance is 1.00, so join E to {D,F} at height 1.00. From {D,E,F}, the distance to C is min(2.24, 1.411, 2.50) = 1.411, and to {A,B} it is min(3.61, 2.92, 4.24, 3.54, 3.20, 2.50) = 2.50.</p>
<h4>Merge 4: C and {D,E,F}</h4><p>Join C to {D,E,F} at the smallest remaining distance, 1.411. The new cluster's distance to {A,B} is min(4.95, 2.50) = 2.50.</p>
<h4>Merge 5: the final groups</h4><p>Only two groups remain, so join {A,B} with {C,D,E,F} at 2.50. All objects are now in one cluster.</p>
<table class="tbl">
<thead><tr><th>Merge</th><th>Pair</th><th>Height</th></tr></thead>
<tbody>
<tr><td>1</td><td>D + F</td><td>0.50</td></tr>
<tr><td>2</td><td>A + B</td><td>0.71</td></tr>
<tr><td>3</td><td>E + {D,F}</td><td>1.00</td></tr>
<tr><td>4</td><td>C + {D,E,F}</td><td>1.411</td></tr>
<tr><td>5</td><td>{A,B} + {C,D,E,F}</td><td>2.50</td></tr>
</tbody></table>
<h4>Draw the dendrogram</h4><p>Put A, B, C, D, F, E along the base. Join D and F at 0.50; attach E at 1.00 and C at 1.411. Join A and B at 0.71, then connect the two branches at 2.50. The page diagram shows this tree.</p>`
        },
        {
          type: "tip",
          html: `<h4>Show each merge</h4><p>State the smallest distance and the linkage rule before each merge. Show the updated matrix so a reader can follow the next choice. For single linkage, take the smallest distance between members of the two groups.</p><p>List the merge heights and arrange leaves so each cluster forms a continuous branch. Label the height axis on the dendrogram.</p>`
        }
      ],
      practice: [
        {
          q: "What does a dendrogram's vertical axis show? Explain how gaps between joins can guide your choice of cluster count.",
          a: `<h4>Read the height</h4><p>The vertical axis gives the distance at which groups merge. Leaves start at 0; low bars join relatively similar groups and high bars join more dissimilar groups. For the linkage methods discussed here, merge heights do not decrease as you move up the tree.</p>
<h4>Choose a cut</h4><p>A large gap between merge heights suggests a jump in dissimilarity. Cutting within that gap keeps the groups formed below it apart. Count the branches crossed by the cut to obtain k, the number of groups.</p>
<p>For joins at 0.50, 0.71, 1.00, 1.411 and 2.50, a cut at 1.2 gives {A,B}, {C} and {D,E,F}. The widest gap is 1.411 to 2.50; a cut there gives two groups.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "Six points form a rough chain, about 1 unit between neighbours; a seventh is 20 units from its nearest point. Compare single and average linkage and explain which tree you would trust.",
          a: `<h4>Single linkage</h4><p>Single linkage uses the closest cross-cluster pair. It joins the chain through neighbouring points at heights near 1, then attaches the distant point at about 20. This is chaining: short links can join endpoints that are far apart.</p>
<h4>Average linkage</h4><p>Average linkage uses the mean of all distances between the two groups. Distances across a stretched chain can raise later merge heights, while a compact group tends to join earlier. The distant point remains separate until a high merge.</p>
<h4>Which tree helps?</h4><p>If the chain represents a real elongated feature such as a road or river, single linkage can preserve it. If it is a noisy bridge between groups, average linkage may better reflect the separation. Plot both trees and check whether the links match real adjacency.</p><p>The point 20 units away joins high in either tree. Investigate it as a possible outlier rather than assuming it is an error.</p>`,
          marks: 7,
          diff: "hard"
        },
        {
          q: "You need to group 500,000 records. Why is textbook agglomerative clustering difficult at this size? Give two ways to make a hierarchy more practical.",
          a: `<h4>Why the textbook method is costly</h4><p>For n records, the naive method keeps an n by n distance matrix and searches it through n - 1 merges. That costs O(n³) time and O(n²) memory. At n = 500,000, the matrix contains 2.5 x 10<sup>11</sup> entries, and the tree itself is hard to inspect.</p>
<h4>Ways to reduce the work</h4>
<ul>
<li><b>Use an O(n²) algorithm for the linkage you need.</b> SLINK does single linkage in O(n²) time and O(n) space, and CLINK gives O(n²) time for complete linkage. That removes the cubic search but still needs a pass over pairs.</li>
<li><b>Reduce before you merge.</b> Cluster a sample, or pre-aggregate with a method such as BIRCH, then run the hierarchy on the summaries. Alternatively restrict merges with a connectivity graph built from k nearest neighbours, so only nearby groups are considered.</li>
</ul>
<p>If the goal is only a flat grouping, consider k-means or DBSCAN for the full dataset and use a hierarchy to explore a sample. The dendrogram helps presentation and exploration.</p>`,
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
          text: "DBSCAN joins points in dense neighbourhoods and labels unsupported points as noise. You do not need to specify the number of clusters."
        },
        {
          type: "text",
          html: `<h4>DBSCAN groups nearby points by density</h4><p>Imagine drawing a small circle around each point and counting the points inside. A dense patch has many nearby points, while a sparse gap separates patches. DBSCAN grows clusters through connected dense regions, so it can find crescents, rings, or interleaved spirals. Points without dense support receive a noise label.</p>
<p><b>Two parameters set the meaning of dense.</b></p>
<ul>
<li><b>eps (ε)</b> is the radius of the neighbourhood around a point.</li>
<li><b>MinPts</b> is the minimum number of points that neighbourhood must hold, counting the point itself.</li>
</ul>
<h4>Core, border, and noise points</h4><p>The two settings classify each point into one of three types:</p>
<ul>
<li><b>Core point:</b> at least MinPts points lie within eps of it, itself included. It can grow a cluster.</li>
<li><b>Border point:</b> fewer than MinPts in its own neighbourhood, but it lies inside the eps neighbourhood of a core point. It joins that cluster and cannot extend it.</li>
<li><b>Noise point:</b> neither core nor within reach of a core point. It stays outside every cluster.</li>
</ul>
<p>Point q is <b>directly density reachable</b> from p if q is within eps of p and p is a core point. Repeating this link through core points makes q density reachable. Two points are density connected if both are reachable from a shared core point; this relation defines cluster membership.</p>
<h4>DBSCAN growth procedure</h4>
<ol>
<li>Choose eps and MinPts.</li>
<li>Take an unvisited point and fetch its eps neighbourhood.</li>
<li>If the neighbourhood holds fewer than MinPts points, mark the point as noise for now.</li>
<li>Otherwise start a cluster, label the point core, and put its neighbours in a seed list.</li>
<li>For each seed, add it to the cluster. If it is itself core, add its neighbours to the seed list and keep expanding.</li>
<li>A point marked noise earlier becomes a border point if a core neighbourhood reaches it.</li>
<li>When the seed list empties, start again from an unvisited point until none are left.</li>
</ol>
<h4>Choose eps and MinPts</h4><p>MinPts = 1 makes every point core. MinPts = 2 makes DBSCAN behave much like single-link clustering, so a common minimum is 3. For D features, a starting rule is MinPts at least D + 1; in practice, 2D is also used.</p><p>To choose eps, find each point's distance to its k-th nearest neighbour, sort those distances, and look for a bend, or knee. That value is a useful radius to test. Too small an eps marks many points as noise; too large an eps can merge clusters.</p>
<h4>Strengths and limits</h4><p>DBSCAN needs no cluster count, can find irregular shapes, and can leave outliers as noise. It struggles when clusters have different densities, because one eps and MinPts pair must serve all of them. Border assignments can also depend on input order.</p><p>In high dimensions, distances become less distinct and eps loses meaning. With a spatial index, average cost is about O(n log n); without one, it is O(n²).</p>`
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
          html: `<h4>Worked example with seven points</h4><p>Consider P1(1,1), P2(1.5,1), P3(1,1.5), P4(1.5,1.5), P5(3,3), P6(5,5) and P7(1.6,2.2). Use eps = 0.8 and MinPts = 3.</p>
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
<h4>Count first, then classify</h4><p>P1 to P4 each have at least three points within 0.8, including themselves, so each is core. These core points connect into one cluster. P7 counts only itself and P4, but it is 0.707 from core point P4, so it joins as a border point.</p><p>P5 and P6 have no other point within 0.8 and no core point reaches them. Both are noise.</p>
<h4>Final result</h4><p>The cluster is {P1, P2, P3, P4, P7}, with P7 on the border; P5 and P6 are noise. If eps increases to 2.2, P5 falls within reach of P4 and joins the cluster. This illustrates the effect of the radius.</p>`
        },
        {
          type: "tip",
          html: `<h4>Explain with a sketch</h4><p>Draw an eps circle around a core point and label its neighbour count. State eps and MinPts, then define core, border and noise points before listing the algorithm. Distinguish directly density reachable from density reachable through a chain.</p><p>When comparing methods, mention DBSCAN's ability to find irregular shapes and label noise without setting k. Include a limitation, such as sensitivity to varying densities.</p>`
        }
      ],
      practice: [
        {
          q: "If eps stays fixed, how does increasing MinPts affect noise? If MinPts stays fixed, what happens when eps decreases? Explain why.",
          a: `<h4>Increase MinPts</h4><p>With eps fixed, each neighbourhood must contain more points for its centre to qualify as core. Some former core points become border or noise, so the noise count can rise or stay the same. If MinPts exceeds all neighbourhood counts, every point is noise.</p>
<h4>Decrease eps</h4><p>With MinPts fixed, a smaller radius contains no more points than the old radius. Fewer points may qualify as core, clusters can split, and the noise count can rise or remain unchanged. If MinPts is greater than 1 and each point is isolated, all points are noise.</p>
<h4>Tune the pair together</h4><p>A larger radius can offset a higher neighbour threshold, although it does not guarantee the same clusters. Use a k-distance plot for a chosen MinPts and test an eps near the knee.</p>`,
          marks: 5,
          diff: "medium"
        },
        {
          q: "One cluster contains 100 tightly packed points; another has 100 points spread over ten times the area. Why can a single eps and MinPts pair be troublesome, and what could you do?",
          a: `<h4>The density mismatch</h4><p>The loose group has fewer points per unit area, so it may need a larger eps to collect the same number of neighbours. An eps suited to the tight group can split the loose group or label its points noise. A larger eps may instead connect the tight group to nearby groups.</p>
<p>MinPts creates a similar trade-off. DBSCAN uses one global density threshold, which can make very different densities hard to recover together.</p>
<h4>Possible remedies</h4><p>Try OPTICS or HDBSCAN, which examine structure across density scales rather than using one fixed eps in the same way. Alternatively estimate density and run DBSCAN on subsets, or consider a feature transformation. Report the approach because it can change the groups found.</p>`,
          marks: 5,
          diff: "hard"
        },
        {
          q: "A city has 20,000 GPS pothole reports. Many lie along roads and some are isolated errors. Describe how to choose eps and MinPts and how to handle the noise label.",
          a: `<h4>Start with MinPts</h4><p>There are D = 2 geographic dimensions. The starting rule D + 1 gives 3 and 2D gives 4; values from 4 to 8 can also be tested. The city might choose MinPts = 5 if it wants several reports to support a potential repair site; the point itself counts toward five.</p>
<h4>Estimate eps</h4><p>Plot sorted distances to the 5th nearest neighbour and inspect the knee for a candidate radius. Check the neighbour convention: if MinPts includes the point itself but the plot counts only other points, the fourth other neighbour corresponds to a count of five. Check the radius in metres against road width and GPS error.</p>
<h4>Interpret and review</h4><p>A core report has at least five reports in its eps neighbourhood, including itself. Border reports attach to a core; noise reports lack dense support. Clusters suggest candidate repair sites, and the number of core reports can help summarise support.</p><p>Keep noise reports for review: a genuine pothole on a quiet road may have only one report. Compare labels across two eps settings, including an increase of 10 percent, and retain the raw coordinates for a person to inspect. A stable noise label alone does not prove an error.</p>`,
          marks: 7,
          diff: "medium"
        }
      ]
    }
  ]
};
