export const getHorizontalLines = (boardSize) => {
  const horizontalLines = [];
  for(let i = 0; i < boardSize * boardSize; i += boardSize) {
    let line = [];
    for (let j = i; j < boardSize + i; j++) {
      line.push(j)
    }
    horizontalLines.push(line);
  }

  return horizontalLines;
}

export const getVerticalLines = (boardSize) => {
  const verticalLines = [];
  for (let i = 0; i < boardSize; i ++) {
    let line = [];
    for (let j = i; j < boardSize * boardSize; j += boardSize) {
      line.push(j);
    }
    verticalLines.push(line);
  }

  return verticalLines;
}

export const getFirstDiagonal = (boardSize) => {
  const firstDiagonal = [];
  for (let i = 0; i < boardSize * boardSize; i += (boardSize + 1)) {
    firstDiagonal.push(i);
  }

  return firstDiagonal;
}

export const getSecondDiagonal = (boardSize) => {
  const secondDiagonal = [];
  for (let i = (boardSize - 1); i <= ((boardSize - 1) * boardSize); i += (boardSize - 1)) {
    secondDiagonal.push(i);
  }

  return secondDiagonal;
}
