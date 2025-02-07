// Background script for blocking ads using declarativeNetRequest

// List of possible positive content widgets (same as in content.js)
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

// Function to update the extension's icon with a positive message
function updateIconWithPositiveMessage() {
  // Get a random positive message
  const message = getRandomMessage();

  // Set the extension's icon to reflect the positive message
  chrome.action.setIcon({
      path: {
          16: "icons/icon-16.png",  // Use your icon paths
          48: "icons/icon-48.png",
          128: "icons/icone-128.png"
      }
  });

  // Optionally, update the badge with part of the message (up to the first 4 characters)
  chrome.action.setBadgeText({
      text: message.substring(0, 4) // Limit the message length for the badge text (first 4 chars)
  });

  chrome.action.setBadgeBackgroundColor({
      color: "#4CAF50"  // Set the badge background color (green)
  });

  console.log(`Icon updated with positive message: ${message}`);
}

// Define the ad-blocking rules
const adBlockingRules = [
{
  id: 1,
  priority: 1,
  action: { type: "block" },
  condition: {
    urlFilter: "*://*.google.com/ads/*",  // Block Google Ads
    resourceTypes: ["image", "script", "xmlhttprequest"]
  }
},
{
  id: 2,
  priority: 1,
  action: { type: "block" },
  condition: {
    urlFilter: "*://*.doubleclick.net/*",  // Block DoubleClick Ads
    resourceTypes: ["image", "script", "xmlhttprequest"]
  }
}
];

// Function to apply the blocking rules
chrome.declarativeNetRequest.updateDynamicRules({
addRules: adBlockingRules
}, () => {
if (chrome.runtime.lastError) {
  console.error("Failed to add blocking rules:", chrome.runtime.lastError);
} else {
  console.log("Blocking rules applied successfully.");
}
});

// Listen for messages to enable/disable ad-blocking
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
if (request.action === 'enable') {
  console.log("Enabling ad-blocking...");
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: adBlockingRules
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Error enabling blocking rules:", chrome.runtime.lastError);
    } else {
      console.log("Ad-blocking enabled successfully.");
    }
  });
} else if (request.action === 'disable') {
  console.log("Disabling ad-blocking...");
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2]
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Error disabling blocking rules:", chrome.runtime.lastError);
    } else {
      console.log("Ad-blocking disabled successfully.");
    }
  });
}
});

// Example: Update the icon when the extension starts or at regular intervals
updateIconWithPositiveMessage();

// You can also update the icon periodically or based on specific events
setInterval(updateIconWithPositiveMessage, 6000);  // Update the icon every minute
