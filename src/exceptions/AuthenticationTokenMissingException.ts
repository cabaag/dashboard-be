import HttpException from './HttpException';

class AuthenticationTokenMissingException extends HttpException {
	constructor() {
		super('Authentication token missing', 401);
	}
}

export default AuthenticationTokenMissingException;
