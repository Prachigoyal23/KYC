import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashboardOverview from "./components/DashboardOverview.jsx";
import RiskAssessment from "./components/RiskAssessment.jsx";
import WorkflowAutomation from "./components/WorkflowAutomation.jsx";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["overview"]}>
            <Menu.Item key="overview">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="risk">
              <Link to="/risk">Risk Assessment</Link>
            </Menu.Item>
            <Menu.Item key="workflow">
              <Link to="/workflow">Workflow</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/risk" element={<RiskAssessment />} />
            <Route path="/workflow" element={<WorkflowAutomation />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Credit Risk Dashboard ©2025 Created by Candidate
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
