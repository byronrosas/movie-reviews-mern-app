"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onInitError = onInitError;
exports.onInitListenSuccess = onInitListenSuccess;

function onInitError(service) {
  return function (error) {
    console.log(service + "=>>", error);
    throw error;
  };
}

function onInitListenSuccess(server) {
  return function () {
    var dataServer = server;
    console.log('data-server', dataServer);
  };
}