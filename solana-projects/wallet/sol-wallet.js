const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const SOL_NETWORK = "devnet";

const wallet = new Keypair();

const getConnection = () => {
  return new Connection(clusterApiUrl(SOL_NETWORK), "confirmed");
};

const getPublicKey = () => {
  return new PublicKey(wallet._keypair.publicKey);
};

const addCoins = async (amount) => {
  const connection = getConnection();
  const airdropSignature = await connection.requestAirdrop(
    getPublicKey(),
    amount
  );

  const latestBlockHash = await connection.getLatestBlockhash();

  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: airdropSignature,
  });
};

const getBalance = () => {
  const connection = getConnection();
  return connection.getBalance(getPublicKey());
};

const main = async () => {
  const balance_0 = await getBalance();
  console.log(balance_0);

  await addCoins(2 * LAMPORTS_PER_SOL);

  const balance_1 = await getBalance();
  console.log(balance_1);
};

main();
