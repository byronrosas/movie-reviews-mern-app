"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _server = _interopRequireDefault(require("./server"));

var _http = _interopRequireDefault(require("http"));

require("./providers/mongo.provider");

var _server2 = require("./shared/utils/server.utils");

var port = process.env.PORT || '3001';

_server["default"].set('port', port);

var server = _http["default"].createServer(_server["default"]);

server.listen(port);
server.on('error', (0, _server2.onInitError)(server));
server.on('listening', (0, _server2.onInitListenSuccess)('main-server-service'));