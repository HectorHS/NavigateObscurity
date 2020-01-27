(function ($) {
  $(function () {
    // Reveal mobile menu on click
    $('#nav-toggle').click(function () {
      $('.nav-list-mobile').slideToggle();
    });
    // Reveal data dropdown on mobile
    $('#data_toggle').click(function () {
      $('.data-dropdown').slideToggle();
    });
    // Reveal Notes dropdown on mobile
    $('#notes_toggle').click(function () {
      $('.notes-dropdown').slideToggle();
    });
    // Animate hamburger icon on click
    $('#nav-toggle').on('click', function () {
      this.classList.toggle('active');
    });
  });
})(jQuery);