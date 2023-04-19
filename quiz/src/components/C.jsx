import Card from "./Card";

const C = () => {
    const color = [
        "bg-red-400",
        "bg-orange-400",
        "bg-yellow-400",
        "bg-green-400",
        "bg-blue-400",
        "bg-purple-400",
        "bg-white",
    ];

    return (
        <div className="text-white flex gap-4">
            {color.map((v) => {
                return <Card color={v} />;
            })}
        </div>
    );
};
export default C;
