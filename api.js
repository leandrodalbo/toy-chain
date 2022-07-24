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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/address", (req, res) => res.status(200).send(minerAddress));

app.get("/neighbours", (req, res) => res.status(200).send(neighbours));

app.get("/transactions", (req, res) => res.status(200).send(transactionsQueue));

app.get("/chain", (req, res) => {
  res.status(200).send(flagelochain);
});

app.post("/transaction", (req, res) => {
  const data = req.body;
  const transaction = {
    id: data.id ? data.id : uuid.v1(),
    amount: data.amount,
    sender: data.sender,
    recipient: data.recipient,
  };

  if (transactionsQueue.filter((it) => it.id == transaction.id) == 0) {
    console.log("new trans");
    neighbours.forEach(async (n) => {
      await axios.post(`${n.address}/transaction`, transaction);
    });

    transactionsQueue.push(transaction);

    if (transactionsQueue.length == flagelochain.transactionsLimit) {
      triggerMiner();
    }

    res.status(201).send({
      message: "transactions created",
      transactions: transactionsQueue,
    });
  } else {
    res.status(200).send({
      message: "transaction exists",
      transactions: transactionsQueue,
    });
  }
});

const triggerMiner = async () => {
  const hash = await flagelochain.hashWithTransactions(transactionsQueue);

  transactionsQueue = [];

  transactionsQueue.push({
    amount: 12,
    sender: "00",
    recipient: minerAddress,
  });

  flagelochain.saveBlock(hash, transactions);
  res.status(201).send(flagelochain.getLastBlock());
};

new CronJob(
  "0 */1 * * * *",
  () => {
    console.log("Dicovering Neigbours");
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
              console.log(`Neighbour found : ${neighbour} `);
              neighbours.push(neighbour);
            }
          })
          .catch((error) => {
            console.log(`Invalid Neighbour ${error}`);
          });
      }
    }
  },
  null,
  true
);

app.listen(port, console.log(`blockchain node listening on ${port}`));
