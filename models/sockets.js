const BandList = require('./band-list');

class Sockets {

  constructor(io) {

    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();

  }

  socketEvents() {
    // On Connection
    this.io.on('connection', (socket) => {

      console.log('Cliente connectado');

      // Emitir al cliente conectado todas las bandas actuales
      socket.emit('current-bands', this.bandList.getBands());

      // Vote band
      socket.on('vote-band', id => {
        this.bandList.increaseVotes(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Remove band
      socket.on('remove-band', id => {
        this.bandList.removeBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Change name band
      socket.on('change-name-band', ({ newName, id }) => {
        this.bandList.changeName(id, newName);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      // Create band
      socket.on('create-band', ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit('current-bands', this.bandList.getBands());
      });

    });
  }

}

module.exports = Sockets;