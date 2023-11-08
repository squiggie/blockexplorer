import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

const Transaction = ({ transaction }) => {
  return (
    <div className="BlockCard">
      <p>Block Hash: {transaction.blockHash}</p>
      <p>Number: {transaction.blockNumber}</p>
      <p>From: 
        <Link to={`/account-detail/${transaction.from}`}>{transaction.from}</Link>
      </p>
      <p>Status: {transaction.status}</p>
      <p>To: 
        <Link to={`/account-detail/${transaction.to}`}>{transaction.to}</Link>
      </p>
      <p>Transaction Hash: {transaction.transactionHash}</p>
      <p>Index: {transaction.transactionIndex}</p>
    </div>
  );
};

export default Transaction;
