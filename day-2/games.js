const fs = require("fs");
const readline = require("readline");
let total = 0;

const blueCount = 14;
const redCount = 12;
const greenCount = 13;

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });

  rl.on("line", (input) => {
    const gameNum = input.split(":")[0].split(" ")[1];
    const gameData = input.split(":")[1].split(";");
    let gameFlag = true;
    gameData.forEach((data) => {
      const temp = data.trim().split(",");
      temp.forEach((colourObject) => {
        colourObject = colourObject.trim().split(" ");
        if (
          (colourObject[1] === "blue" && colourObject[0] > blueCount) ||
          (colourObject[1] === "red" && colourObject[0] > redCount) ||
          (colourObject[1] === "green" && colourObject[0] > greenCount)
        ) {
          gameFlag = false;
        }
      });
    });
    if (gameFlag) {
      total += parseInt(gameNum);
    }
  });

  await new Promise((res) => rl.once("close", res));
})();
