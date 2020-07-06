import { useState, useEffect } from 'react';
import { uniq, compact } from 'lodash';
import Link from 'next/link';

import {
  getHorizontalLines, getVerticalLines, getFirstDiagonal, getSecondDiagonal
} from '@/utils/lines';

import Square from '@/components/Square';

export default function BoardSizePage({ boardSize, firstTurn, lines }) {
  const [currentTurn, setCurrentTurn] = useState(firstTurn);
  const [isComplete, setIsComplete] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningIndices, setWinningIndices] = useState(null);
  const [squares, setSquares] = useState(Array(boardSize * boardSize).fill(null));

  useEffect(() => {
    if (compact(squares).length === 0) return;

    lines.forEach(line => {
      const values = [];
      for (let i = 0; i < line.length; i++) {
        const elementIndex = line[i];
        const elementValue = squares[elementIndex];
        values.push(elementValue);
      }

      // Check if all items are non-null
      if (compact(values).length === boardSize) {
        // Check if all items are the same
        if (uniq(values).length === 1) {
          setWinner(currentTurn);
          setWinningIndices(line);
          setIsComplete(true);
          return;
        }
      }
    })

    if (compact(squares).length === boardSize * boardSize) {
      setIsComplete(true);
    }
    setCurrentTurn(currentTurn === 'X' ? 'Y' : 'X');
  }, [squares, lines])

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
    setWinningIndices(null);
    setCurrentTurn(firstTurn);
    setIsComplete(false);
  }

  const boardSquares = [];
  for (let i = 0; i < boardSize; i++) {
    const rowSquares = [];
    for (let j = 0; j < boardSize; j++) {
      rowSquares.push(
        <Square
          key={j}
          value={squares[(i * boardSize) + j]}
          index={(i * boardSize) + j}
          onClick={onSquareClick}
          winningIndices={winningIndices}
        />
      )
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
  const parsedBoardSize = Number(boardSize);

  const lines = [
    ...getHorizontalLines(parsedBoardSize),
    ...getVerticalLines(parsedBoardSize),
    getFirstDiagonal(parsedBoardSize),
    getSecondDiagonal(parsedBoardSize),
  ];

  return {
    props: {
      boardSize: parsedBoardSize,
      firstTurn,
      lines
    }
  };
}