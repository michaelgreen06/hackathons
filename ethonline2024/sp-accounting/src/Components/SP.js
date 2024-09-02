import React, { useState } from "react";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";

const SignMe = () => {
  const [formData, setFormData] = useState({
    member: "",
    amount: "",
    transactiontype: "",
    date: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const client = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.optimismSepolia,
      });

      const createAttestationRes = await client.createAttestation({
        schemaId: "0xe",
        data: formData,
        indexingValue: "1",
      });

      console.log("Attestation created:", createAttestationRes);
    } catch (error) {
      console.error("Error creating attestation:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Member:
          <input
            type="text"
            name="member"
            value={formData.member}
            onChange={handleChange}
            placeholder="0x..."
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="420"
          />
        </label>
      </div>
      <div>
        <label>
          Transaction Type:
          <select
            name="transactiontype"
            value={formData.transactiontype}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="0">I owe</option>{" "}
            {/*^^^this assigns a negative value to the member's balance*/}
            <option value="1">I am owed</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Supplies">Supplies</option>
            <option value="Office Equipment">Office Equipment</option>
            <option value="Add a new category">Add a new category</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a brief summary of what you are submitting a request for"
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignMe;
