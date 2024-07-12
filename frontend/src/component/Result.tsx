interface Resultprops {
    winner: {
        points: String,
        name: string,
        userid: string
    }

}

export const Result: React.FC<Resultprops> = ({ winner }) => {
    return (
        <>
            <p>winner is :{winner.name}{winner.points}</p>
        </>
    );
}