import Button from "./Button";
import "../styles/Toolbar.css";

const Toolbar = ({ onBack, onForward}) => {
    return (
        <nav className="toolbar flex">
            <Button 
                onClick={onBack}
                text="<-"
            />
            <Button 
                onClick={onForward}
                text="->"
            />
        </nav>
    );
};

export default Toolbar;