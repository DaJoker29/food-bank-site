/*
    Navigation Select Menu
    version: 2
    @function buildNav()
*/
(function (){

    /*
        Create Menu Element
    */
    var select = document.createElement('select');
    var header = document.querySelector('.site-heading');

    select.id = select.className = 'nav-select';
    header.appendChild(select);

    // Need to wait until .nav-select is created
    var menu = document.querySelector('.nav-select');

    /*
        Add Default option
    */
    var def = document.createElement('option');
    def.value = "";
    def.disabled = true;
    def.selected = true;
    def.textContent = "Navigation";
    menu.appendChild(def);

    /*
        Populate Menu with options
    */
    var opt = document.querySelectorAll('.section');

    for(var i = 0; i < opt.length; i++ ) {
        // Set values
        var val = opt[i].id;
        var text = opt[i].querySelector('.section-heading').textContent;

        // Build option
        var el = document.createElement('option');
        el.value = "#" + val;
        el.textContent = text;
        el.setAttribute('data-scroll', "");

        // Add to Menu
        menu.appendChild(el);
    }


    /*
        Listen for 'change' event, smooth-scroll to it
        and then reset the select menu
    */
    menu.addEventListener('change', function(e) {
        var selection = e.target.value;

        // Check for empty value
        if(selection === "")
            return;

        smoothScroll.animateScroll( null, selection );
        e.target.selectedIndex = 0;
    });

})();