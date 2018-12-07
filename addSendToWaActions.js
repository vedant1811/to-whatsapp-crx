function toWhatsAppNumber(phoneNumber) {
  return phoneNumber.number.number.substring(1);
}

// https://stackoverflow.com/a/4793630/1396264
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function getPhoneNumbers(document, libPhoneNumber) {
  // Use the non-standard innerText which has some caveats:
  // https://stackoverflow.com/questions/35213147/difference-between-textcontent-vs-innertext
  const visibleText = document.body.innerText;

  return libPhoneNumber.findNumbers(visibleText, { v2: true });
}

/**
 * Node texts are matched against phoneNumbers
 */
function findAndAddSendToWa(node, phoneNumbers, libPhoneNumber) {
  if (matchingNumber = matchingWhatsAppNumber(node, phoneNumbers, libPhoneNumber)) {
    addSendToWaTonode(node, matchingNumber);
    return;
  }

  // traverse children only if a matchingNumber was not found
  node.childNodes.forEach(function (child) {
    findAndAddSendToWa(child, phoneNumbers);
  });
}

function matchingWhatsAppNumber(node, phoneNumbers, libPhoneNumber) {
  for (phoneNumber of phoneNumbers) {
    if (phoneNumber.number.nationalNumber == node.textContent) {
      return phoneNumber;
    }
  }
}

function addSendToWaTonode(node, phoneNumber) {
  const waNumber = toWhatsAppNumber(phoneNumber);
  const sendToWaNode = document.createElement('span');
  sendToWaNode.innerHTML = generateSendToWaHtml();
  sendToWaNode.addEventListener('click', () => { sendToWaClicked(waNumber) })
  insertAfter(sendToWaNode, node);
  console.log(node);
}

function generateSendToWaHtml() {
  const waIcon = chrome.runtime.getURL('assets/whatsapp.png');
  return `<a><img class="wa-icon-to-wa-crx" src="${waIcon}" alt="send to WhatsApp"></a>`;
}

function main(libPhoneNumber) {
  const phoneNumbers = getPhoneNumbers(document, libPhoneNumber);
  findAndAddSendToWa(document.body, phoneNumbers, libPhoneNumber);
}

// ref: https://requirejs.org/docs/errors.html#notloaded
require(['libphonenumber'], function (libPhoneNumber) {
  main(libPhoneNumber)
});
