import React from 'react'
export default function QuoteCard({quote, setSelectedQuotes}) {
    const handleClick = e => {
        if (e.target.checked) {
            setSelectedQuotes(prev => ([...prev, quote]))
        }else{
            setSelectedQuotes(prev => prev.filter(selectedQuote => selectedQuote.addedTime !== quote.addedTime))
        }
    }
    return (
        <div className="card bg-neutral shadow p-5 justify-between" > 
            <input type="checkbox" className="checkbox" onClick={handleClick}></input>
            <div id="quotes" className="">
            <p className=" my-2 border-l-2 border-primary px-4 bg-base-100 rounded-md  ">{quote.main.text}</p>
            <p className=" my-2 border-l-2 border-primary px-4 bg-base-100 rounded-md  ">{quote.lang1.text}</p>
            <p className=" my-2 border-l-2 border-primary px-4 bg-base-100 rounded-md  ">{quote.lang2.text}</p>
            </div>
            <div className="quote__details">
                <p className="stat-desc ">{quote.addedTime}</p>
            </div>
        </div>
    )
}
