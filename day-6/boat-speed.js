const fs = require("fs");
const readline = require("readline");
let total = 1;

function countCombinations(targetSum, targetProduct) {
  let count = 0;
  for (let i = 1; i <= targetSum; i++) {
    let j = targetSum - i;
    if (i * j > targetProduct) {
      count++;
    }
  }
  return count;
}

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });

  let timeList = [];
  let distanceList = [];
  rl.on("line", (line) => {
    const input = line.trim().split(":");
    if (input[0] === "Time") {
      timeList = input[1].trim().split(/\s+/);
    }
    if (input[0] === "Distance") {
      distanceList = input[1].trim().split(/\s+/);
    }
  });
  rl.on("close", () => {
    timeList.forEach((time, index) => {
      total *= countCombinations(parseInt(time), parseInt(distanceList[index]));
    });
    console.log("total", total);
  });
  await new Promise((res) => rl.once("close", res));
})();
