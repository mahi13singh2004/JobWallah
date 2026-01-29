const buildEmailPrompt = async ({ emailType, jobData, customContext }) => {
    const { company, role, status } = jobData

    let rule = `You are a professional assistant generating job-related emails.
    Rules:
    - Write a clear, professional, ready-to-send email
    - Include the user's context and achievements naturally
    - Keep tone polite and confident
    - Include a subject line at the beginning of your response
    - Write the complete email with subject line included`;

    let context = `
    Company: ${company || "Not provided"}  
    Role: ${role || "Not provided"}  
    Status: ${status || "Not provided"}  
    User Context: ${customContext || "Not provided"}  
    `;

    let instruction = "";

    if (emailType == "cold_outreach") {
        instruction = `Write a cold outreach email expressing interest in the role or company. Include the user's achievements from the context. Start with a subject line.`;
    }
    else if (emailType == "follow_up") {
        instruction = `Write a polite follow-up email regarding a job application. Reference the user's qualifications from the context. Start with a subject line.`;
    }
    else if (emailType == "custom") {
        instruction = `Write a professional email strictly based on the user context and requirements. Start with a subject line.`;
    }
    else {
        throw new Error("Invalid Type")
    }

    return `${rule}

${context}

Instruction: ${instruction}

Please write the complete email including the subject line at the beginning.`
}

export default buildEmailPrompt