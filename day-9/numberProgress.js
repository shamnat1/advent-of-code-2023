const fs = require("fs");
const readline = require("readline");
let total = 0;

function calculateNextNumber(sequence) {
  let differences = sequence
    .slice(1)
    .map((num, index) => num - sequence[index]);
  let nextDifference = sequence[sequence.length - 1];
  while (!differences.every((num) => num === 0)) {
    nextDifference += differences[differences.length - 1];
    differences = differences
      .slice(1)
      .map((num, index) => num - differences[index]);
  }
  return nextDifference;
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
