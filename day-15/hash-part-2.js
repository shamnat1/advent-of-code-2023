const fs = require("fs");
const readline = require("readline");
let total = 0;
const boxList = {};
void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });
  rl.on("line", (line) => {
    const input = line.split(",");
    input.forEach((data) => {
      let dataAscci = 0;
      const addOperation = data.includes("=") ? true : false;
      const label = data.split(/[=-]/);
      label[0].split("").forEach((char) => {
        const asciiValue = char.charCodeAt(0);
        dataAscci = ((dataAscci + asciiValue) * 17) % 256;
      });
      if (addOperation) {
        boxList[dataAscci] = boxList[dataAscci] || [];
        let isExist = false;
        if (boxList[dataAscci] && boxList[dataAscci].length > 0) {
          boxList[dataAscci].forEach((boxVal) => {
            if (boxVal[0] === label[0]) {
              isExist = true;
              boxVal[1] = label[1];
            }
          });
        }
        if (!isExist) boxList[dataAscci].push(label);
      } else {
        if (boxList[dataAscci] && boxList[dataAscci].length > 0) {
          boxList[dataAscci].forEach((boxVal) => {
            if (boxVal[0] === label[0]) {
              boxList[dataAscci].splice(boxList[dataAscci].indexOf(boxVal), 1);
            }
          });
        }
      }
    });
    for (const [key, value] of Object.entries(boxList)) {
      value.forEach((val) => {
        total += (parseInt(key) + 1) * (boxList[key].indexOf(val) + 1) * val[1];
      });
      console.log("total", total);
    }
  });

  await new Promise((res) => rl.once("close", res));
})();
