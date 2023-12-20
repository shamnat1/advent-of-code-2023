const fs = require("fs");
const readline = require("readline");
let total = 0;

function calculateNextNumber(sequence) {
  let differences = sequence
    .slice(1)
    .map((num, index) => num - sequence[index]);
  let previousDifference = sequence[0];
  let pDifference = sequence[1];

  while (!differences.every((num) => num === 0)) {
    previousDifference = differences[0] - previousDifference;
    pDifference = differences[1] - pDifference;
    differences = differences
      .slice(1)
      .map((num, index) => num - differences[index]);
  }
  previousDifference =
    pDifference !== 0 && pDifference === sequence[0]
      ? previousDifference
      : previousDifference * -1;

  return previousDifference;
}

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    numberSequence = line
      .trim()
      .split(" ")
      .map((item) => parseInt(item.trim()));
    total += calculateNextNumber(numberSequence);
  });

  await new Promise((res) => rl.once("close", res));
})();
