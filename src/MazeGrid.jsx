import './App.css'

export default function MazeGrid() {
  let maze = [
    ["wall", "wall", "wall", "wall"],
    ["start", "path", "path", "wall"],
    ["wall", "wall", "path", "wall"],
    ["wall", "wall", "path", "end"],
    ["wall", "wall", "wall", "wall"],
  ];

  return (
    <div>
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`cell ${cell}`}></div>
          ))}
        </div>
      ))}
    </div>
  )
}
