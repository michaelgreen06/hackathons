const { AbiCoder, Interface } = require("ethers");

// Define the ABI for the function or event
const abi = ["function transfer(address to, uint amount)"];

// Create an Interface instance
const iface = new Interface(abi);

// Encoded data (example)
const encodedData =
  "0xa9059cbb0000000000000000000000005a0b54d5dc17e0aadc383d2db4b3a3696d1c5a000000000000000000000000000000000000000000000000000000000000000001";

// Decode the data
const decodedData = iface.decodeFunctionData("transfer", encodedData);

console.log(decodedData);

//9/4/24 this actually works to decode
