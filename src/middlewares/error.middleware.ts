import { HttpException } from '../exceptions';
import { NextFunction, Request, Response } from 'express';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
	const status = error.status >= 100 && error.status < 600 ? error.status : 500;
	const message = error.message || 'Something went wrong';

	console.error(error);
	if (response.headersSent) {
		return next(error);
	}
	response.status(status).send({
		status,
		message
	});
}
export default errorMiddleware;
