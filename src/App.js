import { Alchemy, Network, AlchemySubscription } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import BlockDetail from "./components/BlockDetail";
import BlockList from "./components/BlockList";
import AccountInformation from "./components/AccountInformation";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blocks, setBlocks] = useState([]);
  
  const fetchNewBlock = async (blockNumber) => {
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

  useEffect(() => {
    // Subscription for new blocks on Eth Mainnet.
    const subscription = alchemy.ws.on("block", (blockNumber) => {
      fetchNewBlock(blockNumber);
    });

    return () => {
      // Clean up subscription when component is unmounted
      subscription.unsubscribe();
    };
  }, []); 

  return (
    <Router>
      <div className="App">
        <SearchBar />
        <Switch>
          <Route exact path="/" render={() => <BlockList blocks={blocks} />} />
          <Route path="/block/:blockNumber" component={BlockDetail} />
          <Route path="/block-detail/:blockNumber" render={({ match }) => {
            const blockNumber = match.params.blockNumber;
            const block = blocks.find(block => block.number === blockNumber);
            return block ? <BlockDetail block={block} /> : <div>Block not found</div>;
          }} />
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
