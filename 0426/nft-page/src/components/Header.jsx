const Header = ({ account, setAccount }) => {
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

    return (
        <header className="max-w-screen-xl mx-auto p-4 flex justify-between font-bold">
            <div className="ml-1 text-xl">Ble-Chess</div>
            <div className="flex items-center">
                {account ? (
                    <div>
                        {account.slice(0, 4)}...{account.slice(-4)}
                    </div>
                ) : (
                    <button
                        className="p-2 bg-gray-800 rounded-full ml-1 text-white"
                        onClick={onClickAccount}
                    >
                        Connect
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
