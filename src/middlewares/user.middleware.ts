import Payload from '../types/payload';
import RequestWithUser from '../interfaces/requestWithUser';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import userModel from '../app/user/user.model';
import t from 'typy';

async function userMiddleware(
	request: RequestWithUser,
	response: Response,
	next: NextFunction
) {
	try {
		const token = (t(request, 'headers.authorization')
			.safeObject as string).split(' ')[1];
		if (token) {
			const secret = process.env.JWT_SECRET;
			const verificationResponse = verify(token, secret) as Payload;
			const id = verificationResponse._id;
			const user = await userModel
				.findById(id, '_id name email +googleId +facebookId')
				.exec();
			if (user) {
				request.user = user;
			} else {
				request.user = null;
			}
		} else {
			request.user = null;
		}
		next();
	} catch (error) {
		request.user = null;
		next();
	}
}

export default userMiddleware;
