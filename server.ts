import 'dotenv/config';
import * as http from 'http';
import App from './app';
import controllers from './src/config/controllers';
import validateEnv from './src/utils/validateEnv';

validateEnv();

/**
 * TODO
 * CSRF
 * Rate Limit
 * Timeout server
 *
 */
const app = new App(controllers, 4000);

const server = http.createServer(app.app);

server.listen(process.env.PORT, () => {
	console.log(`Node server listening on http://localhost:${process.env.PORT}`);
});

export default server;
