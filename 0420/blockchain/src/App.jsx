import { useEffect, useState } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS, NFT_ABI, NFT_ADDRESS } from "./web3.config";

// const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
const nftContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS);

function App() {
    const [account, setAccount] = useState("");
    const [myBalance, setMyBalance] = useState();

    const onClickAccount = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setAccount(accounts[0]);
        } catch (error) {
            console.errer(error);
        }
    };

    const onClickLogOut = () => {
        setAccount("");
    };

    const onClickBalance = async () => {
        try {
            if (!account || !contract) return;

            const balance = await contract.methods.balanceOf(account).call();

            setMyBalance(web3.utils.fromWei(balance));
        } catch (error) {
            console.error(error);
        }
    };

    const onClickMint = async () => {
        try {
            const result = await nftContract.methods
                .mintNft(
                    "https://gateway.pinata.cloud/ipfs/Qmdjid5X25YeqTWLJ6UEdTpsEAJSx8NzZF2eDmEFehkTtx"
                )
                .send({
                    from: account,
                });

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(nftContract);
    }, []);

    return (
        <div className=" min-h-screen flex justify-center items-center text-2xl">
            {account ? (
                <div>
                    <div className="text-main font-semibold">
                        {account.substring(0, 4)}...{account.substring(account.length - 4)}
                        <button className="ml-4 btn-style" onClick={onClickLogOut}>
                            로그아웃
                        </button>
                    </div>
                    <div className="flex items-center mt-2 justify-center">
                        {myBalance && <div>{myBalance} tMatic</div>}

                        <button className="btn-style ml-2" onClick={onClickBalance}>
                            잔액 조회
                        </button>
                    </div>
                    <div className="flex items-center mt-4">
                        <button className="ml-2 btn-style" onClick={onClickMint}>
                            민팅
                        </button>
                    </div>
                </div>
            ) : (
                <button className="btn-style" onClick={onClickAccount}>
                    <img className="w-12" src={`${process.env.PUBLIC_URL}/images/metamask.png`} />
                </button>
            )}
        </div>
    );
}

export default App;