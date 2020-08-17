import * as cors from 'cors';

export const corsOptions: cors.CorsOptions = {
	origin: 'http://localhost:3000',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
	credentials: true,
	exposedHeaders: ['Authorization', 'Set-Cookie']
};
