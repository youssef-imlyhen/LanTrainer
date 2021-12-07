import React from 'react'
import { useLocalStorage } from '../custom-hooks/useLocalStorage'
export default function AllQuotes() {
    const [allQuotes, setAllQuotes] = useLocalStorage("savedQuotes", [])
    console.log(allQuotes);
    return (
        <div>
            hi
            {<h1 >{allQuotes[0].mediaName}</h1>}
{                  
        allQuotes[0].quotes.map(quote => 
        <ul>
            <li key={ quote.main.text}>{quote.main.text}</li>
            <li key={ quote.lang1.text}>{quote.lang1.text}</li>
            <li key={ quote.lang2.text}>{quote.lang2.text}</li>
        </ul>
)
    }
            
        </div>
    )
}

// {
//     movie.quotes.map(quote => {
//         <ul>
//             <li key={ quote.main.text}>{quote.main.text}</li>
//             <li key={ quote.lang1.text}>{quote.lang1.text}</li>
//             <li key={ quote.lang2.text}>{quote.lang2.text}</li>
//         </ul>
//     })
// }