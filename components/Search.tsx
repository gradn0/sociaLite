"use client";
import React from "react";
import Searchbar from "./forms/Searchbar";

const Search = () => {
  return (
    <div className="main-content md:hidden">
      <h1 className="text-heading3-bold">Search</h1>
      <Searchbar />
    </div>
  );
};

export default Search;
