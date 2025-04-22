const slider = document.getElementById("slider");
const slides = slider.querySelectorAll("img");
let index = 1;

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// Mark clones for debugging or logic (optional)
firstClone.setAttribute("data-clone", "first");
lastClone.setAttribute("data-clone", "last");

// Append clones
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

// Requery after adding clones
const allSlides = slider.querySelectorAll("img");
const slideWidth = allSlides[0].clientWidth;

// Start at real first slide
slider.style.transform = `translateX(-${slideWidth * index}px)`;

function slideTo(i) {
  slider.style.transition = "transform 0.6s ease-in-out";
  slider.style.transform = `translateX(-${slideWidth * i}px)`;
}

document.getElementById("next").addEventListener("click", () => {
  if (index >= allSlides.length - 1) return;
  index++;
  slideTo(index);
});

document.getElementById("prev").addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  slideTo(index);
});

slider.addEventListener("transitionend", () => {
  if (allSlides[index].getAttribute("data-clone") === "first") {
    slider.style.transition = "none";
    index = 1;
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  if (allSlides[index].getAttribute("data-clone") === "last") {
    slider.style.transition = "none";
    index = allSlides.length - 2;
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
  }
});

setInterval(() => {
  if (index >= allSlides.length - 1) return;
  index++;
  slideTo(index);
}, 3000);