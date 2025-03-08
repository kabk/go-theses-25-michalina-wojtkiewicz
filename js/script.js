// Mode Toggle
document.querySelector('.dark-mode-toggle').addEventListener('click', function() {
  if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('middle-mode');
    localStorage.setItem('mode', 'middle');
  } else if (document.body.classList.contains('middle-mode')) {
    document.body.classList.remove('middle-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('mode', 'dark');
  } else {
    document.body.classList.remove('dark-mode', 'middle-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('mode', 'light');
  }
});

// Check and apply the saved mode on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('mode') || 'light'; // Default to light mode
  document.body.classList.remove('light-mode', 'middle-mode', 'dark-mode'); // Reset classes
  document.body.classList.add(savedMode); // Apply the saved mode
});

// Get the bottom navigation bar
const navBar = document.querySelector('.bottom-nav');

// Function to check scroll position and switch navbar to fixed/sticky
const handleScroll = () => {
  const navbarHeight = navBar.offsetHeight;
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > navbarHeight) {
      navBar.classList.add('fixed');
  } else {
      navBar.classList.remove('fixed');
  }
};

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// On page load, set the navbar to be sticky initially
window.addEventListener('load', function() {
  const navbar = document.querySelector('.bottom-nav');
  navbar.style.position = 'sticky';
  navbar.style.top = '0';
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".bottom-nav");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) { // Adjust threshold if needed
      navbar.classList.add("sticky");
      darkModeToggle.style.opacity = "1"; // Show toggle
    } else {
      navbar.classList.remove("sticky");
      darkModeToggle.style.opacity = "0"; // Hide toggle
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".bottom-nav");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const imageContainer = document.querySelector(".image-container");
  const body = document.body;

  let modes = ["light-mode", "middle-mode", "dark-mode"];
  let currentModeIndex = 0;

  // Scroll event to make navbar sticky and show dark mode toggle
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) { // Adjust threshold if needed
      navbar.classList.add("sticky");
      darkModeToggle.style.opacity = "1"; // Show toggle
    } else {
      navbar.classList.remove("sticky");
      darkModeToggle.style.opacity = "0"; // Hide toggle
    }
  });

  // Click event on image-container to change modes
  imageContainer.addEventListener("click", function () {
    // Remove the current mode class
    body.classList.remove(modes[currentModeIndex]);

    // Move to the next mode
    currentModeIndex = (currentModeIndex + 1) % modes.length;

    // Add the new mode class
    body.classList.add(modes[currentModeIndex]);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;

  // Define the sections and their corresponding modes
  const sectionModes = {
    "intro": "middle-mode",
    "chap2": "dark-mode",
     "conclusion": "middle-mode",
    "bib": "light-mode",
    "chap4": "dark-mode",
    "chap1": "middle-mode",
    "abstract": "light-mode",
  };

  // Function to update mode
  function updateMode(newMode) {
    body.classList.remove("light-mode", "middle-mode", "dark-mode");
    body.classList.add(newMode);
    localStorage.setItem("mode", newMode);
  }

  // Intersection Observer to detect when sections come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionModes[sectionId]) {
          updateMode(sectionModes[sectionId]);
        }
      }
    });
  }, { threshold: 1 }); // Adjust threshold as needed

  // Observe sections
  Object.keys(sectionModes).forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) observer.observe(section);
  });

  // Apply the saved mode on page load
  const savedMode = localStorage.getItem("mode") || "light-mode";
  updateMode(savedMode);
});
