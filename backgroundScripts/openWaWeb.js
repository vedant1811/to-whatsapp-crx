var autoSendingTo = null;

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('browserAction');

  // send message to content scrpit in current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    connectToSourceTab(tabs[0])
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('onMessage');
    console.log(request);

    if (request.waNumber) createWaTab(request, sender);
    else onWaTabResponse(request, sender);
  }
);

function connectToSourceTab(tab) {
  const port = chrome.tabs.connect(tab.id, { name: 'send_to_all' });
  port.onMessage.addListener(onMessageFromSourceTab);
  port.postMessage({ action: 'start' });
}

function onMessageFromSourceTab(message) {

}

function createWaTab(data, sender) {
  const autoSend = data.autoSend;

  chrome.tabs.create({
    url: createWaWebLink(data.waNumber, data.message),
    active: !autoSend
  }, createdTab => sendMessageOnWaTab(createdTab, data.waNumber, autoSend))
}

function onWaTabResponse(data, sender) {

}

function sendMessageOnWaTab(waTab, waNumber, autoSend = false) {
  console.log(`'sendMessageOnWaTab', autoSend: ${autoSend}`);
  console.log(waTab);

  if (autoSend) {
    chrome.tabs.executeScript(waTab.id, { file: 'contentScripts/waSendInBackground.js' });
    autoSendingTo = waNumber;
  }
}

function createWaWebLink(waNumber, text = '') {
  return `https://web.whatsapp.com/send?phone=${waNumber}&text=${text}`;
}
