// Background script for blocking ads using declarativeNetRequest

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
