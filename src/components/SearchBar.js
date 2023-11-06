import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
  const [blockNumber, setBlockNumber] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/block-detail/${blockNumber}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formblockchainSearch">
        <Form.Label>Search</Form.Label>
        <Form.Control type="text" placeholder="Enter in block number" value={blockNumber} onChange={(e) => setBlockNumber(e.target.value)}/>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SearchBar;
