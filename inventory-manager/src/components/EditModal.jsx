import React, { useState, useEffect } from 'react';

const EditModal = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    experience: '',
    contact: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name || '',
        position: item.position || '',
        experience: item.experience || '',
        contact: item.contact || ''
      });
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <h2 className="modal-title">
            {item?.id ? 'Edit Team Member' : 'Add Team Member'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Position
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Experience
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Contact
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="form-control"
                required
              />
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
                {item?.id ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
