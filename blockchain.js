const sha256 = require("sha256");

("use strict");

module.exports = class Blockchain {
  constructor(proofOfWork, transactionsLimit) {
    this.chain = [
      {
        index: 0,
        timestamp: Date.now(),
        transactions: [],
        hash: this.getSeed(),
      },
    ];

    this.proofOfWork = proofOfWork;
    this.transactionsLimit = transactionsLimit;
  }

  saveBlock(hash, transactions) {
    const block = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: transactions,
      hash: hash,
    };

    this.chain.push(block);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  getSeed() {
    let seed = "";

    for (let i = 0; i < this.proofOfWork; i++) {
      seed + 0;
    }

    return sha256(seed + "default");
  }

  async hashWithTransactions(transactions) {
    const data = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: transactions,
      previousBlockHash: this.getLastBlock()["hash"],
    };

    let nonce = 0;
    let hash = sha256(JSON.stringify(data) + nonce);

    while (!this.isValidHash(hash)) {
      hash = sha256(JSON.stringify(data) + nonce);
      nonce++;
    }

    return hash;
  }

  isValidHash(hash) {
    let count = 0;
    for (let i = 0; i < this.proofOfWork; i++) {
      if (hash[i] === "0") {
        count++;
      }
    }

    return count === this.proofOfWork;
  }
};
