class GameReport {
  gameNumber;
  kills;
  players;
  killsByMeans;

  constructor(gameNumber) {
    this.gameNumber = gameNumber;
    kills = {};
    players = [];
    killsByMeans = {};
  }

  addKillReport(killer, killed) {
    if (this.worldIsTheKiller(killer)) {
      this.kills[killed] = (this.kills[killed] || 0) - 1;
    } else {
      this.kills[killer] = (this.kills[killer] || 0) + 1;
      this.setPlayer(killer);
    }
    this.setPlayer(killed);
  }

  addPlayer(player) {
    if (!this.players.includes(player)) {
      this.players.push(player);
    }
  }

  addKillMeans(killMeans) {
    this.killsByMeans[killMeans] = (this.killsByMeans[killMeans] || 0) + 1;
  }

  worldIsTheKiller = (killer) => {
    return killer === "<world>";
  };

  getFinalReport() {
    return {
      [`game_${this.gameNumber}`]: {
        total_kills: this.getTotalKills(),
        players: this.players,
        kills: this.kills,
        kills_by_means: this.killsByMeans,
      },
    };
  }

  getTotalKills = () => {
    return Object.values(this.kills).reduce(
      (val, nextVal) => val + (nextVal > 0 ? nextVal : nextVal * -1),
      0
    );
  };
}

module.exports = GameReport;
