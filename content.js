let removedAds = []; // Array to track removed ads

let widgetCreated = false; // Ensure only one widget is shown at a time
let widgetQueue = []; // Queue to hold widgets to be shown one at a time

// Array of different widget contents/messages
const widgetMessages = [
  {
    emoji: "🦉",
    message: "Stay wise and keep learning! 📚",
    background: '#F8A01A',
    color: '#4E7838'
  },
  {
    emoji: "💬",
    message: "Quote of the Day: 'The only limit to our realization of tomorrow is our doubts of today.' - Franklin D. Roosevelt",
    background: '#00BCD4',
    color: '#FFF'
  }
,{
  emoji: "⏳",
  message: "Countdown Timer: 5 days left until the weekend!",
  background: '#FF5722',
  color: '#FFF',
  type: 'countdown',
  countdownEndTime: '2025-02-20T00:00:00' // Define the end time for countdown
}
,  
  {
    emoji: "🎯",
    message: "Poll: What's your favorite productivity tool? 🧠",
    background: '#FF5722',
    color: '#FFF',
    pollOptions: ['Trello', 'Asana', 'Todoist', 'Other'],
    pollResponse: null
  },
  
,  
  {
    emoji: "🍎",
    message: "Tip: Drink a glass of water every hour! 💧",
    background: '#8BC34A',
    color: '#FFF'
  },
  
  // New Random Fact Widget
  {
    emoji: "🤔",
    message: "Did you know? Fetching a fact...",
    background: '#FFEB3B',
    color: '#000',
    type: 'randomFact',
    fact: null // Will be filled by API
  },
  {
    emoji: "💡",
    message: "Keep shining bright! ✨",
    background: '#3F8CFF',
    color: '#FFF'
  },
  {
    emoji: "🔥",
    message: "Stay motivated, keep going! 💪",
    background: '#FF6F61',
    color: '#FFF'
  },
  {
    emoji: "🌟",
    message: "Stay positive! 🌟 You can do it!",
    background: '#FFEB3B',
    color: '#000'
  },
  {
    emoji: "🧘‍♂️",
    message: "Take a break and stretch! 🧘‍♂️",
    background: '#8BC34A',
    color: '#FFF'
  },
  {
    emoji: "🤸‍♀️",
    message: "Have you done your burpees today? 🤸‍♀️",
    background: '#FFC107',
    color: '#000'
  },
  {
    emoji: "🚀",
    message: "Keep going! Every step brings you closer to your goal! 🚀",
    background: '#2196F3',
    color: '#FFF'
  },
  {
    emoji: "✨",
    message: "Remember: Progress is progress, no matter how small! ✨",
    background: '#673AB7',
    color: '#FFF'
  }
];
// Fetch weather data
// Fetch weather data
async function getWeather() {
  const apiKey = '3fa7df30ebde999852c898c94ef06372'; // Your API key
  const city = 'Riyadh'; // City name

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Log the response data to check if it's correct
    console.log("Weather data fetched:", data);

    return `Temperature: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return 'Unable to fetch weather data.';
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Sunny at 25°C");
    }, 2000); // Simulating a 2-second delay
  });
}


// Function to create the widget with improved style and close button
async function createWeatherWidget() {
  // Check if the widget already exists
  const existingWidget = document.getElementById('weather-widget');
  if (existingWidget) {
    console.log('Widget already exists.');
    return; // Don't create the widget again
  }

  // Create the widget
  const widget = document.createElement('div');
  widget.id = 'weather-widget';
  widget.style.position = 'fixed';
  widget.style.bottom = '20px';
  widget.style.right = '20px'; // Right position for widget
  widget.style.padding = '20px';
  widget.style.backgroundColor = '#F8A01A';
  widget.style.borderRadius = '15px';
  widget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  widget.style.fontSize = '16px';
  widget.style.color = '#fff';
  widget.style.zIndex = '9999';
  widget.style.transition = 'opacity 1s ease-out'; // Add fade-out transition

  // Show loading text while fetching weather data
  widget.innerHTML = '🌦️ Weather: Fetching data...';

  // Append the widget to the body
  document.body.appendChild(widget);

  try {
    // Fetch the weather data
    const weather = await getWeather();

    // Update the widget with the fetched weather
    widget.innerHTML = `🌦️ Weather: ${weather}`;
  } catch (error) {
    // Handle error and display a failure message
    widget.innerHTML = '🌦️ Weather: Failed to load weather data.';
    console.error('Error fetching weather:', error);
  }

  // Close button
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '5px';
  closeButton.style.right = '5px';
  closeButton.style.fontSize = '20px';
  closeButton.style.background = 'transparent';
  closeButton.style.border = 'none';
  closeButton.style.color = '#fff';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    widget.style.opacity = '0'; // Start fading out
    setTimeout(() => widget.remove(), 1000); // Remove widget after fade-out
  });

  widget.appendChild(closeButton);

  // Make the widget disappear after 5 seconds
  setTimeout(() => {
    widget.style.opacity = '0'; // Start fading out
    setTimeout(() => widget.remove(), 1000); // Remove widget after fade-out
  }, 5000);
}

// Function to fetch weather data
async function getWeather() {
  const apiKey = '3fa7df30ebde999852c898c94ef06372'; // Your API key
  const city = 'Riyadh'; // City name

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Log the response data to check if it's correct
    console.log("Weather data fetched:", data);

    return `Temperature: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return 'Unable to fetch weather data.';
  }
}

