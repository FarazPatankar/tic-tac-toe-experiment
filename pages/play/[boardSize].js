import { useState, useEffect } from 'react';
import { chunk, uniq, compact } from 'lodash';
import Link from 'next/link';

const Square = ({ value, index, onClick }) => {
  return (
    <button
      onClick={() => onClick(index)}
      className={`border border-black h-16 w-16 text-lg font-semibold ${value === 'X' ? 'text-red-500' : 'text-blue-500'}`}
    >
      {value}
    </button>
  );
}

export default function BoardSizePage({ boardSize, firstTurn }) {
  const [currentTurn, setCurrentTurn] = useState(firstTurn);
  const [isComplete, setIsComplete] = useState(false);
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(Array(boardSize * boardSize).fill(null));

  useEffect(() => {
    if (compact(squares).length === 0) return;
    const lines = [
      ...chunk(squares, boardSize)
    ];
    // const horizontalLines = [];
    // for(let i = 0; i < boardSize * boardSize; i += boardSize) {
    //   let line = [];
    //   for (let j = i; j < boardSize + i; j++) {
    //     line.push(j)
    //   }
    //   horizontalLines.push(line);
    // }

    for (let i = 0; i < boardSize; i ++) {
      let line = [];
      for (let j = i; j < boardSize * boardSize; j += boardSize) {
        line.push(squares[j]);
      }
      lines.push(line);
    }

    const firstDiagonal = [];
    for (let i = 0; i < boardSize * boardSize; i += (boardSize + 1)) {
      firstDiagonal.push(squares[i]);
    }
    lines.push(firstDiagonal);

    const secondDiagonal = [];
    for (let i = (boardSize - 1); i <= ((boardSize - 1) * boardSize); i += (boardSize - 1)) {
      secondDiagonal.push(squares[i]);
    }
    lines.push(secondDiagonal);

    lines.forEach(line => {
      if (compact(line).length === boardSize) {
        if (uniq(line).length === 1) {
          setWinner(currentTurn);
          setIsComplete(true);
          return;
        }
      }
    });

    if (compact(squares).length === boardSize * boardSize) {
      setIsComplete(true);
    }
    setCurrentTurn(currentTurn === 'X' ? 'Y' : 'X');
  }, [squares])

  useEffect(() => {
    if (winner) alert(`${winner} is the winner!`);
    if (isComplete && !winner) alert(`It's a draw!`);
  }, [winner, isComplete])

  const onSquareClick = (index) => {
    if (squares[index] !== null) {
      alert('You cannot click on an already filled square!');
      return;
    }

    if (isComplete) {
      alert(`This game is over and ${winner} has won. Click the restart button if you want to play again!`)
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[index] = currentTurn;
    setSquares(updatedSquares);
  }

  const onPlayAgain = () => {
    setSquares(Array(boardSize * boardSize).fill(null));
    setWinner(null);
    setCurrentTurn(firstTurn);
    setIsComplete(false);
  }

  const boardSquares = [];
  for (let i = 0; i < boardSize; i++) {
    const rowSquares = [];
    for (let j = 0; j < boardSize; j++) {
      rowSquares.push(<Square key={j} value={squares[(i * boardSize) + j]} index={(i * boardSize) + j} onClick={onSquareClick} />)
    }
    boardSquares.push(<div className="flex" key={i}>{rowSquares}</div>)
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {isComplete ? (
        <div className="flex flex-col items-center mb-5">
          {winner ? (
            <h1 className="mr-5 text-lg font-semibold">{winner} has won the game! 🥳</h1>
            ) : (
            <h1 className="mr-5 text-lg font-semibold">It's a draw! 😱</h1>
          )}
          <button
            className="bg-blue-500 text-white py-2 px-10 rounded mt-2"
            onClick={onPlayAgain}
          >
            Play Again!
          </button>
          <Link href="/">
            <a className="text-white bg-red-500 rounded py-2 px-10 mt-2">
              Go Back Home
            </a>
          </Link>
        </div>
      ) : (
        <h1 className="mb-5 text-lg font-semibold">Turn: {currentTurn}</h1>
      )}
      {boardSquares}
    </div>
  )
};

export async function getServerSideProps({ params, query }) {
  const { boardSize, firstTurn } = query;
  return { props: { boardSize: Number(boardSize), firstTurn } };
}