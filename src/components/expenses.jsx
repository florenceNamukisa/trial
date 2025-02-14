import React, { useState, useEffect } from 'react';
import "../styles/ApprovedRequests.css"; // Ensure this path is correct

const ApprovedRequests = () => {
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Fetch approved requests from the backend
  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/approved-requests"); // Update with your API endpoint
        const result = await response.json();
        setData(result); // Set the fetched data
      } catch (error) {
        console.error("Error fetching approved requests:", error);
      }
    };

    fetchApprovedRequests();
  }, []); // Runs once when the component mounts

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(!selectAll ? data.map((_, index) => index) : []);
  };

  const handleRowSelect = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Handle bulk delete action
  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) return; // Prevent deleting if nothing is selected

    const selectedIds = selectedRows.map((index) => data[index]._id); // Assuming each row has a unique `_id`
    
    try {
      await fetch("http://localhost:5000/api/delete-requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      // Remove deleted rows from state
      setData((prevData) => prevData.filter((_, index) => !selectedRows.includes(index)));
      setSelectedRows([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error deleting selected requests:", error);
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Approved Requests</h2>
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </th>
              <th>Name</th>
              <th>Department</th>
              <th>Categories</th>
              <th>Amount</th>
              <th>Request Date</th>
              <th>Approved Date</th>
              <th>Approver</th>
              <th>
                {/* Delete Button in the Action Header */}
                <button 
                  className="delete-btn" 
                  onClick={handleDeleteSelected} 
                  disabled={selectedRows.length === 0}
                >
                  Delete
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.categories}</td>
                  <td>{item.amount}</td>
                  <td>{item.requestDate}</td>
                  <td>{item.approvedDate}</td>
                  <td>{item.approverName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">No approved requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedRequests;
