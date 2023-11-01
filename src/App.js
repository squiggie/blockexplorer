import { Alchemy, Network, AlchemySubscription } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import BlockInformation from "./components/BlockInformation";
import BlockList from "./components/BlockList";
import AccountInformation from "./components/AccountInformation";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blocks, setBlocks] = useState([]);

  const fetchNewBlocks = async (blockNumber) => {
    try {
      let data = await alchemy.core.getBlock(blockNumber);
      let newBlock = {};
      newBlock.gasLimit = data.gasLimit._hex;
      newBlock.gasUsed = data.gasUsed._hex;
      newBlock.hash = data.hash;
      newBlock.number = data.number;
      newBlock.timestamp = data.timestamp;
      setBlocks((prevBlocks) => [newBlock, ...prevBlocks]);
    } catch (error) {
      console.error("Error fetching new blocks:", error);
    }
  };
  // Subscription for new blocks on Eth Mainnet.
  alchemy.ws.on("block", (blockNumber) => fetchNewBlocks(blockNumber));

  return (
    <Router>
      <div className="App">
        <SearchBar />
        <Switch>
          <Route exact path="/" render={() => <BlockList blocks={blocks} />} />
          <Route path="/block/:blockNumber" component={BlockInformation} />
          <Route
            path="/account/:accountAddress"
            component={AccountInformation}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
