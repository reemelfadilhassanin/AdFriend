document.addEventListener('DOMContentLoaded', function () {
  const enableButton = document.getElementById('enable');
  const disableButton = document.getElementById('disable');
  const statusText = document.getElementById('status-text');

  // Check the current state of ad-blocking from storage
  chrome.storage.sync.get(['adBlockingEnabled'], function(result) {
    const isAdBlockingEnabled = result.adBlockingEnabled;
    updateUI(isAdBlockingEnabled);
  });

  enableButton.addEventListener('click', function() {
    // Set ad-blocking to enabled
    chrome.storage.sync.set({ adBlockingEnabled: true }, function() {
      updateUI(true);
    });
  });

  disableButton.addEventListener('click', function() {
    // Set ad-blocking to disabled
    chrome.storage.sync.set({ adBlockingEnabled: false }, function() {
      updateUI(false);
    });
  });

  // Helper function to update UI based on ad-blocking state
  function updateUI(isAdBlockingEnabled) {
    if (isAdBlockingEnabled) {
      statusText.textContent = 'Ad Blocking is Enabled';
      enableButton.disabled = true;
      disableButton.disabled = false;
    } else {
      statusText.textContent = 'Ad Blocking is Disabled';
      enableButton.disabled = false;
      disableButton.disabled = true;
    }
  }
});
