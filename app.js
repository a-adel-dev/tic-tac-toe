const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
};

const slot = (mark) => {
  const getMark = () => mark;
  const setMark = (symbol) => (mark = symbol);
  const canModify = () => {
    if (mark === "") return true;
    else return false;
  };

  return {
    getMark,
    canModify,
    setMark,
  };
};

const game = (() => {
  let gameBoard = [];
  let win = null;
  let gameOver = false;
  const addSlotToGameBoard = (slot) => gameBoard.push(slot);
  const playerOne = Player("player One", "X");
  const playerTwo = Player("player Two", "O");
  const tie = Player("Nobody", "g");
  let currentPlayer = playerOne;
  const setCurrentPlayer = (player) => (currentPlayer = player);
  const clearGameBoard = () => (gameBoard = []);

  const createGameBoard = (winMessage) => {
    clearGameBoard();
    gameOver = false;
    win = winMessage;
    for (let i = 0; i < 9; i++) {
      const slotInstance = slot("");
      addSlotToGameBoard(slotInstance);
    }
  };

  const renderGameBoard = (gameBoardDisplay) => {
    gameBoardDisplay.innerHTML = "";
    gameBoard.forEach((slot) => {
      const slotDisplay = document.createElement("div");
      slotDisplay.className = "slot";
      slotDisplay.innerHTML = `<h1>${slot.getMark()}</h1>`;
      slotDisplay.addEventListener("mouseover", () => {
        slotDisplay.classList.add("highlight");
      });
      slotDisplay.addEventListener("mouseleave", () => {
        slotDisplay.classList.remove("highlight");
      });
      if (slot.canModify()) {
        slotDisplay.addEventListener("click", () => {
          updateGame(slot);
        });
      }
      gameBoardDisplay.append(slotDisplay);
    });
  };

  const switchActivePlayer = () => {
    if (currentPlayer === playerOne) {
      setCurrentPlayer(playerTwo);
    } else {
      setCurrentPlayer(playerOne);
    }
  };

  const deactivateGameBoard = () => {
    gameOver = true;
  };

  const updateGame = (slot) => {
    if (gameOver === true) return;
    slot.setMark(currentPlayer.getSymbol());
    renderGameBoard(gameBoardDisplay);
    if (checkWinCondition(currentPlayer) != null) {
      deactivateGameBoard(gameBoardDisplay);
      document.getElementById("player").innerHTML =
        checkWinCondition(currentPlayer).getName();
      win.classList.remove("hidden");
    } else {
      switchActivePlayer();
    }
  };

  const isGameBoardFull = () => {
    return !gameBoard.some((slot) => slot.getMark() === "");
  };

  const checkWinCondition = (player) => {
    const winningCombinations = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      const slotA = gameBoard[a];
      const slotB = gameBoard[b];
      const slotC = gameBoard[c];

      if (
        slotA.getMark() !== "" &&
        slotA.getMark() === slotB.getMark() &&
        slotB.getMark() === slotC.getMark()
      ) {
        if (slotA.getMark() === playerOne.getSymbol()) {
          return playerOne;
        } else {
          return playerTwo;
        }
      }
    }

    if (isGameBoardFull()) {
      return tie;
    }

    return null;
  };

  return {
    renderGameBoard,
    createGameBoard,
  };
})();

const gameBoardDisplay = document.getElementById("game-board");
const winMessage = document.getElementById("win-message");
const playAgainButton = document.getElementById("play-again-button");

playAgainButton.addEventListener("click", () => {
  gameBoardDisplay.innerHTML = "";
  game.createGameBoard(winMessage);
  game.renderGameBoard(gameBoardDisplay);
  winMessage.classList.add("hidden");
});

game.createGameBoard(winMessage);
game.renderGameBoard(gameBoardDisplay);
