import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";
import App from './App';


// Wrapper component to provide context
function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
 
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };
 
  return (
    <ThemeContext.Provider value={currentTheme}>

    <button 
          onClick={toggleTheme} 
          style={{ backgroundColor: currentTheme.background, color: currentTheme.foreground }}
        >
          Toggle Theme
        </button>
        <App/>
    </ThemeContext.Provider>
  );
 }

 export default ToggleTheme;
 




