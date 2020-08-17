import { WrongAuthenticationTokenException } from '../exceptions/index';
import RequestWithUser from '../interfaces/requestWithUser';
import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';

async function selfMiddleware(
	request: RequestWithUser,
	response: Response,
	next: NextFunction
) {
	if (Types.ObjectId(request.session.passport.user).equals(request.user._id)) {
		next();
	} else {
		next(new WrongAuthenticationTokenException());
	}
}

export default selfMiddleware;
