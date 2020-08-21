const Config = require('config');
const Routes = require('./routes');
const Server = require('./common/server');

const server = new Server()
    .router(Routes)
    .handleError()
    .configureDb()
    .then(_server => _server.listen(Config.get('port')));

module.exports.server = server;
