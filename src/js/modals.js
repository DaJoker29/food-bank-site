$('#aboutModal').on('hide.bs.modal', function() {
  $('video').trigger('pause');
});

$('#aboutModalCTA').on('click', function() {
  $('#contactModal').modal('show');
  $('#aboutModal').on('hidden.bs.modal', function() {
    $('body').addClass('modal-open');
    $('#aboutModal').off('hidden.bs.modal');
  });
});



