# 🔗 LinkedIn Profile Enhancer Chrome Extension

Enhance LinkedIn profiles with insightful company match information!  
This Chrome extension displays a widget on LinkedIn profile pages to show how well the profile matches with a given company's requirements and status (Target / Not Target).

![Extension Demo Screenshot](images/demo.png) <!-- Optional: add a screenshot here -->

---

## 🚀 Features

- 🧠 Displays **Match Score** and **Account Status** for companies.
- 🎛️ Toggle the widget visibility directly from the popup.
- 🔄 Refresh the widget data without reloading the page.
- 🖱️ Draggable widget interface for flexible positioning.
- 💾 Stores user preferences using Chrome's `storage.sync`.

---

## 📂 Project Structure

linkedin-enhancer-extension/ 
├── manifest.json 
├── popup.html 
├── popup.js 
├── content.js 
├── widget.css 
└── images/ 
  ├── icon16.png 
  ├── icon48.png 
  └── icon128.png


---

## 🛠 Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/yourusername/linkedin-profile-enhancer.git
2. Open Google Chrome and navigate to chrome://extensions/.
3. Enable Developer Mode using the toggle in the top-right corner.
4. Click "Load unpacked" and select the linkedin-enhancer-extension directory.
5. Navigate to any LinkedIn profile (linkedin.com/in/...) to see the widget in action.

🧪 How It Works
Injects a widget on LinkedIn profile pages using content.js.

Fetches (simulated) company match data and displays it in a stylish sidebar.

Allows user interaction through the extension popup (popup.html & popup.js).

🖼️ Icons
Icons used in this project should be placed in the images/ folder:

icon16.png

icon48.png

icon128.png

You can use placeholder icons or download suitable ones from https://www.flaticon.com.

📌 Notes
The current version uses mock data. You can easily plug in your own API to fetch real-time company insights.

Only runs on LinkedIn profile URLs: *://*.linkedin.com/in/*

Designed to be lightweight and unobtrusive.

🧪 How It Works
Injects a widget on LinkedIn profile pages using content.js.

Fetches (simulated) company match data and displays it in a stylish sidebar.

Allows user interaction through the extension popup (popup.html & popup.js).

🖼️ Icons
Icons used in this project should be placed in the images/ folder:

icon16.png

icon48.png

icon128.png

You can use placeholder icons or download suitable ones from https://www.flaticon.com.

📌 Notes
The current version uses mock data. You can easily plug in your own API to fetch real-time company insights.

Only runs on LinkedIn profile URLs: *://*.linkedin.com/in/*

Designed to be lightweight and unobtrusive.

⭐️ If you find this project helpful, give it a star!

---

Let me know if you want a dark/light theme badge setup or want me to generate a demo GIF for the widget in action!
