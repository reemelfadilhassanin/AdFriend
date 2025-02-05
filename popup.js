// popup.js

// Get the button and status text elements
const toggleButton = document.getElementById('toggleAdBlocker');
const statusText = document.getElementById('status-text');

// Set up the initial state of the extension (enabled/disabled)
chrome.storage.local.get(['adBlockerEnabled'], function(result) {
  if (result.adBlockerEnabled === false) {
    statusText.textContent = 'Disabled';
    toggleButton.textContent = 'Enable Ad Blocker';
  } else {
    statusText.textContent = 'Enabled';
    toggleButton.textContent = 'Disable Ad Blocker';
  }
});

// Toggle the ad blocker state when the button is clicked
toggleButton.addEventListener('click', function() {
  chrome.storage.local.get(['adBlockerEnabled'], function(result) {
    const newStatus = !(result.adBlockerEnabled === false);

    // Update the status in storage
    chrome.storage.local.set({ adBlockerEnabled: newStatus }, function() {
      // Update the popup UI
      if (newStatus) {
        statusText.textContent = 'Enabled';
        toggleButton.textContent = 'Disable Ad Blocker';
      } else {
        statusText.textContent = 'Disabled';
        toggleButton.textContent = 'Enable Ad Blocker';
      }

      // Send a message to the background script to enable/disable the ad blocker
      chrome.runtime.sendMessage({ action: newStatus ? 'enable' : 'disable' });
    });
  });
});
