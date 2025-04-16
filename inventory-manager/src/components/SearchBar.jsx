import React, { useState } from 'react';
import EditModal from './EditModal';

const PREDEFINED_CATEGORIES = [
  "Senior Engineer",
  "Mid-Level Engineer",
  "Junior Engineer",
  "Project Manager",
  "Site Supervisor",
  "Quality Control"
];

const CreateModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
    categoryIncluded: PREDEFINED_CATEGORIES[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: Date.now(),
      ...formData,
      categories: [
        {
          name: formData.categoryIncluded,
          items: []
        }
      ]
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <h2 className="modal-title">Create New Job Site</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="form-control"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={formData.categoryIncluded}
                onChange={(e) => setFormData({ ...formData, categoryIncluded: e.target.value })}
                className="form-control"
              >
                {PREDEFINED_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-delete"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-create"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ value, onChange, onCreateSite }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search job sites..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
        />
        <button 
          className="btn btn-create" 
          onClick={() => setIsModalOpen(true)}
        >
          + Create New
        </button>
      </div>
      {isModalOpen && (
        <CreateModal
          onClose={() => setIsModalOpen(false)}
          onSave={onCreateSite}
        />
      )}
    </>
  );
};

export default SearchBar;
