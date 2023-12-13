const fs = require("fs");
const readline = require("readline");
let total = 0;

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });

  rl.on("line", (input) => {
    const gameData = input.split(":")[1].split(";");
    let blueCount = 0;
    let redCount = 0;
    let greenCount = 0;
    gameData.forEach((data) => {
      const temp = data.trim().split(",");
      temp.forEach((colourObject) => {
        colourObject = colourObject.trim().split(" ");
        if (colourObject[1] === "blue" && colourObject[0] > blueCount) {
          blueCount = parseInt(colourObject[0]);
        }
        if (colourObject[1] === "red" && colourObject[0] > redCount) {
          redCount = parseInt(colourObject[0]);
        }
        if (colourObject[1] === "green" && colourObject[0] > greenCount) {
          greenCount = parseInt(colourObject[0]);
        }
      });
    });
    total += blueCount * redCount * greenCount;
  });

  await new Promise((res) => rl.once("close", res));
})();
