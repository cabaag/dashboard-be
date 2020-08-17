import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
	constructor() {
		super('Wrong authentication token', 401);
	}
}

export default WrongAuthenticationTokenException;
