document.addEventListener('DOMContentLoaded', function () {
  const enableButton = document.getElementById('enable');
  const disableButton = document.getElementById('disable');
  const statusText = document.getElementById('status-text');

  // Fetch the current state of ad-blocker from storage
  chrome.storage.local.get(['adBlockerEnabled'], function(result) {
    if (result.adBlockerEnabled === true) {
      // Ad-blocking is enabled
      enableButton.disabled = true;
      disableButton.disabled = false;
      statusText.textContent = 'Ad Blocking is Enabled';
    } else {
      // Ad-blocking is disabled
      enableButton.disabled = false;
      disableButton.disabled = true;
      statusText.textContent = 'Ad Blocking is Disabled';
    }
  });

  // Enable ad-blocking when the 'Enable' button is clicked
  enableButton.addEventListener('click', function () {
    chrome.storage.local.set({ adBlockerEnabled: true }, function() {
      // Send message to the background to enable blocking
      chrome.runtime.sendMessage({ action: 'enable' });

      // Update UI after enabling
      enableButton.disabled = true;
      disableButton.disabled = false;
      statusText.textContent = 'Ad Blocking is Enabled';
    });
  });

  // Disable ad-blocking when the 'Disable' button is clicked
  disableButton.addEventListener('click', function () {
    chrome.storage.local.set({ adBlockerEnabled: false }, function() {
      // Send message to the background to disable blocking
      chrome.runtime.sendMessage({ action: 'disable' });

      // Update UI after disabling
      enableButton.disabled = false;
      disableButton.disabled = true;
      statusText.textContent = 'Ad Blocking is Disabled';
    });
  });
});
