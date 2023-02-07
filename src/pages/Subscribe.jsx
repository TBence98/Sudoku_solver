import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SubscribeForm from "../components/SubscribeForm";
import Modal from "../components/ui/Modal";

const Subscribe = () => {
    const [modalText, setModalText] = useState("");
    const navigate = useNavigate();

    function submitHandler(values) {
        /* fetch("API", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => setModalText("Successful Subscription"))
            .catch((error) => setModalText(error)); */

        setModalText("Successful Subscription");
    }

    function closeModal() {
        setModalText("");
        navigate("/");
    }

    return (
        <>
            {modalText ? (
                <Modal onClose={closeModal} message={modalText} />
            ) : null}
            <SubscribeForm submitHandler={submitHandler} />
        </>
    );
};

export default Subscribe;
