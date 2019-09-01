'use strict';

function createElement(node) {
  
  if ((node === undefined) || (node === null) || (node === false)) {
    return document.createTextNode('');
  }

  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.name);

  if (node.props) {
    Object.keys(node.props).forEach(key => element.setAttribute(key, node.props[key]));
  }

  if (node.childs) {
    node.childs.forEach(function(item) {
      if (typeof item === 'string') {
        element.textContent = item;
      } else {
        element.appendChild(createElement(item));
      }
    });
  }
  
  return element;
}