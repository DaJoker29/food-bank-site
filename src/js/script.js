$('#aboutModal').on('hide.bs.modal', function(e) {
  $('video').trigger('pause');
});

$('#aboutModalCTA').on('click', function(e) {
  $('#contactModal').modal('show');
  $('#aboutModal').on('hidden.bs.modal', function(e) {
    $('body').addClass('modal-open');
    $('#aboutModal').off('hidden.bs.modal');
  });
});

$(function() {
  $('#img-carousel').owlCarousel({
    autoPlay: 3000,
    items: 4,
    lazyLoad: true,
    pagination: false
  });

});

$(window).on('load', function() {
  // Remove Preloader
  $('#preloader').fadeOut();
});