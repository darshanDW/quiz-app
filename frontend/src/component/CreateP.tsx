import { useState } from "react";
const CreateP = ({ socket, quiz }: { socket: any; quiz: string; }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [answer, setAnswer] = useState(0);
    const [options, setOptions] = useState([
        { id: 0, title: "" },
        { id: 1, title: "" },
        { id: 2, title: "" },
        { id: 3, title: "" }
    ]);

    const handleAddProblem = () => {
        socket.emit('createProblem', {
            quiz,
            problem: {
                title,
                description,
                options,
                answer,
            }
        });

        // Reset the form fields
        setTitle("");
        if (title && description && options) {
            setTitle("");
            setDescription("");
            setAnswer(0);
            setOptions([
                { id: 0, title: "" },
                { id: 1, title: "" },
                { id: 2, title: "" },
                { id: 3, title: "" }
            ]);
        }
    };
    return (
        <div>
            { }
            Create problem
            <br />
            Title = <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br /><br />
            Description - <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />

            {options.map(option => (
                <div key={option.id}>
                    <input type="radio" checked={option.id === answer} onChange={() => setAnswer(option.id)} />
                    Option {option.id}
                    <input type="text" value={option.title} onChange={(e) => {
                        setOptions(options.map(x => {
                            if (x.id === option.id) {
                                return { ...x, title: e.target.value };
                            }
                            return x;
                        }));
                    }} />
                    <br />
                    <br />
                </div>
            ))


            };
            <br />

            <button onClick={handleAddProblem}>Add problem</button>


        </div>
    );
};

export default CreateP;
