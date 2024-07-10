import { useState } from "react";
import { Socket } from "socket.io-client";

interface QuizpProps {
    socket: Socket | null;
    quizid: string;
    userid: string;
    data: {
        title: string;
        description: string;
        image?: string;
        problemid: number;
        options: {
            id: number;
            title: string;
        }[];
    };
}

export const Quizp: React.FC<QuizpProps> = ({ socket, quizid, userid, data }) => {
    const [submit, setsubmit] = useState(false);
    const [answer, setAnswer] = useState<number | undefined>(undefined);

    return (
        <div>
            <h1>{data.problemid} {data.title}</h1>
            <p>{data.description}</p>
            {data.image && <img src={data.image} alt="Quiz" />}
            {data.options.map((option) => (
                <div key={option.id}>
                    <button
                        style={{
                            backgroundColor: option.id === answer ? "lightblue" : "white",
                        }}
                        value={option.title}
                        onClick={() => setAnswer(option.id)}
                    >
                        Option {option.id}
                    </button>
                    <input type="text" value={option.title} readOnly />
                    <br />
                    <br />
                </div>
            ))}
            <button
                onClick={() => {
                    console.log("submit", answer);
                    setsubmit(true);
                    socket?.emit('submit', {
                        quizid, userid, problemid: data.problemid,
                        submission: Number(answer),
                    })
                }}
            >
                submit
            </button>
        </div>
    );
};
