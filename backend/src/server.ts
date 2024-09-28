import 'dotenv/config';
import app from './app';
import http from 'http';

const server = http.createServer(app);

/**
 * Start Express server.
 */
server.listen(app.get('port'), async () => {
  try {
    console.log('Server started');
    console.log(`Port: ${app.get('port')}`);
    console.log(`Environment: ${app.get('env')}`);
  } catch (error) {
    console.error(error);
  }
});

export default server;