// Initialize the widget
createWeatherWidget();


// List of random facts
const facts = [
  "Honey never spoils.",
  "Bananas are berries, but strawberries are not.",
  "Octopuses have three hearts.",
  "Cleopatra lived closer in time to the moon landing than to the construction of the Great Pyramid."
];

// Function to create Random Fact Widget
function createRandomFactWidget() {
  const fact = facts[Math.floor(Math.random() * facts.length)];

  const randomFactWidget = widgetMessages.find(widget => widget.type === 'randomFact');
  randomFactWidget.message = fact;

  // Create and display the widget
  createWidgetFromMessage(randomFactWidget);
}
// Function to create Task Manager Widget
function createTaskManagerWidget() {
  const taskManagerWidget = widgetMessages.find(widget => widget.type === 'taskManager');
  
  let tasks = [];
  
  // Create widget structure
  let widget = document.createElement('div');
  widget.classList.add('task-manager-widget');
  widget.style.position = 'fixed';
  widget.style.top = '10px';
  widget.style.right = '10px';
  widget.style.padding = '15px';
  widget.style.background = taskManagerWidget.background;
  widget.style.color = taskManagerWidget.color;
  widget.style.fontSize = '16px';
  widget.style.fontWeight = 'bold';
  widget.style.textAlign = 'center';
  widget.style.borderRadius = '10px';
  widget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
  
  widget.innerHTML = `
    <span style="font-size: 25px;">${taskManagerWidget.emoji}</span>
    <strong>${taskManagerWidget.message}</strong>
    <ul id="task-list"></ul>
    <input type="text" id="task-input" placeholder="Add a task" style="margin-top: 10px; padding: 5px;">
    <button id="add-task">Add Task</button>
    <button type="button" class="close" style="font-size: 28px; color: #ffffff; background: transparent; border: none;">&times;</button>
  `;
  
  // Add task functionality
  document.getElementById('add-task').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    if (taskInput.value) {
      tasks.push(taskInput.value);
      taskInput.value = '';
      updateTaskList();
    }
  });

  // Update task list display
  function updateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      taskList.appendChild(li);
    });
  }
  
  // Close button
  const closeButton = widget.querySelector('.close');
  closeButton.addEventListener('click', () => {
    widget.remove();
  });

  document.body.appendChild(widget);
}

// Step tracking widget
const stepsWidget = {
  emoji: "👟",
  message: "Steps Taken Today: 0",
  background: '#4CAF50',
  color: '#FFF',
  stepsCount: 0,
};

// Function to update the steps widget dynamically
function updateStepsWidget(widget) {
  widget.querySelector('strong').innerText = `Steps Taken Today: ${stepsWidget.stepsCount}`;
}

// Function to simulate tracking steps (this can be replaced with actual step tracking API)
function trackSteps() {
  stepsWidget.stepsCount += Math.floor(Math.random() * 100);
  console.log(`Tracking Steps: ${stepsWidget.stepsCount}`);
  const stepsWidgetElement = document.querySelector('.steps-widget');
  if (stepsWidgetElement) {
    updateStepsWidget(stepsWidgetElement);
  }
}

