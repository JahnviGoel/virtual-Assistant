import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
// const port = 8000;
const port = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Shifra Backend is running...");
});

// ✅ Joke route
app.get("/joke", async (req, res) => {
  try {
    const { data } = await axios.get("https://official-joke-api.appspot.com/random_joke");
    res.json({ setup: data.setup, punchline: data.punchline });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch joke" });
  }
});

// ✅ Quote route
app.get("/quote", async (req, res) => {
  try {
    const { data } = await axios.get("https://api.quotable.io/random");
    res.json({ content: data.content, author: data.author });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// ✅ Weather route
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // replace with your real key

  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    res.json({
      city: data.name,
      temp: data.main.temp,
      desc: data.weather[0].description,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather"});
  }
});

// ✅ Start server
// app.listen(port, () => {
//   console.log(`✅ Shifra backend running at http://localhost:${port}`);
// });

app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Shifra backend running on port ${port}`);
});
