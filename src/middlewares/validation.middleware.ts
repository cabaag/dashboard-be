import * as express from 'express';
import HttpException from '../exceptions/HttpException';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

function validationMiddleware<T>(
	type: any,
	skipMissingProperties = false
): express.RequestHandler {
	return (request, response, next) => {
		validate(plainToClass(type, request.body), { skipMissingProperties }).then(
			(errors: ValidationError[]) => {
				if (errors.length > 0) {
					const message = errors
						.map((error: ValidationError) => Object.values(error.constraints))
						.join(', ');
					next(new HttpException(message, 400));
				} else {
					next();
				}
			}
		);
	};
}

export default validationMiddleware;
