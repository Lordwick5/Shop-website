const slider = document.getElementById("slider");
const slides = slider.querySelectorAll("img");
const dotsContainer = document.getElementById("dots");
let index = 1;

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.setAttribute("data-clone", "first");
lastClone.setAttribute("data-clone", "last");
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

const allSlides = slider.querySelectorAll("img");
let slideWidth = allSlides[0].clientWidth;
slider.style.transform = `translateX(-${slideWidth * index}px)`;

// Generate dot indicators
for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("span");
  dot.classList.add(
    "dot", "h-2", "w-2", "bg-gray-400", "rounded-full", 
    "inline-block", "mx-1", "cursor-pointer");
  if (i === 0) dot.classList.replace("bg-gray-400", "bg-yellow-400"); // yellow active
  
  if (i === 0) dot.classList.add("bg-black");
  dot.addEventListener("click", () => {
    index = i + 1;
    updateDots();
    slideTo(index);
  });
  dotsContainer.appendChild(dot);
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll("span");
  dots.forEach(dot => dot.classList.replace("bg-yellow-400", "bg-gray-400"));
  dots[(index - 1 + slides.length) % slides.length].classList.replace("bg-gray-400", "bg-yellow-400");

}

// Resize support
window.addEventListener("resize", () => {
  slideWidth = allSlides[0].clientWidth;
  slider.style.transition = "none";
  slider.style.transform = `translateX(-${slideWidth * index}px)`;
});

function slideTo(i) {
  slider.style.transition = "transform 0.6s ease-in-out";
  slider.style.transform = `translateX(-${slideWidth * i}px)`;
}

document.getElementById("next").addEventListener("click", () => {
  if (index >= allSlides.length - 1) return;
  index++;
  slideTo(index);
  updateDots();
});

document.getElementById("prev").addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  slideTo(index);
  updateDots();
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
  updateDots();
});

// Auto Slide
setInterval(() => {
  if (index >= allSlides.length - 1) return;
  index++;
  slideTo(index);
  updateDots();
}, 3000);

// Swipe Support
let startX = 0;
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  if (diff > 50) {
    // swipe left
    if (index < allSlides.length - 1) {
      index++;
      slideTo(index);
      updateDots();
    }
  } else if (diff < -50) {
    // swipe right
    if (index > 0) {
      index--;
      slideTo(index);
      updateDots();
    }
  }
});
