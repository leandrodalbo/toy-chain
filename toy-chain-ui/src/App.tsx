import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Chain from "./chaintab/chain/Chain";
import ChainNavigation from "./header/ChainNavigation";
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
          <Route path="/nextblock" element={<div>no-mining-yet</div>} />
          <Route path="/addtransaction" element={<AddTransaction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
