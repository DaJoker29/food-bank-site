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