import React, { useState } from "react";
import { useLocation } from "react-router";
import QuizOver from "./QuizOver";
import { FaPuzzlePiece } from "react-icons/fa";

export default function Quiz() {
  const location = useLocation();
  const { questions } = location.state;
  let [questionIndex, setQuestionIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState();
  const [score, setScore] = useState(0);
  const [isAnswerSubmited, setIsAnswerSubmited] = useState(false);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [tries, setTries] = useState(0);
  const nextClickHandler = () => {
    questions.length > questionIndex + 1
      ? setQuestionIndex(questionIndex + 1)
      : setIsQuizOver(true);
    tries === 1 ? setScore(score + 1) : undefined;

    setIsAnswerSubmited(false);
    setTries(0);
  };

  const optionClickHandler = (e) => {
    // questions[questionIndex].wholeQuote,
    if (tries > 0 && isAnswerCorrect) return;
    setIsAnswerSubmited(true);
    setTries(tries + 1);

    if (e.target.textContent === questions[questionIndex].correctAnswer) {
      console.log("eqq");
      const correctAnswerSyles = ["bg-green-600", "hover:bg-green-700"];
      e.target.classList.remove("hover:bg-primary-focus");
      e.target.classList.add(...correctAnswerSyles);
      setTimeout(() => {
        e.target.classList.add("hover:bg-primary-focus");
        e.target.classList.remove(...correctAnswerSyles);
      }, 500);

      setIsAnswerCorrect(true);
    } else {
      console.log("not eqq");
      const wrongAnswerSyles = [
        "bg-red-700",
        "hover:bg-red-800",
        "text-purple-500",
      ];
      e.target.classList.remove("hover:bg-primary-focus");
      e.target.classList.add(...wrongAnswerSyles);
      setTimeout(() => {
        e.target.classList.remove(...wrongAnswerSyles);
        e.target.classList.add("hover:bg-primary-focus");
      }, 700);
      setIsAnswerCorrect(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      {questionIndex >= questions.length ? (
        <QuizOver score={score} questionIndex={questionIndex} />
      ) : (
        <div className="card bg-neutral w-11/12 max-w-5xl">
          <FaPuzzlePiece className="text-5xl self-center text-info hover:animate-pulse" />

          <div className="card-body">
            <h1 className="card-title text-2xl">
              "{questions[questionIndex].question}"
            </h1>

            <div className="flex justify-end">
              <p className="badge badge-info">score {score}</p>
              <h3 className="badge badge-ghost">
                {" "}
                question {questionIndex + 1 + "/" + questions.length}
              </h3>
            </div>
              <div id="options" className={` mt-4 mb-4 rounded-2xl`}>
                {questions[questionIndex].options.map((option) => (
                  <p
                    className="text-base-400 pt-3 pb-3 bg-primary hover:bg-primary-focus rounded-md text-center  mb-2"
                    key={option}
                    onClick={optionClickHandler}
                  >
                    {option}
                  </p>
                ))}
              </div>
            {isAnswerSubmited === false ? (
              <></>
            ) : isAnswerCorrect ? (
              <>
                <div className="alert alert-success">good job</div>
                <button
                  onClick={nextClickHandler}
                  className="btn btn-primary animate-pulse"
                >
                  Next
                </button>
              </>
            ) : (
              <div className="alert alert-error">choose another answer</div>
            )}
            <button className="btn btn-ghost bg-base-100" onClick={()=>setQuestionIndex(questionIndex+1)}>Skip</button>
          </div>
        </div>
      )}
    </div>
  );
}

/*
the 

*/
/*
todo: add the warning 
hide the the next button when clicked
game over and show the statistics 
clean the components
integrate with quotes

todo: get rid of the errors, give unique key(added time to each option)
todo: get random unique options


*/
// const data = [
//   {
//     question: "what is this and that and the other",
//     options: ["wrong1", "wrong2", "wrong3", "correct"],
//     correctAnswer: "correct",
//   },
//   {
//     question: "what is this and that and the other",
//     options: ["2wrong1", "2wrong2", "2wrong3", "correct"],
//     correctAnswer: "correct",
//   },
// ];
