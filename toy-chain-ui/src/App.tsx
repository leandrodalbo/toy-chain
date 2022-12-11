import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Chain from "./chaintab/chain/Chain";
import ChainNavigation from "./header/ChainNavigation";
import NextBlock from "./next-block/NextBlock";
import AddTransaction from "./transaction-tab/AddTransaction";
const App = () => {
  return (
    <Router>
      <div data-testid="navigationLinks">
        <ChainNavigation />
      </div>
      <div data-testid="navigationRoutes">
        <Routes>
          <Route path="/" element={<Chain />} />
          <Route path="/nextblock" element={<NextBlock />} />
          <Route path="/addtransaction" element={<AddTransaction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
