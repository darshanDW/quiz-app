interface LeaderboardProps {
    leaderboard: {
        userid: string;
        name: string;
        points: number;
    }[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
    return (
        <>
            {leaderboard.map(x => (
                <p key={x.userid}>
                    {x.points} {x.name}
                </p>
            ))}
        </>
    );
}
