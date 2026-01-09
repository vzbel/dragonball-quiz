import "../styles/Button.css";

const Button = ({ onClick, text, isDisabled }) => {
    return (
        <button onClick={onClick} disabled={isDisabled} className={isDisabled ? "disabled-btn" : ""}>
            { text }
        </button>
    );
};

export default Button;