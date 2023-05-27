const gameBoard = document.getElementById("game-board");

console.log(gameBoard);

for (let i = 0; i < 9; i++) {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.id = `slot${i}`;
  gameBoard.appendChild(slot);
}
