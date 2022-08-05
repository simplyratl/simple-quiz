// import { questions } from "./questions";
import { useState } from "react";
import { questions } from "./questions";
import "./scss/style.scss";

function App() {
    interface answerSelected {
        answerText: string;
        isCorrect: boolean;
    }

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<answerSelected>();
    const [showScore, setShowSscore] = useState<boolean>(false);
    const [lock, setLock] = useState<boolean>(false);

    const handleAnswerOptionClick = (isCorrect: boolean) => {
        setLock(true);
        setSelectedAnswer(undefined);

        if (isCorrect) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowSscore(true);
            }

            setLock(false);
        }, 2000);
    };

    const handleAnswerStyle = (question: answerSelected) => {
        if (selectedAnswer) {
            if (selectedAnswer.isCorrect && selectedAnswer === question) {
                return "right";
            } else if (!selectedAnswer.isCorrect && selectedAnswer === question) {
                return "wrong";
            }
        }
    };

    return (
        <main className="main">
            <div className="main__wrapper">
                {!showScore ? (
                    <div className="main__quiz-box">
                        <div className="main__quiz-box-left">
                            <h1 className="main__quiz-box-heading">
                                Question {currentQuestion + 1}/{questions.length}
                            </h1>
                            <p className="main__quiz-box-paragraph">
                                {questions[currentQuestion].questionText}
                            </p>
                        </div>
                        <div className="main__quiz-box-right">
                            <ul className="main__quiz-box-list">
                                {questions[currentQuestion].answerOptions.map((question, index) => (
                                    <li
                                        className={`main__quiz-box-list-item ${handleAnswerStyle(question)}`}
                                        onClick={() => {
                                            handleAnswerOptionClick(question.isCorrect);
                                            !lock && setSelectedAnswer(question);
                                        }}
                                        key={index}
                                    >
                                        {question.answerText}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <h1 style={{ textAlign: "center", fontSize: "4rem" }}>Your score: {score}</h1>
                )}
            </div>
        </main>
    );
}

export default App;
