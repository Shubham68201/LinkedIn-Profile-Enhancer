(function() {
    // Sample data (in a real extension, this would come from an API)
    const companyData = {
      companyName: "TechCorp",
      matchScore: 86,
      accountStatus: "Target"
    };
  
    let widgetVisible = true;
    let widget = null;
    let dragOffset = { x: 0, y: 0 };
    let isDragging = false;
  
    // Load widget visibility preference
    chrome.storage.sync.get('widgetVisible', function(data) {
      widgetVisible = data.widgetVisible !== false;
      createWidget();
    });
  
    function createWidget() {
      // If widget already exists, remove it
      if (widget) {
        widget.remove();
      }
  
      // Create widget elements
      widget = document.createElement('div');
      widget.className = 'company-widget';
      widget.style.display = widgetVisible ? 'block' : 'none';
  
      // Create widget content
      widget.innerHTML = `
        <div class="widget-header">
          <div class="widget-drag-handle">☰</div>
          <h3 class="widget-title">Company Insights</h3>
          <button class="widget-close">✕</button>
        </div>
        <div class="company-name">${companyData.companyName}</div>
        <div class="match-score-container">
          <div class="match-score-label">
            <span>Match Score</span>
            <span>${companyData.matchScore}/100</span>
          </div>
          <div class="progress-bar">
            <div class="progress-value" style="width: ${companyData.matchScore}%"></div>
          </div>
        </div>
        <div class="account-status ${companyData.accountStatus === 'Target' ? 'status-target' : 'status-not-target'}">
          ${companyData.accountStatus}
        </div>
      `;
  
      // Add the widget to the page
      document.body.appendChild(widget);
  
      // Add event listeners
      widget.querySelector('.widget-close').addEventListener('click', function() {
        widget.style.display = 'none';
        widgetVisible = false;
        chrome.storage.sync.set({widgetVisible: false});
      });
  
      // Make widget draggable
      const dragHandle = widget.querySelector('.widget-drag-handle');
      dragHandle.addEventListener('mousedown', startDrag);
    }
  
    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
      
      // Get the initial position of the mouse and the widget
      const widgetRect = widget.getBoundingClientRect();
      dragOffset.x = e.clientX - widgetRect.left;
      dragOffset.y = e.clientY - widgetRect.top;
      
      // Add event listeners for dragging
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
    }
  
    function drag(e) {
      if (!isDragging) return;
      
      // Calculate new position
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      
      // Apply new position
      widget.style.left = `${x}px`;
      widget.style.top = `${y}px`;
      widget.style.right = 'auto';
    }
  
    function stopDrag() {
      isDragging = false;
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
    }
  
    function updateWidgetData(data) {
      if (!widget) return;
      
      widget.querySelector('.company-name').textContent = data.companyName;
      
      const scoreContainer = widget.querySelector('.match-score-label');
      scoreContainer.querySelector('span:last-child').textContent = `${data.matchScore}/100`;
      
      const progressBar = widget.querySelector('.progress-value');
      progressBar.style.width = `${data.matchScore}%`;
      
      const statusElement = widget.querySelector('.account-status');
      statusElement.textContent = data.accountStatus;
      statusElement.className = `account-status ${data.accountStatus === 'Target' ? 'status-target' : 'status-not-target'}`;
    }
  
    // Listen for messages from the popup
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message.action === 'toggleVisibility') {
        widgetVisible = message.visible;
        if (widget) {
          widget.style.display = widgetVisible ? 'block' : 'none';
        }
      } else if (message.action === 'refreshData') {
        // In a real extension, this would fetch new data from an API
        // For demo purposes, we'll just simulate data update
        const newData = {
          companyName: "TechCorp",
          matchScore: Math.floor(Math.random() * 100), // Random score for demo
          accountStatus: Math.random() > 0.5 ? "Target" : "Not Target" // Random status for demo
        };
        updateWidgetData(newData);
      }
    });
  })();