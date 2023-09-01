import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Footer, Header } from "../components";
import { truncateEthAddress } from "../utils/truncAddress";
import ContractABI from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const mainURL = `https://arweave.net/`;

const NFTDetails = () => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const [addr, setAddr] = useState("");

  const [nft, setNft] = useState({
    price: "",
    tokenId: "",
    seller: "",
    owner: "",
    image: "",
    description: "",
    tokenURI: "",
  });

  useEffect(() => {
    if (!router.isReady) return;

    setNft(router?.query);

    setIsLoading(false);
  }, [router.isReady]);

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      signer
    );
    return contract;
  };

  const buyNft = async (n) => {
    try {
      const contract = await getContract();
      const price = ethers.utils.parseUnits(n.price.toString(), "ether");
      let tx = await contract.createMarketSale(n.tokenId, { value: price });
      await tx.wait();
      toast.success(`Bought NFT🎉`);
      await router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(`You Can't Buy This Look At the Price 😂 ${error}`);
    }
  };

  const reSellNFT = async (nft) => {
    router.push(`sellnft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
  };

  return (
    <div>
      <Head>
        <title>{nft.name} || NFT Store</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>

      <Header />
      <div className="bg-[#ccc] absolute left-[-250px] top-[-210px] h-[352px] w-[652px] blur-[350px] rounded-full "></div>
      <div className="relative overflow-hidden">
        <section className="grid grid-cols-2 max-w-[1240px] mx-auto my-28 gap-20 font-body sm:grid-cols-1 p-5">
          <div className="sm:p-0">
            <div className="w-full  border border-solid border-white-500 overflow-hidden  rounded-xl ">
              <img
                src={mainURL + nft.image}
                alt={nft.name}
                className="w-full "
              />
            </div>
          </div>
          <div className="">
            <h1 className="text-3xl">
              #{nft.tokenId} {nft.name}
            </h1>
            <p className="text-[#ADB9C7]"> Description: {nft.description}</p>
            <div>
              <p className="font-medium text-[#aaa] my-5">Price</p>
              <h2>{nft.price} Matic</h2>
            </div>
            <div>
              <p className="text-[#aaa]">Owner </p>
              <h2 className="my-0 ssm:text-sm text-transparent font-semibold text-[20px] bg-clip-text bg-white ">
                {truncateEthAddress(nft.owner)}
              </h2>
            </div>

            {nft.seller.startsWith("0x0") ? null : (
              <div>
                <p className="text-[#aaa]">Seller </p>
                <h2 className="my-0 ssm:text-sm text-transparent font-semibold text-[20px] bg-clip-text bg-white">
                  {truncateEthAddress(nft.seller)}
                </h2>
              </div>
            )}

            <div>
              <p>Blockchain</p>
              <h2>Matic ⟠</h2>
            </div>

            <button
              className="bg-[#ccc] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer  duration-250 ease-in-out hover:transform-x-1 hover:drop-shadow-xl hover:shadow-sky-600 w-auto mt-8 transition transform hover:-translate-y-3 motion-reduce:transition-none motion-reduce:hover:transform-none text-black font-semibold text-[18px]"
              onClick={() => {
                addr === nft.owner.toLocaleLowerCase()
                  ? reSellNFT(nft)
                  : buyNft(nft);
              }}
            >
              {addr === nft.owner.toLocaleLowerCase() ? "Sell NFT" : "Buy NFT"}
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default NFTDetails;
