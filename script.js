// let btn=document.querySelector("#btn");
// let content=document.querySelector("#content");
// let voice=document.querySelector("#voice");

// function speak(text)
// {
//   let text_speak= new SpeechSynthesisUtterance(text);
//   text_speak.rate=1;
//   text_speak.pitch=1;
//   text_speak.volume=1; 
//   text_speak.lang="en-IN"
//   window.speechSynthesis.speak(text_speak);
// }

// function wishMe() {
//   let day=new Date();
//   let hour=day.getHours();
//   if(hour>0&&hour<12)
//    speak("Good morning Jahnvi");
//    else if(hour>=12&&hour<17)
//    speak("Good afternoon Jahnvi");
//      else 
//    speak("Good Evening Jahnvi");
//   }


// window.addEventListener("load",()=>
// {
//   speak("Activating Shifra Virtual Assistant...");
//   speak("Going online...");
//   wishMe();
// });

// let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
// if (!SpeechRecognition) {
//   alert("Speech Recognition not supported in this browser!");
// }

// let recognition= new speechRecognition();

// recognition.onresult=(event)=>
// {
//   let current_index=event.resultIndex;
//   let transcript=event.results[current_index][0].transcript;
//   content.innerText=transcript;
//   // console.log(transcript);
//   takeCommand(transcript.toLowerCase()) 

// };

// btn.addEventListener("click",()=>
// {
//   recognition.start();
//   btn.style.display="none";
//   voice.style.display="block";
// });

// function takeCommand(message) 
// {
//   btn.style.display="flex";
//   voice.style.display="none";

//   if(message.includes("hello")|| message.includes("hey"))
//   {
//     speak("Hello Jahnvi,How can I help you");
//   }
//   else if(message.includes("who are you"))
//   {
//     speak("I am your Virtual Assistant,Created by Jahnvi Maam");
//   }
//    else if(message.includes("open youtube"))
//    {
//     speak("opening youtube....");
//     window.open("https://www.youtube.com/");
//    }
//  else if(message.includes("open google"))
//    {
//     speak("opening google....");
//     window.open("https://www.google.com/");
//    }

//  else if(message.includes("open facebook"))
//    {
//     speak("opening facebook...");
//     window.open("https://www.facebook.com/");
//    }

//  else if(message.includes("open instagram"))
//    {
//     speak("opening instagram....");
//     window.open("https://www.instagram.com/");
//    }

//  else if(message.includes("open linkedin"))
//    {
//     speak("opening linkedin");
//     window.open("https://www.linkedin.com/");
//    }
//  else if(message.includes("open calculator"))
//    {
//     speak("opening calculator");
//     window.open("calculator://");
//    }

//  else if(message.includes("open whatsapp"))
//    {
//     speak("opening whatsapp...");
//     window.open("whatsapp://");
//    }
//  else if(message.includes("time"))
//    {
//    let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
//    speak(time);
//    }

//     else if(message.includes("date"))
//    {
//    let time=new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
//    speak(time);
//    }
//     else if(message.includes("good"))
//    {
//     speak("thank yo so much");
    
//    }
  
//  else
//   {
//   let final_result="this is what i found on internet regarding"+ message.replace("shifra","") || message.replace("shipra","");
//   speak(final_result);

//   window.open(`https://www.google.com/search?q=${message.replace("shifra","")}`,"_blank");
//  }


// }



let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-US"; // Hindi: "hi-IN"
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
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello Jahnvi, how can I help you?");
  } else if (message.includes("who are you")) {
    speak("I am your Virtual Assistant, created by Jahnvi Ma'am");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com");
  } else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://www.facebook.com");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com");
  } else if (message.includes("open linkedin")) {
    speak("Opening LinkedIn...");
    window.open("https://www.linkedin.com");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleTimeString();
    speak("The time is " + time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleDateString();
    speak("Today's date is " + date);
  } else if (message.includes("thank")) {
    speak("You're welcome Jahnvi!");
  }
    else if (message.includes("joke")) {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      let joke = `${data.setup} ... ${data.punchline}`;
      speak(joke);
      content.innerText = joke;
    });
}

else if (message.includes("weather")) {
  let city = "Gorakhpur"; // You can make this dynamic later
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
    .then(res => res.json())
    .then(data => {
      let temp = data.main.temp;
      let desc = data.weather[0].description;
      let reply = `The current temperature in ${city} is ${temp} degrees with ${desc}.`;
      speak(reply);
      content.innerText = reply;
    });
}
else if (message.includes("quote") || message.includes("motivation"))
{
  fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
      let quote = `${data.content} — ${data.author}`;
      speak(quote);
      content.innerText = quote;
    });
}


else if (message.includes("play music")) 
{
  speak("Playing your favorite song...");
  window.open("https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M", "_blank");
}


else if (message.includes("calculator")) 
{
  speak("Opening calculator...");
  window.open("https://www.google.com/search?q=calculator");
}


else if (message.includes("news")) 
{
  speak("Opening latest news...");
  window.open("https://news.google.com/");
}


else if (message.includes("map")) 
{
  speak("Opening Google Maps...");
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

