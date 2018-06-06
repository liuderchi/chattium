function update() {
  // Toggle refresh state
  $('#update .icon').toggleClass('d-none');

  // TODO set date to #date element

  try {
    // TODO fetch weather data

    // TODO draw chart

  } catch (e) {
    $('.alert').slideDown();
    setTimeout(function() {
      $('.alert').slideUp();
    }, 2000);
  } finally {
    // TODO reset update icon
  }

}

$('#update a').click(update);
update();
