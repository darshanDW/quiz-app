import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import CreateP from "./CreateP";
import { Control } from "./Contriol";
function Admin() {
    const [quiz, setQuiz] = useState("");
    const [a, seta] = useState("");
    const [S, setS] = useState<null | any>(null);
    useEffect(() => {
        const socket: Socket = io("http://localhost:3000");
        console.log(socket);
        setS(socket);
        console.log(S);
        socket.on("connect", () => {
            console.log("Connected to the server");
        });
        socket.emit("join-admin");

        socket.on("disconnect", () => {
            console.log("Disconnected from the server");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    if (!quiz) {
        return (
            <>
                <input
                    type="text"
                    placeholder="code"
                    onChange={(e) => { seta(e.target.value) }} />
                <button onClick={() => {
                    setQuiz(a);
                    if (S) {
                        console.log(a);
                        S.emit("create-quiz", { quiz: a });
                    }
                }

                }>
                    Create quiz

                </button>
            </>
        );
    }

    return (
        <>
            <CreateP quiz={quiz} socket={S} />
            <Control socket={S} quizid={quiz} />
        </>
    );
}

export default Admin;
