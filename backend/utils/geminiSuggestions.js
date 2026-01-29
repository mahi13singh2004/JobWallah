import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const improveResumeContent = async (content, numberOfPoints) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        const prompt = `You are a professional resume writer. Improve the following content and format it as ${numberOfPoints} concise, impactful bullet points. Each point should:
- Start with a strong action verb
- Be quantifiable where possible
- Highlight achievements and impact
- Be professional and ATS-friendly
- Be concise (1-2 lines max per point)

Content to improve:
${content}

Return ONLY the ${numberOfPoints} bullet points, one per line, without bullet symbols or numbering. Just the text.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const points = text.trim().split('\n').filter(point => point.trim()).slice(0, numberOfPoints)

        return points
    } catch (error) {
        console.error("Gemini API error:", error)
        throw new Error("Failed to improve content with AI")
    }
}

export const improveSummary = async (content) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        const prompt = `You are a professional resume writer. Improve the following professional summary to make it more impactful, concise, and ATS-friendly. Keep it to 2-3 sentences maximum. Focus on skills, experience, and value proposition.

Current summary:
${content}

Return ONLY the improved summary text, nothing else.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return text.trim()
    } catch (error) {
        console.error("Gemini API error:", error)
        throw new Error("Failed to improve summary with AI")
    }
}
