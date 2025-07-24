import React, { useEffect, useState } from "react";
import axios from "axios";
import AccountDetails from "../components/AccountDetails";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAccount, setNewAccount] = useState({
    "accountHolderName": "",
    "accountNumber": "",
    "ifscCode": "",
    "bankName": "",
    "branchName": "",
  });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [model, setModel] = useState(false)
  const url='https://bankinformationmanagementsystembackend.onrender.com'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userRes = await axios.get(`${url}/api/user/me`,
          {
            withCredentials: true
          });
        // setUser(res.data.user);

        console.log("User Data:", userRes.data)
        // console.log("res.data:", res.data.user);
        setUser(userRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        setLoading(false);
        alert("Please LogIn")
        navigate("/login")
      }
    };

    fetchDashboard();
  }, [model]);

  const handleChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchAcc = async () => {
      console.log("user ", user)
      const bankRes = await axios.get(`${url}/api/bank/`, {
        withCredentials: true
      });
      // console.log("Bank Accounts:", bankRes.data);
      // console.log("Bank Accounts:", bankRes.data.bankAccounts);
      setAccounts(bankRes.data.bankAccounts);
    }
    fetchAcc();
  }, [user])
  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/bank/add`, newAccount, {
        withCredentials: true
      });

      const bankRes = await axios.get(`${url}/api/bank/`, {
        withCredentials: true
      });
      setAccounts(bankRes.data.bankAccounts);
      setNewAccount({
        "accountHolderName": "",
        "accountNumber": "",
        "ifscCode": "",
        "bankName": "",
        "branchName": ""
      });
      // console.log("New Account Added:", accounts);
    } catch (err) {
      console.error("Error adding bank account", err);
    }
  };

  const setDisplayModel = () => {
    setModel((prev) => !prev);
  }
  const onclickOfPopUpOption = (acc) => {
    setSelectedAccount(acc);
    setDisplayModel();
  }
  const handleDeleteLocal = (id) => {
    setAccounts((prev) => prev.filter((acc) => acc._id !== id));
  };


  return (
    <>
      <div className="container dash">
        <h2>User Dashboard</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="card user">
              <h3>Welcome, {user?.name}</h3>
              <p>Email: {user?.email}</p>
            </div>

            <div className="card">
              <h3>Add New Bank Account</h3>
              <div className="accinp">
                <form onSubmit={handleAddAccount}>
                  <input
                    type="number"
                    name="accountNumber"
                    placeholder="Account Number"
                    value={newAccount.accountNumber}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="accountHolderName"
                    placeholder="Account Holder Name"
                    value={newAccount.accountHolderName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    value={newAccount.bankName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="branchName"
                    placeholder="Branch Name"
                    value={newAccount.branchName}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="ifscCode"
                    placeholder="IFSC Code"
                    value={newAccount.ifscCode}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit">Add Account</button>
                </form>
              </div>
            </div>

            <div className="card">
              <h3>Your Bank Accounts</h3>
              {accounts.length === 0 ? (
                <p>No accounts found</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Account Holder Name</th>
                      <th>Account Number</th>
                      <th>Bank Name</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((acc) => (
                      <tr key={acc._id}>
                        <td>{acc.accountHolderName}</td>
                        <td>{acc.accountNumber}</td>
                        <td>{acc.bankName}</td>
                        <td>
                          <button onClick={() => onclickOfPopUpOption(acc)}>More Details</button>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              )}
            </div>

          </>
        )}
      </div >
      {
        model && <AccountDetails
          setDisplayModel={setDisplayModel}
          selectedAccount={selectedAccount}
          onDelete={handleDeleteLocal}
        />
      }
    </>
  );
};

export default Dashboard;

