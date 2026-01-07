import { useState } from "react";
import "../styles/Flashcard.css";

// Image must be an object with a url and alt text
const Flashcard = ({ image, question, answer }) => {
    return (
        <article className="card">
            <div className="card-inner">
                <div className="card-front">
                    <div className="card-top">
                        <img 
                            src={image.url}
                            alt={image.alt}
                        />
                    </div>
                    <div className="card-bottom">
                        <p>{question}</p>
                    </div>
                </div>
                <div className="card-back">
                    <p className="card-answer">{answer}</p>
                </div>
            </div>
        </article>
    );
};

export default Flashcard;