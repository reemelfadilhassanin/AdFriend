console.log("Ad replacement script loaded successfully!");

// List of possible positive content widgets to replace ads with
const positiveContentWidgets = [
  "Stay positive! 🌟 You can do it!",
  "Take a break and stretch! 🧘‍♂️",
  "Have you done your burpees today? 🤸‍♀️",
  "Keep going! Every step brings you closer to your goal! 🚀",
  "Remember: Progress is progress, no matter how small! ✨"
];

// Function to randomly select a positive message
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * positiveContentWidgets.length);
  return positiveContentWidgets[randomIndex];
}

// Function to inject Bootstrap Icons (only for the icon, not global Bootstrap CSS)
function injectBootstrapIcons() {
  try {
    const linkIcons = document.createElement('link');
    linkIcons.rel = 'stylesheet';
    linkIcons.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    document.head.appendChild(linkIcons);
  } catch (error) {
    console.error("Error injecting Bootstrap Icons:", error);
  }
}

// Function to inject Animate.css for animations
function injectAnimateCSS() {
  try {
    const linkAnimateCSS = document.createElement('link');
    linkAnimateCSS.rel = 'stylesheet';
    linkAnimateCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    document.head.appendChild(linkAnimateCSS);
  } catch (error) {
    console.error("Error injecting Animate.css:", error);
  }
}

// Function to get the height of the top navigation bar
function getTopNavHeight() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');

  if (header) {
    return header.offsetHeight;
  } else if (nav) {
    return nav.offsetHeight;
  }

  return 80; // Default height if no header or nav found
}

// Function to create a Bootstrap-styled widget with an icon and message
function createWidget() {
  try {
    let widget = document.createElement('div');
    const navHeight = getTopNavHeight();
    console.log("Navbar height:", navHeight);

    // Add custom styles directly to the widget to prevent global style interference
    widget.style.position = 'fixed'; // Fixed position to ensure it's on top but doesn't affect layout
    widget.style.top = `${navHeight + 10}px`; // Position the widget below the navigation bar with some padding
    widget.style.left = '20px';
    widget.style.zIndex = '9998'; // Ensure the widget is below the navbar
    widget.style.padding = '20px 25px'; // Padding for readability
    widget.style.background = 'linear-gradient(135deg, #4A90E2, #81C784)'; // Gradient background
    widget.style.color = '#ffffff'; // White text for better contrast
    widget.style.fontSize = '20px'; // Larger font size for readability
    widget.style.fontWeight = 'bold'; // Bold text
    widget.style.textAlign = 'center'; // Center the text
    widget.style.borderRadius = '15px'; // Rounded corners
    widget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)'; // Deeper shadow for better depth
    widget.style.transition = 'all 0.3s ease-in-out'; // Smooth transition for any hover effects
    widget.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-1s'); // Animation classes

    // Adding the icon and the random message
    widget.innerHTML = `
      <i class="fas fa-smile-beam"></i> <strong>${getRandomMessage()}</strong>
      <button type="button" class="close" style="font-size: 28px; color: #ffffff; background: transparent; border: none;">&times;</button>
    `;

    // Add hover effect for widget appearance
    widget.addEventListener('mouseenter', () => {
      widget.style.transform = 'scale(1.05)'; // Slightly scale up on hover
    });
    widget.addEventListener('mouseleave', () => {
      widget.style.transform = 'scale(1)'; // Reset scale on mouse leave
    });

    // Function to trigger the surprise animation
    function triggerSurpriseAnimation() {
      widget.classList.add('animate__animated', 'animate__shakeX');
      
      // Remove the animation class after it ends to allow it to trigger again if clicked
      widget.addEventListener('animationend', () => {
        widget.classList.remove('animate__shakeX');
      });
    }

    // Trigger surprise animation when the widget is clicked
    widget.addEventListener('click', triggerSurpriseAnimation);

    // Add click event listener to close the widget when the close button is clicked
    const closeButton = widget.querySelector('.close');
    closeButton.addEventListener('click', () => {
      triggerSurpriseAnimation(); // Trigger the surprise animation on close button click
      setTimeout(() => {
        widget.remove();  // Remove the widget after animation completes
        console.log('Widget closed.');
      }, 1000); // Delay removal by the duration of the animation
    });

    return widget;
  } catch (error) {
    console.error("Error creating widget:", error);
  }
}

// Function to replace ads with widgets
function replaceAds() {
  try {
    // Check if a widget already exists
    let existingWidget = document.querySelector('div[style*="position: fixed"]');

    if (existingWidget) {
      // If a widget already exists, do not remove it unnecessarily
      console.log("Widget already exists, skipping replacement.");
      return; // Skip replacement
    }

    // List of ad containers to replace
    let adContainers = document.querySelectorAll('.ads, .ad-container, iframe, div[id*="ad"], div[class*="ad"], .google-ads, .adblock');

    // Log how many ads are being found
    console.log(`Found ${adContainers.length} ad(s) to replace.`);

    // Only add the widget if there are ads found
    if (adContainers.length > 0) {
      let widget = createWidget();
      adContainers.forEach(ad => {
        // Check if the ad container exists before replacing
        if (ad && ad.parentNode) {
          ad.parentNode.replaceChild(widget, ad);
          console.log('Ad replaced with widget.');
        }
      });

      // Ensure the GitHub navbar is above the widget
      const navbar = document.querySelector('header, nav');
      if (navbar) {
        navbar.style.zIndex = '10000';  // Set navbar to have the highest z-index
        console.log("Navbar z-index set to 10000");
      }
    } else {
      console.log("No ads found to replace.");
    }
  } catch (error) {
    console.error('Error while replacing ads:', error);
  }
}

// Delay to ensure the page and ads are fully loaded
window.addEventListener('load', () => {
  replaceAds();
});

// Run replaceAds() every 6 seconds in case ads are dynamically loaded
setInterval(replaceAds, 6000);

console.log("Ad replacement script executed successfully!");

