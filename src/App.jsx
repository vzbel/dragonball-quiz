import './App.css';
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import characterService from './services/characters.js'; 

const App = () => {
  // Dragon Ball API provides the characters, metadata, and 
  // pagination info in an object.
  const [characters, setCharacters] = useState({});

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
    </>
  );
};

export default App;
