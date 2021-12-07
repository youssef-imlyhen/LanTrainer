import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import './App.css'
import Home from './components/Home.jsx';
import MoviePlayer from './components/movieplayer/MoviePlayer.jsx';
import AllQuotes from './components/Quotes/AllQuotes';
import NavBar from './components/NavBar/NavBar';
import Movie from './components/Movie/Movie';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/movie-player" element={<MoviePlayer/>} />
      <Route path="/quotes-list" element={<AllQuotes/>} />
      <Route path="/movie/:name" element={<Movie/>} />
      </Routes>
    </Router>

  )
}

export default App
