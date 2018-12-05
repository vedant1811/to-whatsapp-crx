console.log("yay");

function getPhoneNumbers(libPhoneNumber, document) {
  // Use the non-standard innerText which has some caveats:
  // https://stackoverflow.com/questions/35213147/difference-between-textcontent-vs-innertext
  const visibleText = document.body.innerText;
  const numberObjects = libPhoneNumber.findNumbers(visibleText, { v2: true })
  return numberObjects.map(phoneNumber => phoneNumber.number.number.substring(1))
}

/**
 * Element texts are matched against formattedPhoneNumbers
 * @param formattedPhoneNumbers Array of phone numbers that can be understood by WhatsApp
 */
function addSendToWaButtons(document, formattedPhoneNumbers) {

}


function main(libPhoneNumber) {
  const phoneNumbers = getPhoneNumbers(libPhoneNumber, document);
  console.log(phoneNumbers);
}

// ref: https://requirejs.org/docs/errors.html#notloaded
require(['libphonenumber'], function (libPhoneNumber) {
  main(libPhoneNumber)
});
