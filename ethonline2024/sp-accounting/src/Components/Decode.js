// import { ethers } from "ethers";
const { ethers } = require("ethers");

const abi = [
  "function decodeData(string member, string amount, string transactiontype, string date, string category, string description)",
];

const iface = new ethers.utils.Interface(abi);

// const apiResponse = {
//   success: true,
//   statusCode: 200,
//   data: {
//     total: 2,
//     rows: [
//       {
//         id: "onchain_evm_11155420_0x15",
//         mode: "onchain",
//         chainType: "evm",
//         chainId: "11155420",
//         attestationId: "0x15",
//         transactionHash:
//           "0x564edd925ee7004fc679ca2c6cc49356b28fe80eef1aed7197c0f28b05f1ee7b",
//         indexingValue: "1",
//         schemaId: "0xe",
//         fullSchemaId: "onchain_evm_11155420_0xe",
//         linkedAttestation: "",
//         attester: "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2",
//         from: "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2",
//         attestTimestamp: "1725317292000",
//         validUntil: "0",
//         revoked: false,
//         revokeTimestamp: null,
//         revokeReason: null,
//         revokeTransactionHash: "",
//         data: "0x00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000146d69636861656c2072656e74206163636f756e740000000000000000000000000000000000000000000000000000000000000000000000000000000000000003343030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a323032342d30392d30310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000104f66666963652045717569706d656e74000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014476f7474612070617920746861742072656e7421000000000000000000000000",
//         dataLocation: "onchain",
//         extra: {},
//         syncAt: "1725317299526",
//         lastSyncAt: null,
//         recipients: [],
//         schema: {
//           id: "onchain_evm_11155420_0xe",
//           mode: "onchain",
//           chainType: "evm",
//           chainId: "11155420",
//           schemaId: "0xe",
//           transactionHash:
//             "0x0c4050d4d351fbfc11b21579453c66edd768bdf86d19e0e86450f5a99ea104d9",
//           name: "rhtest2",
//           description: "regenhub accounting",
//           dataLocation: "onchain",
//           revocable: true,
//           maxValidFor: "0",
//           resolver: "0x0000000000000000000000000000000000000000",
//           registerTimestamp: "1725235806000",
//           registrant: "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2",
//           data: [
//             {
//               name: "member",
//               type: "string",
//             },
//             {
//               name: "amount",
//               type: "string",
//             },
//             {
//               name: "transactiontype",
//               type: "string",
//             },
//             {
//               name: "date",
//               type: "string",
//             },
//             {
//               name: "category",
//               type: "string",
//             },
//             {
//               name: "description",
//               type: "string",
//             },
//           ],
//           originalData:
//             '{"name":"rhtest2","description":"regenhub accounting","data":[{"name":"member","type":"string"},{"name":"amount","type":"string"},{"name":"transactiontype","type":"string"},{"name":"date","type":"string"},{"name":"category","type":"string"},{"name":"description","type":"string"}]}',
//           extra: {
//             data: '{"name":"rhtest2","description":"regenhub accounting","data":[{"name":"member","type":"string"},{"name":"amount","type":"string"},{"name":"transactiontype","type":"string"},{"name":"date","type":"string"},{"name":"category","type":"string"},{"name":"description","type":"string"}]}',
//           },
//           syncAt: "1725235813619",
//         },
//       },
//       {
//         id: "onchain_evm_11155420_0x11",
//         mode: "onchain",
//         chainType: "evm",
//         chainId: "11155420",
//         attestationId: "0x11",
//         transactionHash:
//           "0x9f26989c64b33ae100a5f03133b2c23fa0c31ccc1f903b2097f1ef4c9b18df30",
//         indexingValue: "1",
//         schemaId: "0xe",
//         fullSchemaId: "onchain_evm_11155420_0xe",
//         linkedAttestation: "",
//         attester: "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2",
//         from: "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2",
//         attestTimestamp: "1725235874000",
//         validUntil: "0",
//         revoked: false,
//         revokeTimestamp: null,
//         revokeReason: null,
//         revokeTransactionHash: "",
//         data: "0x00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000b3078726567656e2e657468000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000924312c3036332e3030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a323032342d30382d3134000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008537570706c69657300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000614772616262656420736f6d65206e65772063617465676f7269657320666f7220746865207370616365206265636175736520492074686f7567687420746865726520776572656e277420656e6f7567682063617465676f72696573207965742e2000000000000000000000000000000000000000000000000000000000000000",
//         dataLocation: "onchain",
//         extra: {},
//         syncAt: "1725235879798",
//         lastSyncAt: null,
//         recipients: [],
//         schema: {
//           id: "onchain_evm_11155420_0xe",
//           mode: "onchain",
//           chainType: "evm",
//           chainId: "11155420",
//           schemaId: "0xe",
//           transactionHash:
//             "0x0c4050d4d351fbfc11b21579453c66edd768bdf86d19e0e86450f5a99ea104d9",
//           name: "rhtest2",
//           description: "regenhub accounting",
//           dataLocation: "onchain",
//           revocable: true,
//           maxValidFor: "0",
//           resolver: "0x0000000000000000000000000000000000000000",
//           registerTimestamp: "1725235806000",
//           registrant: "0x28c0579BAC08317300fe591d42Ed66fEfc7Efcd2",
//           data: [
//             {
//               name: "member",
//               type: "string",
//             },
//             {
//               name: "amount",
//               type: "string",
//             },
//             {
//               name: "transactiontype",
//               type: "string",
//             },
//             {
//               name: "date",
//               type: "string",
//             },
//             {
//               name: "category",
//               type: "string",
//             },
//             {
//               name: "description",
//               type: "string",
//             },
//           ],
//           originalData:
//             '{"name":"rhtest2","description":"regenhub accounting","data":[{"name":"member","type":"string"},{"name":"amount","type":"string"},{"name":"transactiontype","type":"string"},{"name":"date","type":"string"},{"name":"category","type":"string"},{"name":"description","type":"string"}]}',
//           extra: {
//             data: '{"name":"rhtest2","description":"regenhub accounting","data":[{"name":"member","type":"string"},{"name":"amount","type":"string"},{"name":"transactiontype","type":"string"},{"name":"date","type":"string"},{"name":"category","type":"string"},{"name":"description","type":"string"}]}',
//           },
//           syncAt: "1725235813619",
//         },
//       },
//     ],
//     size: 100,
//     page: 1,
//   },
//   message: "ok",
// };

// const decodedData = apiResponse.data.rows[0].data.map((row) => {
//   return iface.decodeFunctionData("decodeData", row.data);
// });

// console.log(decodedData);

const decoded = iface.decodeFunctionData(
  "decodeData",
  "0x00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000b3078726567656e2e657468000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000924312c3036332e3030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a323032342d30382d3134000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008537570706c69657300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000614772616262656420736f6d65206e65772063617465676f7269657320666f7220746865207370616365206265636175736520492074686f7567687420746865726520776572656e277420656e6f7567682063617465676f72696573207965742e2000000000000000000000000000000000000000000000000000000000000000"
);
console.log(decoded);
