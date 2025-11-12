import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
//import Catalog from './pages/Catalog';
//import BookDetails from './pages/BookDetails';
//import Cart from './pages/Cart';
//import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;