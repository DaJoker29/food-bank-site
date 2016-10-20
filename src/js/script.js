$('#aboutModal').on('hide.bs.modal', function(e) {
  $('video').trigger('pause');
});