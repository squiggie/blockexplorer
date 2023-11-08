import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alchemy, Network } from "alchemy-sdk";
import Transaction from './Transaction'; 

const TransactionDetail = () => {
  const { transactionHash } = useParams();
  const [transactionReceipt, setTransactionReceipt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const settings = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
      };
      
    const alchemy = new Alchemy(settings);
    const fetchTransactionReceipt = async () => {
      try {
        const params = {
            blockHash: transactionHash
        };

        let response = await alchemy.core.getTransactionReceipts(params);
        console.log(response);
        setTransactionReceipt(response);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactionReceipt();

  }, [transactionHash]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!transactionReceipt) {
    return <div>Error: Transaction receipt not found</div>;
  }

  if (!transactionReceipt.receipts || transactionReceipt.receipts.length === 0) {
    return (
      <div>
        <h2>Transaction Detail Page</h2>
        <p>Transaction Hash: {transactionHash}</p>
        <p>No transactions found for this hash.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Transaction Detail Page</h2>
      <p>Transaction Hash: {transactionHash}</p>
      <h3>Transactions:</h3>
      <div>
        {transactionReceipt.receipts.map((transaction, index) => (
          <Transaction key={index} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionDetail;
