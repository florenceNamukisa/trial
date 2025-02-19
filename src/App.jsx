import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApprovedRequests from "./components/ApprovedRequests";
import RejectedRequests from "./components/RejectedRequests"; 
import FrequentRecipients from "./components/FrequentRecipients";

function App() {
  return (
    <div>
    <ApprovedRequests/>
    <RejectedRequests/>
    <FrequentRecipients/>
    </div> 
  );
}

export default App;
