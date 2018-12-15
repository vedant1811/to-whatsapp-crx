const SEARCH_DELAY = 100; // in ms
const CHAT_BOX_SELECTOR = '#main';
const PHONE_INVALID_SELECTOR = '._1CnF3';

console.log('waSendInBg');

async function sendMessage() {
  const createdSelector = await resolveFirst(
    waitForSelectorToBeAdded(CHAT_BOX_SELECTOR),
    waitForSelectorToBeAdded(PHONE_INVALID_SELECTOR)
  );

  switch (createdSelector) {
    case CHAT_BOX_SELECTOR:
      document.querySelector('._35EW6').click()
      return 'sent';
    case PHONE_INVALID_SELECTOR:
      return 'phone_invalid';
  }
}

function resolveFirst(...promises) {
  return new Promise(resolve => {
    promises.forEach(promise => {
      promise.then(value => resolve(value))
    })
  });
}

// it may run indefinitely. TODO: make it cancellable, using Promise's `reject`
function waitForSelectorToBeAdded(cssSelector) {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (document.querySelector(cssSelector)) {
        clearInterval(interval);
        resolve(cssSelector);
      }
    }, SEARCH_DELAY);
  });
}

(async () => {
  const result = await sendMessage();
  chrome.runtime.sendMessage({ waSendResult: result });
}) ();
