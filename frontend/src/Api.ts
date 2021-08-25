export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=31`;
  const data = await await (await fetch(endpoint)).json();
  console.log(data);
};
