import { useState } from "react";
import axios from "axios";

const CreateTodo = ({ getToDoList }) => {
    const [title, setTitle] = useState("");

    const onSubmitCreateTodo = async (e) => {
        try {
            e.preventDefault();

            if (!title) {
                alert("title을 입력해주세요!");
                return;
            }

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todo`, {
                title,
                desc: `${title} 💪💪💪💪`,
            });
            if (response.status !== 200) {
                alert("요청을 불러오지 못했습니다.");
                return;
            }
            getToDoList();
            setTitle("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="flex mt-6" onSubmit={onSubmitCreateTodo}>
            <input
                className="grow border-2 border-red-200 rounded-lg focus:outline-red-400 px-2 py-1 text-lg text-black"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="ml-4 px-2 py-1 bg-red-400 hover:bg-red-300 rounded-lg text-white font-semibold"
                type="submit"
                value="TODO 생성"
            />
        </form>
    );
};
export default CreateTodo;
