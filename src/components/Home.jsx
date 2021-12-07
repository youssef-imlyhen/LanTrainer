import React from "react";
import Card from "./cards/Card.jsx";
import { useLocalStorage } from "./custom-hooks/useLocalStorage";
export default function Home() {
  const [allQuotes, setAllQuotes] = useLocalStorage("savedQuotes", []);
  return (
    <div className="grid  grid-cols-1 gap-7 ">
      <h1 className="text-4xl  text-green-100 mt-11">Enjoy Learning</h1>
      <h2 className="text-2xl  text-green-600 ">latest groups</h2>
      <div className="grid grid-cols-3">
        {allQuotes.map((movie) => (
          <Card key={movie.mediaName} movie={movie} />
        ))}
        
      </div>
    </div>
  );
}
