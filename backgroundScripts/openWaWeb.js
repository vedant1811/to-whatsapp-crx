chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('onMessage');
    console.log(request);

    chrome.tabs.create({
      url: createWaWebLink(request.waNumber, request.message),
      active: false
    }, (createdTab) => {
      sendMessageOnWaTab(createdTab)
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

  // TODO: implement:
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve('invalid_number');
    }, 5000);
  })
}

function createWaWebLink(waNumber, text = '') {
  return `https://web.whatsapp.com/send?phone=${waNumber}&text=${text}`;
}
