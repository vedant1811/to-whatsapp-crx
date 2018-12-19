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
      case 'next':
        sentWaToNext(message.lastResult);
        break;
    }
  });
});

function start() {
  phoneSpans = document.querySelectorAll(`.${WA_SPAN_CLASS_NAME}`);
  sentWaToNext();
}

function sentWaToNext(lastResult = null) {
  if (currentSpanIndex != null) {
    const span = phoneSpans[currentSpanIndex];
    span.setStatus(lastResult);

    currentSpanIndex++;
  } else {
    currentSpanIndex = 0;
  }

  if (currentSpanIndex < phoneSpans.length) {
    const span = phoneSpans[currentSpanIndex]
    console.log('sendWaToNext');
    console.log(span);
    span.autoSend();
  } else {
    console.log('all sent');
    currentSpanIndex = null;
    phoneSpans = null;
  }
}
