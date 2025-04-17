document.addEventListener('DOMContentLoaded', function() {
    const visibilityCheckbox = document.getElementById('widgetVisibility');
    const refreshButton = document.getElementById('refreshButton');
  
    // Load current visibility state
    chrome.storage.sync.get('widgetVisible', function(data) {
      visibilityCheckbox.checked = data.widgetVisible !== false;
    });
  
    // Save visibility state when checkbox changes
    visibilityCheckbox.addEventListener('change', function() {
      chrome.storage.sync.set({widgetVisible: visibilityCheckbox.checked});
      
      // Send message to content script to update visibility
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0] && tabs[0].url.includes('linkedin.com/in/')) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggleVisibility',
            visible: visibilityCheckbox.checked
          });
        }
      });
    });
  
    // Refresh widget data
    refreshButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0] && tabs[0].url.includes('linkedin.com/in/')) {
          chrome.tabs.sendMessage(tabs[0].id, {action: 'refreshData'});
        }
      });
    });
  });