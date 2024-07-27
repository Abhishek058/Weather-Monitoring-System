import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Monitoring System</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;