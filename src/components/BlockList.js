import React from "react";
import { Link } from 'react-router-dom';


const BlockList = ({ blocks }) => {
  if (!Array.isArray(blocks)) {
    return null; // Return null or a loading indicator if blocks is not an array
  }

  // Function to format a timestamp to a readable date and time
  const formatTimestamp = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(timestamp * 1000).toLocaleString(undefined, options);
  };

  return (
    <div>
      <h2>Recent Blocks</h2>
      {blocks.map((block) => (
        <div className="BlockCard" key={block.number}>
          <h2>
            <Link to={`/block-detail/${block.number}`}>Block #{block.number}</Link>
          </h2>          
          <p>Timestamp: {formatTimestamp(block.timestamp)}</p> {/* Format timestamp */}
        </div>
      ))}
    </div>
  );
};

export default BlockList;
