const sha256 = require("sha256");

("use strict");

module.exports = class Blockchain {
  constructor(proofOfWork, transactionsLimit) {
    this.chain = [
      {
        index: 0,
        transactionsHash: "",
        hash: this.getSeed(),
      },
    ];

    this.proofOfWork = proofOfWork;
    this.transactionsLimit = transactionsLimit;
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

  async blockHash(transactions) {
    const transactionsHash = await this.transactionsHash(transactions);
    const data =
      `${this.chain.length + 1}` +
      this.getLastBlock()["hash"] +
      transactionsHash;

    let nonce = 0;
    let hash = sha256(data + nonce);

    while (!this.isValidHash(hash)) {
      hash = sha256(data + nonce);
      nonce++;
    }

    return hash;
  }

  async transactionsHash(transactions) {
    const data = transactions
      .map((t) => t.id + t.sender + t.recipient + t.amount)
      .join();

    let nonce = 0;
    let hash = sha256(data + nonce);

    while (!this.isValidHash(hash)) {
      hash = sha256(data + nonce);
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
