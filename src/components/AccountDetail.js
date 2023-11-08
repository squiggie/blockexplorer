import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alchemy, Network } from "alchemy-sdk";

const AccountDetail = () => {
  const { accountAddress } = useParams();
  const [tokenBalances, setTokenBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const settings = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
      };
      
    const alchemy = new Alchemy(settings);
    const fetchTokenBalances = async () => {
      try {
          let response = await alchemy.core.getTokenBalances(accountAddress);
          setTokenBalances(response);
          console.log(response);
          setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTokenBalances();

  }, [accountAddress]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tokenBalances) {
    return <div>Error: Transaction receipt not found</div>;
  }

  if (!tokenBalances.tokenBalances || tokenBalances.tokenBalances.length === 0) {
    return (
      <div>
        <h2>Account Detail Page</h2>
        <p>No balances found for this account.</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2>Account Detail Page</h2>
      <p>Account Address: {accountAddress}</p>
      <h3>Tokens:</h3>
      <ul>
        {tokenBalances.tokenBalances.map((token, index) => (
          <li>
            <p>Token Name: {token.contractAddress}</p>
            <p>Amount: {parseInt(token.tokenBalance,16)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountDetail;
