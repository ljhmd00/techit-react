import { useState } from "react";

const B = () => {
    const [count, setCount] = useState(0);
    const onClickAdd = () => {
        setCount(count + 1);
    };
    const onClickDecrement = () => {
        setCount(count - 1);
    };

    return (
        <div className="text-white text-center">
            <div className="text-[100px]">{count}</div>
            <div>
                <button
                    className="bg-red-200 px-4 py-2 text-black text-[20px] rounded-lg"
                    onClick={onClickDecrement}
                >
                    -
                </button>
                <button
                    className="bg-blue-200 px-4 py-2 ml-10 text-black text-[20px] rounded-lg"
                    onClick={onClickAdd}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default B;
