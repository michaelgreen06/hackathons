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
