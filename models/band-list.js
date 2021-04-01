const Band = require("./band");

class BandList {

  constructor() {
    this.bands = [
      new Band('Linkin Park'),
      new Band('Oasis'),
      new Band('One Direction'),
      new Band('The Beatles'),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands = [...this.bands, newBand];
    return this.bands;
  }

  removeBand(id) {
    this.bands = this.bands.filter(band => band.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increaseVotes(id) {
    this.bands = this.bands.map(band => band.id === id ? { ...band, votes: band.votes + 1 } : band);
  }

  changeName(id, newName) {
    this.bands = this.bands.map(band => band.id === id ? { ...band, name: newName } : band);
  }

}

module.exports = BandList;