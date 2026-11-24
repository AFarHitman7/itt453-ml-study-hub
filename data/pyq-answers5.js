/* Module 5: answers to the original examination questions. */
window.ML_PYQ_ANSWERS = window.ML_PYQ_ANSWERS || {};
(() => {
  const clustering = 'https://scikit-learn.org/stable/modules/clustering.html';
  const linkageSource = 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.cluster.hierarchy.linkage.html';
  const theory = (html, diagrams = []) => ({kind: 'theory', html, sources: [clustering], diagrams});
  const worked = (html, sources = [clustering]) => ({kind: 'worked', html, sources, diagrams: []});
  const number = n => Number(n.toFixed(3)).toString();
  const table = (headers, rows) => `<div class='table-wrap'><table><thead><tr>${headers.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  const similarity = theory(`<p>Two measures used to compare objects for clustering are:</p><ol><li><b>Euclidean distance:</b> d(x,y) = √Σ(xᵢ − yᵢ)². Smaller distance means more similar numerical observations.</li><li><b>Cosine similarity:</b> cos(x,y) = (x · y)/(‖x‖‖y‖), for nonzero vectors. A value nearer 1 indicates more similar directions.</li></ol>`);
  const density = theory(`<p>Density-based clustering groups points in dense regions separated by sparse regions. It can find curved or irregular clusters without assuming spherical shapes.</p><p>In DBSCAN, ε is the neighbourhood radius and MinPts is the minimum number of points in that neighbourhood, including the point itself. A core point has at least MinPts neighbours; a border point is near a core point but is not core; a point belonging to neither is noise.</p><p>Start from an unvisited core point and expand through density-connected core points, attaching their border points. Repeat for other unvisited cores. Results depend on ε and MinPts; one global setting may struggle with differing cluster densities.</p>`);
  const kmAlgorithm = `<p>K-means partitions numerical points into K groups around their means. Choose K and initial centroids, assign each point to its nearest centroid, then recompute each centroid as the coordinate-wise mean of its members. Repeat assignment and update until the memberships or centroids stabilize.</p><p>For example, with K = 2, points 1, 2, 8, 9 and initial centroids 1 and 9, assignment gives {1,2} and {8,9}; updated centroids are 1.5 and 8.5. Reassignment does not change these groups.</p>`;
  const dbPoints = `<p>Density-based clustering connects dense regions and treats isolated points as noise. In the illustration, ε is the neighbourhood radius and MinPts counts the point itself.</p><ul><li><b>Core:</b> has at least MinPts points in its ε-neighbourhood.</li><li><b>Border:</b> is not core but lies within ε of a core point.</li><li><b>Noise:</b> is neither core nor within ε of any core point.</li><li><b>Directly density reachable:</b> point p is within ε of core point q. This relation need not hold in the reverse direction if p is not core.</li></ul>`;
  const linkageMethods = `<p>Agglomerative clustering starts with one cluster per item and repeatedly merges the closest pair. A linkage rule defines distance between two clusters U and V.</p><ul><li><b>Single:</b> minimum distance between a point in U and a point in V; can join elongated clusters but is prone to chaining.</li><li><b>Complete:</b> maximum such distance; favours compact groups and is sensitive to distant points.</li><li><b>Average:</b> mean of all |U| × |V| cross-cluster pair distances. Cluster sizes matter when updating the mean.</li><li><b>Centroid:</b> distance between cluster means for vector data.</li><li><b>Ward:</b> chooses the merge producing the smallest increase in within-cluster squared error, using Euclidean geometry.</li></ul>`;
  function distances(a, b, kind) {
    const diff = a.map((x, i) => Math.abs(x - b[i]));
    const steps = [`<li>Subtract coordinates and take absolute values: (${a.join(', ')}) and (${b.join(', ')}) give (${diff.join(', ')}).</li>`];
    if (kind.includes('city')) steps.push(`<li>Manhattan or city block distance is Σ|xᵢ − yᵢ| = ${diff.join(' + ')} = ${number(diff.reduce((x,y) => x+y,0))}.</li>`);
    if (kind.includes('chess')) steps.push(`<li>Chessboard distance is maxᵢ |xᵢ − yᵢ| = max(${diff.join(', ')}) = ${Math.max(...diff)}.</li>`);
    if (kind.includes('euclid')) steps.push(`<li>Euclidean distance is √Σ(xᵢ − yᵢ)² = √(${diff.map(x => x + '²').join(' + ')}) = √${diff.reduce((s,x) => s+x*x,0)} ≈ ${number(Math.hypot(...diff))}.</li>`);
    steps.push('<li>These distances are dissimilarities: zero means identical coordinates.</li>');
    return worked(`<p>Compare the corresponding coordinates of the two points.</p><ol>${steps.join('')}</ol>`);
  }
  function kmeans(points, initial, rounds) {
    let centers = initial.map(c => c.slice());
    const labels = points.map((_, i) => (points.length === 6 ? 'D' : 'A') + (i+1));
    let html = `<p>Use Euclidean distance d((x,y),(a,b)) = √((x − a)² + (y − b)²). Assign each point to its nearest current centre, then average coordinates. Values in tables are rounded to three decimals; assignment uses unrounded distances.</p><ol>`;
    for (let r=1;r<=rounds;r++) {
      const groups = centers.map(() => []);
      const rows = points.map((p,i) => {
        const ds = centers.map(c => Math.hypot(p[0]-c[0],p[1]-c[1]));
        const j = ds.indexOf(Math.min(...ds)); groups[j].push(i);
        return [labels[i] + ' (' + p.join(',') + ')', ...ds.map(number), 'C' + (j+1)];
      });
      html += `<li><b>Round ${r}: assign.</b> Centres: ${centers.map((c,i) => 'C'+(i+1)+' = ('+c.map(number).join(', ')+')').join('; ')}. For example, d(${labels[0]}, C1) = √((${points[0][0]} − ${number(centers[0][0])})² + (${points[0][1]} − ${number(centers[0][1])})²) = ${number(Math.hypot(points[0][0]-centers[0][0],points[0][1]-centers[0][1]))}. ${table(['Point',...centers.map((_,i) => 'd to C'+(i+1)),'Nearest'],rows)}</li>`;
      const next = groups.map(g => [0,1].map(axis => g.reduce((s,i) => s+points[i][axis],0)/g.length));
      html += `<li><b>Round ${r}: update.</b> Mean = (sum of x coordinates / size, sum of y coordinates / size). ${groups.map((g,i) => `C${i+1}: {${g.map(j => labels[j]).join(', ')}}; (${g.map(j=>points[j][0]).join(' + ')}, ${g.map(j=>points[j][1]).join(' + ')}) / ${g.length} = (${next[i].map(number).join(', ')})`).join('; ')}.</li>`;
      centers = next;
    }
    html += `<li><b>Result after ${rounds} assignment/update round${rounds===1?'':'s'}:</b> use the memberships and updated centres in the last step above. Do not continue to convergence unless requested.</li></ol>`;
    return worked(html);
  }
  function hierarchy(names, matrix, methods, intro = '') {
    const n=names.length;
    let html = `<p>${intro} Start with singleton clusters. Merge the pair with minimum cluster distance, updating distances after each merge. For equal minima, choose the lexicographically first pair of sorted cluster labels; another tie choice can give a different valid tree.</p>`;
    html += table(['Item',...names],names.map((name,i) => [name,...matrix[i].map(number)]));
    html += `<p>Single uses the minimum cross-pair distance, complete uses the maximum, and average uses the mean over all cross-pairs. Thus d(U∪V,W) for average is (|U|d(U,W)+|V|d(V,W))/(|U|+|V|).</p><ol>`;
    methods.forEach(method => {
      let clusters=names.map((name,i)=>({members:[i], label:name, x:40+i*65, y:210}));
      let lines='', text='', history=[];
      const dist=(a,b)=>{const values=a.members.flatMap(i=>b.members.map(j=>matrix[i][j])); return method==='single'?Math.min(...values):method==='complete'?Math.max(...values):values.reduce((s,x)=>s+x,0)/values.length;};
      const scale=Math.max(...matrix.flat());
      while(clusters.length>1) {
        clusters.sort((a,b)=>a.label.localeCompare(b.label));
        let candidates=[];
        for(let i=0;i<clusters.length;i++) for(let j=i+1;j<clusters.length;j++) candidates.push({a:clusters[i],b:clusters[j],d:dist(clusters[i],clusters[j])});
        candidates.sort((x,y)=>x.d-y.d || x.a.label.localeCompare(y.a.label) || x.b.label.localeCompare(y.b.label));
        const {a,b,d}=candidates[0], cross=a.members.flatMap(i=>b.members.map(j=>matrix[i][j]));
        const members=a.members.concat(b.members).sort((i,j)=>i-j), label=members.map(i=>names[i]).join('');
        const y=210-175*d/scale, x=(a.x+b.x)/2;
        lines += `<path d='M ${a.x} ${a.y} V ${y} H ${b.x} V ${b.y}' fill='none' stroke='#34516b' stroke-width='2'/>`;
        text += `<text x='${number(x+3)}' y='${number(y-4)}' font-size='10' fill='#273e51'>${number(d)}</text>`;
        history.push([clusters.map(c=>'{'+c.members.map(i=>names[i]).join(',')+'}').join(' '), candidates.map(c=>c.a.label+'/'+c.b.label+': '+number(c.d)).join('; '), a.label+' + '+b.label, cross.map(number).join(', '), number(d), '{'+members.map(i=>names[i]).join(', ')+'}']);
        clusters=clusters.filter(c=>c!==a&&c!==b); clusters.push({members,label,x,y});
      }
      const leaves=names.map((name,i)=>`<text x='${40+i*65}' y='230' text-anchor='middle' font-size='12' fill='#273e51'>${name}</text>`).join('');
      html += `<li><b>${method[0].toUpperCase()+method.slice(1)} linkage.</b> At each step, the candidate list gives all current inter-cluster distances. Apply ${method==='single'?'min':method==='complete'?'max':'sum divided by the number of values'} to the listed original cross-pair distances for the chosen pair. The final column is the resulting cluster.${table(['Current clusters','Candidate distances','Merge','Cross-pair distances','Height','New cluster'],history)}<div class='diagram' style='background:white'><svg viewBox='0 0 ${Math.max(390,n*65+20)} 245' role='img' aria-label='${method} linkage dendrogram; merge heights are labelled'>${lines}${text}${leaves}</svg></div></li>`;
    });
    html += `<li><b>Read the trees:</b> leaves are original items, each horizontal junction is a merge, and its label is the merge distance. A horizontal cut gives the clusters present at that distance.</li><li><b>Finish:</b> the last merge in each table contains every item.</li></ol>`;
    return worked(html,[linkageSource,clustering]);
  }
  const M23=[[0,4,25,24,9,7],[4,0,21,20,5,3],[25,21,0,1,16,18],[24,20,1,0,15,17],[9,5,16,15,0,2],[7,3,18,17,2,0]];
  const D23=[[0,.71,5.66,3.61,4.24,3.20],[.71,0,4.95,2.92,3.54,2.50],[5.66,4.95,0,2.24,1.411,2.50],[3.61,2.92,2.24,0,1,0.5],[4.24,3.54,1.411,1,0,1.12],[3.20,2.50,2.50,.5,1.12,0]];
  const M24=[[0,.23,.22,.37,.34,.24],[.23,0,.14,.19,.14,.24],[.22,.14,0,.16,.28,.10],[.37,.19,.16,0,.28,.22],[.34,.14,.28,.28,0,.39],[.24,.24,.10,.22,.39,0]];
  const N24=[[0,2,3,3,4],[2,0,3,5,4],[3,3,0,2,6],[3,5,2,0,4],[4,4,6,4,0]];
  const N25=[[0,2,4.5,3.2,6,5.2],[2,0,3.8,2.7,5.9,4.4],[4.5,3.8,0,2.1,4,3.6],[3.2,2.7,2.1,0,3.3,2.8],[6,5.9,4,3.3,0,1.9],[5.2,4.4,3.6,2.8,1.9,0]];
  const M26=[[0,.12,.51,.84,.28,.34],[.12,0,.25,.16,.77,.61],[.51,.25,0,.14,.70,.93],[.84,.16,.14,0,.45,.20],[.28,.77,.70,.45,0,.67],[.34,.61,.93,.20,.67,0]];
  const abc=['A','B','C','D','E','F'];
  const points=[[2,10],[2,5],[8,4],[5,8],[7,5],[6,4],[1,2],[4,9]];
  const seeds=[[2,10],[5,8],[1,2]];
  const twoRounds=kmeans(points,seeds,2);
  Object.assign(window.ML_PYQ_ANSWERS, {
    'm23:9': similarity,
    'm23:10': theory(`<p>A dendrogram is a tree showing the nested merges in hierarchical clustering. Leaves represent individual objects and the height of a junction represents the dissimilarity at which clusters join.</p><p>For example, A and B may merge at distance 1, then their cluster joins C at distance 3. Cutting the tree between heights 1 and 3 gives clusters {A,B} and {C}.</p>`,['dendrogram']),
    'm23:19a': twoRounds,
    'm23:19b': theory(`<p>Both are agglomerative linkage rules. Single linkage uses the smallest distance between any cross-cluster pair; complete linkage uses the largest.</p><p>For U = {A,B}, V = {C}, if d(A,C) = 2 and d(B,C) = 7, single gives 2 and complete gives 7. Single accommodates long irregular clusters but can chain through noisy bridges. Complete favours compact clusters but can be affected by outliers.</p>`),
    'm23:20a': hierarchy(abc,M23,['complete']),
    'm23:20b': density,
    'd23:10': distances([12,3,9],[6,5,15],['city','chess','euclid']),
    'd23:19a': hierarchy(abc,D23,['single'],'Agglomerative clustering repeatedly merges the closest current clusters until only one remains.'),
    'd23:19b': theory(linkageMethods),
    'd23:20a': theory(`<p>DBSCAN uses neighbourhood radius ε and minimum count MinPts, including the point itself. A core point has at least MinPts points within ε. A border point is near a core but is not core; an unconnected point is noise.</p><ol><li>Visit an unvisited point and find its ε-neighbours. If it is not core, mark it provisionally as noise.</li><li>If it is core, create a cluster and expand it through neighbouring core points, adding their neighbours as core or border points.</li><li>Repeat until all points have been visited. Previously marked noise can become a border point.</li></ol><p>Unlike k-means, DBSCAN need not specify K, finds irregular shapes, and explicitly identifies noise. It is sensitive to parameter choice and may struggle with varying densities.</p>`,['dbscan-points']),
    'd23:20b': theory(`${kmAlgorithm}<p><b>Disadvantages:</b> K must be chosen in advance; initial centres affect the result; outliers can pull means; irregular and unequal-density groups are poorly represented.</p><p><b>Applications:</b> group customers by purchase features for segmentation; group documents by numerical text features for topic exploration.</p>`),
    'm24:9': similarity,
    'm24:10': theory(`<p>K-means produces a flat partition into a chosen K groups by iterative nearest-centre assignment and mean updates. Hierarchical clustering produces nested groups shown in a dendrogram, which can be cut at different levels.</p><p>K-means can reassign points and depends on initial centres; agglomerative hierarchical clustering merges clusters irreversibly and depends on its linkage rule. K-means usually scales better to large datasets.</p>`),
    'm24:19a': kmeans(points,seeds,1),
    'm24:19b': density,
    'm24:20': hierarchy(['P1','P2','P3','P4','P5','P6'],M24,['complete','single']),
    'n24:9': theory(`<p>Common linkage types are <b>single</b> (minimum cross-pair distance), <b>complete</b> (maximum), <b>average</b> (mean of all cross-pair distances), <b>centroid</b> (distance between cluster means), and <b>Ward</b> (smallest increase in within-cluster squared error).</p>`),
    'n24:10': theory(`<p><b>Advantages:</b> k-means is simple, efficient on large numerical datasets, and produces interpretable cluster centres.</p><p><b>Limitations:</b> it requires K in advance, depends on initialization, is sensitive to outliers and feature scales, and can perform poorly for irregular or unequal-density clusters.</p>`),
    'n24:19a': theory(dbPoints,['dbscan-points']),
    'n24:19b': theory(kmAlgorithm),
    'n24:20': hierarchy(['A','B','C','D','E'],N24,['single','complete','average'],'Hierarchical agglomerative clustering builds nested groups bottom-up.'),
    'n25:9': theory(`<p>Use DBSCAN, a density-based clustering method. It connects neighbouring dense regions, so it can discover non-spherical, curved cluster boundaries and label isolated points as noise. Choose ε and MinPts carefully; a single choice can be unsuitable when cluster densities differ greatly.</p>`),
    'n25:10': distances([5,8,11],[1,2,7],['city','euclid']),
    'n25:19a': kmeans([[2,6],[3,8],[1,3],[5,4],[7,2],[8,4]],[[1,6],[6,2]],1),
    'n25:19b': theory(dbPoints,['dbscan-points']),
    'n25:20a': hierarchy(abc,N25,['single']),
    'n25:20b': theory(`<p>Partitioning methods produce one flat division of the data, often requiring K in advance. K-means assigns points to nearest centres and can reassign them as centres change.</p><p>Hierarchical methods build nested partitions represented by a dendrogram. Agglomerative clustering starts with singletons and merges them; divisive clustering starts with one group and splits it. A tree can be cut at different levels, but agglomerative merges are not undone.</p><p>Partitioning is often more scalable; hierarchical results depend on the distance and linkage chosen and can be costly for large datasets.</p>`),
    'm26:9': distances([4,5,6],[7,8,9],['city','euclid']),
    'm26:10': theory(`<p>Three drawbacks are: (1) K must be chosen beforehand; (2) the result depends on initial centroids and can reach a local optimum; (3) means are sensitive to outliers. K-means also struggles with irregularly shaped clusters.</p>`),
    'm26:19a': twoRounds,
    'm26:19b': density,
    'm26:20': hierarchy(abc,M26,['complete','single'])
  });
})();
