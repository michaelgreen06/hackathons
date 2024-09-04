const axios = require("axios");

// Function to make a request to the Sign Protocol Indexing Service
async function getERC20Transactions(endpoint, options) {
  const url = `https://api-sepolia-optimism.etherscan.io/api?module=account&action=tokentx&address=0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=S58AX7RGE8H35RT8QXD4RQ2A427RQF7B1M`;
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

// async function queryAttestations() {
//   const response = await makeAttestationRequest("index/attestations", {
//     method: "GET",
//     params: {
//       mode: "onchain",
//       schemaId: "onchain_evm_11155420_0xe",
//     },
//   });

//   if (!response.success) {
//     return {
//       success: false,
//       message: response?.message ?? "Attestation query failed.",
//     };
//   }

//   if (response.data?.total === 0) {
//     return {
//       success: false,
//       message: "No attestation for this address found.",
//     };
//   }

//   return {
//     success: true,
//     attestations: response.data.rows,
//   };
// }

// async function logDecodedAttestations() {
//   const queryResult = await queryAttestations();

//   if (!queryResult.success) {
//     console.log(queryResult.message);
//     return;
//   }

//   const attestations = queryResult.attestations;

//   for (const att of attestations) {
//     if (!att.data) continue;

//     try {
//       const decodedData = decodeAbiParameters(
//         att.dataLocation === "onchain" ? att.schema.data : [{ type: "string" }],
//         att.data
//       );

//       console.log("Decoded Data:", decodedData);
//     } catch (error) {
//       console.error("Error decoding attestation data:", error);
//     }
//   }
// }

// // Call the function to log the decoded attestations
// logDecodedAttestations();
