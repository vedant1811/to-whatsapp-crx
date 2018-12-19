function sendToWa(waNumber, phoneElement, autoSend) {
  console.log('sendToWa');

  chrome.runtime.sendMessage({
    waNumber: waNumber,
    message: generateMessage(phoneElement),
    autoSend: autoSend
  });
}

// TODO: Implement based on user input via icon action
function generateMessage(phoneElement) {
  const linkDetails = getPrevLinkDetails(phoneElement);

  const text = `Hey. I am interested in, ${linkDetails.title}.\n\n${linkDetails.link}`;
  return encodeURI(text);
}

function getPrevLinkDetails(node) {
  const aTag = findPrevAnchorTag(node);

  return {
    link: aTag.href, // #href always retruns the full URL (not relative)
    title: aTag.textContent
  };
}

// TODO: handle case of no anchor tag
function findPrevAnchorTag(originalNode, currentNode = originalNode) {
  const parent = currentNode.parentNode;
  if (aTag = parent.querySelector('a')) {
    if (isElementAbove(aTag, originalNode)) {
      return aTag;
    }
  }

  return findPrevAnchorTag(parent);
}

/** @return true if elementA is above elementB **/
function isElementAbove(elementA, elementB) {
  return elementA.getBoundingClientRect().top < elementB.getBoundingClientRect().top;
}
