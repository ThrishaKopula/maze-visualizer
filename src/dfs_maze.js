// src/components/dfs_maze.js
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { generateMaze } from './dfs';
import Dropdown from './dropdown.tsx';

const DfsMaze = ({ rows, cols, cellSize }) => {
  const [maze, setMaze] = useState([]);
  const generatorRef = useRef(null);

  useEffect(() => {
    const mazeData = createInitialGrid(rows, cols);
    setMaze(mazeData);
    drawMaze(mazeData);
  }, [rows, cols]);

  const createInitialGrid = (rows, cols) => {
    const grid = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          x: c,
          y: r,
          visited: false,
          walls: { top: true, right: true, bottom: true, left: true },
        });
      }
      grid.push(row);
    }
    return grid;
  };

  const drawMaze = (mazeData) => {
    const width = cols * cellSize;
    const height = rows * cellSize;

    const svg = d3.select('#maze')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    mazeData.forEach(row => {
      row.forEach(cell => {
        const x = cell.x * cellSize;
        const y = cell.y * cellSize;

        if (cell.walls.top) {
          svg.append('line')
            .attr('x1', x)
            .attr('y1', y)
            .attr('x2', x + cellSize)
            .attr('y2', y)
            .attr('stroke', 'white');
        }
        if (cell.walls.right) {
          svg.append('line')
            .attr('x1', x + cellSize)
            .attr('y1', y)
            .attr('x2', x + cellSize)
            .attr('y2', y + cellSize)
            .attr('stroke', 'white');
        }
        if (cell.walls.bottom) {
          svg.append('line')
            .attr('x1', x)
            .attr('y1', y + cellSize)
            .attr('x2', x + cellSize)
            .attr('y2', y + cellSize)
            .attr('stroke', 'white');
        }
        if (cell.walls.left) {
          svg.append('line')
            .attr('x1', x)
            .attr('y1', y)
            .attr('x2', x)
            .attr('y2', y + cellSize)
            .attr('stroke', 'white');
        }
      });
    });
  };

  const startGeneration = () => {
    generatorRef.current = generateMaze(rows, cols);
    generateNextStep();
  };

  const generateNextStep = () => {
    const { value, done } = generatorRef.current.next();
    if (!done) {
      setMaze(value);
      drawMaze(value);
      setTimeout(generateNextStep, 100); // Adjust the delay to control the speed of the visualization
    }
  };

  return (
    <div class="container">
      <h1>DFS (depth-first search)</h1>
      {/* <Dropdown /> */}
      <svg id="maze"></svg>
      <button 
          onClick={startGeneration}
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              start generation
          </span>
      </button>
    </div>
  );
};

export default DfsMaze;
