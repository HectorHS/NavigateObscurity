
(function($) { 
  $(function() {
    // Show navbar dropdown 
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      $('.dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Collapse dropdowns
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    // // Reveal mobile menu on click
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    // Animate hamburger icon on click
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
  }); 
})(jQuery);