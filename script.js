// https://cdn.jsdelivr.net/npm/yjs@13.0.0-98/dist/yjs.js
import * as Y from 'https://esm.sh/yjs@13'
import { WebrtcProvider } from 'https://esm.sh/y-webrtc@10'

const colors=['red','green','blue','yellow','orange'];
const oneOf = arr => arr[Math.floor(Math.random() * arr.length)]
// An array might not be the best, but it's a place to start.
const ydoc = new Y.Doc()
const provider = new WebrtcProvider('lot a nodes', ydoc, { password: 'test' })
const ynodes = ydoc.getArray('ynodes');

ynodes.observe(event => {
  event.changes.added.forEach(item => {
    item.content.getContent().forEach(ay_node => {
      const node = cy.getElementById(ay_node.id);
      node.position(ay_node.position);
      node.style('background-color', oneOf(colors));
    })
  })
});

let cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    {
      data: { id: 'ab', source: 'a', target: 'b' }
    }]
});
window.cy = cy; // so it's easy to play in devtools console
// https://stackoverflow.com/questions/66516233/change-event-in-cytoscape-js-graph
// cy.on('add dragfree dragfreeon remove move select unselect tapdragover tapselect tapunselect boxselect box lock', generic_event);
cy.on('dragfree' , nodeMovedNew);
let nodes = {}; // key is nodeID and value is metadata and list of destination nodeIDs
updateNodeLocation('a');
updateNodeLocation('b');
nodes['a'].destinations = ['b'];
let currentNodeId = 'b';
function nextNodeId() {
  currentNodeId = String.fromCharCode(currentNodeId[0].charCodeAt() + 1);
  return currentNodeId;
}
let addNodeButton = document.getElementById('addNodeButton');
let addEdgeButton = document.getElementById('addEdgeButton');
function nodeMovedNew(event) {
  const id = event.target.id();
  updateNodeLocation(id);
}
function updateNodeLocation(id) {
  const node = cy.getElementById(id);
  const position = node.position();
  // is id in nodes?
  if (nodes[id]) {
    // update position
    nodes[id].position = position;
  } else {
    // add id to nodes
    nodes[id] = { position: position, destinations: [] };
  }
  sendToYjs();
}

function sendToYjs() {
  let node_array = [];
  for (const [key, value] of Object.entries(nodes)) {
      const node_info = {'id': key, 'position': value.position};
      node_array.push(node_info);
  }
  ynodes.push(node_array);
}

function addNode(event) {
  let nId = nextNodeId();
  let n = cy.add({ data: { id: nId }, position: { x: 100, y: 100 } });
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
