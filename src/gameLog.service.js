const lineByLine = require("n-readlines");

class GameLogService {
  logPath = "";
  constructor(logPath) {
    this.logPath = logPath;
  }

  getAllGameReports = () => {
    const self = this;
    const reports = [];
    let gameStart = false;
    //let gameReport;
    let kills;
    let totalKills;
    let players;
    let line;
    const liner = new lineByLine(this.logPath);
    while ((line = liner.next())) {
      line = line.toString("ascii");
      if (gameStart) {
        if (self.isKillLogLine(line)) {
          const killer = self.getKiller(line);
          const killed = self.getKilled(line);
          if (self.worldIsTheKiller(killer)) {
            kills[killed] = (kills[killed] || 0) - 1;
          } else {
            kills[killer] = (kills[killer] || 0) + 1;
          }
          if (!players.includes(killer)) {
            players.push(killer);
          }
          if (!players.includes(killer)) {
            players.push(killer);
          }
        } else if (self.isEndOfGameLine(line)) {
          gameStart = false;
          reports.push({
            [`game_${reports.length + 1}`]: {
              total_kills: self.getTotalKills(kills),
              players,
              kills,
            },
          });
        }
      } else {
        //gameReport = this.getEmptyGameReport();
        gameStart = line.includes("InitGame:");
        kills = {};
        totalKills = 0;
        players = [];
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
    const KILLER_POSITION = 1;
    return line.match(/\d{1,}:\s([<>\D]{1,})\skilled/)[KILLER_POSITION];
  };

  getKilled = (line) => {
    const KILLED_POSITION = 1;
    return line.match(/killed (\w{1,})/)[KILLED_POSITION];
  };

  worldIsTheKiller = (killer) => {
    return killer === "<world>";
  };

  isEndOfGameLine = (line) => {
    return line.includes("ShutdownGame");
  };

  getTotalKills = (kills) => {
    return Object.values(kills).reduce((val, nextVal) => val + nextVal, 0);
  };
}

module.exports = GameLogService;
