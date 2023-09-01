import React from "react";

const Footer = () => {
  return (
    <footer className="relative">
      <section className="max-w-[1240px] mt-20 mb-10 mx-auto  gap-2 font-body top-7 md:p-10">
        <div className="grid footer justify-between gap-[88px] md:grid-cols-2 md:gap-6 ">
          <div className="col-span-1">
            <div className="flex items-center justify-start">
              <h4 className="font-cinzel font-medium text-3xl">NFT Store</h4>
            </div>
            <p className="text-lg text-[#ADB9C7]">
              The world’s first and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell, and
              discover exclusive digital items.
            </p>
          </div>
          <div>
            <h3 className="title">Marketplace</h3>
            <p className="desc">All NFTs</p>
            <p className="desc">Arts</p>
            <p className="desc">Photography</p>
            <p className="desc">Music</p>
            <p className="desc">Memberships</p>
          </div>
          <div>
            <h3 className="title">Company</h3>
            <p className="desc">Our Team</p>
            <p className="desc">About Us</p>
            <p className="desc">Partners</p>
            <p className="desc">Contact Us</p>
            <p className="desc">Career</p>
          </div>
          <div>
            <h3 className="title">Contact</h3>
            <p className="desc">
              <p className="desc">  What is an NFT?</p>
              <p className="desc">How to buy an NFT</p>
              <p className="desc">What are NFT drops?</p>
              <p className="desc">How to sell an NFT using NFT Store</p>
              <p className="desc">How to create an NFT on NFT Store</p>
              <p className="desc">How to create an NFT on NFT Store</p>
              <p className="desc">What is a crypto wallet?</p>
              <p className="desc">What is cryptocurrency?</p>
            </p>
          </div>
        </div>
        <div>

          <p>
            Designed and Developed By{" "}
            <span className="text-transparent text-[20px] font-bold bg-clip-text bg-gradient-to-r from-white to-[#ccc]">
              {" "}
              Anuj Patidar{" "}
            </span>
          </p>
        </div>
        <hr className="opacity-40 mt-8"/>
        <div className="flex justify-between text-[14px]">
        <p className=" ">{new Date().getFullYear()} All Right Reserved</p>
        <p >Terms of Services</p>
        </div>
      </section>

      <div className="bg-[#fff] absolute left-[-380px] top-[222.18px] h-[352px] w-[652px] blur-[350px] rounded-full"></div>
    </footer>
  );
};

export default Footer;
