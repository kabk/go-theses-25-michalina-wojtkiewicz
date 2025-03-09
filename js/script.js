document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".bottom-nav");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const imageContainer = document.querySelector(".image-container");
  const body = document.body;

  let modes = ["light-mode", "middle-mode", "dark-mode"];
  let currentModeIndex = 0;

  // Keep navbar sticky on scroll
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("sticky");
      darkModeToggle.style.opacity = "1"; 
    } else {
      navbar.classList.remove("sticky");
      darkModeToggle.style.opacity = "0"; 
    }
  }

  window.addEventListener("scroll", handleScroll);

  // Load saved mode
  const savedMode = localStorage.getItem("mode") || "light-mode";
  body.classList.add(savedMode);

  // Dark mode toggle functionality
  darkModeToggle.addEventListener("click", function () {
    if (body.classList.contains("light-mode")) {
      body.classList.replace("light-mode", "middle-mode");
      localStorage.setItem("mode", "middle-mode");
    } else if (body.classList.contains("middle-mode")) {
      body.classList.replace("middle-mode", "dark-mode");
      localStorage.setItem("mode", "dark-mode");
    } else {
      body.classList.replace("dark-mode", "light-mode");
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

  // Section mode observer
  const sectionModes = {
    preface: "middle-mode", // Add preface mode if needed
    intro: "middle-mode",
    chap2: "dark-mode",
    conclusion: "middle-mode",
    bib: "light-mode",
    chap4: "dark-mode",
    chap1: "middle-mode",
    abstract: "light-mode",
  };

  function updateMode(newMode) {
    body.classList.remove("light-mode", "middle-mode", "dark-mode");
    body.classList.add(newMode);
    localStorage.setItem("mode", newMode);

    // Ensure navbar remains sticky after mode change
    if (window.scrollY > 50) {
      navbar.classList.add("sticky");
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionModes[sectionId]) {
            updateMode(sectionModes[sectionId]);
          }
        }
      });

      // Keep navbar sticky even after a section change
      handleScroll();
    },
    { threshold: 0.5 } // Lowered threshold so navbar doesn't disappear before section transition
  );

  Object.keys(sectionModes).forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) observer.observe(section);
  });

  // Ensure navbar remains sticky after mode change
  handleScroll();
});
