import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    // Handle the search functionality here
    console.log(`Searching for: ${searchInput}`);
  };

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Enter block number or account address"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
