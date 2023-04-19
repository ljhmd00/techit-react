const Card = ({ color }) => {
    return (
        <div>
            <div className={`w-[50px] h-[50px] ${color}`}></div>
        </div>
    );
};
export default Card;
