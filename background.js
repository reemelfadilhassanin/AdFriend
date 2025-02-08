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
function applyBlockingRules() {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: adBlockingRules
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Failed to add blocking rules:", chrome.runtime.lastError);
    } else {
      console.log("Blocking rules applied successfully.");
    }
  });
}

// Function to remove the blocking rules
function removeBlockingRules() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2]
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Failed to remove blocking rules:", chrome.runtime.lastError);
    } else {
      console.log("Blocking rules removed successfully.");
    }
  });
}

// Listen for messages to enable/disable ad-blocking
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'enable') {
    console.log("Enabling ad-blocking...");
    applyBlockingRules();
    chrome.storage.local.set({ adBlockerEnabled: true });
  } else if (request.action === 'disable') {
    console.log("Disabling ad-blocking...");
    removeBlockingRules();
    chrome.storage.local.set({ adBlockerEnabled: false });
  }
});

// Ensure the background script starts with the correct blocking rules based on the stored state
chrome.storage.local.get(['adBlockerEnabled'], function(result) {
  if (result.adBlockerEnabled === true) {
    applyBlockingRules();
  } else {
    removeBlockingRules();
  }
});

// List of positive content widgets (optional feature)
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
      color: "#4A90E2"  // Set the badge background color (green)
  });

  console.log(`Icon updated with positive message: ${message}`);
}

// Example: Update the icon when the extension starts or at regular intervals
updateIconWithPositiveMessage();

// You can also update the icon periodically or based on specific events
setInterval(updateIconWithPositiveMessage, 6000);  // Update the icon every 6 seconds

