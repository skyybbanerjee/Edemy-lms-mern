import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
function SearchBar({data}) {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  async function onSearchHandler(evt) {
    evt.preventDefault();
    navigate(`/course-list/${input}`);
  }

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded">
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="md:w-auto w-10 px-3"
      />
      <input
        value={input}
        onChange={(evt) => setInput(evt.target.value)}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none text-gray-500/80"
      />
      <button
        type="submit"
        className="bg-blue-600 cursor-pointer hover:bg-blue-500 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
