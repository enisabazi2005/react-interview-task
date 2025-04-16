export const getJobSites = () => {
    const data = localStorage.getItem("jobSites");
    return data ? JSON.parse(data) : [];
  };
  
  export const saveJobSites = (sites) => {
    localStorage.setItem("jobSites", JSON.stringify(sites));
  };
  