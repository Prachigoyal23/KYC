const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());


let customers = [
  {
    customerId: "CUST1001",
    name: "Alice Johnson",
    monthlyIncome: 6200,
    monthlyExpenses: 3500,
    creditScore: 710,
    outstandingLoans: 15000,
    loanRepaymentHistory: [1, 0, 1, 1, 1, 1, 0, 1],
    accountBalance: 12500,
    status: "Review",
  },
  {
    customerId: "CUST1002",
    name: "Bob Smith",
    monthlyIncome: 4800,
    monthlyExpenses: 2800,
    creditScore: 640,
    outstandingLoans: 20000,
    loanRepaymentHistory: [1, 1, 1, 0, 0, 1, 0, 0],
    accountBalance: 7300,
    status: "Approved",
  },
];

// Helper: Risk score calculation
const calcRiskScore = (customer) => {
  let baseScore = customer.creditScore / 10; // normalize creditScore
  let repaymentScore =
    (customer.loanRepaymentHistory.reduce((a, b) => a + b, 0) /
      customer.loanRepaymentHistory.length) *
    50;
  let ratio = customer.outstandingLoans / customer.monthlyIncome;
  let ratioScore = ratio > 3 ? 0 : (3 - ratio) * 20;

  let finalScore = Math.min(100, baseScore + repaymentScore + ratioScore);
  return Math.round(finalScore);
};

// GET customers with risk score
app.get("/customers", (req, res) => {
  const custWithRisk = customers.map((c) => ({
    ...c,
    riskScore: calcRiskScore(c),
  }));
  res.json(custWithRisk);
});

app.put("/customer/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const custIndex = customers.findIndex((c) => c.customerId === id);
  if (custIndex !== -1) {
    customers[custIndex].status = status;
    return res.json({ message: "Status updated", customer: customers[custIndex] });
  }
  res.status(404).json({ error: "Customer not found" });
});

app.post("/alerts", (req, res) => {
  // Simulate alert
  console.log("Alert received:", req.body);
  res.json({ message: "Alert logged" });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
