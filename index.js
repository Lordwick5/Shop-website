  const slider = document.getElementById('slider');
  const slides = slider.querySelectorAll('img');
  const totalSlides = slides.length;
  let index = 1; // start from first "real" slide
  const slideWidth = slides[0].clientWidth;

  // Set initial position
  slider.style.transform = `translateX(-${index * slideWidth}px)`;

  function slideTo(i) {
    slider.style.transition = 'transform 0.7s ease-in-out';
    slider.style.transform = `translateX(-${i * slideWidth}px)`;
  }

  document.getElementById('next').addEventListener('click', () => {
    if (index >= totalSlides - 1) return;
    index++;
    slideTo(index);
  });

  document.getElementById('prev').addEventListener('click', () => {
    if (index <= 0) return;
    index--;
    slideTo(index);
  });

  // Jump from clones to real slides
  slider.addEventListener('transitionend', () => {
    if (slides[index].alt === 'First Slide Clone') {
      slider.style.transition = 'none';
      index = 1;
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    if (slides[index].alt === 'Last Slide Clone') {
      slider.style.transition = 'none';
      index = totalSlides - 2;
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
    }
  });

  // Optional: auto-slide
  // setInterval(() => {
  //   document.getElementById('next').click();
  // }, 5000);