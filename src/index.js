const testFolder = "./tests/";
const fs = require("fs");
const path = require("path");
const GameLogService = require("./gameLog.service");

// const logDir = path.join("logs");
// console.log(logDir);
// fs.readdirSync(logDir).forEach((file) => {
//   console.log(file);
// });
const exec = async () => {
  const teste = path.join("logs", "teste.log");
  console.log(teste);
  const gameLog = new GameLogService(teste);

  const x = await gameLog.getAllGameReports();
  console.log(x);
};

exec();
