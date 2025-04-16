import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InventoryTable from "../components/InventoryTable";
import EditModal from "../components/EditModal";
import { getJobSites, saveJobSites } from "../utils/localStorage";

const CategorySidebar = ({ categories = [], selectedCategory, onSelectCategory }) => (
  <div className="category-list">
    {categories.map((category) => (
      <button
        key={category.name}
        className={`category-item ${selectedCategory === category.name ? 'category-item-active' : ''}`}
        onClick={() => onSelectCategory(category.name)}
      >
        {category.name}
      </button>
    ))}
  </div>
);

const InventoryDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [currentSite, setCurrentSite] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const loadedSites = getJobSites();
    setSites(loadedSites);
    const site = loadedSites.find(s => s.id.toString() === id);
    setCurrentSite(site);
    setSelectedCategory(site?.categories?.[0]?.name || null);
  }, [id]);

  const handleUpdateItem = (updatedItem) => {
    if (!selectedCategory) return;

    const updatedSites = [...sites];
    const siteIndex = updatedSites.findIndex(s => s.id.toString() === id);
    const siteToUpdate = { ...updatedSites[siteIndex] };
    const categoryIndex = siteToUpdate.categories.findIndex(
      cat => cat.name === selectedCategory
    );

    if (categoryIndex !== -1) {
      const category = { ...siteToUpdate.categories[categoryIndex] };
      const items = [...category.items];
      
      if (updatedItem.id) {
        const itemIndex = items.findIndex(item => item.id === updatedItem.id);
        if (itemIndex !== -1) {
          items[itemIndex] = updatedItem;
        }
      } else {
        items.push({
          ...updatedItem,
          id: Date.now()
        });
      }
      
      category.items = items;
      siteToUpdate.categories[categoryIndex] = category;
      updatedSites[siteIndex] = siteToUpdate;
      
      setSites(updatedSites);
      setCurrentSite(siteToUpdate);
      saveJobSites(updatedSites);
    }

    setSelectedItem(null);
    setIsCreating(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleAddNew = () => {
    if (!selectedCategory) {
      alert("Please select a category first");
      return;
    }
    setIsCreating(true);
    setSelectedItem({
      name: '',
      position: '',
      experience: '',
      contact: ''
    });
  };

  const handleDelete = (itemToDelete) => {
    if (!selectedCategory) return;

    const updatedSites = [...sites];
    const siteIndex = updatedSites.findIndex(s => s.id.toString() === id);
    const siteToUpdate = { ...updatedSites[siteIndex] };
    const categoryIndex = siteToUpdate.categories.findIndex(
      cat => cat.name === selectedCategory
    );

    if (categoryIndex !== -1) {
      const category = { ...siteToUpdate.categories[categoryIndex] };
      category.items = category.items.filter(item => item.id !== itemToDelete.id);
      siteToUpdate.categories[categoryIndex] = category;
      updatedSites[siteIndex] = siteToUpdate;
      
      setSites(updatedSites);
      setCurrentSite(siteToUpdate);
      saveJobSites(updatedSites);
    }
  };

  const currentCategory = currentSite?.categories?.find(
    cat => cat.name === selectedCategory
  );

  return (
    <div className="inventory-layout">
      <div className="inventory-header">
        <h1 className="inventory-title">{currentSite?.name}</h1>
      </div>

      <div className="inventory-content">
        <div className="inventory-sidebar">
          <CategorySidebar
            categories={currentSite?.categories || []}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="inventory-main">
          {selectedCategory ? (
            <div className="inventory-table-container">
              <h2 className="inventory-category-title">{selectedCategory}</h2>
              <InventoryTable
                data={currentCategory?.items || []}
                onEdit={handleEdit}
                onAddNew={handleAddNew}
                onDelete={handleDelete}
              />
            </div>
          ) : (
            <div className="empty-state">
              <img src="/empty-box.png" alt="Select category" />
              <p>Please select a category from the left to view team members</p>
            </div>
          )}
        </div>
      </div>

      <button 
        className="inventory-back-button"
        onClick={() => navigate(-1)}
      >
        ← Go Back
      </button>

      {(selectedItem || isCreating) && (
        <EditModal
          item={selectedItem}
          onClose={() => {
            setSelectedItem(null);
            setIsCreating(false);
          }}
          onSave={handleUpdateItem}
        />
      )}
    </div>
  );
};

export default InventoryDashboard;