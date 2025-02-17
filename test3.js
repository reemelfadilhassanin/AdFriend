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
    emoji: "🎯",
    message: "Poll: What's your favorite productivity tool? 🧠",
    background: '#FF5722',
    color: '#FFF',
    pollOptions: ['Trello', 'Asana', 'Todoist', 'Other'],
    pollResponse: null
  },
  {
    emoji: "🍎",
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
  },
  // Countdown to Weekend
  {
    emoji: "⏳",
    message: "Only {days} days left until the weekend! ⏰",
    background: '#FF9800',
    color: '#FFF',
  },
  // Fun Fact
  {
    emoji: "🤓",
    message: "Did you know? {fact}",
    background: '#8BC34A',
    color: '#FFF',
  },
  // Weather Widget
  {
    emoji: "☀️",
    message: "Current weather: {temp}°C, {description}",
    background: '#2196F3',
    color: '#FFF',
  }
];

// Function to create a widget and add to the queue
function createWidget() {
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

    // Determine the message content
    let messageContent = randomWidget.message;

    if (messageContent.includes("{days}")) {
      messageContent = messageContent.replace("{days}", getDaysUntilWeekend());
    }

    if (messageContent.includes("{fact}")) {
      messageContent = messageContent.replace("{fact}", getFunFact());
    }

    if (messageContent.includes("{temp}")) {
      getWeatherData().then((weatherData) => {
        messageContent = messageContent.replace("{temp}", weatherData.temp);
        messageContent = messageContent.replace("{description}", weatherData.description);
        widget.innerHTML = `
          <span style="font-size: 30px;">${randomWidget.emoji}</span> <strong>${messageContent}</strong>
          <button type="button" class="close" style="font-size: 28px; color: #ffffff; background: transparent; border: none;">&times;</button>
        `;
        document.body.appendChild(widget);
      });
      return;
    }

    widget.innerHTML = `
      <span style="font-size: 30px;">${randomWidget.emoji}</span> <strong>${messageContent}</strong>
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
      widget.remove();
      widgetCreated = false; // Reset widgetCreated flag to false after removal
      console.log('Widget removed from DOM');
      widgetQueue = [];
      showNextWidget();
    });

    // Append the widget to the body
    document.body.appendChild(widget);
    widgetCreated = true; // Mark widget as created
    console.log('Widget appended to the body.');

    widgetQueue.push(widget); // Add to the queue
    showNextWidget();
  } catch (error) {
    console.error("Error creating widget:", error);
  }
}

// Function to get the number of days remaining until the weekend
function getDaysUntilWeekend() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilWeekend = (6 - dayOfWeek + 1) % 7; // Get days remaining until Saturday
  return daysUntilWeekend;
}

// Function to get a random fun fact
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

// Function to get weather data using a public weather API
async function getWeatherData() {
  try {
    const apiKey = '3fa7df30ebde999852c898c94ef06372'; // Get your API key from OpenWeatherMap
    const location = 'London'; // Specify the location (can be dynamic based on user)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const temp = data.main.temp;
    const description = data.weather[0].description;
    return { temp, description };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { temp: 'N/A', description: 'Unable to retrieve data' };
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
        replaceAdsWithWidget();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Function to replace detected ads with widgets
function replaceAdsWithWidget() {
  const ads = document.querySelectorAll('.ad, .advertisement, .promo, .banner');
  ads.forEach(ad => {
    if (!removedAds.includes(ad)) {
      ad.remove();
      removedAds.push(ad);
      createWidget(); // Create a new widget each time an ad is removed
    }
  });
}

// Initialize logic

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
