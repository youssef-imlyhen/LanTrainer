import React from 'react'
import { useLocalStorage } from "../custom-hooks/useLocalStorage";
export default function SaveQuote({lastPlayedCues, movieName}) {
    const [savedQuotes, setSavedQuotes] = useLocalStorage("savedQuotes", [])

    const clickHandler = () => {
        var movieQuotesIndex = savedQuotes.findIndex(
           movieQuotes => movieQuotes.mediaName === getPretifiedMovieName(movieName));
          const newMovieQuotes = [...savedQuotes];

           if (movieQuotesIndex === -1) {
            newMovieQuotes.push({
              mediaType: "movie",
              mediaName: getPretifiedMovieName(movieName),
              quotes: [],
            });
            movieQuotesIndex = newMovieQuotes.findIndex(
              (movieQuotes) => movieQuotes.mediaName === getPretifiedMovieName(movieName)
            );
          }

          newMovieQuotes[movieQuotesIndex].quotes.push({
            ...lastPlayedCues, 
            addedTime: new Date()
          })

        setSavedQuotes(newMovieQuotes)
    }
    return (
      <button className="add-btn" onClick={clickHandler}>+</button>
    )
}


function getPretifiedMovieName(movieName) {

    let regex = /([.\w']+?)(20|19)\d{2}/
    if (!movieName.match(regex)) {
        regex = /[.\w]+/
    }
    return movieName.match(regex).toString();
}




    // get pretifiedMovieName
    // set up the datastructure
        /*
        steps: 
            1- get the regex pattern that remvoes all the text after the year
            Regex: /([ .\w']+?)(20|19)\d{2}/
    */ 