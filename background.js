// background.js (Service Worker)

// Define ad-blocking rules using declarativeNetRequest API
chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "block"
        },
        condition: {
          urlFilter: "ads.google.com", // Block Google Ads
          resourceTypes: ["image", "script", "xmlhttprequest"]
        }
      },
      {
        id: 2,
        priority: 1,
        action: {
          type: "block"
        },
        condition: {
          urlFilter: "ad.doubleclick.net", // Block DoubleClick Ads
          resourceTypes: ["image", "script", "xmlhttprequest"]
        }
      }
    ],
    removeRuleIds: [1, 2] // Removes any old rules that match the same IDs
  });
  
  // Listen for incoming messages from the popup or other parts of the extension to enable/disable ad-blocking
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'enable') {
      // Re-enable ad-blocking rules
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1,
            priority: 1,
            action: {
              type: "block"
            },
            condition: {
              urlFilter: "ads.google.com",
              resourceTypes: ["image", "script", "xmlhttprequest"]
            }
          },
          {
            id: 2,
            priority: 1,
            action: {
              type: "block"
            },
            condition: {
              urlFilter: "ad.doubleclick.net",
              resourceTypes: ["image", "script", "xmlhttprequest"]
            }
          }
        ]
      });
    } else if (request.action === 'disable') {
      // Remove ad-blocking rules when disabled
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1, 2]
      });
    }
  });
  
  // Additional ad-blocking with chrome.webRequest (Optional)
  // This listens for requests to Google Ads and DoubleClick and blocks them as they come in.
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Log blocked requests for debugging (optional)
      console.log('Blocking request:', details.url); // Optionally log blocked URLs
      return { cancel: true }; // Block the request
    },
    {
      urls: ["*://*.google.com/ads/*", "*://*.doubleclick.net/*"], // More domains to block
      types: ["script", "image"]
    },
    ["blocking"]
  );
  
  // Display a notification when an ad is blocked (optional)
  chrome.notifications.create("adBlocked", {
    type: "basic",
    iconUrl: "icons/icon-48.png",
    title: "Ad Blocked",
    message: "An ad has been blocked on the page you're viewing."
  });
  