let removedAds = [];

// Function to replace ads with the widget and block ads
function replaceAdsWithWidget() {
  const adSelectors = [
    'div[id*="ad"]', 'div[class*="ad"]', 'iframe[src*="ad"]', 'img[src*="ad"]', 'script[src*="ads"]', '.ad-container',
    '.advertisement', '.ad-banner', 'div[data-ad*=""]', 'div[role="advertisement"]',
    '[id^="ad-"]', '[class*="ad-"]', '[class*="advert"]', '[src*="ad"]'
  ];

  // Find and remove all ads matching the selectors
  const adElements = document.querySelectorAll(adSelectors.join(', '));
  console.log('Ads found to replace:', adElements); // Log ads found

  if (adElements.length === 0) {
    console.log('No ads found to replace.');
    createWidget(); // Create widget even if no ads are found
    return;
  }

  // Remove all ad elements from the DOM and replace with widget
  adElements.forEach((ad, index) => {
    console.log(`Removing ad ${index + 1}:`, ad); // Log each ad removal
    ad.remove(); // Remove the ad element completely from the DOM
    removedAds.push(ad); // Keep track of removed ads
    createWidget(); // Replace ad with widget
  });

  // Monitor dynamically added nodes and remove ads if they appear later
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.matches(adSelectors.join(', '))) {
          console.log('Blocking dynamically added ad:', node);
          node.remove();  // Remove the ad from the DOM
          removedAds.push(node); // Track removed ad
          createWidget(); // Replace ad with widget
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
  });

  console.log('MutationObserver for dynamic ads started.');
}

  
  // Function to inject Animate.css asynchronously
  function injectAnimateCSS() {
    try {
      if (document.querySelector('.animate__animated')) return; // Avoid reloading if already injected
      const linkAnimateCSS = document.createElement('link');
      linkAnimateCSS.rel = 'stylesheet';
      linkAnimateCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
      linkAnimateCSS.onload = () => console.log('Animate.css loaded');
      document.head.appendChild(linkAnimateCSS);
      console.log("Animate.css injected successfully.");
    } catch (error) {
      console.error("Error injecting Animate.css:", error);
    }
  }
  
  // Function to create the widget
  function createWidget() {
    try {
      let widget = document.createElement('div');
      const navHeight = getTopNavHeight();
      console.log("Navbar height:", navHeight);
  
      widget.style.position = 'fixed'; // Fixed position to ensure it's on top but doesn't affect layout
      widget.style.top = `${navHeight + 50}px`; // Increase distance from the navbar to avoid overlap
      widget.style.left = '20px';
      widget.style.zIndex = '9999'; // Ensure the widget is above any content
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
          // DO NOT restore ads, as ads should not be restored after closing widget
        });
      });
  
      // Append the widget to the body
      document.body.appendChild(widget);
      console.log('Widget appended to the body.');
  
      return widget;
    } catch (error) {
      console.error("Error creating widget:", error);
    }
  }
  
  // Function to get random messages
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
  
  // Function to observe mutations in the DOM (for dynamic content)
  function observeMutations() {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'subtree') {
          console.log('Mutation detected, checking for ads...');
          replaceAdsWithWidget(); // Re-check for ads after DOM changes
        }
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
    console.log('Mutation observer started.');
  }
  
  // Function to handle CORS issues
  function handleCORS(url) {
    try {
      fetch(url, { mode: 'no-cors' })
        .then(response => {
          if (response.ok) {
            console.log('CORS request successful.');
          } else {
            console.log('CORS request failed with status: ' + response.status);
          }
        })
        .catch(error => console.error('CORS fetch error:', error));
    } catch (error) {
      console.error('Error in handling CORS:', error);
    }
  }
  
  // Retry logic for failed resources (503 errors)
  function retryRequest(url, retries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
      function attemptRequest(attempt) {
        fetch(url)
          .then(response => {
            if (response.ok) {
              resolve(response);
            } else {
              if (attempt < retries) {
                console.log(`Request failed, retrying... Attempt ${attempt + 1}`);
                setTimeout(() => attemptRequest(attempt + 1), delay);
              } else {
                reject('Request failed after ' + retries + ' attempts');
              }
            }
          })
          .catch(reject);
      }
      attemptRequest(0);
    });
  }
  
  // Function to handle 403 errors (Forbidden)
  function handle403Error(url) {
    console.error(`403 Forbidden error when trying to access ${url}. You may need to check access permissions.`);
  }
  
  // Function to initialize everything
  function init() {
    // Check if ad-blocking is enabled
    chrome.storage.sync.get(['adBlockingEnabled'], function(result) {
      const isAdBlockingEnabled = result.adBlockingEnabled;
  
      console.log('Ad blocking enabled:', isAdBlockingEnabled); // Log the ad-blocking setting
      if (isAdBlockingEnabled) {
        // Enable ad-blocking logic: Replace ads with the widget
        replaceAdsWithWidget();
      } else {
        console.log('Ad blocking is disabled.');
      }
    });
  
    handleCORS('https://prebid.smilewanted.com/');
    retryRequest('https://cs.lkqd.net/cs?partnerId=59&partnerUserId=CAESEBQYnugWU6tP6glVlLlebAI&google_cver=1')
      .then(response => console.log('Request succeeded:', response))
      .catch(error => console.log('Request failed:', error));
  
    handle403Error('https://prebid.smilewanted.com/');
  }
  
  // Initialize everything
  init();
  
  // Ensure Animate.css is loaded for animations
  injectAnimateCSS();
  
  console.log("Ad replacement script executed successfully!");
  