/*
    Test for HTML5 features and launch/bootstrap scripts
*/
if(document.querySelector && window.addEventListener) {
    buildNav();
    smoothScroll.init({
        speed: 850,
        easing: 'linear',
        updateURL: true,
        offset: 0
    });
}