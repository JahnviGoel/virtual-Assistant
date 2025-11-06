historyData = JSON.parse(localStorage.getItem("chatHistory")) || [];


let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// function speak(text) {
//   let text_speak = new SpeechSynthesisUtterance(text);
//   text_speak.rate = 1;
//   text_speak.pitch = 1;
//   text_speak.volume = 1;
//   text_speak.lang = "en-US"; // Hindi: "hi-IN"

function speak(text)
{
  let text_speak= new SpeechSynthesisUtterance(text);
  text_speak.rate=1
  text_speak.pitch=1
  text_speak.volume=1 
  text_speak.lang="hi-IN"
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let hour = new Date().getHours();
  if (hour >= 0 && hour < 12) speak("Good morning Jahnvi!");
  else if (hour >= 12 && hour < 17) speak("Good afternoon Jahnvi!");
  else speak("Good evening Jahnvi!");
}

window.addEventListener("load", () => {
  speak("Activating Shifra Virtual Assistant...");
  speak("Going online...");
  wishMe();
});

let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Speech Recognition not supported in this browser!");
}

let recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.continuous = false;

btn.addEventListener("click", () => {
  recognition.start();
  voice.style.display = "block";
  content.innerText = "Listening...";
});

recognition.onresult = (event) => {
  let transcript = event.results[0][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
  content.innerText = "Error: " + event.error;
  voice.style.display = "none";
};

recognition.onend = () => {
  voice.style.display = "none";
};

function takeCommand(message) 
{
  if (message.includes("hello") || message.includes("hey")) 
  {
    speak("Hello Jahnvi, how can I help you?");
  } 
  else if (message.includes("who are you")) 
  {
  let reply = "I am your Virtual Assistant, created by Jahnvi Ma'am";
  speak(reply);
  addToHistory(message, reply);
  } 
  
  else if (message.includes("open youtube")) 
  {
    let reply = "Opening YouTube...";
  speak(reply);
  addToHistory(message, reply);
  window.open("https://www.youtube.com");
  } 
  
  else if (message.includes("open google")) {
    let reply="Opening Google...";
    speak(reply);
  addToHistory(message, reply);
    window.open("https://www.google.com");
  } 
  else if (message.includes("open facebook")) 
  {
    let reply="Opening Facebook...";
    speak(reply);
  addToHistory(message, reply);
    window.open("https://www.facebook.com");
  }
   else if (message.includes("open instagram")) 
  {
  let reply="Opening instagram...";
  speak(reply);
  addToHistory(message, reply);
    window.open("https://www.instagram.com");
  } 
  else if (message.includes("open linkedin")) 
  {    
    let reply="Opening linkedin..";
    speak(reply);
    addToHistory(message, reply);
    window.open("https://www.linkedin.com");
  } 
  
  else if (message.includes("time")) {
    let time = new Date().toLocaleTimeString();
    let reply="The time is " + time;
    speak(reply);
    addToHistory(message, reply);
  } 
  
  else if (message.includes("date")) {
    let date = new Date().toLocaleDateString();
    let reply="The date is " + date;
    speak(reply);
    addToHistory(message, reply);
  }
  else if (message.includes("thank")) {
    speak("You're welcome Jahnvi!");
  }

    else if (message.includes("joke")) {
 fetch("http://localhost:8000/joke")
  .then(res => res.json())
  .then(data => {
    let joke = `${data.setup} ... ${data.punchline}`;
    speak(joke);
    content.innerText = joke;
    addToHistory(message, joke);
    });
}

else if (message.includes("weather")) {
  let city = "Gorakhpur";
fetch(`http://localhost:8000/weather/${city}`)
  .then(res => res.json())
  .then(data => {
    let reply = `The temperature in ${data.city} is ${data.temp}°C with ${data.desc}`;
    speak(reply);
    content.innerText = reply;
    addToHistory(message, reply);
 
    });
}
else if (message.includes("quote") || message.includes("motivation"))
{
  fetch("http://localhost:8000/quote")
  .then(res => res.json())
  .then(data => {
    let quote = `${data.content} — ${data.author}`;
    speak(quote);
    content.innerText = quote;
 addToHistory(message, quote);
    });
    
}


else if (message.includes("play music")) 
{
  reply="Playing your favorite song..."
  speak(reply);
  addToHistory(message, reply);
  window.open("https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M", "_blank");
}


else if (message.includes("calculator")) 
{
  reply="Opening calculator..."
  speak(reply);
  addToHistory(message, reply);
  window.open("https://www.google.com/search?q=calculator");
}


else if (message.includes("news")) 
{
  reply="Opening latest news..."
  speak(reply);
  addToHistory(message, reply);
  window.open("https://news.google.com/");
}


else if (message.includes("map")) 
{
  reply="Opening map..."
  speak(reply);
  addToHistory(message, reply);
  window.open("https://www.google.com/maps");
}

else if (message.includes("how are you")) 
{
  speak("I'm just a program, but I’m feeling happy to talk to you!");
}


else if (message.includes("your name")) 
{
  speak("I’m Shifra, your personal virtual assistant, created by Jahnvi Goel!");
}

else if (message.includes("love you")) 
{
  speak("Aww, I love you too Jahnvi, but only platonically!");
}

else 
  {
    let final_result = "This is what I found on the internet regarding " + message;
    speak(final_result);
    window.open(`https://www.google.com/search?q=${message}`, "_blank");
  }
}

 let historyData = JSON.parse(localStorage.getItem("chatHistory")) || [];
 // Array to store chat history
let historyContainer = document.querySelector("#historyContainer");
let historyBtn = document.querySelector("#historyBtn");

// Function to add messages to history
function addToHistory(userMsg, botReply) {
  let entry = {
    user: userMsg,
    bot: botReply,
    time: new Date().toLocaleTimeString()
  };
  historyData.push(entry);
  localStorage.setItem("chatHistory", JSON.stringify(historyData));
}

// Function to display history
function showHistory() {
  historyContainer.innerHTML = "";
  let saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
  if (saved.length === 0) {
    historyContainer.innerHTML = "<p>No history yet!</p>";
    return;
  }
  saved.forEach((chat) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <p><b>You:</b> ${chat.user}</p>
      <p><b>Shifra:</b> ${chat.bot}</p>
      <small style="color:gray">${chat.time}</small>
      <hr>
    `;
    historyContainer.appendChild(div);
  });
  historyContainer.style.display = "block";
}

// Toggle history button
historyBtn.addEventListener("click", () => {
  if (historyContainer.style.display === "none") {
    showHistory();
  } else {
    historyContainer.style.display = "none";
  }
});

document.querySelector("#clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("chatHistory");
  historyData = [];
  historyContainer.innerHTML = "<p>History cleared!</p>";
});
// const output = document.getElementById("output");

// // Backend URL
// const BACKEND_URL = "http://localhost:8000";

// // GET request
// document.getElementById("getBtn").addEventListener("click", async () => {
//   const res = await fetch(`${BACKEND_URL}/api/message`);
//   const data = await res.json();
//   output.textContent = data.message;
// });

// // POST request
// document.getElementById("postBtn").addEventListener("click", async () => {
//   const res = await fetch(`${BACKEND_URL}/api/data`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name: "Jahnvi", course: "MCA" })
//   });

//   const data = await res.json();
//   output.textContent = data.status + " ✅";
// });
