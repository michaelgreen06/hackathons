const { ethers } = require("ethers");

// Replace with your Etherscan API key
const ETHERSCAN_API_KEY = "your api key";

// Replace with the address you want to query
const address = "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2";

// Create an EtherscanProvider for the Optimism Sepolia network
const provider = new ethers.providers.EtherscanProvider(
  "optimism-sepolia",
  ETHERSCAN_API_KEY
);

async function getTransactionHistory() {
  try {
    const history = await provider.getHistory(address);
    console.log(`Transaction history for address ${address}:`);
    history.forEach((tx) => {
      console.log({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.utils.formatEther(tx.value),
        nonce: tx.nonce,
        blockNumber: tx.blockNumber,
        timestamp: new Date(tx.timestamp * 1000).toLocaleString(), // Convert Unix timestamp to readable date
      });
    });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
  }
}

// Execute the function
getTransactionHistory();
