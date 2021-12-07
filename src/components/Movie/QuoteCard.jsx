import React from 'react'
import './QuoteCard.css'
export default function QuoteCard({quote}) {
    const handleClick = e => {
        quote
    }
    return (
        <div className="quote">
            <button className="quote__delete" onClick={handleClick}>X</button>
            <p className="quote__text">{quote.main.text}</p>
            <p className="quote__text">{quote.lang1.text}</p>
            <p className="quote__text">{quote.lang2.text}</p>
            <div className="quote__details">
                <p className="quote__details__createdTime">{quote.addedTime}</p>
            </div>
        </div>
    )
}
