const fs = require("fs");
const readline = require("readline");
let total = 0;

let lines = [];
function containsSpecialChar(str) {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/.test(str);
}

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });

  rl.on("line", (input) => {
    lines.push(input);
  });

  rl.on("close", () => {
    for (let i = 0; i < lines.length; i++) {
      const previousLine = i > 0 ? lines[i - 1] : null;
      const nextLine = i < lines.length - 1 ? lines[i + 1] : null;
      const split_string = lines[i].split(/(\d+)/);
      let substringLength = 0;
      for (let j = 0; j < split_string.length; j++) {
        if (split_string[j].match(/[0-9]/i)) {
          const start = substringLength === 0 ? 0 : substringLength - 1;
          const last = split_string[j].length + 1;
          const previousLineToCheck =
            previousLine && previousLine.substr(start, last + 1);
          const nextLineToCheck = nextLine && nextLine.substr(start, last + 1);
          const previousPositionToCheck = lines[i].substr(start, 1);
          const nextPosition = substringLength === 0 ? start : start + 1;
          const nextPositionToCheck = lines[i].substr(
            nextPosition + split_string[j].length,
            1
          );
          if (
            containsSpecialChar(nextLineToCheck) ||
            containsSpecialChar(previousLineToCheck) ||
            containsSpecialChar(previousPositionToCheck) ||
            containsSpecialChar(nextPositionToCheck)
          ) {
            total += parseInt(split_string[j]);
          }
        }
        substringLength += split_string[j].length;
      }
    }
    console.log("total", total);
  });

  await new Promise((res) => rl.once("close", res));
})();
