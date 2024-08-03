import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search user"
        className="border border-gray-300 rounded-lg pl-9 p-2 mb-4 w-full"
      />
      <img
        src="/search.png"
        alt="search icon"
        className="w-6 h-6 rounded-full mr-4 absolute top-2.5 left-2"
      />
    </div>
  );
};

export default SearchBar;
