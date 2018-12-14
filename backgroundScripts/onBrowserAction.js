chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('browserAction');

  // send message to content scrpit in current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { sendToAll: true }, (response) => {

    });
  });
});
