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
        let cell = Math.random();
        if (cell < 0.5) {
          row.push("wall");
        } else {
          row.push("path");
        }
      }
      matrix.push(row);
    }
    
    // Edit the matrix to have start cell on the 2nd row, first cell and end cell on penultimate row, last cell 
    matrix[1][0] = "start";
    matrix[height - 2][width - 1] = "end";

    setMaze(matrix);
  }

  return (
    <div className='maze-grid'>
      <button className='maze-button' onClick={() => generateMaze(5, 6)}>Refresh Maze</button>
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
