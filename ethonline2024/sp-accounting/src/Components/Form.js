import React from "react";

const Form = () => {
  return (
    <form>
      <div>
        <label htmlFor="member">Member (address)</label>
        <input
          type="text"
          id="member"
          placeholder="0x..."
        />
      </div>
      <div>
        <label htmlFor="amount">Amount ($)</label>
        <input
          type="text"
          id="amount"
          placeholder="420"
        />
      </div>
      <div>
        <label htmlFor="transactionType">Credit/Debit</label>
        <select id="transactionType">
          <option value="1">I owe</option>
          <option value="2">I am owed</option>
        </select>
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select id="category">
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
        />
      </div>
      <div>
        <label htmlFor="media">Upload Media (receipt, invoice etc)</label>
        <input
          type="file"
          id="media"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
