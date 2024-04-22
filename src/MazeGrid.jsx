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

    // An array with possible directions that the maze generation algorithm can carve a path through the maze
    const dirs = [
      [0 /* X Axis */, 1 /* Y Axis */], 
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

    setMaze(matrix);
  }

  return (
    <div className='maze-grid'>
      <button className='maze-button' onClick={() => generateMaze(10, 10)}>Refresh Maze</button>
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
