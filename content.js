// content.js - This script will replace ads with widgets

console.log("Replacing ads with positive content");

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

// Function to create a new widget element with a random positive message
function createWidget() {
  let widget = document.createElement('div');
  widget.style.position = 'absolute'; // Position it above other content
  widget.style.top = '20px'; // Adjust the position on the page
  widget.style.left = '20px'; // Adjust the position on the page
  widget.style.border = '2px solid #4CAF50'; // Styling for the widget
  widget.style.padding = '15px'; // Add some padding for readability
  widget.style.backgroundColor = '#e0f7e0'; // Greenish background
  widget.style.zIndex = '9999'; // Ensure it's above other content
  widget.style.color = '#000'; // Text color
  widget.style.fontSize = '18px'; // Font size for readability
  widget.style.fontWeight = 'bold'; // Make the text bold
  widget.style.textAlign = 'center'; // Center the text
  
  // Use the random positive message from the positiveContentWidgets array
  widget.innerHTML = `<h3>${getRandomMessage()}</h3>`; // Insert the random message into the widget

  return widget;
}

// Replace ad elements with positive content
function replaceAdsWithPositiveContent() {
  // List of CSS selectors that are typically used for ads
  const adSelectors = [
    ".ad-container",      // Generic ad container class
    ".advertisement",     // Another common ad class
    "#ads",               // Specific ad ID
    ".banner-ad",         // Banner ad class
    ".ad-slot",           // Ad slot class
  ];

  adSelectors.forEach(selector => {
    // Find elements matching the ad selector
    const ads = document.querySelectorAll(selector);
    if (ads.length > 0) {
      console.log("Ads found, replacing with positive content.");
      ads.forEach(ad => {
        // Replace the ad element's content with a positive message
        ad.innerHTML = `<div style="font-size: 18px; color: #4CAF50; text-align: center; padding: 10px; border-radius: 5px; background-color: #f0f8ff;">
                          <strong>${getRandomMessage()}</strong>
                        </div>`;
      });
    } else {
      console.log("No ads found with selector: " + selector);
    }
  });
}

// Function to replace ads with widgets
function replaceAds() {
  // Target ad containers based on common classes/IDs used by ads
  let adContainers = document.querySelectorAll('.ads, .ad-container, iframe, div[id*="ad"], div[class*="ad"], .google-ads, .adblock');
  
  // Log how many ads are being found
  console.log(`Found ${adContainers.length} ad(s) to replace.`);

  adContainers.forEach(ad => {
    let widget = createWidget();
    // Replace ad with the widget
    ad.parentNode.replaceChild(widget, ad);
    console.log('Ad replaced with widget.');
  });
}

// Run replaceAds() on page load
window.onload = replaceAds;

// Also run after a delay in case ads are dynamically loaded
setInterval(replaceAds, 3000);

// Call the function to replace ads with positive content
replaceAdsWithPositiveContent();

console.log("Ad replacement script loaded successfully!");
