"use client";
import { search } from "@/lib/actions/shared.actions";
import React, { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Group, User } from "@prisma/client";

type TResults =
  | {
      users: User[];
      groups: Group[];
    }
  | undefined;

const Searchbar = () => {
  const resultsRef = useRef<HTMLDivElement>(null);

  const [resultsOpen, setResultsOpen] = useState(false);
  const [results, setResults] = useState<TResults>();
  const [query, setQuery] = useState("");
  useOnClickOutside(resultsRef, () => handleClose());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = await search({ query });
    setResults(results);
  };

  const handleClose = () => {
    setQuery("");
    setResults(undefined);
    setResultsOpen(false);
  };

  return (
    <div className="flex flex-col relative max-w-[30em]">
      <form
        className="text-input gap-3 items-center flex"
        onSubmit={handleSubmit}
      >
        <IoSearch />
        <input
          onClick={() => setResultsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          className="bg-transparent focus:outline-none text-base-regular w-full bg-light-2"
          placeholder="Find friends and groups"
        />
      </form>

      {resultsOpen && (
        <div
          ref={resultsRef}
          className="absolute bg-light-1 top-full left-0 w-full mt-2 p-4 rounded shadow z-20 max-w-[30em]"
        >
          <p className="text-gray-1 text-small-medium mb-3">Users</p>
          <ul className="flex flex-col gap-2">
            {results?.users &&
              results?.users.map((user) => (
                <Link
                  key={user.id}
                  onClick={() => handleClose()}
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={user.image}
                    width={27}
                    height={27}
                    alt="user avatar"
                    className="rounded-full"
                  />
                  <p className="text-base-medium">{user.username}</p>
                </Link>
              ))}
          </ul>
          <p className="text-gray-1 mt-4 text-small-medium mb-3">Groups</p>
          <ul className="flex flex-col gap-2">
            {results?.groups &&
              results?.groups.map((group) => (
                <Link
                  key={group.id}
                  onClick={() => handleClose()}
                  href={`/groups/${group.id}`}
                  className="flex items-center gap-2 justify-start"
                >
                  <Image
                    src={group.image || "/assets/defaultPhoto.svg"}
                    width={27}
                    height={27}
                    alt="group avatar"
                    className="rounded-full"
                  />
                  <p className="text-base-medium">{group.name}</p>
                </Link>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
