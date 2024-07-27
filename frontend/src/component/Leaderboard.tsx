import React from 'react';
import './Leaderboard.css';

interface LeaderboardProps {
    leaderboard: {
        userid: string;
        name: string;
        points: number;
    }[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
    // Ensure we only show the top 10 players
    const topPlayers = leaderboard.slice(0, 10);

    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <ul>
                {topPlayers.map((player, index) => (
                    <li key={player.userid} className="leaderboard-item">
                        <span className="player-rank">{index + 1}</span>
                        <span className="player-name">{player.name}</span>
                        <span className="player-score">{Math.floor(player.points)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
