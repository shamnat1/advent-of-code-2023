const fs = require("fs");
const readline = require("readline");

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });

  let lines = [];
  let resultObject = {};
  let cardNum = 0;
  rl.on("line", (input) => {
    lines.push(input);
    resultObject[cardNum++] = 1;
  });

  rl.on("close", () => {
    for (let i = 0; i < lines.length; i++) {
      const winningNumbers = lines[i]
        .split(":")[1]
        .split("|")[0]
        .trim()
        .split(/\s+/);
      const cardNumber = lines[i]
        .split(":")[1]
        .split("|")[1]
        .trim()
        .split(/\s+/);
      let matchTotal = 0;
      cardNumber.forEach((card) => {
        if (winningNumbers.includes(card)) {
          ++matchTotal;
        }
      });
      for (let k = 0; k < resultObject[i]; k++) {
        for (let j = i + 1; j < i + 1 + matchTotal && j < lines.length; j++) {
          resultObject[j] = resultObject[j] + 1;
        }
      }
    }
    const sumValues = Object.values(resultObject).reduce((a, b) => a + b, 0);
    console.log("total", sumValues);
  });
  await new Promise((res) => rl.once("close", res));
})();
