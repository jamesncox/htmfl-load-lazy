import "./App.css";

import { useState } from "react";

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function App() {
  const [memes, setMemes] = useState([]);
  const BASE_URL = "https://api.imgflip.com/get_memes";

  const getMemes = () => {
    return async () => {
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
          throw res;
        }
        const memeData = await res.json();
        setMemes(memeData.data.memes);
      } catch (err) {
        alert("Failed to load memes");
      }
    };
  };

  const shuffledMemes = shuffle(memes);

  return (
    <div className="App">
      <h1>HTML Lazy Loading</h1>
      <button onClick={getMemes()}>Get Memes</button>
      {memes.length > 0 &&
        shuffledMemes.map((meme) => (
          <div key={meme.id}>
            <p>{meme.name}</p>
            <img src={meme.url} alt={meme.name} loading="lazy" />
          </div>
        ))}
    </div>
  );
}
