import React from "react";
import Card from "./cards/Card.jsx";
import { useLocalStorage } from "./custom-hooks/useLocalStorage";
export default function Home() {
  const [allQuotes, setAllQuotes] = useLocalStorage("savedQuotes", []);
  return (
    <div className="grid  grid-cols-1 gap-7 p-4">
      
      <h1 className="text-4xl  text-base-content mt-11">Enjoy Learning</h1>
      <h2 className="text-2xl  text-info ">latest groups</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allQuotes.map((movie) => (
          <Card key={movie.mediaName} movie={movie} />
        ))}
        
      </div>
    </div>
  );
}
