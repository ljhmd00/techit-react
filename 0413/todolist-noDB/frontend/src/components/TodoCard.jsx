import axios from "axios";
import { MdDelete } from "react-icons/md";

const ToDoCard = ({ title, index, getTodoList, isDone }) => {
    const onClickIsDone = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/todo/done/${index}`
            );

            if (response.status !== 200) {
                alert("error!");
                return;
            }
            getTodoList();
        } catch (error) {
            console.error(error);
        }
    };

    const onClickDelete = async () => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/todo/${index}`
            );

            if (response.status !== 200) {
                alert("error!");
                return;
            }
            getTodoList();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex my-4">
            {isDone ? (
                <>
                    <button onClick={onClickIsDone} className="relative">
                        <div className="border-4 border-gray-100 w-8 h-8 rounded-xl bg-gray-300 p-2"></div>
                        <div className="absolute border-4 border-gray-600 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 scale-75 rounded-xl bg-gray-100 p-2"></div>
                    </button>
                    <div className="text-2xl ml-4">{title}</div>
                    <button onClick={onClickDelete} className="ml-4 hover:text-red-300 ">
                        <MdDelete size={24} />
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={onClickIsDone}
                        className="border-4 border-gray-200 w-8 h-8 rounded-xl"
                    ></button>
                    <div className="text-2xl ml-4">{title}</div>
                </>
            )}
        </div>
    );
};

export default ToDoCard;
