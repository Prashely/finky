// Testimonial Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  const testimonials = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".carousel-dot");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const imageThumbnails = document.querySelectorAll("[data-image]");
  const mainImage = document.getElementById("testimonial-image");

  let currentIndex = 0;
  const totalTestimonials = testimonials.length;

  // Initialize carousel
  function updateCarousel() {
    testimonials.forEach((testimonial, index) => {
      if (index === currentIndex) {
        testimonial.classList.add("active");
        testimonial.style.opacity = "1";
        testimonial.style.position = "relative";
      } else {
        testimonial.classList.remove("active");
        testimonial.style.opacity = "0";
        testimonial.style.position = "absolute";
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove("bg-gray-300");
        dot.classList.add("bg-pink-500", "active");
        dot.style.transform = "scale(1.3)";
      } else {
        dot.classList.remove("bg-pink-500", "active");
        dot.classList.add("bg-gray-300");
        dot.style.transform = "scale(1)";
      }
    });
  }

  // Next testimonial
  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateCarousel();
  }

  // Previous testimonial
  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    updateCarousel();
  }

  // Go to specific testimonial
  function goToTestimonial(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextTestimonial);
  prevBtn.addEventListener("click", prevTestimonial);

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      goToTestimonial(index);
    });
  });

  // Auto-rotate carousel every 8 seconds
  let carouselInterval = setInterval(nextTestimonial, 8000);

  // Pause auto-rotation on hover
  const carouselContainer = document.querySelector(".testimonial-carousel");
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(carouselInterval);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    carouselInterval = setInterval(nextTestimonial, 8000);
  });

  // Image thumbnail click functionality
  imageThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const newImageSrc = this.getAttribute("data-image");
      mainImage.src = newImageSrc;

      // Update active thumbnail
      imageThumbnails.forEach((thumb) => {
        thumb.classList.remove("border-pink-400");
        thumb.classList.add("border-transparent");
      });
      this.classList.remove("border-transparent");
      this.classList.add("border-pink-400");
    });
  });

  // Initialize
  updateCarousel();

  // Add entrance animation
  setTimeout(() => {
    document.querySelector(".testimonial-carousel").style.opacity = "1";
  }, 300);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Add active class to nav links on scroll
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-pink-600");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-pink-600");
    }
  });
});
