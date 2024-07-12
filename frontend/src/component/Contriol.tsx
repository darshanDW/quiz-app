import { useState } from "react";
import { Socket } from "socket.io-client";

export const Control = ({ socket, quizid }: { socket: Socket, quizid: string }) => {
    const [s, setstart] = useState(false);

    const start = () => {
        socket.emit('start', { quizid });
        setstart(true);
        console.log("start click");
    }
    if (!s) {
        return <div>
            <button onClick={start} >start quiz</button>
        </div>
    };
    if (s) {
        return <div>

            <button onClick={() => {
                socket.emit('next', {
                    quizid
                });
                console.log('next');
            }}>Next problem</button>
            <button onClick={() => {
                socket.emit('end', {
                    quizid
                });
                console.log('end');
            }}>end </button>
        </div>


    }

}