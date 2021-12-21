import React from "react";
import { Link } from "react-router-dom";
export default function Card({ movie }) {
  return (
    <div className="card bordered">
      <figure>
        <img src="https://picsum.photos/id/1005/400/250" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {movie.mediaName}
          <div className="badge mx-2 badge">NEW</div>
        </h2>
        <p>
        {movie.quotes.length} quotes
        </p>
        <div className="justify-end card-actions">
        <Link className="btn" to={`/movie/${movie.mediaName}`}>Read More</Link>

        </div>
      </div>
    </div>
  );
}

