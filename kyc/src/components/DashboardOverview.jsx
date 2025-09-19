import React, { useEffect, useState } from "react";
import { Card, Statistic, Progress, Table, Row, Col } from "antd";
import axios from "axios";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer } from "recharts";
// import BASE_URL from "./Constant"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardOverview = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://kyc-ecy6.onrender.com/customers").then((res) => {
      setCustomers(res.data);
      setLoading(false);
    });
  }, []);

  // Aggregate data for charts
  const incomeExpensesData = customers.map((c, i) => ({
    name: c.name,
    Income: c.monthlyIncome,
    Expenses: c.monthlyExpenses,
  }));

  const riskDistribution = customers.reduce((acc, c) => {
    const riskLevel =
      c.riskScore >= 70 ? "High Risk" : c.riskScore >= 40 ? "Medium Risk" : "Low Risk";
    acc[riskLevel] = (acc[riskLevel] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(riskDistribution).map((key) => ({
    name: key,
    value: riskDistribution[key],
  }));

  // Table columns
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Monthly Income",
      dataIndex: "monthlyIncome",
      key: "monthlyIncome",
      sorter: (a, b) => a.monthlyIncome - b.monthlyIncome,
      render: (val) => `$${val}`,
    },
    {
      title: "Monthly Expenses",
      dataIndex: "monthlyExpenses",
      key: "monthlyExpenses",
      render: (val) => `$${val}`,
    },
    {
      title: "Credit Score",
      dataIndex: "creditScore",
      key: "creditScore",
      sorter: (a, b) => a.creditScore - b.creditScore,
    },
    {
      title: "Risk Score",
      dataIndex: "riskScore",
      key: "riskScore",
      sorter: (a, b) => a.riskScore - b.riskScore,
      render: (score) => (
        <Progress
          percent={score}
          strokeColor={score >= 70 ? "red" : score >= 40 ? "orange" : "green"}
          size="small"
        />
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Customers"
              value={customers.length}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Average Credit Score"
              value={
                customers.length
                  ? Math.round(customers.reduce((a, c) => a + c.creditScore, 0) / customers.length)
                  : 0
              }
              precision={0}
              loading={loading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Average Risk Score"
              value={
                customers.length
                  ? Math.round(customers.reduce((a, c) => a + c.riskScore, 0) / customers.length)
                  : 0
              }
              precision={0}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: "24px" }}>
        <Col xs={24} md={12}>
          <Card title="Income vs Expenses">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={incomeExpensesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Income" stroke="#8884d8" />
                <Line type="monotone" dataKey="Expenses" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Risk Score Distribution">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Customer Data">
            <Table
              columns={columns}
              dataSource={customers}
              rowKey="customerId"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardOverview;
