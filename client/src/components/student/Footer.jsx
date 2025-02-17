import React from "react";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <footer className="bg-gray-800 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="logo_dark_icon" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            Empowering learners with expert-led courses, interactive content,
            and community support to achieve personal and professional goals.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
        {/*2ND COLUMN: HIDDEN ON MOBILE SCREENS */}
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">
            Subscribe to our newsletter ✉️
          </h2>
          <p className="text-sm text-white/80">
            The latest news, articles and resources sent to your inbox weekly.
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              className="border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm"
              type="email"
              placeholder="Enter your email"
            />
            <button className="cursor-pointer bg-blue-600 hover:bg-blue-500 w-24 h-9 text-white rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        Copyright 2025 ©️Edemy -{" "}
        <a
          href="https://github.com/skyybbanerjee"
          target="_blank"
          className="text-blue-400 hover:text-blue-500 hover:underline transition-all duration-300 ease-in-out hover:scale-110">
          Soumadip Banerjee
        </a>{" "}
        👨🏻‍💻💙 | All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
