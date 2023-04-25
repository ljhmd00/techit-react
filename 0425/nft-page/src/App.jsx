import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/main";
import Detail from "./pages/detail";
import { useState } from "react";

function App() {
    const [account, setAccount] = useState("");

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Header account={account} setAccount={setAccount} />
            <Routes>
                <Route path="/" element={<Main account={account} />} />
                <Route path=":tokenId" element={<Detail />} />
            </Routes>
        </div>
    );
}

export default App;
