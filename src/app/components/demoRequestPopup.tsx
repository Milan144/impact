import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';

const DemoRequestPopup = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const popupRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Remove event listener on cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_1sue7z5', 'template_iu1g8t4', e.target, '1qOCEgn7w3DjE8ZiZ', { user_email: email })
            .then((result) => {
                console.log("Email sent", result.text);
                onClose();
            }, (error) => {
                console.log("Email sending error", error.text);
            });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div ref={popupRef} className="mx-5 relative bg-gray-800 rounded-lg p-8">
                <button className="absolute top-0 right-0 border-none bg-none text-white text-xl cursor-pointer" onClick={onClose}>
                    <div className="in pr-2">
                        <div className="close-button-block">X</div>
                        <div className="close-button-block"></div>
                    </div>
                    <div className="out">
                        <div className="close-button-block"></div>
                        <div className="close-button-block"></div>
                    </div>
                </button>
                <form onSubmit={sendEmail}>
                    <input
                        value={email}
                        name="user_email"
                        type="email"
                        className="text-white font-medium text-lg bg-transparent border-2 border-gray-600 rounded px-4 py-3 w-full mb-6"
                        placeholder="Entrez votre email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input  type="submit" value="Faire la demande" className="font-semibold text-lg text-white bg-transparent border-2 border-white rounded py-3 px-6 transition-all duration-300 hover:bg-white hover:text-black" />
                </form>
            </div>
        </div>
    );
};

export default DemoRequestPopup;
