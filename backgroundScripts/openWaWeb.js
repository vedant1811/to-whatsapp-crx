var autoSendingTo = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('onMessage');
    console.log(request);

    if (request.waNumber) createWaTab(request, sender);
    else onWaTabResponse(request, sender);
  }
);

function createWaTab(data, sender) {
  const autoSend = data.autoSend;

  chrome.tabs.create({
    url: createWaWebLink(data.waNumber, data.message),
    active: !autoSend
  }, createdTab => sendMessageOnWaTab(createdTab, data.waNumber, autoSend))
}

function onWaTabResponse(data, sender) {

}

function sendMessageOnWaTab(waTab, waNumber, autoSend = true) {
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
