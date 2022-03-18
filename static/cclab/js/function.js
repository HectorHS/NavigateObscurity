  // for mobile menu hide / show animation
  let container = document.getElementById('cclab_nav_list');
  let hamContainer = document.getElementById('nav_hamburger');

  hamContainer.addEventListener('click', function (event) {
          event.preventDefault();

          if (!container.classList.contains('active')) {
              container.classList.add('active');
              container.style.height = 'auto';

              let height = container.clientHeight + "px";

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
      });

      // for mobile menu hamburger animation
      hamContainer.addEventListener('click', function (event) {
          event.preventDefault();

          if (!hamContainer.classList.contains('active')) {
              hamContainer.classList.add('active');
          } else {
              hamContainer.classList.remove('active');
          }
      });