import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import JobSiteList from "../components/JobSiteList";
import { getJobSites, saveJobSites } from "../utils/localStorage";

const Home = () => {
  const [jobSites, setJobSites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setJobSites(getJobSites());
  }, []);

  const filteredJobSites = jobSites.filter((site) =>
    site.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleCreateSite = (newSite) => {
    const categories = [{
      name: newSite.categoryIncluded,
      items: []
    }];

    const siteWithCategories = {
      ...newSite,
      categories
    };

    const updatedSites = [...jobSites, siteWithCategories];
    setJobSites(updatedSites);
    saveJobSites(updatedSites);
  };

  const handleSelectSite = (siteId) => {
    navigate(`/inventory/${siteId}`);
  };

  const activeCount = jobSites.filter(site => site.status === "Active").length;
  const inactiveCount = jobSites.filter(site => site.status === "Inactive").length;

  return (
    <div className="container">
      <div className="status-header">
        <div className="status-card status-yellow">
          <span>{activeCount} Active</span>
        </div>
        <div className="status-card status-green">
          <span>{inactiveCount} Inactive</span>
        </div>
        <div className="status-card status-red">
          <span>0 Pending</span>
        </div>
      </div>

      <SearchBar 
        value={searchValue} 
        onChange={handleSearchChange}
        onCreateSite={handleCreateSite}
      />
      
      <JobSiteList 
        sites={filteredJobSites}
        onSelect={handleSelectSite}
      />
    </div>
  );
};

export default Home;
