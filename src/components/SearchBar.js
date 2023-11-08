import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
  const [searchValue, setsearchValue] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine the type of search based on the input value
    const trimmedValue = searchValue.trim();

    if (/^\d+$/.test(trimmedValue)) {
      // If it's a number, treat it as a block number
      history.push(`/block-detail/${trimmedValue}`);
    } else if (/^0x[a-fA-F0-9]{40}$/.test(trimmedValue)) {
      // If it matches an Ethereum address pattern
      history.push(`/account-detail/${trimmedValue}`);
    } else if (/^0x[a-fA-F0-9]{64}$/.test(trimmedValue)) {
      // If it matches a transaction hash pattern
      history.push(`/transaction-detail/${trimmedValue}`);
    } else {
      // Handle invalid input or show an error message
      alert('Invalid input. Please enter a block number, transaction hash, or address.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formblockchainSearch">
        <Form.Label>Search</Form.Label>
        <Form.Control type="text" placeholder="Enter in block number, address, or transaction hash" value={searchValue} onChange={(e) => setsearchValue(e.target.value)}/>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
