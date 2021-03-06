const fs = require("fs");
const path = require("path");
const GameLogService = require("./gameLogService");

const exec = async () => {
  const logDir = path.join("logs");
  fs.readdirSync(logDir).forEach((file) => {
    const gameLog = new GameLogService(`${logDir}/${file}`);
    const log = gameLog.getAllGameReports();
    console.log(
      `FILE: ${file} -------------------------`,
      JSON.stringify(log, null, 4)
    );
  });
};

exec();
