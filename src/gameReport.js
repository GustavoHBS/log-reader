class GameReport {
  gameNumber;
  kills;
  players;
  killsByMeans;
  totalKills;

  constructor(gameNumber) {
    this.gameNumber = gameNumber;
    this.kills = {};
    this.players = [];
    this.killsByMeans = {};
    this.totalKills = 0;
  }

  addKillReport(killer, killed) {
    let penality = 0;
    if (this.worldIsTheKiller(killer)) {
      penality = 1;
    } else {
      this.kills[killer] = (this.kills[killer] || 0) + 1;
      this.addPlayer(killer);
    }
    this.kills[killed] = (this.kills[killed] || 0) - penality;
    this.addPlayer(killed);
    this.updateTotalKills();
  }

  addPlayer(player) {
    if (!this.players.includes(player)) {
      this.players.push(player);
    }
  }

  updateTotalKills() {
    this.totalKills++;
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
        total_kills: this.totalKills,
        players: this.players,
        kills: this.kills,
        kills_by_means: this.killsByMeans,
      },
    };
  }
}

module.exports = GameReport;
