export const calculateScore = (resumeText, jdText) => {
  const resumeWords = new Set(resumeText.toLowerCase().split(/\W+/));
  const jdWords = new Set(jdText.toLowerCase().split(/\W+/));

  let matchCount = 0;
  jdWords.forEach(word => {
    if (resumeWords.has(word)) matchCount++;
  });

  const score = Math.min(
    100,
    Math.round((matchCount / jdWords.size) * 100)
  );

  return score;
};