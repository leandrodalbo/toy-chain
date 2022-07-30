const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const axios = require("axios").default;
const CronJob = require("cron").CronJob;
const Blockchain = require("./blockchain");

const app = express();
const port = process.argv[2];
const minerAddress = uuid.v1();
const flagelochain = new Blockchain(4, 4);
const transactionsQueue = [];
const neighbours = [];
const nextReward = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/address", (req, res) => res.status(200).send(minerAddress));

app.get("/neighbours", (req, res) => res.status(200).send(neighbours));

app.get("/transactions", (req, res) => res.status(200).send(transactionsQueue));

app.get("/chain", (req, res) => {
  res.status(200).send(flagelochain);
});

app.get("/lasthash", (req, res) =>
  res.status(200).send(flagelochain.getLastBlock()["hash"])
);

app.get("/gettingreward", (req, res) => res.status(200).send(nextReward.pop()));

app.post("/minedblock", async (req, res) => {
  const { block, gettingReward } = req.body;

  if (
    block !== null &&
    block !== undefined &&
    block.hash !== flagelochain.getLastBlock()["hash"] &&
    parseInt(block.index) === flagelochain.getLastBlock()["index"] + 1
  ) {
    flagelochain.chain.push(block);

    if (
      gettingReward !== null &&
      gettingReward !== undefined &&
      gettingReward.miner !== minerAddress
    ) {
      nextReward.push(gettingReward);
    }

    axios
      .all(
        neighbours.map((n) => axios.post(`${n.address}/minedblock`, req.body))
      )
      .then(
        res.status(200).send({
          message: "node_saved",
        })
      )
      .catch((e) => console.log("node_broadcast_error"));
  } else {
    res.status(200).send({
      message: "invalid_block",
    });
  }
});

app.post("/transaction", (req, res) => {
  const data = req.body;
  const newTransaction = {
    id: data.id !== null && data.id !== undefined ? data.id : uuid.v1(),
    amount: data.amount,
    sender: data.sender,
    recipient: data.recipient,
  };

  if (
    transactionsQueue.filter(
      (transaction) => transaction.id == newTransaction.id
    ).length === 0
  ) {
    transactionsQueue.push(newTransaction);

    axios
      .all(
        neighbours.map((n) =>
          axios.post(`${n.address}/transaction`, newTransaction)
        )
      )
      .then(
        res.status(200).send({
          message: "transactions_queue",
          transactions: transactionsQueue,
        })
      )
      .catch((e) => console.log("transaction_broadcast_error"));
  } else {
    res.status(200).send({
      message: "transaction_exists",
    });
  }
});

const mine = async () => {
  if (transactionsQueue.length < flagelochain.transactionsLimit) {
    return;
  } else {
    const blockTransactions = [];

    for (let i = 0; i < flagelochain.transactionsLimit; i++) {
      blockTransactions.push(transactionsQueue.pop());
    }

    const blockHash = await flagelochain.blockHash(blockTransactions);

    const isLastHash = await isLastChainHash(blockHash);

    if (!isLastHash) {
      const transactionsHash = await flagelochain.transactionsHash(
        blockTransactions
      );
      await spreadBlock(blockHash, transactionsHash);
      await getReward(blockHash);
    }
  }
};

const getReward = async (blockHash) => {
  const responses = await Promise.all(
    neighbours.map((n) => axios.get(`${n.address}/gettingreward`))
  );

  const successTimes = responses.filter(
    (resp) =>
      resp.data !== null &&
      resp.data !== undefined &&
      resp.data.hash === blockHash &&
      resp.data.miner === minerAddress
  ).length;

  const successPercentage = successTimes / neighbours.length;

  console.log(`mining-result-${successPercentage}%-need-0.75%-to-get-reward`);

  if (successPercentage > 0.75) {
    const rewardTransaction = {
      id: uuid.v1(),
      amount: 0.3,
      sender: "00",
      recipient: minerAddress,
    };

    transactionsQueue.push(rewardTransaction);

    axios
      .all(
        neighbours.map((n) =>
          axios.post(`${n.address}/transaction`, rewardTransaction)
        )
      )
      .then(console.log(`new_reward_for_miner-${minerAddress}`))
      .catch((e) => console.log("broadcast_reward_transaction_error"));
  }
};

const isLastChainHash = async (hash) => {
  const responses = await Promise.all(
    neighbours.map((n) => axios.get(`${n.address}/lasthash`))
  );

  return responses.filter((res) => res.data === hash).length !== 0;
};

const spreadBlock = async (blockHash, transactionsHash) => {
  const minedblockpost = {
    block: {
      index: flagelochain.getLastBlock()["index"] + 1,
      transactionsHash: transactionsHash,
      hash: blockHash,
    },
    gettingReward: {
      hash: blockHash,
      miner: minerAddress,
    },
  };

  await Promise.all(
    neighbours.map((n) => axios.post(`${n.address}/minedblock`, minedblockpost))
  );
};

new CronJob("0 */1 * * * *", () => mine(), null, true);

new CronJob(
  "0 */1 * * * *",
  () => {
    const fromPort = parseInt(port) - 5;
    const toPort = parseInt(port) + 5;

    for (let i = fromPort; i < toPort; i++) {
      if (i === parseInt(port)) {
        continue;
      } else {
        const requrl = `http://127.0.0.1:${i}/address`;
        axios
          .get(requrl)
          .then((res) => {
            const neighbour = {
              key: res.data,
              address: `http://127.0.0.1:${i}`,
            };

            const isNew =
              neighbours.filter((n) => n.key == neighbour.key).length == 0;

            if (isNew) {
              console.log(`new friend with key:${neighbour.key} `);
              neighbours.push(neighbour);
            }
          })
          .catch((error) => {
            console.log(`invalid node address: ${requrl}`);
          });
      }
    }
  },
  null,
  true
);

app.listen(port, console.log(`blockchain node running on port: ${port}`));
