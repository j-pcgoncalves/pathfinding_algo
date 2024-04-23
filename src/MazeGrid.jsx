import { useState } from 'react';

import './App.css'

export default function MazeGrid() {

  // An initial 2d array that has grid info
  let initialMaze = [
    ["wall", "wall", "wall", "wall"],
    ["start", "path", "path", "wall"],
    ["wall", "wall", "path", "wall"],
    ["wall", "wall", "path", "end"],
    ["wall", "wall", "wall", "wall"],
  ];
  
  const [maze, setMaze] = useState(initialMaze);

  // Get the width and height from the maze using state
  const [width, setWidth] = useState(initialMaze[0].length);
  const [height, setHeight] = useState(initialMaze.length);

  // Function that runs the BFS Algorithm
  function bfs(startNode) {
    // Create a queue array that keeps track of the nodes that need to be processed next
    let queue = [startNode];

    // Create a visited array to keep track of nodes already processed
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    // Function that processes nodes
    function visitCell([x, y]) {
      console.log(x, y);
      // Check if end cell was found and return true, or false otherwise
      if (maze[y][x] === "end") {
        console.log("Path Found!");
        return true;
      }

      return false;
    }

    // Function that is called everytime the algorithm moves to another cell to process
    function step() {
      if (queue.length === 0) {
        return;
      }

      const [x, y] = queue.shift();

      console.log("New Step!");

      // An array with possible directions that the maze generation algorithm can carve a path through the maze
      const dirs = [
        [0 /* X Axis */, 1 /* Y Axis */], 
        [1, 0], 
        [0, -1], 
        [-1, 0]
      ];

      for (const [dx, dy] of dirs) {
        // Coordinates of the cell next to current cell
        let nx = x + dx;
        let ny = y + dy;

        // Check if next cell is valid and not yet visited
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);

          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) {
              return true;
            }
            queue.push([nx, ny]);
          }
        }
      }

      step();
    }

    step();
    return false;
  }

  // Function that runs the DFS Algorithm
  function dfs(startNode) {
    // Create a stack array that keeps track of the nodes that need to be processed next
    let stack = [startNode];

    // Create a visited array to keep track of nodes already processed
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    // Function that processes nodes
    function visitCell([x, y]) {
      console.log(x, y);
      // Check if end cell was found and return true, or false otherwise
      if (maze[y][x] === "end") {
        console.log("Path Found!");
        return true;
      }

      return false;
    }

    // Function that is called everytime the algorithm moves to another cell to process
    function step() {
      if (stack.length === 0) {
        return;
      }

      const [x, y] = stack.pop();

      console.log("New Step!");

      // An array with possible directions that the maze generation algorithm can carve a path through the maze
      const dirs = [
        [0 /* X Axis */, 1 /* Y Axis */], 
        [1, 0], 
        [0, -1], 
        [-1, 0]
      ];

      for (const [dx, dy] of dirs) {
        // Coordinates of the cell next to current cell
        let nx = x + dx;
        let ny = y + dy;

        // Check if next cell is valid and not yet visited
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);

          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) {
              return true;
            }
            stack.push([nx, ny]);
          }
        }
      }
      step();
    }

    step();
    return false;
  }

  // Function that automatically generates a maze
  function generateMaze(height, width) {
    let matrix = [];

    // Create a for loop that generates a row depending on the specified height (nº of rows)
    for (let i = 0; i < height; i++) {
      let row = [];

      // Create a for loop that generates a cell depending on the specified width (nº of cells)
      for (let j = 0; j < width; j++) {
        row.push("wall");
      }
      matrix.push(row);
    }

    const dirs = [
      [0, 1], 
      [1, 0], 
      [0, -1], 
      [-1, 0]
    ];

    // Function that checks if the cell where the maze algorithm is going is within bounds and not next to another path cell
    function isCellValid(x, y) {
      return y >= 0 && x >= 0 && x < width && y < height && matrix[y][x] === "wall";
    }

    // Function that implements the maze generation algorithm
    function carvePath(x, y) {
      matrix[y][x] = "path";

      // Sort the dirs array randomly and store it in new array
      const directions = dirs.sort(() => Math.random() - 0.5);

      for (let [dx, dy] of directions) {
        // Coordinates of the cell next to the cell where path is moving
        const nx = x + dx * 2;
        const ny = y + dy * 2;

        if (isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = "path";
          carvePath(nx, ny);
        }
      }
    }

    carvePath(1, 1);

    // Edit the matrix to have start cell on the 2nd row, first cell and end cell on penultimate row, last cell 
    matrix[1][0] = "start";
    matrix[height - 2][width - 1] = "end";

    setHeight(matrix.length);
    setWidth(matrix[0].length);
    setMaze(matrix);
  }

  return (
    <div className='maze-grid'>
      <div className='controls'>
        <button className='maze-button' onClick={() => generateMaze(10, 10)}>Refresh Maze</button>
        <button className='maze-button' onClick={() => bfs([1, 0])}>Breadth-First Search</button>
        <button className='maze-button' onClick={() => dfs([1, 0])}>Depth-First Search</button>
      </div>
      <div className='maze'>
        {/* Displaying the maze grid with the map method to through each row and cell of the array */}
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
