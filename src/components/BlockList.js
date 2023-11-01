import React from "react";
import "../index.css";

const BlockList = ({ blocks }) => {
  if (!Array.isArray(blocks)) {
    return null; // Return null or a loading indicator if blocks is not an array
  }
  const reversedBlocks = [...blocks].reverse(); // Create a copy of blocks and reverse the order

  return (
    <div>
      <h2>Recent Blocks</h2>
      {reversedBlocks.map((block) => (
        <div className="BlockCard" key={block.number}>
          <h2>Block #{block.number}</h2>
          <p>Timestamp: {block.timestamp}</p>
          <p>Hash: {block.hash}</p>
          <p>Gas Limit: {block.gasLimit}</p>
          <p>Gas Used: {block.gasUsed}</p>
        </div>
      ))}
    </div>
  );
};

export default BlockList;
