import axios from "axios";

export default async (req, res) => {
  const apiUrl = "https://zenquotes.io/api/random";
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    if (!data || !data[0]) {
      throw new Error("Invalid data from API");
    }
    res.status(200).json({ text: data[0].q, author: data[0].a });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ text: "Failed to load quote.", author: "Unknown" });
  }
};
