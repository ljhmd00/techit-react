import { useState } from "react";
import axios from "axios";

const CreateToDo = ({ getTodoList }) => {
    const [title, setTitle] = useState("");

    const onSubmitCreateToDo = async (e) => {
        try {
            e.preventDefault();
            if (!title) {
                alert("타이틀은 입력해주세요.");
                return;
            }

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todo`, {
                title,
                desc: `${title}🎈🎈🎈`,
            });

            if (response.status !== 200) {
                alert("에러발생");
                return;
            }

            getTodoList();
            setTitle("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="flex mt-4 text-gray-600" onSubmit={onSubmitCreateToDo}>
            <input
                className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <input
                className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50 hover:bg-pink-300"
                type="submit"
                value="투두 생성"
            />
        </form>
    );
};
export default CreateToDo;
