import ReactDOM from "react-dom";
import Button from "./Button";
import classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
    return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ className, message, onClose }) => {
    return (
        <div className={`${classes.modal} ${className}`}>
            <p>{message}</p>
            <Button onClick={onClose}>OK</Button>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ className, onClose, message }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClose={onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    className={className}
                    message={message}
                    onClose={onClose}
                />,
                portalElement
            )}
        </>
    );
};

export default Modal;
