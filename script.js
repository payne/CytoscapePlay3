let cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'ab', source: 'a', target: 'b' }
    }]
});
window.cy = cy; // so it's easy to play in devtools console
// https://stackoverflow.com/questions/66516233/change-event-in-cytoscape-js-graph
cy.on('add dragfree dragfreeon remove move select unselect tapdragover tapselect tapunselect boxselect box lock', generic_event);
console.log(`setup a bunch of listeners.`);
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
// I want this to be hoisted
function  generic_event(ev)  { console.log('hey some event happened on cy: ', ev);};
let addNode = (event) => {
  let nId = nextNodeId();
  let n = cy.add( { data: { id: nId }, position: {  x: 100, y: 100 } });
  console.log(`addNodeButton click`);
  console.log(n);
  // n.on('tapdragover', nodeMoved);
  // from https://stackoverflow.com/questions/66516233/change-event-in-cytoscape-js-graph
}
let addEdge = (event) => {
  console.log(`addEdgeButton click`);
  console.log(event);
}
addNodeButton.addEventListener('click', addNode);
addEdgeButton.addEventListener('click', addEdge);
