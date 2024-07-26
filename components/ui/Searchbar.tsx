import React from "react";
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  return (
    <div className="bg-light-2 rounded-full py-2 px-5 gap-3 items-center hidden md:flex lg:w-[30em]">
      <IoSearch />
      <input
        type="text"
        className="bg-transparent focus:outline-none text-base-regular w-full"
        placeholder="Find friends, groups or posts"
      />
    </div>
  );
};

export default Searchbar;
