import { Request, Response, Router } from 'express';
import IController from 'interfaces/controller.interface';
import users from '../../mocks/users.json';
import { authMiddleware } from './../../middlewares/index';

class UserController implements IController {
	public path = '/users';
	public router = Router();

	constructor() {
		this.intializeRoutes();
	}

	public intializeRoutes() {
		this.router.get(this.path, this.getAllUsers);
		this.router
			.all(`${this.path}/*`, authMiddleware);
	}


	private getAllUsers = (request: Request, response: Response) => {
		response.send(users);
	}
}

export default UserController;
