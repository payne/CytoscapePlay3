let cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'ab', source: 'a', target: 'b' }
    }]
});
window.cy = cy;
let nodes={}; // key is nodeID and value is list of destination nodeIDs
let currentNodeId='b';
let nextNodeId = () => {
  currentNodeId = String.fromCharCode(currentNodeId[0].charCodeAt()+1);
  return currentNodeId;
}
let addNodeButton = document.getElementById('addNodeButton');
let addEdgeButton = document.getElementById('addEdgeButton');
let addNode = (event) => {
  let nId = nextNodeId();
  let n = cy.add( { data: { id: nId }, position: {  x: 100, y: 100 } });
  n.on('tapdragover', (event) => { console.log(`tapdragover ${nId}`);
                                  console.log(event);
                                 });
}
let addEdge = (event) => {
  console.log(`addEdgeButton click`);
  console.log(event);
}
addNodeButton.addEventListener('click', addNode);
addEdgeButton.addEventListener('click', addEdge);
