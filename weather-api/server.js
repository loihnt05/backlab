import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = 3000;
const app = express();

app.use(cors());

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.API_KEY;

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
          lang: "vi",
        },
      }
    );
    res.json({
        city: response.data.name, 
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: "Error with data" });
  }
});

app.listen(port, () => console.log(`Server run at http://localhost:${port}`));
