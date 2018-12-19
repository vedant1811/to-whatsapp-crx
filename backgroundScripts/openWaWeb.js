var connectionPort = null;
var backgroundWaTabId = null;

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('browserAction');

  // send message to content scrpit in current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    connectToSourceTab(tabs[0].id)
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('onMessage');
    console.log(request);

    if (request.waNumber) createWaTab(request);
    else onWaTabResponse(request);
  }
);

function connectToSourceTab(tabId) {
  connectionPort = chrome.tabs.connect(tabId, { name: 'send_to_all' });
  connectionPort.onMessage.addListener(onMessageFromSourceTab);
  connectionPort.postMessage({ action: 'start' });
}

function onMessageFromSourceTab(message) {

}

function createWaTab(data) {
  const autoSend = data.autoSend;

  chrome.tabs.create({
    url: createWaWebLink(data.waNumber, data.message),
    active: !autoSend
  }, createdTab => sendMessageOnWaTab(createdTab, data.waNumber, autoSend))
}

function onWaTabResponse(data) {
  if (connectionPort) {
    chrome.tabs.remove(backgroundWaTabId);
    backgroundWaTabId = null;

    connectionPort.postMessage({ action: 'next', lastResult: data.waSendResult })
  }
}

function sendMessageOnWaTab(waTab, waNumber, autoSend = false) {
  console.log(`'sendMessageOnWaTab', autoSend: ${autoSend}`);
  console.log(waTab);

  if (autoSend) {
    chrome.tabs.executeScript(waTab.id, { file: 'contentScripts/waSendInBackground.js' });
    autoSendingTo = waNumber;
    backgroundWaTabId = waTab.id;
  }
}

function createWaWebLink(waNumber, text = '') {
  return `https://web.whatsapp.com/send?phone=${waNumber}&text=${text}`;
}
