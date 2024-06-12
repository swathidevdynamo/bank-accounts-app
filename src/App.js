import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import ThemeProvider from './components/ThemeProvider';


function App() {
  return (
    <div>
      <ThemeProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/accountdetails" element={<Accounts />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
