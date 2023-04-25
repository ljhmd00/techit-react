import { useState } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./web3.config";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

console.log(contract);

function App() {
    const [account, setAccount] = useState("");

    const onClickAccount = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const onClickMint = async () => {
        try {
            const mintNft = await contract.methods.mintNft().send({ from: account });

            console.log(mintNft);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-red-100 min-h-screen flex justify-center items-center">
            {account ? (
                <div>
                    {account.slice(0, 4)}...{account.slice(account.length - 4)}
                    <button onClick={onClickMint}>민팅</button>
                </div>
            ) : (
                <button onClick={onClickAccount}>지갑로그인</button>
            )}
        </div>
    );
}

export default App;
