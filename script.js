let addNodeButton = document.getElementById('addNodeButton');
let addEdgeButton = document.getElementById('addEdgeButton');
let addNode = (event) => {
  console.log(`addNodeButton click`);
  console.log(event);
}
let addEdge = (event) => {
  console.log(`addEdgeButton click`);
  console.log(event);
}
addNodeButton.addEventListener('click', addNode);
addEdgeButton.addEventListener('click', addEdge);
var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'ab', source: 'a', target: 'b' }
    }]
});
window.cy = cy;
