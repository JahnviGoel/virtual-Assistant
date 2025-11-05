let btn=document.querySelector("#btn");
let content=document.querySelector("#content");
let voice=document.querySelector("#voice");

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
  let day=new Date();
  let hour=day.getHours();
  if(hour>0&&hour<12)
   speak("Good morning Jahnvi");
   else if(hour>=12&&hour<17)
   speak("Good afternoon Jahnvi");
     else 
   speak("Good Evening Jahnvi");
  }


window.addEventListener("load",()=>
{
  wishMe();
});

let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition= new speechRecognition();

recognition.onresult=(event)=>
{
  let current_index=event.resultIndex;
  let transcript=event.results[current_index][0].transcript;
  content.innerText=transcript;
  // console.log(transcript);
  takeCommand(transcript.toLowerCase()) 

};

btn.addEventListener("click",()=>
{
  recognition.start();
  btn.style.display="none";
  voice.style.display="block";
});

function takeCommand(message) 
{
  btn.style.display="flex";
  voice.style.display="none";

  if(message.includes("hello")|| message.includes("hey"))
  {
    speak("Hello Jahnvi,How can I help you");
  }
  else if(message.includes("who are you"))
  {
    speak("I am your Virtual Assistant,Created by Jahnvi Maam");
  }
   else if(message.includes("open youtube"))
   {
    speak("opening youtube....");
    window.open("https://www.youtube.com/");
   }
 else if(message.includes("open google"))
   {
    speak("opening google....");
    window.open("https://www.google.com/");
   }

 else if(message.includes("open facebook"))
   {
    speak("opening facebook...");
    window.open("https://www.facebook.com/");
   }

 else if(message.includes("open instagram"))
   {
    speak("opening instagram....");
    window.open("https://www.instagram.com/");
   }

 else if(message.includes("open linkedin"))
   {
    speak("opening linkedin");
    window.open("https://www.linkedin.com/");
   }
 else if(message.includes("open calculator"))
   {
    speak("opening calculator");
    window.open("calculator://");
   }

 else if(message.includes("open whatsapp"))
   {
    speak("opening whatsapp...");
    window.open("whatsapp://");
   }
 else if(message.includes("time"))
   {
   let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
   speak(time);
   }

    else if(message.includes("date"))
   {
   let time=new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
   speak(time);
   }
    else if(message.includes("good"))
   {
    speak("thank yo so much");
    
   }
  
 else
  {
  let final_result="this is what i found on internet regarding"+ message.replace("shifra","") || message.replace("shipra","");
  speak(final_result);

  window.open(`https://www.google.com/search?q=${message.replace("shifra","")}`,"_blank");
 }


}
