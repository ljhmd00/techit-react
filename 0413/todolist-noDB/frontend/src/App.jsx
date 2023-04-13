import { useEffect, useState } from "react";
import axios from "axios";
import ToDoCard from "./components/ToDoCard";
import CreateToDo from "./components/CreateToDo";
function App() {
    const [toDoList, setToDoList] = useState();

    const getTodoList = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/todo`);
            console.log(response);

            if (response.status !== 200) {
                alert("에러발생!");
                return;
            }
            setToDoList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTodoList();
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-start items-center pt-16 bg-gray-600 text-white">
            <h1 className="text-4xl font-bold">TO DO LIST 📀</h1>
            <div>
                <div className="mt-8 text-sm font-semibold">
                    If I only had an hour to chop down a tree, I would spend the first 45 minutes
                    sharpening my axe, Abrabam Lincoln
                </div>
                <div className="text-xs">
                    나무 베는데 한 시간이 주어진다면, 도끼를 가는데 45분을 쓰겠다, 에비브러햄 링컨
                </div>
                <CreateToDo getTodoList={getTodoList} />
            </div>
            <div className="mt-16 flex flex-col w-1/2">
                {toDoList
                    ? toDoList.map((v, i) => {
                          return (
                              <ToDoCard
                                  key={i}
                                  title={v.title}
                                  index={i}
                                  isDone={v.isDone}
                                  getTodoList={getTodoList}
                              />
                          );
                      })
                    : "로딩중입니다..."}
            </div>
        </div>
    );
}

export default App;
