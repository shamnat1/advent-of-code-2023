const fs = require("fs");
const readline = require("readline");

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
    crlfDelay: Infinity,
  });
  let seedInfo = [];
  let seedToSoilRatio = [];
  let soilToFertilizerRatio = [];
  let fertalizerToWaterRatio = [];
  let waterToSunlightRatio = [];
  let sunlightToTemperatureRatio = [];
  let temperatureToHumidityRatio = [];
  let humidityToLocationRatio = [];

  let smallestLocation = 0;
  let label = "seeds";
  rl.on("line", (line) => {
    if (line === "") return;
    input = line.split(":");
    if (line.indexOf(":") > -1) {
      label = input[0];
    }
    if (label === "seeds") {
      seedInfo.push(...input[1].trim().split(" "));
    }
    if (label === "seed-to-soil map" && input[0] !== "seed-to-soil map") {
      seedToSoilRatio.push(input[0].trim().split(" "));
    }
    if (
      label === "soil-to-fertilizer map" &&
      input[0] !== "soil-to-fertilizer map"
    ) {
      soilToFertilizerRatio.push(input[0].trim().split(" "));
    }

    if (
      label === "fertilizer-to-water map" &&
      input[0] !== "fertilizer-to-water map"
    ) {
      fertalizerToWaterRatio.push(input[0].trim().split(" "));
    }
    if (label === "water-to-light map" && input[0] !== "water-to-light map") {
      waterToSunlightRatio.push(input[0].trim().split(" "));
    }
    if (
      label === "light-to-temperature map" &&
      input[0] !== "light-to-temperature map"
    ) {
      sunlightToTemperatureRatio.push(input[0].trim().split(" "));
    }
    if (
      label === "temperature-to-humidity map" &&
      input[0] !== "temperature-to-humidity map"
    ) {
      temperatureToHumidityRatio.push(input[0].trim().split(" "));
    }
    if (
      label === "humidity-to-location map" &&
      input[0] !== "humidity-to-location map"
    ) {
      humidityToLocationRatio.push(input[0].trim().split(" "));
    }
  });
  rl.on("close", () => {
    seedInfo.forEach((seed) => {
      let soilIndex = 0;
      let soilPositionFlag = false;
      seedToSoilRatio.forEach((seedSoil) => {
        const seedIndex = parseInt(seed) - parseInt(seedSoil[1]);
        if (seedIndex >= 0 && seedIndex <= seedSoil[2] && !soilPositionFlag) {
          soilIndex = parseInt(seedSoil[0]) + seedIndex;
          soilPositionFlag = true;
        } else if (!soilPositionFlag) {
          soilIndex = parseInt(seed);
        }
      });

      let fertalizerIndex = 0;
      let fertalizerPositionFlag = false;
      soilToFertilizerRatio.forEach((soilFertilizer) => {
        const soilPosition = parseInt(soilIndex) - parseInt(soilFertilizer[1]);
        if (
          soilPosition >= 0 &&
          soilPosition <= soilFertilizer[2] &&
          !fertalizerPositionFlag
        ) {
          fertalizerIndex = parseInt(soilFertilizer[0]) + soilPosition;
          fertalizerPositionFlag = true;
        } else if (!fertalizerPositionFlag) {
          fertalizerIndex = parseInt(soilIndex);
        }
      });

      let waterIndex = 0;
      let waterPositionFlag = false;
      fertalizerToWaterRatio.forEach((fertalizerWater) => {
        const position =
          parseInt(fertalizerIndex) - parseInt(fertalizerWater[1]);
        if (
          position >= 0 &&
          position <= fertalizerWater[2] &&
          waterPositionFlag === false
        ) {
          waterIndex = parseInt(fertalizerWater[0]) + position;
          waterPositionFlag = true;
        } else if (!waterPositionFlag) {
          waterIndex = parseInt(fertalizerIndex);
        }
      });

      let lightIndex = 0;
      let lightPositionFlag = false;
      waterToSunlightRatio.forEach((waterLight) => {
        const position = parseInt(waterIndex) - parseInt(waterLight[1]);
        if (
          position >= 0 &&
          position <= waterLight[2] &&
          lightPositionFlag === false
        ) {
          lightIndex = parseInt(waterLight[0]) + position;
          lightPositionFlag = true;
        } else if (!lightPositionFlag) {
          lightIndex = parseInt(waterIndex);
        }
      });

      let temperatureIndex = 0;
      let temperaturePositionFlag = false;
      sunlightToTemperatureRatio.forEach((lightTemperature) => {
        const position = parseInt(lightIndex) - parseInt(lightTemperature[1]);
        if (
          position >= 0 &&
          position <= lightTemperature[2] &&
          !temperaturePositionFlag
        ) {
          temperatureIndex = parseInt(lightTemperature[0]) + position;
          temperaturePositionFlag = true;
        } else if (!temperaturePositionFlag) {
          temperatureIndex = parseInt(lightIndex);
        }
      });

      let humidityIndex = 0;
      let humidityPositionFlag = false;
      temperatureToHumidityRatio.forEach((tempHumidity) => {
        const position = parseInt(temperatureIndex) - parseInt(tempHumidity[1]);
        if (
          position >= 0 &&
          position <= tempHumidity[2] &&
          !humidityPositionFlag
        ) {
          humidityIndex = parseInt(tempHumidity[0]) + position;
          humidityPositionFlag = true;
        } else if (!humidityPositionFlag) {
          humidityIndex = parseInt(temperatureIndex);
        }
      });

      let locationIndex = 0;
      let hlocationPositionFlag = false;
      humidityToLocationRatio.forEach((humidityLocation) => {
        const position =
          parseInt(humidityIndex) - parseInt(humidityLocation[1]);
        if (
          position >= 0 &&
          position <= humidityLocation[2] &&
          !hlocationPositionFlag
        ) {
          locationIndex = parseInt(humidityLocation[0]) + position;
          hlocationPositionFlag = true;
        } else if (!hlocationPositionFlag) {
          locationIndex = parseInt(humidityIndex);
        }
      });

      if (smallestLocation === 0 || locationIndex < smallestLocation)
        smallestLocation = locationIndex;
    });

    console.log("smallestLocation", smallestLocation);
  });

  await new Promise((res) => rl.once("close", res));
})();
