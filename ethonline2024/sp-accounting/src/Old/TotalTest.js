// Given array of objects
const amounts = [
  { member: 1, amount: -400 },
  { member: 1, amount: 200 },
  { member: 2, amount: -600 },
  { member: 2, amount: 200 },
  { member: 2, amount: 100 },
];

// Calculate total amount for each member
const totalAmounts = amounts.reduce((acc, entry) => {
  const { member, amount } = entry;
  if (!acc[member]) {
    acc[member] = 0;
  }
  acc[member] += amount;
  return acc;
}, {});

console.log(totalAmounts);

//calculate totals for each member using the array of arrays returned by abidecoding:
const processedData = [
  [0, 400, 0],
  [1, 400, 0],
  [0, 400, 1],
  [1, 200, 1],
];

const totalForMembers = processedData.reduce((acc, [member, amount, isPositive]) => {
  const value = isPositive ? amount : -amount;
  acc[member] = (acc[member] || 0) + value;
  return acc;
}, {});

console.log(totalForMembers);

//output={ '0': 0, '1': -200 }

//alternative method for processing the arrays returned by abidecoder:
const processedData = [
  [0, 400, 0, "extra data", "more extra data"],
  [1, 400, 0, "extra data", "more extra data"],
  [0, 400, 1, "extra data", "more extra data"],
  [1, 200, 1, "extra data", "more extra data"],
];

const totals = {};

// Iterate through each entry in processedData
processedData.forEach((entry) => {
  const member = entry[0];
  const amount = entry[1];
  const isPositive = entry[2];

  if (!(member in totals)) {
    totals[member] = 0; // Initialize if not yet present
  }

  // Update the total based on if the amount is positive or negative
  totals[member] += isPositive ? amount : -amount;
});

console.log(totals);

//output={0: 0, 1: 200}

//example of how to process totals for ERC20Transactions:
const transactions = [
  { from: "0x72", to: "0x28", value: "300" },
  { from: "0x73", to: "0x28", value: "300" },
  { from: "0x74", to: "0x28", value: "300" },
  { from: "0x28", to: "0x74", value: "100" },
];

const totals = {};

transactions.forEach((transaction) => {
  const value = parseInt(transaction.value, 10);

  if (transaction.to === "0x28") {
    // If '0x28' is in the 'to' field, add the value to the 'from' member
    const member = transaction.from;
    totals[member] = (totals[member] || 0) + value;
  }

  if (transaction.from === "0x28") {
    // If '0x28' is in the 'from' field, subtract the value from the 'to' member
    const member = transaction.to;
    totals[member] = (totals[member] || 0) - value;
  }
});

console.log(totals);
