import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchUserTerm, setSearchUserTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const url = 'https://bankinformationmanagementsystembackend.onrender.com'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const curUser = await axios.get(`${url}/api/user/me`, {
        withCredentials: true
      });
      console.log(curUser)
      try {
        const usersRes = await axios.get(`${url}/api/user/all`, {
          withCredentials: true
        });
        setUsers(usersRes.data);
        const bankRes = await axios.get(`${url}/api/bank/all`, {
          withCredentials: true
        });
        setBankAccounts(bankRes.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data", error);
        setLoading(false);

        if (curUser) {
          navigate("/dashboard")
        }
        else {
          navigate("/login")
        }
      }
    };
    fetchAdminData();
  }, []);


  return (
    <>
      <div className="container">
        <h2>Admin Panel</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="search">
              <input
                type="text"
                placeholder="Search by name , email ..."
                value={searchUserTerm}
                onChange={(e) => setSearchUserTerm(e.target.value.toLowerCase())}
              />
            </div>

            <div className="card">
              <h3>All Registered Users</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter((user) => {
                    const name = user.name?.toLowerCase() || "";
                    const email = user.email?.toLowerCase() || "";
                    return (
                      name.includes(searchUserTerm) ||
                      email.includes(searchUserTerm)
                    );
                  }).map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Search by username, bank name, IFSC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>

            <div className="card">
              <h3>All Bank Accounts</h3>
              <table>
                <thead>
                  <tr>
                    <th>Account Number</th>
                    <th>IFSC Code</th>
                    <th>Bank Name</th>
                    <th>Account Holder Name</th>
                    <th>Owner Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bankAccounts
                      .filter((acc) => {
                        const ownerName = acc.userId?.name?.toLowerCase() || "";
                        const bankName = acc.bankName?.toLowerCase() || "";
                        const ifsc = acc.ifscCode?.toLowerCase() || "";
                        const accountNumber = acc.accountNumber?.toString().toLowerCase() || "";

                        return (
                          ownerName.includes(searchTerm) ||
                          bankName.includes(searchTerm) ||
                          ifsc.includes(searchTerm) ||
                          accountNumber.includes(searchTerm)
                        );
                      })
                      .map((acc) => (
                        <tr key={acc._id}>
                          <td>{acc.accountNumber}</td>
                          <td>{acc.ifscCode}</td>
                          <td>{acc.bankName}</td>
                          <td>{acc.accountHolderName}</td>
                          <td>{acc.userId?.name || "N/A"}</td>
                        </tr>
                      ))}

                </tbody>

              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
