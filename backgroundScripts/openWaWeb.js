chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('onMessage');
    console.log(request);

    const autoSend = request.autoSend;

    chrome.tabs.create({
      url: createWaWebLink(request.waNumber, request.message),
      active: !autoSend
    }, (createdTab) => {
      sendMessageOnWaTab(createdTab, autoSend)
          .then((result) => sendResponse(result))
    })

    // return true since sendResponse will be called asynchronously
    return true;
  }
);

/**
 * 
 * @returns a Promise with result
 */
function sendMessageOnWaTab(waTab, autoSend = false) {
  console.log(`'sendMessageOnWaTab', autoSend: ${autoSend}`);
  console.log(waTab);

  if (autoSend) {
    return executeScript(waTab.id, 'contentScripts/waSendInBackground.js');
  } else {
    return Promise.resolve('tab_opened');
  }
}

function createWaWebLink(waNumber, text = '') {
  return `https://web.whatsapp.com/send?phone=${waNumber}&text=${text}`;
}

function executeScript(tabId, filePath) {
  return new Promise((resolve) => {
    chrome.tabs.executeScript(
      tabId,
      { file: filePath },
      (results) => resolve(results[0])
    )
  });
}
