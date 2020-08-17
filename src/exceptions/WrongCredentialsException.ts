import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
	constructor() {
		super('Wrong credentials provided', 401);
	}
}

export default WrongCredentialsException;
