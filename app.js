const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
};

const game = (() => {
  let gameBoard = [];
  const addSlotToGameBoard = (slot) => gameBoard.push(slot);
  const displayGameBoard = () => {
    gameBoard.forEach((slot) => {
      console.log(slot);
    });
  };
  const playerOne = Player("playerOne", "X");
  const playerTwo = Player("playerTwo", "O");
  let currentPlayer = playerOne;
  const setCurrentPlayer = (player) => (currentPlayer = player);

  const checkGame = (slot) => {
    slot.innerHTML = `<h1>${currentPlayer.getSymbol()}</h1>`;
    if (currentPlayer === playerOne) {
      setCurrentPlayer(playerTwo);
    } else {
      setCurrentPlayer(playerOne);
    }
    console.log(currentPlayer.getName());
  };

  return {
    addSlotToGameBoard,
    displayGameBoard,
    checkGame,
  };
})();

const gameBoard = document.getElementById("game-board");

for (let i = 0; i < 9; i++) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.id = `slot${i}`;
  slot.addEventListener("mouseover", () => {
    slot.classList.add("highlight");
  });
  slot.addEventListener("mouseleave", () => {
    slot.classList.remove("highlight");
  });
  game.addSlotToGameBoard(slot);
  slot.addEventListener("click", () => {
    game.checkGame(slot);
  });
  gameBoard.appendChild(slot);
}

//console.log(game.displayGameBoard());
