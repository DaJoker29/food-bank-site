/*
    Donate Form (Handlers and Listeners)
    Version: 1
*/

/* Initialize Donate script */
(function (){
    var el = document.querySelector('#paypal');
    // Remove link
    el.removeAttribute('href');
    // Listen for click
    el.addEventListener('click', function() {
        toggle('.info-group', 'hide');
        toggle('#paypal', 'toggled');
        document.querySelector('#donate-amt').addEventListener('change', function() {

        });
    });

    /* Toggle function */
    function toggle(el, style) {
        // Toggle visibility of form fields
        el = document.querySelector(el);

        if(el.classList) {
            el.classList.toggle(style);
        } else {
            var classes = el.className.split(' ');
            var existingIndex = classes.indexOf(style);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(style);

            el.className = classes.join(' ');
        }
    }

    /* Validate user input amount value */
    function validate(amt) {
        if (amt.charAt(0) === '$')
            amt = amt.slice(1);

        var regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
        if (amt === null || amt === "" || !regex.test(amt)) {
            // Fail
            return null;
        }
        // Success
        return amt;
    }

    /* Build URL to send user to PayPal */
    function build() {
        var url = "//www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AYVA292HL7LL6";
        var input = validate(document.querySelector('#donate-amt').value);

        if( input === null ) {
            alert('Value must be a valid dollar amount.');
            return false;
        }

        var amt = "&amount=" + encodeURIComponent(input);
        var email = "&email=" + encodeURIComponent(document.querySelector('#donate-email').value);
        url += amt + email;
        document.querySelector('.info-group').action = url;
    }
})();