// Function to create the steps widget
function createStepsWidget() {
  let widget = document.createElement('div');
  widget.classList.add('steps-widget');
  widget.style.position = 'fixed';
  widget.style.top = '10px';
  widget.style.right = '10px';
  widget.style.padding = '15px';
  widget.style.background = stepsWidget.background;
  widget.style.color = stepsWidget.color;
  widget.style.fontSize = '16px';
  widget.style.fontWeight = 'bold';
  widget.style.textAlign = 'center';
  widget.style.borderRadius = '10px';
  widget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
  widget.style.transition = 'all 0.3s ease-in-out';
  widget.classList.add('animate__animated', 'animate__fadeInUp');

  widget.innerHTML = `
    <span style="font-size: 25px;">${stepsWidget.emoji}</span>
    <strong>${stepsWidget.message}</strong>
    <button type="button" class="close" style="font-size: 28px; color: #ffffff; background: transparent; border: none;">&times;</button>
  `;

  const closeButton = widget.querySelector('.close');
  closeButton.addEventListener('click', () => {
    widget.remove();
  });

  document.body.appendChild(widget);

  // Update steps count every 3 seconds (simulated)
  setInterval(trackSteps, 3000);
}
function createCountdownWidget() {
  const countdownWidget = widgetMessages.find(widget => widget.type === 'countdown');
  
  const endTime = new Date(countdownWidget.countdownEndTime);
  const now = new Date();
  const timeRemaining = endTime - now;
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  countdownWidget.message = `Countdown Timer: ${daysRemaining} days left until the weekend!`;

  createWidgetFromMessage(countdownWidget);
}
function createCountdownWidget() {
  const countdownWidget = widgetMessages.find(widget => widget.type === 'countdown');
  
  const endTime = new Date(countdownWidget.countdownEndTime);
  const now = new Date();
  const timeRemaining = endTime - now;
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  countdownWidget.message = `Countdown Timer: ${daysRemaining} days left until the weekend!`;

  createWidgetFromMessage(countdownWidget);
}
function createWidgetFromMessage(widgetMessage) {
  // This generic function will now work for all widgets, including the new ones
  let widget = document.createElement('div');
  widget.classList.add('widget');
  widget.style.background = widgetMessage.background;
  widget.style.color = widgetMessage.color;
  widget.innerHTML = `
    <span style="font-size: 25px;">${widgetMessage.emoji}</span>
    <strong>${widgetMessage.message}</strong>
    <button class="close">&times;</button>
  `;

  // Add widget to DOM
  document.body.appendChild(widget);
}

// Function to create a widget and add to the queue
function createWidget() {
  // Ensure that no other widget is currently shown
  if (widgetCreated) {
    console.log('Widget already exists.');
    return; // Exit if a widget is already present
  }

  try {
    // Pick a random widget message
    const randomWidget = widgetMessages[Math.floor(Math.random() * widgetMessages.length)];
    let widget = document.createElement('div');
    const navHeight = getTopNavHeight();
    console.log("Navbar height:", navHeight);

    // Set widget styles
    widget.style.position = 'fixed';
    widget.style.top = '50%'; // Center from top
    widget.style.left = '50%'; // Center from left
    widget.style.transform = 'translate(-50%, -50%)'; // Center it
    widget.style.zIndex = '9999';
    widget.style.padding = '20px';
    widget.style.background = randomWidget.background; // Use the background color from the message
    widget.style.color = randomWidget.color; // Use the color from the message
    widget.style.fontSize = '18px';
    widget.style.fontWeight = 'bold';
    widget.style.textAlign = 'center';
    widget.style.borderRadius = '15px';
    widget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
    widget.style.transition = 'all 0.3s ease-in-out';
    widget.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-1s'); // Add animation

    // Add emoji and message
    widget.innerHTML = ` 
      <span style="font-size: 30px;">${randomWidget.emoji}</span> <strong>${randomWidget.message}</strong>
      <button type="button" class="close" style="font-size: 28px; color: #ffffff; background: transparent; border: none;">&times;</button>
    `;

    // Add hover effect
    widget.addEventListener('mouseenter', () => {
      widget.style.transform = 'scale(1.05)';
    });
    widget.addEventListener('mouseleave', () => {
      widget.style.transform = 'scale(1)';
    });

    // Close button functionality (without animations)
    const closeButton = widget.querySelector('.close');
    closeButton.addEventListener('click', () => {
      console.log('Close button clicked');
      // Simply remove the widget from the DOM without any animations
      widget.remove();
      widgetCreated = false; // Reset widgetCreated flag to false after removal
      console.log('Widget removed from DOM');
      
      // Clear the queue
      widgetQueue = [];
      
      // Attempt to show the next widget in the queue
      showNextWidget();
    });

    // Append the widget to the body
    document.body.appendChild(widget);
    widgetCreated = true; // Mark widget as created
    console.log('Widget appended to the body.');

    // Add widget to the queue
    widgetQueue.push(widget); // Add to the queue

    // Show the next widget in the queue if there is one
    showNextWidget();

    return widget;
  } catch (error) {
    console.error("Error creating widget:", error);
  }
}

// Function to display the next widget in the queue
function showNextWidget() {
  if (widgetQueue.length > 0) {
    let nextWidget = widgetQueue.shift(); // Get the next widget in the queue
    document.body.appendChild(nextWidget); // Display it
    console.log('Next widget displayed.');
  }
}

