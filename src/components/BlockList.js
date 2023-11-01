import React from "react";
import { Link } from 'react-router-dom';


const BlockList = ({ blocks }) => {
  if (!Array.isArray(blocks)) {
    return null; // Return null or a loading indicator if blocks is not an array
  }

  return (
    <div>
      <h2>Recent Blocks</h2>
      {blocks.map((block) => (
        <div className="BlockCard" key={block.number}>
          <h2>
            <Link to={`/block-detail/${block.number}`}>Block #{block.number}</Link>
          </h2>          
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
