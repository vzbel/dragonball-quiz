import './App.css';
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import FlashCard from "./components/Flashcard.jsx";
import AnswerForm from "./components/AnswerForm.jsx";
import Toolbar from "./components/Toolbar.jsx";
import characterService from './services/characters.js';
import kiParser from "./services/kiparser.js"; 
import Button from './components/Button.jsx';

const App = () => {
  // Dragon Ball API provides the characters, metadata, and 
  // pagination info in an object.
  const [characters, setCharacters] = useState({});
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRandomized, setIsRandomized] = useState(false);
  const [streak, setStreak] = useState({
    current: 0,
    longest: 0
  });

  useEffect(() => {
    characterService
      .getAll()
      .then((data) => {
        setCharacters(data);
      });
  }, []);

  const handleBackward = () => {
    let newIndex;
    if(isRandomized){
      newIndex = (history.length > 0) ? (history[history.length - 1]) : index;
      setHistory(history.filter((h, hIndex) =>  hIndex !== history.length - 1));
    }else{
      newIndex = index - 1;
    }
    setIndex(newIndex);
    resetForm();
  };

  const handleForward = () => {
    let newIndex;
    if(isRandomized){
      // Exclude current character from random choice
      const candidates = characters.items.filter((h, hIndex) => hIndex !== index);
      const candidate = candidates[(Math.floor(Math.random() * (candidates.length - 1)))];
      newIndex = characters.items.findIndex((c) => c == candidate);
    }else {
      newIndex = index + 1;
    }
    setHistory([...history, index]);
    setIndex(newIndex);
    resetForm();
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    setIsSubmitted(false);
  };

  const resetForm = () => {
    setAnswer("");
    setIsSubmitted(false);
  };

  const checkCorrectness = (ans) => {
    return ans.trim().toLowerCase() === characters.items[index].name.toLowerCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if(checkCorrectness(answer)){
      const newStreak = streak.current + 1;
      setStreak({
        current: newStreak,
        longest: (newStreak > streak.longest) ? newStreak : streak.longest
      });
    }else{
      setStreak({
        ...streak,
        current: 0
      });
    }
  };

  const handleShuffle = () => {
    setIsRandomized(!isRandomized);
    setHistory([]);
  };

  const markMastered = () => {
    setCharacters({
      ...characters,  
      items: characters.items.filter((c) => (c.name !== characters.items[index].name))
    });
    resetForm();
    setHistory([]);
    setIndex(0);
  };

  return (
    <>
      <Header title="Dragon Ball Quiz">
        <p>How big of a DB fan are you? 
        Test all your character knowledge here!</p>
        {
          characters.items &&
          <>
            <p>Current Streak: {streak.current},
            Longest Streak: {streak.longest}
            </p> 
            <p>
            Number of Cards : {characters.items.length}
            </p>
          </>
        }
      </Header>
      {
        characters.items && characters.items.length > 0 
        ? 
        <>
          <FlashCard 
            key={characters.items[index].id}
            image={{
              url: characters.items[index].image,
              alt: characters.items[index].affiliation
            }}
            question={"Who is this character?"}
            answer={characters.items[index].name}
            bgColor={kiParser.getColor(characters.items[index].ki)}
            isSubmitted={isSubmitted}
          />

          <AnswerForm
            answer={answer}
            isSubmitted={isSubmitted}
            isCorrect={checkCorrectness}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleSubmit}
          />

          <Toolbar 
            onForward={handleForward}
            onBack={handleBackward}
            isForwardDisabled={isRandomized ? false : (index === characters.items.length - 1)}
            isBackDisabled={isRandomized ? (history.length === 0) : index === 0}
          />

          <div className="shuffle-container flex">
            <Button 
              text={isRandomized ? "Unshuffle" : "Shuffle"} 
              onClick={handleShuffle}
              isDisabled={false}
            />
            <Button 
              text="Mark Mastered"
              onClick={markMastered}
              isDisabled={false}
            />
          </div>
        </>
        :
        <p className="no-cards">No cards to show...</p>
      }

    </>
  );
};

export default App;
