import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import BlockList from "./components/BlockList";
import AccountInformation from "./components/AccountInformation";
import BlockDetail from "./components/BlockDetail";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchNewBlock = async (blockNumber) => {
      try {
        let data = await alchemy.core.getBlock(blockNumber);
        let newBlock = {
          gasLimit: data.gasLimit._hex,
          gasUsed: data.gasUsed._hex,
          hash: data.hash,
          number: data.number.toString(),
          timestamp: data.timestamp,
        };
        setBlocks((prevBlocks) => [newBlock, ...prevBlocks]);
      } catch (error) {
        console.error("Error fetching new blocks:", error);
      }
    };

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
          <Route
            path="/block-detail/:blockNumber"
            render={({ match }) => {
              const blockNumber = match.params.blockNumber;
              const block = blocks.find((block) => block.number === blockNumber); // Compare as strings
              return block ? (
                <BlockDetail block={block} />
              ) : (
                <div>Block not found</div>
              );
            }}
          />
          <Route path="/account/:accountAddress" component={AccountInformation} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
