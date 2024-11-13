import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProductPage from './pages/Produits';

import GestionProduitsPage from './pages/GestionProduits'
import HyperPoints from './pages/HyperPoints'
import OptionPage from './pages/Options'

import Sidebar from './scenes/Sidebar';
import { useState } from 'react';
import './app.css';

function App() {
  // Control sidebar state here in App.js
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="Application">
      <Router>
        <div className="sidebar">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        <div className={`content ${sidebarOpen ? 'content-expanded' : 'content-collapsed'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Produits" element={<ProductPage />} />
            <Route path="/AddProduits" element={<GestionProduitsPage />} />
            <Route path="/AddHyperPointProduits" element={<HyperPoints />} />
            <Route path="/Options" element={<OptionPage />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;