## Notes

Scan page for phone numbers

Append a WhatsApp icon

### On "Send to WhatsApp" Click:

Update button to progressbar

Open inactive tab with https://web.whatsapp.com/send?phone=19999&text=urlencodedtext

wait for it to open the chatbox. If "invalid number" error is shown, close tab and
update icon.

Click send by `document.querySelector('._35EW6').click()`

Close tab after no `<span data-icon="msg-time">` elements are present


**Invalid Number:**

Store invalid number and last checked at in local storage, and display it on webpage
whenever the same number appears


### Menu Options:

 * Expand all icons to inputs

 * Ignore on this page

 * Input box with message and placeholders (`$previous_link`, `$previous_link_text`)

## TODO:

 * Option to enter a default country code (in case its missing on the phone) for a page/domain
