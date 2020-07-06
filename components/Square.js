const Square = ({ value, index, onClick, winningIndices }) => {
  let squareClasses = ['border', 'border-black', 'h-16', 'w-16', 'text-lg', 'font-semibold'];
  squareClasses.push(value === 'X' ? 'text-red-500' : 'text-blue-500');
  if (winningIndices && winningIndices.includes(index)) {
    squareClasses.push('bg-green-500');
  }

  return (
    <button
      onClick={() => onClick(index)}
      className={squareClasses.join(' ')}
    >
      {value}
    </button>
  );
}

export default Square;
