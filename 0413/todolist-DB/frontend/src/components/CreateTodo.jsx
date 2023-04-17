import axios from "axios";
import { useState } from "react";

const CreateTodo = ({ userId }) => {
    const [todo, setTodo] = useState("");

    const onSubmitCreateTodo = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todo`, {
                todo,
                userId,
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="flex mt-2" onSubmit={onSubmitCreateTodo}>
            <input
                className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <input
                className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50"
                type="submit"
                value="투두생성"
            />
        </form>
    );
};

export default CreateTodo;
