import { useState } from "react";
import { Socket } from "socket.io-client";
import "./Quiz.css"
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
    counter: number
}

export const Quizp: React.FC<QuizpProps> = ({ socket, quizid, userid, data, counter }) => {
    const [submit, setsubmit] = useState(false);

    const [answer, setAnswer] = useState<number | undefined>(undefined);
    const [timer, settimer] = useState(counter);
    setInterval(() => {
        settimer(timer - 1);
    }, 1000);
    return (
        <div className="quiz-container">
            <div className="question-data">
                <h2 className="timer">Timer is: {timer}</h2>
                <h1 className="question-title">{(data.problemid) + 1} {data.title}</h1>
                <p className="question-description">{data.description}</p>
                {data.image && <img src={data.image} alt="Quiz" />}
            </div>
            <div className="options-data">
                {data.options.map((option) => (
                    <div key={option.id}>
                        <button
                            className="option-button"
                            style={{
                                backgroundColor: option.id === answer ? "lightblue" : "white",
                            }}
                            value={option.title}
                            onClick={() => setAnswer(option.id)}
                        >
                            {option.title}
                        </button>
                        <br />
                        <br />
                    </div>
                ))}</div>

            <button
                className="submit-button"
                onClick={() => {
                    console.log("submit", answer);
                    if (submit) { setsubmit(true); }
                    socket?.emit('submit', {
                        quizid, userid, problemid: data.problemid,
                        submission: Number(answer),
                    })
                }}
            >
                Submit
            </button>
        </div>

    );
};
