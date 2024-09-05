const axios = require("axios");

// Function to make a request to the Sign Protocol Indexing Service
async function getERC20Transactions(endpoint, options) {
  const address = "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2";
  const apiKey = "S58AX7RGE8H35RT8QXD4RQ2A427RQF7B1M";
  const url = `https://api-sepolia-optimism.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
  const res = await axios.request({
    url,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  });
  if (res.status !== 200) {
    throw new Error(JSON.stringify(res));
  }
  return res.data;
}

// Call the function and log the response
getERC20Transactions()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching transactions:", error);
  });
