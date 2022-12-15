let cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'ab', source: 'a', target: 'b' }
    }]
});
window.cy = cy; // so it's easy to play in devtools console
let nodes={}; // key is nodeID and value is metadata and list of destination nodeIDs
let currentNodeId='b';
let nextNodeId = () => {
  currentNodeId = String.fromCharCode(currentNodeId[0].charCodeAt()+1);
  return currentNodeId;
}
let addNodeButton = document.getElementById('addNodeButton');
let addEdgeButton = document.getElementById('addEdgeButton');
let nodeMoved = (event) => { 
  console.log(event);
}
let nodeMovedNew = (event) => { 
  console.log(event);
  const id = event.target.id();
  const position = event.position;
  // is id in nodes?
  if (nodes[id]) {
    // update position
    nodes[id].position = position;
  } else {
    // add id to nodes
    nodes[id] = { position: position, destinations: [] };
  }
  console.log(event);
  console.log(nodes);
} 
let addNode = (event) => {
  let nId = nextNodeId();
  let n = cy.add( { data: { id: nId }, position: {  x: 100, y: 100 } });
  console.log(`addNodeButton click`);
  console.log(n);
  n.on('tapdragover', nodeMoved);
}
let addEdge = (event) => {
  console.log(`addEdgeButton click`);
  console.log(event);
}
addNodeButton.addEventListener('click', addNode);
addEdgeButton.addEventListener('click', addEdge);
