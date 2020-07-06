import { useState } from 'react';
import Link from 'next/link';

const PLAYERS = ['X', 'Y'];

export default function IndexPage() {
  const [boardSize, setBoardSize] = useState(3);
  const [firstTurn, setFirstTurn] = useState(PLAYERS[0])

  const onBoardSizeChange = (e) => {
    const newSize = e.target.value;
    if (newSize < 3) {
      alert('Board size cannot be less than 3!');
      return;
    }
    setBoardSize(e.target.value);
  }
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-5">Welcome!</h2>
      <div className="flex items-center">
        <h4 className="text-2xl font-semibold capitalize">board size:</h4>
        <input
          type="number"
          className="border border-gray-300 shadow rounded ml-3 w-20"
          value={boardSize}
          onChange={onBoardSizeChange}
        />
      </div>
      <div className="flex items-center mt-2">
        <h4 className="text-2xl font-semibold capitalize">First Turn:</h4>
        <select
          className="w-20 border border-gray-300 shadow rounded ml-3 bg-white"
          value={firstTurn}
          onChange={e => setFirstTurn(e.target.value)}
        >
          {PLAYERS.map(player => <option key={player} label={player} value={player} />)}
        </select>
      </div>
      <Link href="/play/[boardSize]" as={`/play/${boardSize}?firstTurn=${firstTurn}`}>
        <a
          className="text-white bg-blue-500 rounded py-2 px-10 mt-2"
        >
          Play!
        </a>
      </Link>
    </div>
  )
}
