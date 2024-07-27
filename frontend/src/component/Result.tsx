import React from 'react';
import './Result.css';

interface Resultprops {
    winner: {
        points: string;
        name: string;
        userid: string;
    }
}

export const Result: React.FC<Resultprops> = ({ winner }) => {
    return (
        <div className="result">
            <h1 className="result-title">Congratulations!</h1>
            <p className="result-info">Winner is: <span className="result-highlight">{winner.name}</span></p>
            <p className="result-info">Points: <span className="result-highlight">{winner.points}</span></p>
        </div>
    );
}
