import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import './App.css';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          
          <div className="splash-logo">
            🍳
          </div>

          <h1>PERSONAL RECIPE BOOK</h1>

          <p>Your recipes. Your story.</p>

          <div className="splash-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>
      </div>
    );
  }

  return <Home />;
}