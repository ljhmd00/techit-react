import { useEffect, useState } from "react";
import axios from "axios";
import NftCard from "./NftCard";

const Nfts = ({ page, mintedNft }) => {
    const [selectedPage, setSelectedPage] = useState(1);
    const [nfts, setNfts] = useState();

    const getNfts = async (p) => {
        try {
            let nftArray = [];

            setNfts();

            for (let i = 0; i < 10; i++) {
                const tokenId = i + 1 + (p - 1) * 10;

                let response = await axios.get(`${process.env.REACT_APP_JSON_URL}/${tokenId}.json`);

                nftArray.push({ tokenId, metadata: response.data });
            }

            setNfts(nftArray);
        } catch (error) {
            console.log(error);
        }
    };

    const onCLickPage = (p) => () => {
        setSelectedPage(p);
        getNfts(p);
    };

    const pageComp = () => {
        let pageArray = [];

        for (let i = 0; i < page; i++) {
            pageArray.push(
                <button
                    key={i}
                    className={`  font-bold hover:text-gray-500 ${
                        i + 1 === selectedPage
                            ? "text-gray-900 bg-gray-200 px-4 py-2 "
                            : "text-gray-900 bg-gray-300  px-4 py-2"
                    }`}
                    onClick={onCLickPage(i + 1)}
                >
                    {i + 1}
                    <span>페이지</span>
                </button>
            );
        }

        return pageArray;
    };

    useEffect(() => {
        console.log(nfts);
    }, []);

    useEffect(() => {
        getNfts(1);
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto">
            <div>{pageComp()}</div>
            <ul className="mt-8 grid gird-cols-1 xl:grid-cols-2 justify-items-center gap-8">
                {nfts ? (
                    nfts.map((v, i) => {
                        return (
                            <NftCard
                                key={i}
                                tokenId={v.tokenId}
                                metadata={v.metadata}
                                mintedNft={mintedNft}
                            />
                        );
                    })
                ) : (
                    <div>로딩중입니다...</div>
                )}
            </ul>
        </div>
    );
};
export default Nfts;
