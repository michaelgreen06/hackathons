// const { ethers } = require("ethers");

// const network = "optimism-sepolia"; // or any other supported network like "goerli", "sepolia", etc.
// const apiKey = "S58AX7RGE8H35RT8QXD4RQ2A427RQF7B1M"; // Replace with your Etherscan API key

// const provider = ethers.getDefaultProvider(network, {
//   etherscan: apiKey,
// });

// async function getBlockNumber() {
//   const blockNumber = await provider.getBlockNumber();
//   console.log("Current block number:", blockNumber);
// }

// getBlockNumber();

const ethers = require("ethers");

async function getTransactionHistory(address) {
  const provider = new ethers.providers.EtherscanProvider();

  try {
    let history = await provider.getHistory(address);
    console.log(history);
  } catch (error) {
    console.error("Error fetching transaction history:", error);
  }
}

// Usage example
const address = "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2";
getTransactionHistory(address);
