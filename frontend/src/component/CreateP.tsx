import { useState } from "react";
import './CreateP.css';
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
        <div className="create-problem-container">
            <div className="create-problem-title">Create problem</div>
            <input
                className="create-problem-input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="create-problem-description"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="options"> {options.map(option => (
                <div key={option.id} className="create-problem-option">
                    <input
                        type="radio"
                        checked={option.id === answer}
                        onChange={() => setAnswer(option.id)}
                    />
                    Option {option.id + 1}
                    <input className="option-input"
                        type="text"
                        placeholder={`Option ${option.id} `}
                        value={option.title}
                        onChange={(e) => {
                            setOptions(options.map(x => {
                                if (x.id === option.id) {
                                    return { ...x, title: e.target.value };
                                }
                                return x;
                            }));
                        }}
                    />
                </div>
            ))}</div>
            <button className="create-problem-button" onClick={handleAddProblem}>
                Add problem
            </button>
        </div>

    );
};

export default CreateP;
