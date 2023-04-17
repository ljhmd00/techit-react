import { useEffect, useState } from "react";
import axios from "axios";
import LogIn from "./components/Login";
import TodoCard from "./components/TodoCard";
import CreateTodo from "./components/CreateTodo";

function App() {
    const [user, setUser] = useState();
    const [todos, setTodos] = useState();
    const [skip, setSkip] = useState(0);

    const getTodos = async () => {
        try {
            if (!user) return;
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/todo/${user.id}?skip=${skip}`
            );
            setTodos(response.data.todos);
            setSkip(skip + 3);
        } catch (error) {
            console.error(error);
            alert("투두리스트를 불러오지 못했습니다.");
        }
    };

    useEffect(() => {
        getTodos();
    }, [user]);

    const onClickLogOut = () => {
        setUser(undefined);
    };

    const onClickReload = async () => {
        try {
            if (!user) return;

            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/todo/${user.id}?skip=${skip}`
            );

            setTodos([...todos, ...response.data.todos]);
            setSkip(skip + 3);
        } catch (error) {
            console.error(error);
        }
    };

    // return도 결과값으로 줄 수 있음 user 없으면 로그인 페이지 보여주기
    if (!user) {
        // 유저가 아직 로그인 안 함 - 로그인페이지
        return <LogIn setUser={setUser} />;
    }

    return (
        <div className="min-h-screen flex flex-col justify-start items-center pt-16">
            <h1 className="text-4xl font-bold">AWESOME TO DO LIST 😎</h1>
            <h3 className="text-2xl font-semibold flex itmes-center">
                {user.account}님 환영합니다.{" "}
                <button onClick={onClickLogOut} className="ml-4 px-2 py-1 bg-red-200 rounded-md">
                    로그아웃
                </button>
            </h3>
            <div>
                <div className="mt-8 text-sm font-semibold">
                    If I only had an hour to chop down a tree, I would spend the first 45 minutes
                    sharpening my axe, Abrabam Lincoln
                </div>
                <div className="text-xs">
                    나무 베는데 한 시간이 주어진다면, 도끼를 가는데 45분을 쓰겠다, 에비브러햄 링컨
                </div>
                <div className="mt-16">
                    <button
                        onClick={onClickReload}
                        className="ml-4 px-4 py-2 bg-blue-400 hover:bg-blue-300 rounded-lg text-gray-50 text-2xl"
                    >
                        갱 신
                    </button>
                </div>
                <CreateTodo userId={user.id} setTodos={setTodos} todos={todos} />
                {todos &&
                    todos.map((v, i) => {
                        return (
                            <TodoCard
                                key={i}
                                todo={v.todo}
                                isDone={v.isDone}
                                id={v.id}
                                userId={user.id}
                                todos={todos}
                                setTodos={setTodos}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default App;
