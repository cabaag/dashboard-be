import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { join } from 'path';
import { listRoutes } from './src/utils/listRoutes';
import passport from './src/config/passport';
import { corsOptions } from './src/constants/cors';
import errorMiddleware from './src/middlewares/error.middleware';
import loggerMiddleware from './src/middlewares/logger.middleware';
import Controller from './src/types/controller';

const rateLimit = require('express-rate-limit');

const PRODUCTION_FOLDER = join(process.cwd(), 'dist');

class App {
	public app: express.Application;
	public port: number;
	private readonly production: boolean;

	constructor(controllers: Controller[], port: number, production = false) {
		this.app = express();
		this.port = port;
		this.production = production;

		this.initializeMiddlewares();
		this.initializeControllers(controllers);
		this.initializeEngine();
		this.initializeErrorHandling();
		listRoutes(this.app);
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${process.env.PORT}`);
		});
	}

	private initializeMiddlewares() {

		this.app.use(helmet());
		this.app.use(cors(corsOptions));
		this.app.use(compression());
		this.app.use(json({ limit: '20mb' }));
		this.app.use(urlencoded({ extended: true }));
		this.app.set('trust proxy', true);
		this.app.use(cookieParser());

		// this.setupRateLimiter();

		this.app.use(loggerMiddleware);
		this.app.use(passport.initialize());

	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private initializeControllers(controllers: Controller[]) {
		this.app.get('/api/v1', (req, response) => {
			response.send('Dashboard v1');
		});

		controllers.forEach((controller) => {
			this.app.use('/api/v1', controller.router);
		});
	}

	private initializeEngine() {
		this.app.set('view engine', 'html');
		this.app.set('views', join(PRODUCTION_FOLDER, 'browser'));

		if (!this.production) {
			this.app.engine('html', require('ejs').renderFile);
		}

		// Server static files from /browser
		this.app.get(
			'*.*',
			express.static(join(PRODUCTION_FOLDER, 'browser'), {
				maxAge: '1y',
			})
		);

		// All regular routes use the Universal engine
		this.app.get(/^\/(?!api).*/, (req, res) => {
			if (this.production) {
				res.render('index', { req });
			} else {
				res.send({ response: 'API not found' });
			}
		});
	}

}

export default App;
