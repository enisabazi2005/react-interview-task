import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import InventoryDashboard from "./pages/InventoryDashboard";

function App() { 
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory/:id" element={<InventoryDashboard />} />
      </Routes>
    </Router>
  )
}

export default App;