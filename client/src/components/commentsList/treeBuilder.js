export function getTree (comments) {
  let tree = { children: new Map() }
  comments.forEach(element => {
    buildTree(tree, element)
  })
  return tree
}

function buildTree (rootNode, comment) {
  let node = rootNode
  let currentNode = createNewNode(comment)
  currentNode = setChildren(currentNode, comment, node)
  node = replaceNode(node, comment, rootNode)
  node.children.set(currentNode.id, currentNode)
}

function createNewNode (comment) {
  return {
    id: comment.id,
    children: new Map(),
    item: comment
  }
}

function setChildren (currentNode, comment, node) {
  node.children.forEach(children => {
    if (children.item.parentId === comment.id) {
      currentNode.children.set(children.id, children)
      node.children.delete(children.id)
    }
  })
  return currentNode
}

function replaceNode (node, comment, rootNode) {
  if (node.children.has(comment.parentId)) {
    return node.children.get(comment.parentId)
  } else if (node.children.size) {
    node.children.forEach(children => {
      rootNode = replaceNode(children, comment, rootNode)
    })
  } else {
    return rootNode
  }
  return rootNode
}

export function * convertTreeToArray (tree, level) {
  const treeArray = Array.from(tree.children.values())
  for (let node of treeArray) {
    yield Object.assign(node, {level})
    yield * convertTreeToArray(node, level + 1)
  }
}
