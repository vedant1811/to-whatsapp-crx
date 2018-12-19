var phoneSpans = null;
var currentSpanIndex = null;

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == 'send_to_all');
  console.log('connected to send_to_all');
  port.onMessage.addListener(function(message) {
    console.log('new message');
    console.log(message);
    switch (message.action) {
      case 'start':
        start();
        break;
    }
  });
});

function start() {
  phoneSpans = document.querySelectorAll(`.${WA_SPAN_CLASS_NAME}`);
  currentSpanIndex = -1;
  sentWaToNext();
}

function sentWaToNext() {
  currentSpanIndex++;
  const span = phoneSpans[currentSpanIndex];
  span.autoSend();
}
