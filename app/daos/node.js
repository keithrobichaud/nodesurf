import firebase from '../firebase';

export default {
  createChild(parentNode, nodeName, nodeContent) {
    const childNode = firebase.push('nodes', {
      data: {
        name: nodeName,
        content: nodeContent,
        children: {}
      },
      then(err) {
        if (!err) {
          // do something
        }
      }
    });
    // available immediately, you don't have to wait for the callback to be called
    const childKey = childNode.key;
    const parentKey = parentNode.key;
    parentNode.children = parentNode.children || {};
    parentNode.children[nodeName] = childKey;

    firebase.update('nodes/' + parentKey, {
      data: parentNode,
      then(err) {
        if (!err) {
          // do something
        }
      }
    });
  }
};
