const SEARCH_DELAY = 100; // in ms

// phone number invalid: document.querySelector("._1CnF3")
// chat box: '#main'

// it may run indefinitely. TODO: make it cancellable, using Promise's `reject`
function waitForElementToBeAdded(cssSelector) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (element = document.querySelector(cssSelector)) {
        clearInterval(interval);
        resolve(element);
      }
    }, SEARCH_DELAY);
  });
}

console.log(await waitForElementToBeAdded('#main'));
