import { SiHiveBlockchain } from "react-icons/si";
import { FaWallet, FaGoogleWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = ({ account, setAccount }) => {
    const [coinPrice, setCoinPrice] = useState();

    const getCoinPrice = async () => {
        try {
            const response = await axios.get(
                "https://api.upbit.com/v1/ticker?markets=KRW-BTC,%20KRW-ETH,%20KRW-MATIC"
            );
            setCoinPrice([
                { symbol: "BTC", price: response.data[0].trade_price },
                { symbol: "ETH", price: response.data[1].trade_price },
                { symbol: "MATIC", price: response.data[2].trade_price },
            ]);
        } catch (error) {
            console.error(error);
        }
    };
    const onClickAccount = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCoinPrice();
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center font-bold">
            <Link to="/">
                <div className="flex items-center text-main">
                    <SiHiveBlockchain size={28} />
                    <div className="ml-1 text-xl">Ble-Chess</div>
                </div>
            </Link>
            <div className="flex items-center">
                {coinPrice && (
                    <ul className="flex text-gray-400 text-sm">
                        {coinPrice.map((v, i) => {
                            return (
                                <li key={i} className="ml-2">
                                    {v.symbol}: {(v.price / 1000).toLocaleString()}K₩
                                </li>
                            );
                        })}
                    </ul>
                )}
                {account ? (
                    <div className="flex imtes-center p-2 bg-gray-800 rounded-full ml-4">
                        <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
                            <FaGoogleWallet />
                        </div>
                        <div className="ml-1">
                            {account.substring(0, 4)}...{account.substring(account.length - 4)}
                        </div>
                    </div>
                ) : (
                    <button
                        className="flex imtes-center p-2 bg-gray-800 rounded-full  ml-4"
                        onClick={onClickAccount}
                    >
                        <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
                            <FaWallet />
                        </div>
                        <div className="ml-2">Connect</div>
                    </button>
                )}
            </div>
        </div>
    );
};
export default Header;
