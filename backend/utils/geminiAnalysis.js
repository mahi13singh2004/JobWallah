import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const analyzeResumeVsJD = async (resumeText, jobDescription) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const prompt = `You are an expert ATS (Applicant Tracking System) and HR professional. Analyze how well this resume matches the job description.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

Provide a detailed analysis in the following JSON format (return ONLY valid JSON, no markdown):
{
  "overallScore": <number between 0-100>,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2"],
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "keywordMatch": <number between 0-100>,
  "experienceMatch": <number between 0-100>,
  "summary": "Brief 2-3 sentence summary of the match"
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response")
    }

    const analysis = JSON.parse(jsonMatch[0])
    return analysis
  } catch (error) {
    console.error("Gemini Analysis error:", error)
    throw new Error("Failed to analyze resume vs job description")
  }
}
