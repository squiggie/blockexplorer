import React from 'react';

const BlockDetail = ({ block }) => {

  console.log(block);
  
  return (
    <div>
      <h2>Block #{block.number}</h2>
      <p>Timestamp: {block.timestamp}</p>
      <p>Hash: {block.hash}</p>
      <p>Difficulty: {block.difficulty}</p>
      <p>Gas Limit: {block.gasLimit}</p>
      <p>Gas Used: {block.gasUsed}</p>
    </div>
  );
};

export default BlockDetail;
