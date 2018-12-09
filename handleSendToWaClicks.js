function sendToWaClicked(waNumber) {
  console.log(`${waNumber} clicked!`);

  chrome.runtime.sendMessage({waNumber: waNumber}, (response) => {});
}
