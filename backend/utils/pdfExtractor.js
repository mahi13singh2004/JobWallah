import PDFParser from "pdf2json"

export const extractTextFromPDF = (pdfBuffer) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser()

        pdfParser.on("pdfParser_dataError", (errData) => {
            reject(new Error('Failed to parse PDF: ' + errData.parserError))
        })

        pdfParser.on("pdfParser_dataReady", (pdfData) => {
            try {
                let text = ''
                if (pdfData.Pages) {
                    pdfData.Pages.forEach(page => {
                        if (page.Texts) {
                            page.Texts.forEach(textItem => {
                                if (textItem.R) {
                                    textItem.R.forEach(r => {
                                        if (r.T) {
                                            try {
                                                text += decodeURIComponent(r.T) + ' '
                                            } catch (e) {
                                                text += r.T + ' '
                                            }
                                        }
                                    })
                                }
                            })
                            text += '\n'
                        }
                    })
                }
                resolve(text.trim())
            } catch (error) {
                reject(new Error('Failed to extract text: ' + error.message))
            }
        })

        pdfParser.parseBuffer(pdfBuffer)
    })
}
