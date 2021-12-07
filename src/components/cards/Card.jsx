import React from 'react'
import {Link} from 'react-router-dom'
import "./cards.css"
export default function Card({movie}) {
    return (
        <div className="flex flex-col bg-blue-900 justify-between  h-80">
        <div className="h-40 bg-green-300 w-full"/>
            <h2 className="text-xl">{movie.mediaName}</h2>
            <p className="movie-card__desc">{movie.quotes.length} quotes</p>
            <div className="flex justify-center">
                <Link to={`/movie/${movie.mediaName}`} className="text-lg p-1.5 bg-green-500  text-green-900 text-center rounded-md hover:bg-green-600">Read More</Link>
            </div>
        </div>
    )
}
