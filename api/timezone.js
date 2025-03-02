import axios from "axios";
import dotenv from "dotenv";
import process from "node:process";

// Only load dotenv locally; in production Vercel injects env vars automatically.
if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export default async (req, res) => {
  const { zone } = req.query;
  if (!zone) {
    return res.status(400).json({ error: "Zone parameter is required" });
  }

  // Use the environment variable (set in Vercel dashboard for production)
  const TIMEZONE_API_KEY = process.env.TIMEZONE_DB_API_KEY;
  const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=zone&zone=${zone}`;

  try {
    const response = await axios.get(apiUrl);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching timezone data:", error);
    res.status(500).json({ error: "Failed to fetch timezone data" });
  }
};