// Function to replace ads with the widget and block ads
function replaceAdsWithWidget() {
  const adSelectors = [
    'div[id*="ad"]', 'div[class*="ad"]', 'iframe[src*="ad"]', 'img[src*="ad"]', 'script[src*="ads"]', '.ad-container',
    '.advertisement', '.ad-banner', 'div[data-ad*=""]', 'div[role="advertisement"]',
    '[id^="ad-"]', '[class*="ad-"]', '[class*="advert"]', '[src*="ad"]'
  ];

  // Find and remove all ads matching the selectors
  const adElements = document.querySelectorAll(adSelectors.join(', '));
  console.log('Ads found to replace:', adElements); // Log ads found

  if (adElements.length === 0) {
    console.log('No ads found to replace.');
    createWidget(); // Create widget even if no ads are found
    return;
  }

  // Remove all ad elements from the DOM and replace with widget
  adElements.forEach((ad, index) => {
    console.log(`Removing ad ${index + 1}:`, ad); // Log each ad removal
    ad.remove(); // Remove the ad element completely from the DOM
    removedAds.push(ad); // Keep track of removed ads
    createWidget(); // Replace ad with widget
  });

  // Monitor dynamically added nodes and remove ads if they appear later
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.matches(adSelectors.join(', '))) {
          console.log('Blocking dynamically added ad:', node);
          node.remove();  // Remove the ad from the DOM
          removedAds.push(node); // Track removed ad
          createWidget(); // Replace ad with widget
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
  });

  console.log('MutationObserver for dynamic ads started.');
}

// Function to inject Animate.css asynchronously
function injectAnimateCSS() {
  try {
    if (document.querySelector('.animate__animated')) return; // Avoid reloading if already injected
    const linkAnimateCSS = document.createElement('link');
    linkAnimateCSS.rel = 'stylesheet';
    linkAnimateCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    linkAnimateCSS.onload = () => console.log('Animate.css loaded');
    document.head.appendChild(linkAnimateCSS);
    console.log("Animate.css injected successfully.");
  } catch (error) {
    console.error("Error injecting Animate.css:", error);
  }
}

// Function to get the height of the top navigation bar
function getTopNavHeight() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');

  if (header) {
    return header.offsetHeight;
  } else if (nav) {
    return nav.offsetHeight;
  }

  return 80; // Default height if no header or nav found
}

// Function to observe mutations in the DOM (for dynamic content)
function observeMutations() {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        console.log('Mutation detected, checking for ads...');
        replaceAdsWithWidget(); // Re-check for ads after DOM changes
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  console.log('Mutation observer started.');
}

// Function to handle CORS issues
function handleCORS(url) {
  try {
    fetch(url, { mode: 'no-cors' })
      .then(response => {
        if (response.ok) {
          console.log('CORS request successful.');
        } else {
          console.log('CORS request failed with status: ' + response.status);
        }
      })
      .catch(error => console.error('CORS fetch error:', error));
  } catch (error) {
    console.error('Error in handling CORS:', error);
  }
}

// Retry logic for failed resources (503 errors)
function retryRequest(url, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    function attemptRequest(attempt) {
      fetch(url)
        .then(response => {
          if (response.ok) {
            resolve(response);
          } else {
            if (attempt < retries) {
              console.log(`Request failed, retrying... Attempt ${attempt + 1}`);
              setTimeout(() => attemptRequest(attempt + 1), delay);
            } else {
              reject('Request failed after ' + retries + ' attempts');
            }
          }
        })
        .catch(reject);
    }
    attemptRequest(0);
  });
}

function init() {
  createWeatherWidget();
  // Check if ad-blocking is enabled
  chrome.storage.sync.get(['adBlockingEnabled'], function(result) {
    const isAdBlockingEnabled = result.adBlockingEnabled;

    console.log('Ad blocking enabled:', isAdBlockingEnabled); // Log the ad-blocking setting
    if (isAdBlockingEnabled) {
      // Enable ad-blocking logic: Replace ads with the widget
      replaceAdsWithWidget();
    } else {
      console.log('Ad blocking is disabled.');
    }
  });

  handleCORS('https://prebid.smilewanted.com/');
  retryRequest('https://cs.lkqd.net/cs?partnerId=59&partnerUserId=CAESEBQYnugWU6tP6glVlLlebAI&google_cver=1')
    .then(response => console.log('Request succeeded:', response))
    .catch(error => console.log('Request failed:', error));
}

// Initialize everything
init();

// Ensure Animate.css is loaded for animations
injectAnimateCSS();

console.log("Ad replacement script executed successfully!");
