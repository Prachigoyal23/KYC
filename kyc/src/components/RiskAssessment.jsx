import React, { useEffect, useState } from "react";
import { Table, Progress, Tag } from "antd";
import axios from "axios";

const RiskAssessment = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/customers").then((res) => {
      setCustomers(res.data);
      setLoading(false);
    });
  }, []);

  const getRiskColor = (score) => {
    if (score >= 70) return "red";
    if (score >= 40) return "orange";
    return "green";
  };

  const getRiskStatusTag = (score) => {
    if (score >= 70) return <Tag color="red">High Risk</Tag>;
    if (score >= 40) return <Tag color="orange">Medium Risk</Tag>;
    return <Tag color="green">Low Risk</Tag>;
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Credit Score",
      dataIndex: "creditScore",
      key: "creditScore",
    },
    {
      title: "Loan Repayment History",
      dataIndex: "loanRepaymentHistory",
      key: "loanRepaymentHistory",
      render: (history) =>
        history.map((h, idx) => (
          <Tag key={idx} color={h ? "green" : "red"}>
            {h ? "Paid" : "Missed"}
          </Tag>
        )),
    },
    {
      title: "Outstanding Loans vs Income Ratio",
      key: "ratio",
      render: (_, record) => {
        const ratio = (record.outstandingLoans / record.monthlyIncome).toFixed(2);
        return ratio;
      },
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      render: (score) => (
        <Progress
          percent={score}
          strokeColor={getRiskColor(score)}
          status={score >= 70 ? "exception" : "active"}
          format={(percent) => `${percent}`}
        />
      ),
      sorter: (a, b) => a.riskScore - b.riskScore,
    },
    {
      title: "Risk Level",
      dataIndex: "riskScore",
      key: "riskLevel",
      render: getRiskStatusTag,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={customers}
      rowKey="customerId"
      loading={loading}
      pagination={{ pageSize: 6 }}
    />
  );
};

export default RiskAssessment;
