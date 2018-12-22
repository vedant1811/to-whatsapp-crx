const WA_SPAN_CLASS_NAME = 'wa-span-to-wa-crx';

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
    addSendToWaToNode(node, matchingNumber);
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

function addSendToWaToNode(node, phoneNumber) {
  const waNumber = toWhatsAppNumber(phoneNumber);
  const sendToWaNode = document.createElement('span');
  sendToWaNode.className = WA_SPAN_CLASS_NAME;
  sendToWaNode.innerHTML = generateSendToWaHtml();
  sendToWaNode.getStatus = () => sendToWaNode.lastChild.textContent;
  sendToWaNode.setStatus = (status, save = false) => {
    sendToWaNode.lastChild.textContent = status;

    if (save) {
      chrome.storage.sync.set({ [waNumber]: status }, function() {
        console.log(`saved ${waNumber} : ${status}`);
      });
    }
  }
  chrome.storage.sync.get([waNumber], function(result) {
    console.log(result);
    console.log(`got ${waNumber} : ${result[waNumber]}`);

    sendToWaNode.lastChild.textContent = result[waNumber];
  });
  sendToWaNode.autoSend = () => {
    sendToWaNode.setStatus('sending');
    sendToWa(waNumber, node, true);
  }
  sendToWaNode.addEventListener('click', () => sendToWa(waNumber, node, false))

  insertAfter(sendToWaNode, node);
}

function generateSendToWaHtml() {
  const waIcon = chrome.runtime.getURL('assets/whatsapp.png');
  return `<img class="wa-icon-to-wa-crx" src="${waIcon}" alt="send to WhatsApp"><i></i>`;
}

function main(libPhoneNumber) {
  const phoneNumbers = getPhoneNumbers(document, libPhoneNumber);
  findAndAddSendToWa(document.body, phoneNumbers, libPhoneNumber);
}

// ref: https://requirejs.org/docs/errors.html#notloaded
require(['libphonenumber'], function (libPhoneNumber) {
  main(libPhoneNumber)
});
