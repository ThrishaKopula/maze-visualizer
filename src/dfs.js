// src/dfs.js
export function* generateMaze(rows, cols) {
    const grid = createGrid(rows, cols);
    const stack = [];
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
  
    function createGrid(rows, cols) {
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
    }
  
    function removeWall(current, next) {
      if (current.x < next.x) {
        current.walls.right = false;
        next.walls.left = false;
      } else if (current.x > next.x) {
        current.walls.left = false;
        next.walls.right = false;
      } else if (current.y < next.y) {
        current.walls.bottom = false;
        next.walls.top = false;
      } else if (current.y > next.y) {
        current.walls.top = false;
        next.walls.bottom = false;
      }
    }
  
    function getNeighbors(cell) {
      const neighbors = [];
      for (const direction of directions) {
        const nx = cell.x + direction.x;
        const ny = cell.y + direction.y;
        if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
          const neighbor = grid[ny][nx];
          if (!neighbor.visited) {
            neighbors.push(neighbor);
          }
        }
      }
      return neighbors;
    }
  
    const start = grid[0][0];
    start.visited = true;
    stack.push(start);
  
    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = getNeighbors(current);
  
      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        next.visited = true;
        removeWall(current, next);
        stack.push(next);
        yield grid; // Yield the current state of the grid
      } else {
        stack.pop();
        yield grid; // Yield the current state of the grid
      }
    }
  
    return grid;
  }
  