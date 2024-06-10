// src/App.js
import React from 'react';
import './App.css';
import DfsMaze from './dfs_maze.js';
import Dropdown from './dropdown.js';
function App() {
  const rows = 20;
  const cols = 20;
  const cellSize = 20;

  return (
    <div className="App">
      <header className="App-header">
        <h1 class="absolute top-0 left-0 m-4 text-4xl font-bold underline">Maze Visualizer</h1>
        <div class="containerCard">
          <div class="card">
            <DfsMaze rows={rows} cols={cols} cellSize={cellSize} />
          </div>
          <Dropdown></Dropdown>
          {/* <div class="card">
            <DfsMaze rows={rows} cols={cols} cellSize={cellSize} />
          </div> */}
        </div>
      </header>
    </div>
  );
}

export default App;