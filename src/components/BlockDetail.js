import React from 'react';

const BlockDetail = ({ block }) => { 
  // Function to format a timestamp to a readable date and time
  const formatTimestamp = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(timestamp * 1000).toLocaleString(undefined, options);
  };

  return (
    <div>
      <h2>Block #{block.number}</h2>
      <p>Timestamp: {formatTimestamp(block.timestamp)}</p>
      <p>Hash: {block.hash}</p>
      <p>Gas Limit: {block.gasLimit}</p>
      <p>Gas Used: {block.gasUsed}</p>
    </div>
  );
};

export default BlockDetail;
