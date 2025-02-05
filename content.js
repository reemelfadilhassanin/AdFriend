// content.js - This script will replace ads with widgets

// Function to create a new widget element
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
  widget.innerHTML = "<h3>Positive Message: Keep Learning!</h3>"; // Text content
  return widget;
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

console.log("Ad replacement script loaded successfully!");
