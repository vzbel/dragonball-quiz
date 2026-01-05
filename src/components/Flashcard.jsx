import "../styles/Flashcard.css";

// Image must be an object with a url and alt text
const Flashcard = ({ image, question }) => {
    return (
        <article className="card">
            <div className="card-top">
                <img 
                    src={image.url}
                    alt={image.alt}
                />
            </div>
            <div className="card-bottom">
                <p>{question}</p>
            </div>
        </article>
    );
};

export default Flashcard;