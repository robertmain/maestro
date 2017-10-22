import Server from './Server';

// Grab a new express application server...
const server = new Server(3000);

// And away we go...
server.start();