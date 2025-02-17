let removedAds = []; // Array to track removed ads

let widgetCreated = false; // Ensure only one widget is shown at a time
let widgetQueue = []; // Queue to hold widgets to be shown one at a time

// Array of different widget contents/messages
const widgetMessages = [
  
  {emoji: "☀️",  // You can use any relevant emoji for weather
    message: "The current weather in {city} is: {weather}, {temp}°C.",
    background: '#00BCD4',
    color: '#FFF',},
  {
    emoji: "⏳",
    message: "Countdown Timer: 5 days left until the weekend!",
    background: '#FF5722',
    color: '#FFF',
    type: 'countdown',
    countdownEndTime: '2025-02-20T00:00:00' // Define the end time for countdown
  }
 ,
  {
    emoji: "🤓",
    message: "Did you know? {fact}",
    background: '#8BC34A',
    color: '#FFF',
  },
  {
    emoji: "🦉",
    message: "Stay wise and keep learning! 📚",
    background: '#F8A01A',
    color: '#4E7838'
  },
  
  {
    emoji: " 💧",
    message: "Tip: Drink a glass of water every hour! 💧",
    background: '#8BC34A',
    color: '#FFF'
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
async function fetchWeather(city) {
  const apiKey = '3fa7df30ebde999852c898c94ef06372'; // Your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    console.log('Weather data fetched:', data); // Add this line to check the fetched data
    return {
      weather: data.weather[0].description,
      temp: data.main.temp,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

function getFunFact() {
  const funFacts = [
    "Bananas are berries, but strawberries are not!",
    "Octopuses have three hearts.",
    "Honey never spoils – archaeologists have found pots of honey in ancient tombs that are over 3,000 years old!",
    "Humans share 60% of their DNA with bananas.",
    "A cloud can weigh more than a million pounds!"
  ];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  return randomFact;
}
async function createWidget() {
  if (widgetCreated) {
    console.log('Widget already exists.');
    return; // Exit if a widget is already present
  }

  try {
    // Pick a random widget message
    const randomWidget = widgetMessages[Math.floor(Math.random() * widgetMessages.length)];
    let weatherData = null;

    // If the message contains a weather placeholder, fetch weather data
    if (randomWidget.message.includes("{city}")) {
      const city = "New York"; // Replace with your desired city
      weatherData = await fetchWeather(city); // Fetch the weather data
      if (!weatherData) {
        console.error('Failed to fetch weather data');
        return; // If weather data is not fetched, stop widget creation
      }
    }

    let widget = document.createElement('div');
    widget.style.position = 'fixed';
    widget.style.top = '50%'; // Center vertically
    widget.style.left = '50%'; // Center horizontally
    widget.style.transform = 'translate(-50%, -50%)'; // Center it
    widget.style.zIndex = '9999';
    widget.style.padding = '20px';
    widget.style.background = randomWidget.background;
    widget.style.color = randomWidget.color;
    widget.style.fontSize = '18px';
    widget.style.fontWeight = 'bold';
    widget.style.textAlign = 'center';
    widget.style.borderRadius = '15px';
    widget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
    widget.style.transition = 'all 0.3s ease-in-out';

    if (weatherData) {
      const weatherMessage = randomWidget.message
        .replace("{city}", "New York")
        .replace("{weather}", weatherData.weather)
        .replace("{temp}", weatherData.temp.toFixed(1));  // Round to 1 decimal place

      randomWidget.message = weatherMessage;
    } else {
      const fact = getFunFact();
      randomWidget.message = randomWidget.message.replace("{fact}", fact);
    }

    // Add emoji and message to widget
    widget.innerHTML = ` 
      <span style="font-size: 30px;">${randomWidget.emoji}</span> <strong>${randomWidget.message}</strong>
      <button type="button" class="close" style="font-size: 28px; color: #ffffff; background: transparent; border: none;">&times;</button>
    `;

    // Append the widget to the body
    document.body.appendChild(widget);
    widgetCreated = true; // Mark widget as created

    // Remove the widget after 6 seconds
    setTimeout(() => {
      widget.remove();
      widgetCreated = false; // Reset widgetCreated flag
    }, 6000); // 6000 milliseconds = 6 seconds

    // Close button functionality
    const closeButton = widget.querySelector('.close');
    closeButton.addEventListener('click', () => {
      widget.remove();
      widgetCreated = false; // Reset widgetCreated flag
    });

    console.log('Widget created and appended to the body');
  } catch (error) {
    console.error("Error creating widget:", error);
  }
}



function showNextWidget() {
  if (widgetQueue.length > 0) {
    let nextWidget = widgetQueue.shift(); // Get the highest priority widget
    document.body.appendChild(nextWidget); // Display it
    console.log('Next widget displayed.');
  } else {
    console.log('No more widgets in the queue.');
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

// Function to handle 403 errors (Forbidden)


// Initialize logic based on ad blocking state
function init() {
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
