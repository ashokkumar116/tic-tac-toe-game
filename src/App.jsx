import { useEffect, useState } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const result = calculateWinner(board);
  const winner = result?.winner;
  const winningLine = result?.line || [];

  const clickSound = new Audio("/sounds/click.wav");
  const winSound = new Audio("/sounds/win.wav");
  const drawSound = new Audio("/sounds/draw.wav");

  useEffect(() => {
    if (winner) {
      setShowPopup(true);
      winSound.play();
    } else if (board.every(Boolean)) {
      setShowPopup(true);
      drawSound.play();
    }
  }, [winner, board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    clickSound.play();
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 text-center p-4 relative font-sans">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6 animate-bounce">
        🎮 Tic Tac Toe
      </h1>

 
      <div className="grid grid-cols-3 gap-3 w-72 sm:w-80">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-4 flex items-center justify-center 
              text-3xl sm:text-4xl font-extrabold cursor-pointer select-none
              transform transition-transform duration-300 active:scale-90
              ${winningLine.includes(index)
                ? "bg-green-400 text-white animate-pulse ring ring-green-600 ring-offset-2"
                : "bg-white hover:bg-yellow-200"}
              border-pink-400 shadow-md`}
          >
            {cell}
          </div>
        ))}
      </div>

      <div className="mt-6 text-2xl font-semibold text-gray-700">
        {winner
          ? `🏆 Winner: ${winner}`
          : board.every(Boolean)
          ? "🤝 It's a Draw!"
          : `🔄 Turn: ${isXTurn ? "X" : "O"}`}
      </div>


      <button
        onClick={resetGame}
        className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 shadow-lg transition"
      >
        Restart Game
      </button>

      <div className="credit mt-7">
        <p className="text-pink-600">Designed and Developed By <span className="font-bold">ASHOK KUMAR P</span></p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl text-center shadow-2xl animate-fade-in-down scale-105">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">
              {winner ? `🎉 Winner: ${winner}` : "🤝 It's a Draw!"}
            </h2>
            <button
              onClick={resetGame}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 shadow"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }

  return null;
}

export default App;
