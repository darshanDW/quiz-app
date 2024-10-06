import { useState } from "react";
import { Socket } from "socket.io-client";
import "./CreateP.css"
import "./Contriol.css"
export const Control = ({ socket, quizid }: { socket: Socket, quizid: string }) => {
    const [s, setstart] = useState(false);

    const start = () => {
        socket.emit('start', { quizid });
        setstart(true);
        console.log("start click");
    }

    if (!s) {
        return (
            <div className="control-container">
                <button className="control-button" onClick={start}>Start Quiz</button>
            </div>
         );
    }

    return (
        <div className="control-container">
            <button className="control-button" onClick={() => {
                socket.emit('next', { quizid });
                console.log('next');
            }}>Next Problem</button>
            <button className="control-button" onClick={() => {
                socket.emit('end', { quizid });
                console.log('end');
            }}>End Quiz</button>
        </div>
    );
};
