import { NextFunction, Request, Response, Router } from 'express';
import users from '../../mocks/users.json';
import {
	HttpException,
	WrongCredentialsException,
} from './../../exceptions/index';
import { authMiddleware } from './../../middlewares/index';
import { Controller } from './../../types/index';
import { comparePasswords } from './../../utils/crypto';
import AuthenticationService from './authentication.service';
import LogInDto from './login.dto';

class AuthenticationController implements Controller {
	public path = '/auth';
	public router = Router();
	public authenticationService = new AuthenticationService();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}/login`,
			// validationMiddleware(LogInDto),
			this.loggingIn
		);

		this.router
			.all(`${this.path}/*`, authMiddleware)
			.post(`${this.path}/logout`, this.loggingOut);
	}

	private loggingIn = async (
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		try {
			const logInData: LogInDto = request.body;
			const user = users.find((u) => u.email === logInData.email);

			if (user) {
				if (!user.password) {
					return next(new WrongCredentialsException());
				}
				const isPasswordMatching = await comparePasswords(
					logInData.password,
					user.password
				);
				if (isPasswordMatching) {
					response.setHeader('Authorization', [
						this.authenticationService.createToken({
							...user,
							password: undefined,
						}),
					]);
					response.send(user);
				} else {
					next(new WrongCredentialsException());
				}
			} else {
				next(new WrongCredentialsException());
			}
		} catch (e) {
			next(new HttpException(e));
		}
	}

	private loggingOut = (request: Request, response: Response) => {
		request.logOut();
		response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
		response.sendStatus(200);
	}
}

export default AuthenticationController;
