import { NextFunction, Request, Response, Router } from 'express';
import * as users from '../../mocks/users.json';
import CreateUserDto from '../user/user.dto';
import { HttpException, NotFoundException, WrongCredentialsException } from './../../exceptions/index';
import { authMiddleware } from './../../middlewares/index';
import { Controller, RequestWithUser } from './../../types/index';
import { comparePasswords, generateHash } from './../../utils/crypto';
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
			`${this.path}/register`,
			// validationMiddleware(CreateUserDto),
			this.registration.bind(this)
		);
		this.router.post(
			`${this.path}/login`,
			// validationMiddleware(LogInDto),
			this.loggingIn
		);

		this.router
			.all(`${this.path}/*`, authMiddleware)
			.post(`${this.path}/logout`, this.loggingOut);
	}

	private async registration(request: Request, response: Response, next: NextFunction) {
		const userData: CreateUserDto = request.body;
		try {
			const { token, user } = await this.authenticationService.register(userData);
			response.setHeader('Authorization', token);
			response.send(user);
		} catch (error) {
			next(error);
		}
	}

	private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
		try {
			const logInData: LogInDto = request.body;
			const user = users.find(u => u.email === logInData.email);

			if (user) {
				if (!user.password) {
					return next(new WrongCredentialsException());
				}
				const isPasswordMatching = await comparePasswords(logInData.password, user.password);
				if (isPasswordMatching) {
					response.setHeader('Authorization', [this.authenticationService.createToken({ ...user, password: undefined })]);
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
