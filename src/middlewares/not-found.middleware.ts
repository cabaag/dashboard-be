import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions';

function notFoundMiddleware(
	error: HttpException,
	request: Request,
	response: Response,
	next: NextFunction
) {
	const status = 404;
	const message = 'Element not found';
	if (response.headersSent) {
		return next(error);
	}
	response.status(status).send({
		status,
		message
	});
}
export default notFoundMiddleware;
