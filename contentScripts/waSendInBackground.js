const SEARCH_DELAY = 100; // in ms
const CHAT_BOX_SELECTOR = '#main';
const PHONE_INVALID_SELECTOR = '._3lLzD';
const MESSAGE_SENDING_SELECTOR = '[data-icon="msg-time"]';
const MESSAGE_SENT_SELECTOR = '[data-icon="msg-dblcheck-ack"]';

console.log('waSendInBg');

async function sendMessage() {
  const createdSelector = await resolveFirst(
    waitForSelectorToBeAdded(CHAT_BOX_SELECTOR),
    waitForPhoneInvalid()
  );

  switch (createdSelector) {
    case CHAT_BOX_SELECTOR:
      document.querySelector('._35EW6').click();
      await waitForSelectorToBeAdded(MESSAGE_SENDING_SELECTOR);
      await waitForSelectorToBeRemoved(MESSAGE_SENDING_SELECTOR);
      return 'sent';
    case PHONE_INVALID_SELECTOR:
      return 'phone_invalid';
    default:
      throw `connot understand ${createdSelector}`;
  }
}

function resolveFirst(...promises) {
  return new Promise(resolve => {
    promises.forEach(promise => {
      promise.then(value => resolve(value))
    })
  });
}

function waitForPhoneInvalid() {
  return waitFor(() => {
    if (element = document.querySelector(PHONE_INVALID_SELECTOR)) {
      return element.innerText == 'Phone number shared via url is invalid.' ? PHONE_INVALID_SELECTOR : false;
    } else {
      return false;
    }
  });
}

function waitForSelectorToBeRemoved(cssSelector) {
  return waitFor(() => !document.querySelector(cssSelector));
}

function waitForSelectorToBeAdded(cssSelector) {
  return waitFor(() => document.querySelector(cssSelector) ? cssSelector : false);
}

// it may run indefinitely. TODO: make it cancellable, using Promise's `reject`
function waitFor(predicate) {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (onComplete = predicate()) {
        clearInterval(interval);
        resolve(onComplete);
      }
    }, SEARCH_DELAY);
  });
}

(async () => {
  const result = await sendMessage();
  chrome.runtime.sendMessage({ waSendResult: result });
}) ();
