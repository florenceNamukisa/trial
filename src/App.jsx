import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApprovedRequests from "./components/ApprovedRequests";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<ApprovedRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
