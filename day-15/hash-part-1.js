const fs = require("fs");
const readline = require("readline");
let total = 0;

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });
  let currentValue = 0;
  rl.on("line", (line) => {
    const input = line.split(",");
    input.forEach((data) => {
      let dataAscci = 0;
      data.split("").forEach((char) => {
        const asciiValue = char.charCodeAt(0);
        dataAscci = ((dataAscci + asciiValue) * 17) % 256;
      });
      currentValue += dataAscci;
    });
    console.log("currentValue", currentValue);
  });

  await new Promise((res) => rl.once("close", res));
})();
