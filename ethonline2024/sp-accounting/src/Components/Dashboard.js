//Items that will need to be adjusted=schemaId in queryAttestations()
//address constant
//types in decodeAttestations() to account for updated schema type

const axios = require("axios");
const BigNumber = require("bignumber.js");
const { AbiCoder } = require("ethers");

const address = "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2".toLowerCase();
const etherscanApiKey = "S58AX7RGE8H35RT8QXD4RQ2A427RQF7B1M";

// Function to make a request to the Sign Protocol Indexing Service
async function getERC20Transactions(endpoint, options) {
  const url = `https://api-sepolia-optimism.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`;
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
  return res.data.result; // Access the result array directly
}

// Function to calculate totals from ERC20transactions
async function calculateTotals() {
  try {
    const transactions = await getERC20Transactions();
    const totals = {};

    transactions.forEach((transaction) => {
      // Create a BigNumber instance for the value
      const value = new BigNumber(transaction.value);

      // Calculate the divisor as 10^tokenDecimal
      const divisor = new BigNumber(10).pow(transaction.tokenDecimal);

      // Divide the value by the divisor
      const adjustedValue = value.dividedBy(divisor);

      if (transaction.to.toLowerCase() === address) {
        const member = transaction.from.toLowerCase();
        totals[member] = (totals[member] || new BigNumber(0)).plus(adjustedValue);
      }

      if (transaction.from.toLowerCase() === address) {
        const member = transaction.to.toLowerCase();
        totals[member] = (totals[member] || new BigNumber(0)).minus(adjustedValue);
      }
    });

    // Convert totals to strings for easier readability
    for (const member in totals) {
      totals[member] = totals[member].toString();
    }

    console.log(totals);
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}

// Call the function to calculate and log totals
// calculateTotals();

//helper function to get attestations
async function makeAttestationRequest(endpoint, options) {
  const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
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

async function queryAttestations() {
  const response = await makeAttestationRequest("index/attestations", {
    method: "GET",
    params: {
      mode: "onchain",
      schemaId: "onchain_evm_11155420_0xe",
    },
  });

  if (!response.success) {
    return {
      success: false,
      message: response?.message ?? "Attestation query failed.",
    };
  }

  if (response.data?.total === 0) {
    return {
      success: false,
      message: "No attestation for this address found.",
    };
  }

  return {
    success: true,
    attestations: response.data.rows,
  };
}

async function decodedAttestations() {
  const queryResult = await queryAttestations();
  const types = [
    "string", // member
    "string", // amount
    "string", // transactiontype
    "string", // date
    "string", // category
    "string", // description
  ];
  const abiCoder = new AbiCoder();

  if (!queryResult.success) {
    console.log(queryResult.message);
    return;
  }

  const attestations = queryResult.attestations;
  const processedData = [];
  for (const att of attestations) {
    if (!att.data) continue;

    try {
      const decodedData = abiCoder.decode(types, att.data);

      // Add the decoded data to the processedData array
      processedData.push(decodedData);
      console.log(processedData);
    } catch (error) {
      console.error("Error decoding attestation data:", error);
    }
  }
}

decodedAttestations();
