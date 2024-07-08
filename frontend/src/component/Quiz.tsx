import { useState } from "react";
import { Socket } from "socket.io-client";

export const quiz = (socket: Socket, quizid: string, userid: string, data: {
    title: string;
    description: string;
    image?: string;
    problemid: number;
    options: [{
        id: number;
        title: number
    }]
}) => {
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
                    <input type="text" value={option.title} />
                    <br />
                    <br />
                </div>
            ))


            };
            <button onClick={() => { console.log("submit") }}>submit</button>
        </div>
    )

}