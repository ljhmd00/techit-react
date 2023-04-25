import { SiChainlink } from "react-icons/si";
import { CONTRACT_ADDRESS } from "../web3.config";

const ranNum = Math.floor(Math.random() * 1000) + 1;
const imgSrc = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;

const Intro = ({ totalNft, mintedNft, myNft }) => {
    return (
        <div className="bg-gradient-to-b from-transparent  to-gray-300 ">
            <div className="max-w-screen-xl mx-auto relative">
                <div className="absolute top-1/2 left-1/2  -translate-x-1/2  -translate-y-1/2 text-9xl text-white truncate opacity-30 pointer-events-none">
                    Da Den Bu
                </div>
                <div className="relative ">
                    <img
                        className="absolute w-40 h-40 rounded-full shadow-md"
                        src={imgSrc}
                        art="NFT"
                    />
                    <div className="w-40 h-40 rounded-full shadow-md bg-white text-black flex justify-center items-center top-0 ">
                        Loading...
                    </div>
                </div>
                <div className="mt-4 ml-2 text-2xl font-bold flex items-center">
                    Da Den Bu
                    <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center ml-4 ">
                        <SiChainlink size={16} />
                    </div>
                </div>
                <div className="mt-2 flex items-center text-gray-950 font-bold">
                    by
                    <div className="text-white ml-2 text-sm">{CONTRACT_ADDRESS}</div>
                </div>
                <div className="mt-2 text-gray-700 font-semibold">
                    다덴부란(.env란 "environment"의 약어)은 소프트웨어 개발에서 자주 사용되는 파일
                    형식 중 하나입니다. 이 파일은 소프트웨어 개발자들이 프로젝트에서 사용되는 환경
                    변수(environment variable)를 저장하는 데 사용됩니다.
                </div>
                <div className="py-4 text-center flex">
                    <div>
                        <div className="font-bold">{totalNft}</div>
                        <div className="text-gray-600 font-semibold">총 NFT</div>
                    </div>
                    <div className="ml-4">
                        <div className="font-bold">{mintedNft}</div>
                        <div className="text-gray-600 font-semibold">발행된 NFT</div>
                    </div>
                    <div className="ml-4">
                        <div className="font-bold">{myNft}</div>
                        <div className="text-gray-600 font-semibold">내 NFT</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
