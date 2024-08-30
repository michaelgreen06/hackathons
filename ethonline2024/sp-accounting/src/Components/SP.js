import React, { useState } from "react";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";

const SignMe = () => {
  const [member, setMember] = useState("");
  const [amount, setAmount] = useState("");
  const [transactiontype, setTransactiontype] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const handleMember = (e) => {
    setMember(e.target.value.toLowerCase());
  };
  const handleAmount = (e) => {
    setAmount(e.target.value.toLowerCase());
  };
  const handleTransactiontype = (e) => {
    setTransactiontype(e.target.value.toLowerCase());
  };
  const handleDate = (e) => {
    setDate(e.target.value.toLowerCase());
  };
  const handleCategory = (e) => {
    setCategory(e.target.value.toLowerCase());
  };
  const handleDescription = (e) => {
    setDescription(e.target.value.toLowerCase());
  };
  const createAttestation = async () => {
    try {
      const client = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.optimismSepolia,
      });

      const createAttestationRes = await client.createAttestation({
        schemaId: "0x9",
        data: {
          member: { member },
          amount: { amount },
          "transaction-type": { transactiontype },
          date: { date },
          category: { category },
          description: { description },
        },
        indexingValue: "1",
      });

      console.log(createAttestationRes);
    } catch (error) {
      console.error("Error creating attestation:", error);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="member">Member (address)</label>
          <input
            type="text"
            id="member"
            placeholder="0x..."
            onChange={handleMember}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="text"
            id="amount"
            placeholder="420"
            onChange={handleAmount}
          />
        </div>
        <div>
          <label htmlFor="transactionType">Credit/Debit</label>
          <select
            id="transactionType"
            onChange={handleTransactiontype}
          >
            <option value="1">I owe</option>
            <option value="2">I am owed</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            onChange={handleDate}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={handleCategory}
          >
            <option value="1">Supplies</option>
            <option value="2">Office Equipment</option>
            <option value="3">Add a new category</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Provide a brief summary of what you are submitting a request for"
            onChange={handleDescription}
          />
        </div>
        <div>
          <label htmlFor="media">Upload Media (receipt, invoice etc)</label>
          <input
            type="file"
            id="media"
          />
        </div>
        <button
          type="submit"
          onClick={createAttestation}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignMe;
