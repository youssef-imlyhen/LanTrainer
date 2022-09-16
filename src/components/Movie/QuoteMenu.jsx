import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FaRegTrashAlt, FaEllipsisH } from "react-icons/fa";
export default function QuoteMenu({
  selectedQuotes,
  setAllQuotes,
  movieName,
  setSelectedQuotes,
  allQuotes,
}) {
  const [selectedQuizLangs, setSelectedQuizLangs] = useState({
    question: undefined,
    answers: undefined,
  });

  // to understund (how i solved it)
  // i should use usereducer or an other usestate to change this moviePageQuotes.
  // there is a stale state issue here https://dmitripavlutin.com/react-hooks-stale-closures/
  const deleteClickHandler = () => {
    setAllQuotes((prev) => {
      const movieIndex = prev.findIndex(
        (movie) => movie.mediaName === movieName
      );
      const quotes = prev[movieIndex].quotes.filter(
        (quote) =>
          !selectedQuotes.some(
            (selectedQuote) => selectedQuote.addedTime === quote.addedTime
          )
      );
      // the problem is in the system as whole
      let newMovieQuotes = [...prev];
      newMovieQuotes[movieIndex].quotes = [...quotes];
      console.log(newMovieQuotes[movieIndex].quotes.length);
      return newMovieQuotes;
    });
    setSelectedQuotes([]);
  };

  const quizClickHandler = () => { console.log("hi from menu");};
  const editClickHandler = () => {
    console.log(selectedQuotes);
  };

  const options = [
    { value: "main", label: "English" },
    { value: "lang1", label: "Arabic" },
    { value: "lang2", label: "French" },
  ];
  const select1ChangeHandler = (e) => {
    setSelectedQuizLangs({ ...selectedQuizLangs, question: e.value });
  };
  const select2ChangeHandler = (e) => {
    setSelectedQuizLangs({ ...selectedQuizLangs, answers: e.value });
    console.log(selectedQuizLangs);
  };
  return (
    <ul className=" menu items-stretch px-3 shadow-lg  horizontal rounded-box fixed top-25 z-10 bg-neutral-focus">
      <li>
        {" "}
        <span>{selectedQuotes.length} seleted</span>
      </li>
      <li className="" onClick={quizClickHandler}>
        <Link
          to="/quiz"
          state={{
            questions: generateQuestions(
              selectedQuotes,
              "main",
              "lang1",
              allQuotes
            ),
            movieName,
          }}
        >
          quiz
        </Link>
      </li>
      <li onClick={quizClickHandler}>
        <label htmlFor="my-modal-2" className="btn  modal-button">
          open modal
        </label>
        <input type="checkbox" id="my-modal-2" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <Select
              className="text-primary"
              onChange={select1ChangeHandler}
              options={options}
            />
            <p>to</p>
            <Select
              className="text-primary"
              onChange={select2ChangeHandler}
              options={options}
            />
            <div className="modal-action">
              <label htmlFor="my-modal-2" className="btn btn-primary">
                Accept
              </label>
              <label htmlFor="my-modal-2" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
      </li>
      <li className="" onClick={deleteClickHandler}>
        <a>
          <FaRegTrashAlt />
        </a>
      </li>
      <li className="" onClick={editClickHandler}>
        <a>
          <FaEllipsisH />
        </a>
      </li>
    </ul>
  );
}

function generateQuestions(selectedQuotes, sub1, sub2, allQuotes) {
  const questions = [];
  selectedQuotes.forEach((quote) => {
    const NUMBER_OF_OPTIONS = 3;
    const wrongOptions = getRdmOptions(allQuotes, sub2, NUMBER_OF_OPTIONS, quote[sub2].text);
    questions.push({
      question: quote[sub1].text,
      options: [quote[sub2].text, ...wrongOptions].sort(
        (a, b) => 0.5 - Math.random()
      ),
      correctAnswer: quote[sub2].text,
      wholeQuote: quote,
    });
  });

  return questions;
}

// danger of infinit loop if quotes are less that 3 even without touching the 
// quiz button

function getRdmOptions(allQuotes, sub, optionsNum, correctAnswer) {
  // later will use only a fixed amount of quotes to search from
  let rdmOptionsSet = new Set();
  console.log("size: ", rdmOptionsSet.size, "my num: ", optionsNum);
  const quotes = allQuotes[0].quotes.map((quote) => quote[sub].text);
  let counterBreak = 0
  while (rdmOptionsSet.size < optionsNum && counterBreak < 300) {
     counterBreak += 1;
    const rdmNum = Math.floor(Math.random() * quotes.length);
    if (correctAnswer === quotes[rdmNum]) continue;
    rdmOptionsSet.add(quotes[rdmNum]);
    console.log("rdmoptions", rdmOptionsSet);
  }
  return rdmOptionsSet.values();
}
