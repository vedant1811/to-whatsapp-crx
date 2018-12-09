chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('onMessage');
    console.log(request);

    chrome.tabs.create({
      url: createWaWebLink(request.waNumber, request.message),
      active: false
    }, waWebTabCreated)
  }
);

function waWebTabCreated(tab) {
  console.log('waWebTabCreated');
  console.log(tab);
}

function createWaWebLink(waNumber, text = '') {
  return `https://web.whatsapp.com/send?phone=${waNumber}&text=${text}`;
}
