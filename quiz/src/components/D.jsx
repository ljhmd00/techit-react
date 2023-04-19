import axios from "axios";
import { useState } from "react";

const D = () => {
    const [content, setContent] = useState();

    const onClickBtn = async () => {
        const response = await axios.get("https://green-bush-5824.fly.dev/");

        console.log(response);
        setContent(response.data.message);
    };

    return (
        <div className="text-center">
            <button className="bg-white rounded-lg px-4 py-2" onClick={onClickBtn}>
                클릭
            </button>
            {content && <div className="text-white text-[32px] mt-4">{content}</div>}
        </div>
    );
};
export default D;
