function update() {
  // Toggle refresh state
  $('#update .icon').toggleClass('d-none');

  $('#date').text(
    `, ${new Date()
      .toDateString()
      .split(' ')
      .slice(1, 3)
      .join(' ')}`,
  );

  try {
    // TODO fetch weather data

    // TODO draw chart

  } catch (e) {
    $('.alert').slideDown();
    setTimeout(function() {
      $('.alert').slideUp();
    }, 2000);
  } finally {
    $('#update .icon').toggleClass('d-none');
  }

}

$('#update a').click(update);
update();
