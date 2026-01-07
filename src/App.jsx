import './App.css';
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import FlashCard from "./components/Flashcard.jsx";
import Toolbar from "./components/Toolbar.jsx";
import characterService from './services/characters.js'; 

const App = () => {
  // Dragon Ball API provides the characters, metadata, and 
  // pagination info in an object.
  const [characters, setCharacters] = useState({});
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    characterService
      .getAll()
      .then((data) => {
        setCharacters(data);
      });
  }, []);

  const handleBackward = () => {
    const newIndex = (history.length > 0) ? (history[history.length - 1]) : index; 
    setHistory(history.filter((h, hIndex) =>  hIndex !== history.length - 1));
    setIndex(newIndex);
  };

  const handleForward = () => {
    // Exclude current character from random choice
    const candidates = characters.items.filter((h, hIndex) => hIndex !== index);
    const candidate = candidates[(Math.floor(Math.random() * (candidates.length - 1)))];
    const newIndex = characters.items.findIndex((c) => c == candidate);
    setHistory([...history, index]);
    setIndex(newIndex);
  };

  return (
    <>
      <Header title="Dragon Ball Quiz">
        <p>How big of a DB fan are you? 
        Test all your character knowledge here!</p>
        {
          characters.items &&
          <p>Number of Cards : {characters.items.length}</p>
        }
      </Header>
      {
        characters.items &&
        <>
          <FlashCard 
            key={characters.items[index].id}
            image={{
              url: characters.items[index].image,
              alt: characters.items[index].affiliation
            }}
            question={"Who is this character?"}
            answer={characters.items[index].name}
          />
          <Toolbar 
            onForward={handleForward}
            onBack={handleBackward}
          />
        </>
      }
    </>
  );
};

export default App;
