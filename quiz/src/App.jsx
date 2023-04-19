import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import A from "./components/A";
import B from "./components/B";
import C from "./components/C";
import D from "./components/D";

function App() {
    return (
        <div className="bg-gray-800 min-h-screen flex justify-center items-center relative">
            <Routes>
                <Route path="/" element={<A />}></Route>
                <Route path="/b" element={<B />}></Route>
                <Route path="/c" element={<C />}></Route>
                <Route path="/d" element={<D />}></Route>
            </Routes>
            <div className=" fixed bottom-10 text-white text-[48px] ">
                <Link to="/">
                    <button>A</button>
                </Link>
                <Link to="/b">
                    <button className="ml-5">B</button>
                </Link>
                <Link to="/c">
                    <butto className="ml-5">C</butto>
                </Link>
                <Link to="d">
                    <button className="ml-5">D</button>
                </Link>
            </div>
        </div>
    );
}

export default App;
