import { WrongAuthenticationTokenException } from '../exceptions/index';
import RequestWithUser from '../interfaces/requestWithUser';
import { NextFunction, Response } from 'express';

async function selfMiddleware(
	request: RequestWithUser,
	response: Response,
	next: NextFunction
) {
	if (request.session.passport.user === request.user._id) {
		next();
	} else {
		next(new WrongAuthenticationTokenException());
	}
}

export default selfMiddleware;
