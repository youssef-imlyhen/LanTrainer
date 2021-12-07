import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {useLocalStorage} from '../custom-hooks/useLocalStorage'
import QuoteCard from './QuoteCard';
import'./Movie.css';

export default function Movie() {
    const [allQuotes, setAllQuotes] = useLocalStorage("savedQuotes", [])
    const name = useParams().name;
    return (
        <div>
            <h1>{name}</h1>
            <div className="quotes">
            {
                allQuotes.find(movie => movie.mediaName === name).quotes
                .map(quote => <QuoteCard key={quote.addedTime.toString()} quote={quote}/>)
                
            }
            </div>
            
        </div>
    )
}
