import Head from "next/head";
import Image from "next/image";
import data from "../constants/mock-nft.json";
import mockartist from "../constants/mock-artist.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Footer, Header } from "../components";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const [addr, setAddr] = useState("");

  const router = useRouter();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please Install MetaMask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsWalletConnected(true);
      localStorage.setItem("walletAddress", accounts[0]);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  return (
    <div className="h-full w-full">
      <Head>
        <title>NFT Store</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      

      <div className="absolute left-[-250px] top-[-210px] h-[352px] w-[652px] blur-[350px] rounded-full "></div>

      {isWalletConnected ||  addr ? <Header /> : null}
      

      <div className="relative overflow-hidden">
        <section className="max-w-full relative font-body h-[740px] overflow-hidden sm:h-full">
          <video className="w-full  sm:h-full"
            muted
            autoPlay={"autoplay"}
            preload="auto"
            loop
            src='/NFT.mp4'>
          </video>
          <div className="h-full w-full top-0 absolute bg-black opacity-30"></div>
          <div className="h-52 w-full absolute opacity-85 bg-gradient-to-b from-black to-"></div>
          <div className="h-full w-full absolute top-0 font-cinzel font-Semibold flex items-center text-white justify-center text-center font-heading text-7xl leading-tight">
            <div>Discover, Collect, And Sell<br /> Extraordinary NFTs<br /> {addr ? (
              <button
                type="button"
                className="bg-black text-[17px] font-medium outline-none border-none py-3 px-8 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-125 hover:drop-shadow-xl hover:shadow-black-600 w-auto focus:scale-90"
                onClick={connectWallet}
              >
                Create an NFT
              </button>
            ) : (
              <button
                type="button"
                  className="bg-black outline-none border-none py-3  px-8 rounded-xl font-body cursor-pointer  duration-250 ease-in-out hover:transform-x-1 hover:drop-shadow-xl hover:shadow-black-600 w-full mt-8 transition transform hover:-translate-y-3 motion-reduce:transition-none motion-reduce:hover:transform-none "
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )}</div>
           
          </div>
          <img className="absolute right-10 h-32 bottom-10 hover:h-36 origin-center transition-all duration-1000" src='/scrollDown.gif' /> 
          
        </section>

        <section className="max-w-[1240px] my-10 mx-auto  gap-2 font-body top-7 ">
          <div>

          <h1 className="text-center py-8  text-4xl w-full">Create and sell your NFTs</h1>
          </div>

          <div className="grid grid-cols-3 gap-5 sm:grid-cols-1 sm:p-12 md:grid-cols-1 md:mx-10">
            {data.map((item) => (
              <div
                key={item.id}
                className="w-full bg-[#333] flex  items-center  px-6 py-2 rounded-xl"
              >
                <div className="w-[80px] h-[80px] flex  justify-center items-center ">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full"
                  />
                </div>
                <div className=" flex flex-col  justify-start items-end text-end">

                  <h4 className="font-bold  text-[24px] md:text-[10px]">
                  {item.title}
                    <h4 className="font-medium text-[#ADB9C7] text-[14px] text-end">
                    {item.description}
                  </h4>
                </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1240px] my-20 mx-auto  gap-2 font-body top-7 ">
          <h2 className="sm:text-center py-4 text-center text-4xl md:mx-10">Featured Artist </h2>
          <div className="grid grid-cols-4 gap-3 sm:gap-y-8 md:grid-cols-2 sm:grid-cols-1 sm:p-12 md:mx-10">
            {mockartist.map((data) => (
              <div
                key={data.id}
                className="w-full bg-[#333] flex flex-col justify-center items-center p-3 rounded-xl"
              >
                <div className="w-full relative">
                  <img
                    src={data.bgImage}
                    alt={data.name}
                    layout="responsive"
                    className="w-full rounded-2xl "
                  />
                  <img
                    src={data.image}
                    alt={data.name}
                    layout="intrinsic"
                    className="absolute -bottom-[40px] left-0 right-0 mx-auto h-[104px] w-[104px] bg-[#fff] border-2 border-white rounded-full"
                  />
                </div>
                <div className="w-full text-center mt-8 font-bold">
                  <h3 className=" text-[20px]">{data.name}</h3>
                  <h4 className="font-medium ">Price: {data.price}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="max-w-[1240px] bg- my-20 mx-auto bg-[#333] gap-2 font-body top-7 text-center p-10 rounded-xl sm:mx-10 md:m-10 border border-solid border-white-600">
          <div>
            <h1 className="text-4xl sm:text-2xl">Stay in the loop</h1>
            <h4 className=" text-[#ccc] font-medium text-[17px] px-[120px] sm:p-2 ms:p-1">
              Join our mailing list to stay in the loop with our newest feature releases, NFT drops,<br />and tips and tricks for navigating NFT Store.
            </h4>
            <input className="bg-[#ccc]  outline-none border-none py-3 pl-5 pr-20 mr-3 rounded-xl text-black color-white font-body  w-auto" placeholder="Your email address" type="text"/>
            <button className="bg-[#000] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-125 hover:drop-shadow-xl hover:shadow-sky-600 w-auto  ">
              Sign Up
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
