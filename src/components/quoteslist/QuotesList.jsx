import React from "react";
import './quoteslist.css'
function QuotesList() {
  return (
    <div>
      <nav class="nav">
        <a href="./index.html">Movie Player </a>
        <a href="./list.html">List</a>
        <a href="./quiz/dist/index.html">Quiz</a>
      </nav>
      <h1 class="heading">List of Selected Quotes</h1>
      <div class="movies-filter">
        <p>
          choose what movie quotes to show by clicking on one of the movies
          tiltles below
        </p>
        <div class="movies-titles"></div>
        <div class="movie-card">
          <div class="movie-card__thumbnail"></div>
          <h2 class="movie-card__title">Movie Title</h2>
          <p class="movie-card__descreption">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div class="list-container">
        <ol class="col1 col"></ol>
        <ol class="col2 col"></ol>
        <ol class="col3 col"></ol>
      </div>
    </div>
  );
}

export default QuotesList;
