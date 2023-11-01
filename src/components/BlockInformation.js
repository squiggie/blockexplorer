import React from "react";

const BlockInformation = ({ blockData }) => {
  // Render block information here
  return (
    <div>
      <h2>Block #{blockData.number}</h2>
      {/* Add more block details here */}
    </div>
  );
};

export default BlockInformation;
