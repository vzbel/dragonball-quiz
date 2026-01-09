import "../styles/AnswerForm.css";

const AnswerForm = ({ answer, isSubmitted, isCorrect, onAnswerChange, onSubmit }) => {
    let inputColor = "";
    if(isSubmitted && isCorrect(answer)){
        inputColor = "correct";
    }else if(isSubmitted){
        inputColor = "incorrect"; 
    }

    return (
        <form onSubmit={onSubmit} className="guess-form flex">
            <div>
                <label htmlFor="user-answer">
                    Type your answer:
                </label>
                <input 
                    id="user-answer" 
                    type="text"
                    value={answer}
                    onChange={onAnswerChange}
                    placeholder="Krillin..."
                    className={inputColor}
                />
            </div>
            <button type="submit">
                Submit
            </button>
        </form>
    );
};

export default AnswerForm;