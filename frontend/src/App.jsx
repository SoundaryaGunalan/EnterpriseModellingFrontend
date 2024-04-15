import React, { useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from './components/Header';
import Homepage from './components/Homepage';


function App() {
  
  const [selectedComponent, setSelectedComponent] = useState('products');

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="App">
      <Router>
        <Header handleComponentChange={handleComponentChange} />
        <Routes>
          <Route path="/" element={<Homepage selectedComponent={selectedComponent} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
