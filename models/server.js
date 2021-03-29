const http = require('http')
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Socket configuration
    this.io = socketio(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    // Habilitar cors
    this.app.use(cors());
  }

  socketConfiguration() {
    new Sockets(this.io);
  }

  execute() {
    // Init middlewares
    this.middlewares();

    // Init sockets
    this.socketConfiguration();

    // Init server
    this.server.listen(this.port, () => {
      console.log(`Server corriendo en puerto: ${this.port}`);
    });
  }

}

module.exports = Server;