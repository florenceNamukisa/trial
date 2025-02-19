import React, { useState, useEffect } from "react";
import "../styles/FrequentRecipients.css";

const FrequentRecipients = () => {
  const [recipients, setRecipients] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recipients")
      .then((res) => res.json())
      .then((data) => setRecipients(data))
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Frequent Recipients</h2>
        {recipients.length > 2 && (
          <button className="see-all-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "See All"}
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="recipients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recipients.length ? (
              (showAll ? recipients : recipients.slice(0, 2)).map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>UGX {r.amount.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>No recipients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FrequentRecipients;
