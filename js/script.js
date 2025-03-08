document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".bottom-nav");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const imageContainer = document.querySelector(".image-container");
  const body = document.body;

  let modes = ["light-mode", "middle-mode", "dark-mode"];
  let currentModeIndex = 0;

  // Smoothly move navbar up when scrolling
  function handleScroll() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    
    // Control speed (adjust multiplier if needed)
    let newTop = (scrollPosition / maxScroll) * (window.innerHeight - navbar.offsetHeight) * 1.5; 
    
    navbar.style.transform = `translateY(-${newTop}px)`;
  }

  // Add smooth transition in CSS
  navbar.style.transition = "transform 0.3s ease-out";

  // Listen for scroll events
  window.addEventListener("scroll", handleScroll);

  // Initial mode handling (from localStorage)
  const savedMode = localStorage.getItem("mode") || "light-mode";
  body.classList.add(savedMode);

  // Dark mode toggle functionality
  darkModeToggle.addEventListener("click", function () {
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("middle-mode");
      localStorage.setItem("mode", "middle-mode");
    } else if (body.classList.contains("middle-mode")) {
      body.classList.remove("middle-mode");
      body.classList.add("dark-mode");
      localStorage.setItem("mode", "dark-mode");
    } else {
      body.classList.remove("dark-mode", "middle-mode");
      body.classList.add("light-mode");
      localStorage.setItem("mode", "light-mode");
    }
  });

  // Click event on image-container to change modes
  imageContainer.addEventListener("click", function () {
    body.classList.remove(modes[currentModeIndex]);
    currentModeIndex = (currentModeIndex + 1) % modes.length;
    body.classList.add(modes[currentModeIndex]);
    localStorage.setItem("mode", modes[currentModeIndex]);
  });

  // Intersection Observer to detect section changes and update mode accordingly
  const sectionModes = {
    "intro": "middle-mode",
    "chap2": "dark-mode",
    "conclusion": "middle-mode",
    "bib": "light-mode",
    "chap4": "dark-mode",
    "chap1": "middle-mode",
    "abstract": "light-mode",
  };

  function updateMode(newMode) {
    body.classList.remove("light-mode", "middle-mode", "dark-mode");
    body.classList.add(newMode);
    localStorage.setItem("mode", newMode);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionModes[sectionId]) {
          updateMode(sectionModes[sectionId]);
        }
      }
    });
  }, { threshold: 1 });

  Object.keys(sectionModes).forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) observer.observe(section);
  });
});

