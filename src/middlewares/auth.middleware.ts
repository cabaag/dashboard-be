import Payload from '../types/payload';
import RequestWithUser from '../interfaces/requestWithUser';
import typy from 'typy';
import userModel from './../app/user/user.model';
import { AuthenticationTokenMissingException, WrongAuthenticationTokenException } from '../exceptions/index';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
	const authorization = typy(request, 'headers.authorization').safeObject as string;
	if (!authorization) {
		return next(new WrongAuthenticationTokenException());
	}
	const token = authorization.split(' ')[1];
	if (token) {
		const secret = process.env.JWT_SECRET;
		try {
			const verificationResponse = verify(token, secret) as Payload;
			const id = verificationResponse._id;
			const user = await userModel.findById(id, '_id name email +googleId +facebookId photoURL phone username').exec();
			if (user) {
				request.user = user.toObject();
				next();
			} else {
				next(new WrongAuthenticationTokenException());
			}
		} catch (error) {
			next(new WrongAuthenticationTokenException());
		}
	} else {
		next(new AuthenticationTokenMissingException());
	}
}

export default authMiddleware;
