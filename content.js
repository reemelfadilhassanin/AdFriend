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
      ads.forEach(ad => {
        // Replace the ad element's content with a positive message
        ad.innerHTML = `<div style="font-size: 18px; color: #4CAF50; text-align: center; padding: 10px; border-radius: 5px; background-color: #f0f8ff;">
                          <strong>${getRandomMessage()}</strong>
                        </div>`;
      });
    });
  }
  
  // Call the function to replace ads on the page
  replaceAdsWithPositiveContent();
  