import HttpException from './HttpException';

class NotFoundException extends HttpException {
	constructor(id: string) {
		super(`Resource with id ${id} not found`, 404);
	}
}

export default NotFoundException;
