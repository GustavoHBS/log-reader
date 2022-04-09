const testFolder = "./tests/";
const fs = require("fs");
const path = require("path");
const GameLogService = require("./gameLog.service");

const exec = async () => {
  const logDir = path.join("logs");
  fs.readdirSync(logDir).forEach((file) => {
    console.log(logDir + "/file");
    const gameLog = new GameLogService(`${logDir}/${file}`);
    const log = gameLog.getAllGameReports();
    console.log(
      `FILE: ${file} -------------------------`,
      JSON.stringify(log, null, 4)
    );
  });
};

exec();
