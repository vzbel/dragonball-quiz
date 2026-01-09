import Button from "./Button";
import "../styles/Toolbar.css";

const Toolbar = ({ onBack, onForward, isForwardDisabled, isBackDisabled }) => {
    return (
        <nav className="toolbar flex">
            <Button 
                onClick={onBack}
                text="<-"
                isDisabled={isBackDisabled}
            />
            <Button 
                onClick={onForward}
                text="->"
                isDisabled={isForwardDisabled}
            />
        </nav>
    );
};

export default Toolbar;