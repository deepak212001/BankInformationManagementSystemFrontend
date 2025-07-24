// AccountDetailsPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AccountDetailsPage.css";

const AccountDetails = (props) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(props.selectedAccount || {});
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});

  const url='https://bankinformationmanagementsystembackend.onrender.com'
  // const url='http://localhost:3000'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    console.log("update ", form)
    try {
      await axios.patch(`${url}/api/bank/${account._id}`, form, {
        withCredentials: true,
      });
      setIsEditing(false);
      alert("Account updated");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/api/bank/${account._id}`, {
        withCredentials: true,
      });
      alert("Account deleted");
      props.onDelete(account._id);
      props.setDisplayModel()
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!account) return <p>Loading...</p>;

  return (
    <div className="account-details-page">

      <div className="form-group">
        <h2>Account Details</h2>
        <label>Account Number:</label>
        <input
          type="number"
          name="accountNumber"
          value={form.accountNumber || account.accountNumber || ""}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        <label>Account Holder's Name:</label>
        <input
          type="text"
          name="accountHolderName"
          value={form.accountHolderName || account.accountHolderName || ""}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        <label>Branch Name:</label>
        <input
          type="text"
          name="branchName"
          value={form.branchName || account.branchName || ""}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        <label>Bank Name:</label>
        <input
          type="text"
          name="bankName"
          value={form.bankName || account.bankName || ""}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        <label>IFSC Code:</label>
        <input
          type="text"
          name="ifscCode"
          value={form.ifscCode || account.ifscCode || ""}
          onChange={handleChange}
          readOnly={!isEditing}
        />


        <div className="btn">
          {isEditing ? (
            <>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={props.setDisplayModel}>Back</button>
            </>
          )}
        </div>
      </div>
    </div >
  );
};

export default AccountDetails;
