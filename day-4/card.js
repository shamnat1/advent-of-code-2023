const fs = require("fs");
const readline = require("readline");
let total = 0;

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });

  rl.on("line", (input) => {
    const winningNumbers = input
      .split(":")[1]
      .split("|")[0]
      .trim()
      .split(/\s+/);
    const cardNumber = input.split(":")[1].split("|")[1].trim().split(/\s+/);
    let matchTotal = 0;
    cardNumber.forEach((card) => {
      if (winningNumbers.includes(card)) {
        matchTotal = matchTotal * 2 || 1;
      }
    });
    total += matchTotal;
    console.log("total", total);
  });
  await new Promise((res) => rl.once("close", res));
})();
