const lineByLine = require("n-readlines");
const GameReport = require("./gameReport");
const 

class GameLogService {
  logPath = "";
  KILLER_POSITION = 1;
  KILLED_POSITION = 1;
  CAUSE_OF_DEATH_POS = 1;

  constructor(logPath) {
    this.logPath = logPath;
  }

  getAllGameReports = () => {
    const reports = [];
    let gameStart = false;
    let line;
    let gameReport;
    const liner = new lineByLine(this.logPath);
    while ((line = liner.next())) {
      line = line.toString("ascii");
      if (gameStart) {
        if (this.isKillLogLine(line)) {
          gameReport.addKillReport(this.getKiller(line), this.getKilled(line));
          gameReport.addKillMeans(this.getKillMeans(line));
        } else if (this.isEndOfGameLine(line)) {
          gameStart = false;
          reports.push(gameReport.getFinalReport());
        }
      } else {
        gameStart = line.includes("InitGame:");
        gameReport = new GameReport(reports.length + 1);
      }
    }
    return reports;
  };

  getEmptyGameReport = () => {
    return JSON.parse(
      JSON.stringify({
        total_kills: 0,
        players: [],
        kills: {},
      })
    );
  };

  isKillLogLine = (line) => {
    return Boolean(line.match(/\s\d{1,}:\d{1,} Kill/));
  };

  getKiller = (line) => {
    return line.match(/\d{1,}:\s([<>\D]{1,})\skilled/)[this.KILLER_POSITION];
  };

  getKilled = (line) => {
    return line.match(/killed (\w{1,})/)[this.KILLED_POSITION];
  };

  isEndOfGameLine = (line) => {
    return line.includes("ShutdownGame");
  };

  

  getKillMeans(line) {
    return line.match(/by (\w{1,})/)[this.CAUSE_OF_DEATH_POS];
  }
}

module.exports = GameLogService;
