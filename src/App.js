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

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;

export default function App() {
  const [memes, setMemes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const MEME_URL = "https://api.imgflip.com/get_memes";
  const UNSPLASH_URL = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`;

  const getMemes = () => {
    return async () => {
      try {
        const res = await fetch(MEME_URL);
        if (!res.ok) {
          throw res;
        }
        const memeData = await res.json();
        setMemes(memeData.data.memes);
        setPhotos([]);
      } catch (err) {
        alert("Failed to load memes");
      }
    };
  };

  const getPhotos = () => {
    return async () => {
      try {
        const res = await fetch(UNSPLASH_URL);
        if (!res.ok) {
          throw res;
        }
        const photoData = await res.json();
        setPhotos(photoData);
        setMemes([]);
      } catch (err) {
        alert("Failed to load memes");
      }
    };
  };

  const shuffledMemes = shuffle(memes);
  const shuffledPhotos = shuffle(photos);

  return (
    <div className="App">
      <h1>HTML Lazy Loading</h1>
      <button onClick={getMemes()}>Get Memes</button>
      <button onClick={getPhotos()}>Get Photos</button>
      {memes.length > 0 &&
        shuffledMemes.map((meme) => (
          <div key={meme.id}>
            <p>{meme.name}</p>
            <img src={meme.url} alt={meme.name} loading="lazy" />
          </div>
        ))}
      {shuffledPhotos.length > 0 &&
        photos.map((photo) => (
          <div key={photo.id}>
            <img
              className="unsplash-img"
              src={photo.urls.regular}
              alt={photo.alt_description}
              loading="lazy"
            />
          </div>
        ))}
    </div>
  );
}
