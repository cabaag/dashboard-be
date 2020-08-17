class BadRequestException extends Error {
	status: number;
	message: string;

	constructor(status: number, message: string) {
		super(message);

		this.message = this.constructor.name;
		this.status = 400;
	}
}

export default BadRequestException;
