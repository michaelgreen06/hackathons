import React, { useState, useEffect } from "react";
import axios from "axios";
import BigNumber from "bignumber.js";
import { AbiCoder } from "ethers";

const Dashboard = () => {
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const address = "0x6781d3E0FE4B93cD5e848C9ffFB55D7c90aE74CF".toLowerCase();
  const etherscanApiKey = "S58AX7RGE8H35RT8QXD4RQ2A427RQF7B1M";

  useEffect(() => {
    calculateCombinedTotals();
  }, []);

  const getERC20Transactions = async () => {
    const url = `https://api-sepolia-optimism.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanApiKey}`;
    const res = await axios.get(url);
    if (res.status !== 200) {
      throw new Error(JSON.stringify(res));
    }
    return res.data.result;
  };

  const calculateERC20Totals = async () => {
    try {
      const transactions = await getERC20Transactions();
      const totals = {};

      transactions.forEach((transaction) => {
        const value = new BigNumber(transaction.value);
        const divisor = new BigNumber(10).pow(transaction.tokenDecimal);
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

      return totals;
    } catch (error) {
      console.error("Error fetching ERC20 transactions:", error);
      return {};
    }
  };

  const makeAttestationRequest = async (endpoint, options) => {
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
  };

  const queryAttestations = async () => {
    const response = await makeAttestationRequest("index/attestations", {
      method: "GET",
      params: {
        mode: "onchain",
        schemaId: "onchain_evm_11155420_0x18",
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
  };

  const calculateAttestationTotals = async () => {
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
      return {};
    }

    const attestations = queryResult.attestations;
    const totals = {};

    for (const att of attestations) {
      if (!att.data) continue;
      try {
        const decodedData = abiCoder.decode(types, att.data);
        const member = decodedData[0];
        const amount = new BigNumber(decodedData[1]);
        const isPositive = decodedData[2] === "1";

        if (!(member in totals)) {
          totals[member] = new BigNumber(0);
        }

        totals[member] = isPositive
          ? totals[member].plus(amount)
          : totals[member].minus(amount);
      } catch (error) {
        console.error("Error decoding attestation data:", error);
      }
    }

    return totals;
  };

  const calculateCombinedTotals = async () => {
    try {
      setLoading(true);
      const erc20Totals = await calculateERC20Totals();
      const attestationTotals = await calculateAttestationTotals();

      const combinedTotals = {};

      // Combine ERC20 totals
      for (const member in erc20Totals) {
        combinedTotals[member] = erc20Totals[member];
      }

      // Add attestation totals
      for (const member in attestationTotals) {
        if (member in combinedTotals) {
          combinedTotals[member] = combinedTotals[member].plus(attestationTotals[member]);
        } else {
          combinedTotals[member] = attestationTotals[member];
        }
      }

      // Convert totals to strings
      for (const member in combinedTotals) {
        combinedTotals[member] = combinedTotals[member].toString();
      }

      setBalances(combinedTotals);
      setLoading(false);
    } catch (err) {
      setError("Error calculating balances");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginBottom: "0px" }}>Member Balances</h2>
      <a
        href="https://optimistic.etherscan.io/address/0x6781d3e0fe4b93cd5e848c9fffb55d7c90ae74cf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3>Multisig Address:{address}</h3>
      </a>
      {Object.entries(balances).map(([member, balance]) => (
        <div
          key={member}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: parseFloat(balance) >= 0 ? "green" : "red",
              marginRight: "10px",
            }}
          ></div>
          <div style={{ flex: 1 }}>{member}</div>
          <div style={{ fontWeight: "bold" }}>{balance}</div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
