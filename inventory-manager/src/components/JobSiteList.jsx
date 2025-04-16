import React from 'react';
import { Table } from 'antd';

const JobSiteList = ({ sites, onSelect }) => {
  const columns = [
    {
      title: 'Job Site Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <span className={`status-badge ${
          record.status === "Active" ? "status-yellow" : "status-green"
        }`}>
          {record.status}
        </span>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    }
  ];

  return (
    <div className="table-container">
      <Table
        dataSource={sites}
        columns={columns}
        rowKey="id"
        pagination={{
          total: sites.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} job sites`,
          pageSizeOptions: ['10', '20', '50', '100']
        }}
        onRow={(record) => ({
          onClick: () => onSelect(record.id),
          style: { cursor: 'pointer' }
        })}
      />
      {sites.length === 0 && (
        <div className="empty-state">
          <img src="/empty-box.png" alt="No items" />
          <p>No job sites found</p>
        </div>
      )}
    </div>
  );
};

export default JobSiteList;