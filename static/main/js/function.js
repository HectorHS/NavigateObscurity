let menuContainer = document.getElementById('nav_list_mobile');
let hamContainer = document.getElementById('nav_hamburger');
let dataContainer = document.getElementById('data_dropdown');
let notesContainer = document.getElementById('notes_dropdown');

// hide/show menu
hamContainer.addEventListener('click', function (event) {
  event.preventDefault();
  slideMenu(menuContainer);
});
// hide/show data menu
document.getElementById('data_toggle').addEventListener('click', function (event) {
  event.preventDefault();
  slideMenu(dataContainer);
});

// hide/show notes menu
document.getElementById('notes_toggle').addEventListener('click', function (event) {
  event.preventDefault();
  slideMenu(notesContainer);
});

// hide/show function
function slideMenu(container) {
  if (!container.classList.contains('active')) {
      container.classList.add('active');
      container.style.height = 'auto';

      let height = container.clientHeight + 'px';

      container.style.height = '0px';

      setTimeout(function () {
          container.style.height = height;
      }, 0);
  } else {
      container.style.height = '0px';

      container.addEventListener('transitionend', function () {
          container.classList.remove('active');
      }, {
          once: true
      });
  }
}

      // for mobile menu hamburger animation
hamContainer.addEventListener('click', function (event) {
    event.preventDefault();

    if (!hamContainer.classList.contains('active')) {
        hamContainer.classList.add('active');
    } else {
        hamContainer.classList.remove('active');
    }
});