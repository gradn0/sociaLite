import React from "react";
import { IoSearch } from "react-icons/io5";

const Searchbar = () => {
  return (
    <div className="text-input hidden md:flex lg:w-[30em] gap-3 items-center">
      <IoSearch />
      <input
        type="text"
        className="bg-transparent focus:outline-none text-base-regular w-full bg-light-2"
        placeholder="Find friends, groups or posts"
      />
    </div>
  );
};

export default Searchbar;
