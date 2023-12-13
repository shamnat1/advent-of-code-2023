const fs = require("fs");
const readline = require("readline");

const changeStringToDigit = (string) => {
  let stringToDigits = {
    one: "o1e",
    two: "t2",
    three: "t3e",
    four: "f4",
    five: "5e",
    six: "6",
    seven: "7n",
    eight: "e8t",
    nine: "9e",
    zero: 0,
  };

  Object.keys(stringToDigits).forEach((key) => {
    if (string.includes(key)) {
      var regex = new RegExp(`${key}`, "g");
      string = string.replace(regex, stringToDigits[key]);
    }
  });
  return string;
};

let total = 0;

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    split_string = changeStringToDigit(line).split(/(\d+)/);
    let result = "";
    const length = split_string[split_string.length - 2].toString().length;
    if (split_string.length - 2 === 1) {
      result = `${split_string[1].toString()[0]}${
        split_string[1].toString()[length - 1]
      }`;
    } else {
      result = `${split_string[1].toString()[0]}${
        split_string[split_string.length - 2].toString()[length - 1]
      }`;
    }
    total += parseInt(result);
  });

  await new Promise((res) => rl.once("close", res));

  console.log(total);
})();
