import app from './server';
import http from 'http';
import "./providers/mongo.provider";
import { onInitError, onInitListenSuccess } from './shared/utils/server.utils';

const port = process.env.PORT || '3001';
app.set('port',port)
var server = http.createServer(app);
server.listen(port);
server.on('error',onInitError(server));    
server.on('listening',onInitListenSuccess('main-server-service'))