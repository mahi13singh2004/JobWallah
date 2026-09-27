import axios from "axios";

const generateFromAI = async (prompt) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not found in environment variables");
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return {
      emailBody: text
    };
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw error;
  }
};

export default generateFromAI;