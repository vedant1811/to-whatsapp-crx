function getPhoneNumbers(document, libPhoneNumber) {
  // Use the non-standard innerText which has some caveats:
  // https://stackoverflow.com/questions/35213147/difference-between-textcontent-vs-innertext
  const visibleText = document.body.innerText;

  return libPhoneNumber.findNumbers(visibleText, { v2: true });
}

function toWhatsAppNumber(phoneNumber) {
  return phoneNumber.number.number.substring(1);
}

/**
 * Element texts are matched against phoneNumbers
 */
function findAndAddSendToWa(element, phoneNumbers, libPhoneNumber) {
  element.childNodes.forEach(function (child) {
    findAndAddSendToWa(child, phoneNumbers);
  });

  if (matchingNumber = matchingWhatsAppNumber(element, phoneNumbers, libPhoneNumber)) {
    addSendToWaToElement(element, matchingNumber)
  }
}

function matchingWhatsAppNumber(element, phoneNumbers, libPhoneNumber) {
  for (phoneNumber of phoneNumbers) {
    if (phoneNumber.number.nationalNumber == element.textContent) {
      return phoneNumber;
    }
  }
}

function addSendToWaToElement(element, phoneNumber) {
  console.log(element);
}

function main(libPhoneNumber) {
  const phoneNumbers = getPhoneNumbers(document, libPhoneNumber);
  findAndAddSendToWa(document.body, phoneNumbers, libPhoneNumber);
}

// ref: https://requirejs.org/docs/errors.html#notloaded
require(['libphonenumber'], function (libPhoneNumber) {
  main(libPhoneNumber)
});
