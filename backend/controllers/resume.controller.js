import Resume from "../models/resume.model.js"
import PDFDocument from "pdfkit"

export const createResume = async (req, res) => {
    try {
        const resume = await Resume.create({
            ...req.body,
            userId: req.user._id
        })

        return res.status(201).json({
            message: "Resume created successfully",
            resume
        })
    } catch (error) {
        console.log("Error in createResume:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id })
        return res.status(200).json({
            message: "Resumes fetched successfully",
            resumes
        })
    } catch (error) {
        console.log("Error in getResumes:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        return res.status(200).json({
            message: "Resume fetched successfully",
            resume
        })
    } catch (error) {
        console.log("Error in getResumeById:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        )

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        return res.status(200).json({
            message: "Resume updated successfully",
            resume
        })
    } catch (error) {
        console.log("Error in updateResume:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }

        return res.status(200).json({
            message: "Resume deleted successfully"
        })
    } catch (error) {
        console.log("Error in deleteResume:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const downloadResumePDF = async (req, res) => {
    try {
        const resumeData = req.body

        const doc = new PDFDocument({
            margin: 50,
            size: 'A4'
        })

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `attachment; filename="${resumeData.title || 'resume'}.pdf"`)

        doc.pipe(res)

        const leftMargin = 50
        const pageWidth = doc.page.width - 100
        let yPosition = 50

        // Name - centered and bold
        doc.fontSize(18).font('Helvetica-Bold')
        const name = resumeData.personalInfo?.name || 'Your Name'
        const nameWidth = doc.widthOfString(name)
        doc.text(name, (doc.page.width - nameWidth) / 2, yPosition, { lineBreak: false })
        yPosition += 25

        // Contact info - centered
        const contactInfo = []
        if (resumeData.personalInfo?.phone) contactInfo.push(resumeData.personalInfo.phone)
        if (resumeData.personalInfo?.email) contactInfo.push(resumeData.personalInfo.email)
        if (resumeData.personalInfo?.linkedin) contactInfo.push(resumeData.personalInfo.linkedin)
        if (resumeData.personalInfo?.github) contactInfo.push(resumeData.personalInfo.github)

        if (contactInfo.length > 0) {
            doc.fontSize(10).font('Helvetica')
            const contactText = contactInfo.join(' | ')
            const contactWidth = doc.widthOfString(contactText)
            const contactX = (doc.page.width - contactWidth) / 2
            doc.text(contactText, contactX, yPosition, { lineBreak: false })

            let currentX = contactX
            contactInfo.forEach((info, idx) => {
                const isEmail = info.includes('@')
                const isLinkedIn = info.includes('linkedin.com')
                const isGitHub = info.includes('github.com')
                const infoWidth = doc.widthOfString(info)

                if (isEmail) {
                    doc.link(currentX, yPosition - 2, infoWidth, 12, `mailto:${info}`)
                } else if (isLinkedIn) {
                    const url = info.startsWith('http') ? info : `https://${info}`
                    doc.link(currentX, yPosition - 2, infoWidth, 12, url)
                } else if (isGitHub) {
                    const url = info.startsWith('http') ? info : `https://${info}`
                    doc.link(currentX, yPosition - 2, infoWidth, 12, url)
                }

                currentX += infoWidth
                if (idx < contactInfo.length - 1) {
                    currentX += doc.widthOfString(' | ')
                }
            })

            yPosition += 30
        }

        const addSectionHeader = (title) => {
            doc.fontSize(12).font('Helvetica-Bold')
            doc.text(title, leftMargin, yPosition, { lineBreak: false })
            yPosition += 15
            doc.moveTo(leftMargin, yPosition).lineTo(leftMargin + pageWidth, yPosition).stroke()
            yPosition += 10
        }

        // Summary Section
        if (resumeData.summary) {
            addSectionHeader('SUMMARY')
            doc.fontSize(10).font('Helvetica')
            const summaryHeight = doc.heightOfString(resumeData.summary, { width: pageWidth })
            doc.text(resumeData.summary, leftMargin, yPosition, { width: pageWidth, lineBreak: true })
            yPosition += summaryHeight + 15
        }

        // Education Section
        if (resumeData.education && resumeData.education.length > 0) {
            addSectionHeader('EDUCATION')

            resumeData.education.forEach(edu => {
                if (edu.institution) {
                    const currentY = yPosition
                    doc.fontSize(11).font('Helvetica-Bold')
                    doc.text(edu.institution, leftMargin, currentY, { lineBreak: false, width: pageWidth * 0.6 })

                    if (edu.location) {
                        doc.fontSize(11).font('Helvetica')
                        const locationWidth = doc.widthOfString(edu.location)
                        doc.text(edu.location, leftMargin + pageWidth - locationWidth, currentY, { lineBreak: false })
                    }
                    yPosition += 15

                    if (edu.degree) {
                        const degreeY = yPosition
                        doc.fontSize(10).font('Helvetica-Oblique')
                        doc.text(edu.degree, leftMargin, degreeY, { lineBreak: false, width: pageWidth * 0.6 })

                        if (edu.startDate || edu.endDate) {
                            const dateRange = `${edu.startDate || ''} - ${edu.endDate || ''}`
                            doc.fontSize(10).font('Helvetica')
                            const dateWidth = doc.widthOfString(dateRange)
                            doc.text(dateRange, leftMargin + pageWidth - dateWidth, degreeY, { lineBreak: false })
                        }
                        yPosition += 20
                    }
                }
            })
            yPosition += 5
        }

        // Experience Section
        if (resumeData.experience && resumeData.experience.length > 0) {
            addSectionHeader('EXPERIENCE')

            resumeData.experience.forEach(exp => {
                if (exp.role) {
                    const roleY = yPosition
                    doc.fontSize(11).font('Helvetica-Bold')
                    doc.text(exp.role, leftMargin, roleY, { lineBreak: false, width: pageWidth * 0.6 })

                    if (exp.startDate || exp.endDate) {
                        const dateRange = `${exp.startDate || ''} - ${exp.endDate || ''}`
                        doc.fontSize(11).font('Helvetica')
                        const dateWidth = doc.widthOfString(dateRange)
                        doc.text(dateRange, leftMargin + pageWidth - dateWidth, roleY, { lineBreak: false })
                    }
                    yPosition += 15

                    if (exp.company) {
                        const companyY = yPosition
                        doc.fontSize(10).font('Helvetica-Oblique')
                        doc.text(exp.company, leftMargin, companyY, { lineBreak: false, width: pageWidth * 0.6 })

                        if (exp.location) {
                            doc.fontSize(10).font('Helvetica')
                            const locationWidth = doc.widthOfString(exp.location)
                            doc.text(exp.location, leftMargin + pageWidth - locationWidth, companyY, { lineBreak: false })
                        }
                        yPosition += 15
                    }

                    if (exp.bullets && exp.bullets.length > 0) {
                        doc.fontSize(10).font('Helvetica')
                        exp.bullets.forEach(bullet => {
                            if (bullet && bullet.trim()) {
                                const bulletText = `• ${bullet.trim()}`
                                const bulletHeight = doc.heightOfString(bulletText, { width: pageWidth - 20 })
                                doc.text(bulletText, leftMargin + 10, yPosition, { width: pageWidth - 20 })
                                yPosition += bulletHeight + 3
                            }
                        })
                    }
                    yPosition += 10
                }
            })
        }

        // Projects Section
        if (resumeData.projects && resumeData.projects.length > 0) {
            addSectionHeader('PROJECTS')

            resumeData.projects.forEach(project => {
                if (project.name) {
                    const projectY = yPosition
                    doc.fontSize(11).font('Helvetica-Bold')
                    doc.text(project.name, leftMargin, projectY, { lineBreak: false, width: pageWidth * 0.6 })

                    if (project.startDate || project.endDate) {
                        const dateRange = `${project.startDate || ''} - ${project.endDate || ''}`
                        doc.fontSize(11).font('Helvetica')
                        const dateWidth = doc.widthOfString(dateRange)
                        doc.text(dateRange, leftMargin + pageWidth - dateWidth, projectY, { lineBreak: false })
                    }
                    yPosition += 15

                    if (project.techStack && project.techStack.length > 0) {
                        doc.fontSize(10).font('Helvetica-Oblique')
                        const techText = project.techStack.join(', ')
                        const techHeight = doc.heightOfString(techText, { width: pageWidth })
                        doc.text(techText, leftMargin, yPosition, { width: pageWidth })
                        yPosition += techHeight + 5
                    }

                    if (project.bullets && project.bullets.length > 0) {
                        doc.fontSize(10).font('Helvetica')
                        project.bullets.forEach(bullet => {
                            if (bullet && bullet.trim()) {
                                const bulletText = `• ${bullet.trim()}`
                                const bulletHeight = doc.heightOfString(bulletText, { width: pageWidth - 20 })
                                doc.text(bulletText, leftMargin + 10, yPosition, { width: pageWidth - 20 })
                                yPosition += bulletHeight + 3
                            }
                        })
                    }
                    yPosition += 10
                }
            })
        }

        // Technical Skills Section
        if (resumeData.skills && (resumeData.skills.languages?.length > 0 || resumeData.skills.frameworks?.length > 0 || resumeData.skills.aiTools?.length > 0 || resumeData.skills.databases?.length > 0 || resumeData.skills.coreCS?.length > 0)) {
            addSectionHeader('TECHNICAL SKILLS')

            const skillCategories = [
                { label: 'Languages', items: resumeData.skills.languages },
                { label: 'Frameworks & Libraries', items: resumeData.skills.frameworks },
                { label: 'AI & Machine Learning Tools', items: resumeData.skills.aiTools },
                { label: 'Databases & Cloud', items: resumeData.skills.databases },
                { label: 'Core CS', items: resumeData.skills.coreCS }
            ]

            skillCategories.forEach(category => {
                if (category.items && category.items.length > 0) {
                    doc.fontSize(10).font('Helvetica-Bold')
                    const labelWidth = doc.widthOfString(`${category.label}: `)
                    doc.text(`${category.label}: `, leftMargin, yPosition, { continued: true, lineBreak: false })
                    doc.font('Helvetica')
                    const skillText = category.items.join(', ')
                    const skillHeight = doc.heightOfString(skillText, { width: pageWidth - labelWidth })
                    doc.text(skillText, { width: pageWidth - labelWidth })
                    yPosition += skillHeight + 5
                }
            })
            yPosition += 5
        }

        // Achievements Section
        if (resumeData.achievements && resumeData.achievements.length > 0 && resumeData.achievements[0]) {
            addSectionHeader('ACHIEVEMENTS')

            doc.fontSize(10).font('Helvetica')
            resumeData.achievements.forEach(achievement => {
                if (achievement && achievement.trim()) {
                    const bulletText = `• ${achievement.trim()}`
                    const bulletHeight = doc.heightOfString(bulletText, { width: pageWidth - 20 })
                    doc.text(bulletText, leftMargin + 10, yPosition, { width: pageWidth - 20 })
                    yPosition += bulletHeight + 3
                }
            })
        }

        doc.end()
    } catch (error) {
        console.log("Error in downloadResumePDF:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}