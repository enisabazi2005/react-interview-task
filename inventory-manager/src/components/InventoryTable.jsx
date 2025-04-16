import React, { useState } from 'react';
import { Table } from 'antd';

const InventoryTable = ({ data, onEdit, onAddNew, onDelete }) => {
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      val?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      sorter: (a, b) => (a.position || '').localeCompare(b.position || ''),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="action-buttons">
          <button
            onClick={() => onEdit(record)}
            className="btn-edit"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this team member?')) {
                onDelete(record);
              }
            }}
            className="btn-delete"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="table-header">
        <input
          type="text"
          placeholder="Search members..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <button className="btn-create" onClick={onAddNew}>
          Add Team Member
        </button>
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        pagination={{
          total: filteredData.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} members`,
          pageSizeOptions: ['10', '20', '50', '100']
        }}
      />
    </div>
  );
};

export default InventoryTable;
  