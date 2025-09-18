import React, { useEffect, useState } from "react";
import { Table, Select, Button, Tag, message, Form } from "antd";
import axios from "axios";
import BASE_URL from "./Constant"

const { Option } = Select;

const WorkflowAutomation = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatusMap, setSelectedStatusMap] = useState({});
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    axios.get(BASE_URL+"/customers").then((res) => {
      setCustomers(res.data);
      setLoading(false);
    });
  }, []);

  // Save selected status changes temporarily here (before submitting)
  const handleStatusChange = (customerId, status) => {
    setSelectedStatusMap((prev) => ({ ...prev, [customerId]: status }));
  };

  const handleSubmit = (customerId) => {
    const status = selectedStatusMap[customerId];
    if (!status) {
      message.error("Please select a status before submitting");
      return;
    }
    setUpdatingId(customerId);
    axios
      .put(BASE_URL+`/customer/${customerId}/status`, { status })
      .then(() => {
        setCustomers((prev) =>
          prev.map((c) =>
            c.customerId === customerId ? { ...c, status } : c
          )
        );
        message.success("Status updated");

        // Optional alert for high risk:
        const updatedCustomer = customers.find((c) => c.customerId === customerId);
        if (updatedCustomer && updatedCustomer.riskScore > 70) {
          axios.post(BASE_URL+"/alerts", {
            customerId,
            status,
            message: "High risk customer status updated",
          });
        }
        setUpdatingId(null);
        // Clear temporary selection after submit
        setSelectedStatusMap((prev) => {
          const copy = { ...prev };
          delete copy[customerId];
          return copy;
        });
      })
      .catch(() => {
        message.error("Failed to update status");
        setUpdatingId(null);
      });
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Current Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "Approved") color = "green";
        else if (status === "Rejected") color = "red";
        else if (status === "Review") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Update Status",
      key: "update",
      render: (_, record) => (
        <>
          <Select
            placeholder="Select status"
            value={selectedStatusMap[record.customerId] || record.status}
            onChange={(val) => handleStatusChange(record.customerId, val)}
            style={{ width: 150, marginRight: 8 }}
          >
            <Option value="Review">Review</Option>
            <Option value="Approved">Approved</Option>
            <Option value="Rejected">Rejected</Option>
          </Select>
          <Button
            type="primary"
            onClick={() => handleSubmit(record.customerId)}
            loading={updatingId === record.customerId}
          >
            Submit
          </Button>
        </>
      ),
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

export default WorkflowAutomation;

