# 📊 Credit Risk Dashboard

A full-stack MERN-style project (React + Express + Mock Data API) that provides a Credit Risk Analysis Dashboard for financial institutions.

It allows you to:

View customer financial and risk data

Perform risk assessments with dynamic scoring

Automate workflow actions such as approving/rejecting customers

Visualize data with charts and tables

# 🚀 Features
# Frontend (React + Ant Design + Recharts)

# Dashboard Overview:

Total customers

Average credit score & risk score

Income vs. Expenses (Line Chart)

Risk Distribution (Pie Chart)

Customer data table with sorting

# Risk Assessment:

Risk score calculated dynamically

Loan repayment history visualization

Risk categorization (High/Medium/Low)

# Workflow Automation:

Update customer application status (Review, Approved, Rejected)

Alerts triggered for high-risk customers

# Backend (Express.js + Node.js)

# API Endpoints:

GET /customers → Fetch customer data with risk score

PUT /customer/:id/status → Update application status

POST /alerts → Simulated alert logging

# Risk Score Calculation:

Based on credit score, repayment history, and loan-to-income ratio

# 🛠️ Tech Stack

# Frontend

React

React Router

Ant Design (UI Components)

Recharts (Charts & Graphs)

Axios (API calls)

# Backend

Express.js

CORS

Body-parser

# ⚙️ Installation & Setup

# 1. Clone the repository
   git clone https://github.com/Prachigoyal23/KYC.git
   cd credit-risk-dashboard
# 2. Backend Setup
   cd kycBackend
   npm install
   npm start

Server runs at 👉 http://localhost:4000

# 3. Frontend Setup
   cd kyc
   npm install
   npm run dev
   
Frontend runs at 👉 http://localhost:3000


