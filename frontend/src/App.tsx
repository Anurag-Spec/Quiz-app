import React, { useEffect, useState } from "react";
import { fetchQuestions } from "./API";
import Questions from "./components/Questions";
import { QuestionState, Difficulty } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

firebase.initializeApp({
  apiKey: "AIzaSyDhqSLqvBhdlNjTV1tDUmNIXAkKJ1pdPio",
  authDomain: "quiz-app-23324.firebaseapp.com",
  projectId: "quiz-app-23324",
  storageBucket: "quiz-app-23324.appspot.com",
  messagingSenderId: "276253502318",
  appId: "1:276253502318:web:5464f631c50e368e07ef7f",
});

const TOTAL_QUESTIONS = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isSignedIn, setisSignedIn] = useState(false);
  let uiConfig: any = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setisSignedIn(!!user);
      setUser(user);
    });
  }, [isSignedIn]);

  const startQuiz = async (category: any) => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
      category
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else setNumber(nextQuestion);
  };

  return (
    <>
      {isSignedIn ? (
        <>
          <GlobalStyle />
          <Wrapper>
            <h1> The Quiz </h1>
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
              <>
                <h3>Choose a Category to start Playing</h3>
                <button
                  value="31"
                  className="start"
                  onClick={(e) => startQuiz(e.currentTarget.value)}
                >
                  Anime
                </button>
                <button
                  value="9"
                  className="start"
                  onClick={(e) => startQuiz(e.currentTarget.value)}
                >
                  General Knowledge
                </button>
                <button
                  value="10"
                  className="start"
                  onClick={(e) => startQuiz(e.currentTarget.value)}
                >
                  Films
                </button>
                <button
                  value="18"
                  className="start"
                  onClick={(e) => startQuiz(e.currentTarget.value)}
                >
                  Computers
                </button>
              </>
            ) : null}

            {!gameOver && number === TOTAL_QUESTIONS - 1 ? (
              <p className="score">
                Congratulations {user?.displayName} your score is: {score}
              </p>
            ) : null}
            {loading && <p>Loading Questions ....</p>}
            {!loading && !gameOver && (
              <Questions
                questionNr={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />
            )}
            {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 ? (
              <button className="next" onClick={nextQuestion}>
                Next Question
              </button>
            ) : null}
          </Wrapper>
        </>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </>
  );
}

export default App;
