import crypto from "crypto";

export const generateInputHash = (resumeText, jdText) => {
  return crypto
    .createHash("sha256")
    .update(resumeText.trim() + "||" + jdText.trim())
    .digest("hex");
};