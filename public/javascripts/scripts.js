document.addEventListener('DOMContentLoaded', function() {
  const carouselInner = document.querySelector('.carousel-inner');
  const images = carouselInner.querySelectorAll('img');
  const imageWidth = images[0].clientWidth;
  const visibleImages = 3;
  let index = 0;

  function nextImage() {
    index++;
    if (index >= (images.length - visibleImages + 1)) {
      index = 0;
    }
    updateCarousel();
  }

  function updateCarousel() {
    const offset = -index * imageWidth;
    carouselInner.style.transform = `translateX(${offset}px)`;
  }

  setInterval(nextImage, 5000); // Cambia de imagen cada 5 segundos
});

const hamburger = document.getElementById('hamburger');
const navlist = document.getElementById('navlist');

hamburger.addEventListener('click', () => {
    navlist.classList.toggle('active');
});
