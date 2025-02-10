// Function to replace an ad with a widget
const replaceAdWithWidget = (ad) => {
  console.log('Attempting to replace ad with widget...');

  // Check if the widget already exists to avoid redundant replacements
  if (document.querySelector('.ad-widget')) {
    console.log('Widget already exists, skipping replacement.');
    return; // Skip replacement if widget exists
  }

  // Create and insert the widget
  const widget = createWidget(); // Assuming `createWidget()` is a function that creates the widget
  if (!widget) {
    console.error("Widget creation failed.");
    return; // Exit if widget creation failed
  }

  ad.replaceWith(widget); // Replace the ad with the widget
  console.log('Ad replaced with widget.');
};

// Function to replace all ads on the page
const replaceAds = () => {
  const ads = document.querySelectorAll('.ad-element'); // Assuming ads are identified with '.ad-element'
  console.log('Found ads:', ads); // Debug: check if ads are found

  if (ads.length === 0) {
    console.log('No ads found to replace.');
  }
  ads.forEach(ad => {
    replaceAdWithWidget(ad); // Call the function to replace each ad with a widget
  });
};

// Function to handle DOM changes and ensure ad replacements happen after React components are loaded
const handlePageLoad = () => {
  // Delay ad replacement to ensure the page is fully loaded
  setTimeout(() => {
    replaceAds(); // Call replaceAds after a short delay (adjustable)
  }, 2000); // 2 seconds delay (adjust the delay if needed)
};

// Using MutationObserver to watch for changes in the DOM and replace ads when added
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Check if ads were added to the DOM and replace them
      console.log('Mutation detected, checking for ads...');
      replaceAds();
    }
  }
});

// Start observing the document body for any added or removed child nodes (subtree)
observer.observe(document.body, { childList: true, subtree: true });

// Run the page load handler once to ensure we replace ads immediately on initial load
handlePageLoad();

// Function to get a random positive message from a list
function getRandomMessage() {
  const positiveMessages = [
    "Stay positive! 🌟 You can do it!",
    "Take a break and stretch! 🧘‍♂️",
    "Have you done your burpees today? 🤸‍♀️",
    "Keep going! Every step brings you closer to your goal! 🚀",
    "Remember: Progress is progress, no matter how small! ✨"
  ];
  const randomIndex = Math.floor(Math.random() * positiveMessages.length);
  return positiveMessages[randomIndex];
}

// Function to inject Animate.css for animations
function injectAnimateCSS() {
  try {
    const linkAnimateCSS = document.createElement('link');
    linkAnimateCSS.rel = 'stylesheet';
    linkAnimateCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    document.head.appendChild(linkAnimateCSS);
    console.log("Animate.css injected successfully.");
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

// Function to create a widget with an emoji icon and message
function createWidget() {
  try {
    let widget = document.createElement('div');
    const navHeight = getTopNavHeight();
    console.log("Navbar height:", navHeight);

    // Add custom styles directly to the widget to prevent global style interference
    widget.style.position = 'fixed'; // Fixed position to ensure it's on top but doesn't affect layout
    widget.style.top = `${navHeight + 50}px`; // Increase distance from the navbar to avoid overlap
    widget.style.left = '20px';
    widget.style.zIndex = '9999'; // Ensure the widget is above the ads, ensure it's visible
    widget.style.padding = '20px 25px'; // Padding for readability
    widget.style.background = 'linear-gradient(135deg, #4A90E2, #81C784)'; // Gradient background
    widget.style.color = '#ffffff'; // White text for better contrast
    widget.style.fontSize = '18px'; // Slightly smaller font size for better fit
    widget.style.fontWeight = 'bold'; // Bold text
    widget.style.textAlign = 'center'; // Center the text
    widget.style.borderRadius = '15px'; // Rounded corners
    widget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)'; // Deeper shadow for better depth
    widget.style.transition = 'all 0.3s ease-in-out'; // Smooth transition for any hover effects
    widget.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-1s'); // Animation classes

    // Adding the emoji icon and the random message
    widget.innerHTML = ` 
      <span style="font-size: 30px;">😊</span> <strong>${getRandomMessage()}</strong>
      <button type="button" class="close" style="font-size: 28px; color: #ffffff; background: transparent; border: none;">&times;</button>
    `;

    // Force visibility by giving the widget dimensions and background color
    widget.style.width = '300px';
    widget.style.height = '150px';
    widget.style.maxHeight = '150px'; // Prevents the widget from growing too tall
    widget.style.overflow = 'hidden'; // Hides overflow content if any

    // Log the widget styles and position to ensure it's being created
    console.log('Widget created:', widget);
    console.log('Widget styles:', widget.style);

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
      // Add fade-out animation before removing the widget
      widget.classList.add('animate__fadeOut'); // Fade-out animation class from Animate.css
      // After the fade-out animation ends, remove the widget from the DOM
      widget.addEventListener('animationend', () => {
        widget.remove();  // Remove the widget after the fade-out animation completes
        console.log('Widget closed.');
      });
    });

    // Directly append the widget to the body for testing
    document.body.appendChild(widget);
    console.log('Widget appended to the body.');

    return widget;
  } catch (error) {
    console.error("Error creating widget:", error);
  }
}

// Ensure Animate.css is loaded for animations
injectAnimateCSS();

// Directly test by creating and appending the widget
window.onload = () => {
  createWidget();
};

console.log("Ad replacement script executed successfully!");
