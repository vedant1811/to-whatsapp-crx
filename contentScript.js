function getPhoneNumbers(document, libPhoneNumber) {
  // Use the non-standard innerText which has some caveats:
  // https://stackoverflow.com/questions/35213147/difference-between-textcontent-vs-innertext
  const visibleText = document.body.innerText;

  return libPhoneNumber.findNumbers(visibleText, { v2: true });
}

/**
 * Element texts are matched against formattedPhoneNumbers
 * @param phoneNumbers Array of phone numbers that can be understood by WhatsApp
 */
function addSendToWaButtons(element, phoneNumbers, libPhoneNumber) {
  element.childNodes.forEach(function (child) {
    addSendToWaButtons(child, phoneNumbers);
  });

  if (waNumber = matchingWhatsAppNumber(element, phoneNumbers, libPhoneNumber)) {
    console.log(element);
  }
}

function matchingWhatsAppNumber(element, phoneNumbers, libPhoneNumber) {
  for (phoneNumber of phoneNumbers) {
    if (phoneNumber.number.nationalNumber == element.textContent) {
      return phoneNumber.number.number.substring(1);
    }
  }
}

function main(libPhoneNumber) {
  const phoneNumbers = getPhoneNumbers(document, libPhoneNumber);
  addSendToWaButtons(document.body, phoneNumbers, libPhoneNumber);
}

// ref: https://requirejs.org/docs/errors.html#notloaded
require(['libphonenumber'], function (libPhoneNumber) {
  main(libPhoneNumber)
});
