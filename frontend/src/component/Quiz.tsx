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
            title: string
        }[]
    };
}
export const Quizp: React.FC<QuizpProps> = ({ socket, quizid, userid, data }) => {
    const [submit, setsubmit] = useState(false);
    const [answer, setAnswer] = useState(undefined)
    return (
        <div>
            <h1>{data.problemid}{data.title}</h1>
            <p>{data.description}</p>
            <p>{
                data.image
            }</p>
            {data.options.map((option: any) => (
                <div key={option.id}>
                    <input type="radio" checked={option.id === answer} onChange={() => setAnswer(option.id)} />
                    Option {option.id}
                    <input type="text" readOnly={option.title} />
                    <br />
                    <br />
                </div>
            ))


            };
            <button onClick={() => {
                console.log("submit");
                setsubmit(true);
            }}>submit</button>
        </div>
    )

}