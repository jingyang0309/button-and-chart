import './App.css';
import * as React from "react";
import MyButtonGroups from './components/MyButtonGroups';
import MyChart from './components/MyChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyButtonGroups/>
        <MyChart/>
      </header>
    </div>
  );
}

export default App;
