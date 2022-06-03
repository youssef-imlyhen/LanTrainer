import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";

import { useLocalStorage } from "../custom-hooks/useLocalStorage";
import QuoteCard from "./QuoteCard";
import QuoteMenu from "./QuoteMenu";

export default function Movie() {
  const [allQuotes, setAllQuotes] = useLocalStorage("savedQuotes", []);
  const movieName = useParams().name;
  const [selectedQuotes, setSelectedQuotes] = useState([]);

  useEffect(() => {
    // setSelectedQuotes([]);
    console.log(selectedQuotes);
  }, [selectedQuotes]);

  return (
    <div className="flex flex-col items-center">
      {/* show a menu if a quote is selected */}
      {selectedQuotes.length !== 0 ? (
        <QuoteMenu
          selectedQuotes={selectedQuotes}
          setAllQuotes={setAllQuotes}
          movieName={movieName}
          setSelectedQuotes={setSelectedQuotes}
          allQuotes={allQuotes}
        />
      ) : ("")}
      <h1 className="text-4xl pb-8">{movieName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 w-11/12">
        {/* reder the quotes probably here i don't need a the codition here*/}
        {allQuotes.length !== 0
          ? allQuotes
              .find((movie) => movie.mediaName === movieName)
              .quotes.map((quote) => (
                <QuoteCard
                  key={quote.addedTime}
                  quote={quote}
                  setSelectedQuotes={setSelectedQuotes}
                />
              ))
          : "there is no quotes"}
      </div>
    </div>
  );
}
