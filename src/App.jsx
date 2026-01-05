import './App.css';
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import FlashCard from "./components/Flashcard.jsx";
import characterService from './services/characters.js'; 

const App = () => {
  // Dragon Ball API provides the characters, metadata, and 
  // pagination info in an object.
  const [characters, setCharacters] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    characterService
      .getAll()
      .then((data) => {
        setCharacters(data);
      });
  }, []);

  return (
    <>
      <Header 
        title="Dragon Ball Quiz"
        description="How big of a DB fan are you? 
        Test all your character knowledge here!"
      />
      {
        characters.items &&
        <FlashCard 
          key={characters.items[index].id}
          image={{
            url: characters.items[index].image,
            alt: characters.items[index].affiliation
          }}
          question={"Who is this character?"}
        />
      }
    </>
  );
};

export default App;
