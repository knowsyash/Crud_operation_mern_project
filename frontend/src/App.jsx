import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import Create from './components/Create'
import Read from './components/Read'
import Update from './components/Update'
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <BrowserRouter>    
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>  
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode}/>}/>
        <Route path="/create" element={<Create darkMode={darkMode}/>}/>
        <Route path="/all" element={<Read darkMode={darkMode}/>}/>
        <Route path="/:id" element={<Update darkMode={darkMode}/>}/>
      </Routes>
      </BrowserRouter>
    </div>

    </>
  );
}

export default App;
