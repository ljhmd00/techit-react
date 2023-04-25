import { useState } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./web3.config";
import axios from "axios";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

console.log(contract);

function App() {
    const [account, setAccount] = useState("");
    const [nftMetadata, setNftMetadata] = useState();

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

            if (!mintNft.status) return;

            const balanceOf = await contract.methods.balanceOf(account).call();

            const tokenOfOwnerByIndex = await contract.methods
                .tokenOfOwnerByIndex(account, parseInt(balanceOf) - 1)
                .call();

            const tokenURI = await contract.methods.tokenURI(tokenOfOwnerByIndex).call();

            const response = await axios.get(tokenURI);

            setNftMetadata(response.data);
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
                    {nftMetadata && (
                        <div className="text-center">
                            <img src={nftMetadata.image} art="NFT_IMG" />{" "}
                            <div>{nftMetadata.name}</div>
                            <div>{nftMetadata.description}</div>
                            <ul>
                                {nftMetadata.attributes.map((v, i) => {
                                    return (
                                        <li key={i}>
                                            {v.trait_type} - {v.value}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <button onClick={onClickAccount}>지갑로그인</button>
            )}
        </div>
    );
}

export default App;
