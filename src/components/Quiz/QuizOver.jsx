import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function QuizOver({questionIndex, score, questions}) {
  const navigate = useNavigate()
  return (

    <div className="card bordered">
        <div className="card-body">
        <div className="card-title">Results</div>
      <div className="stats">
        <div className="stat">
          <div className="stat-title">you have got</div>
          <div className="stat-value">{score}</div>
          <div className="stat-desc">out of {questionIndex} questions</div>
          <div className="stat-actions">
            <button className="btn btn-sm btn-link" ><Link to="/">return to quotes</Link></button>
          </div>
        </div>
      </div>
        </div>
    </div>
  );
}
