import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const generateFromAI = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return {
      emailBody: text
    };
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw error;
  }
};

export default generateFromAI;