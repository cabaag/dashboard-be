import { User } from './../types/user';
import * as moment from 'moment';
import { decode, encode } from 'jwt-simple';
import { NextFunction, Request, Response } from 'express';

export type Payload = {
	sub: string;
	iat: number;
	exp: number;
	user?: User;
};

class Tokenize {
	/**
   * Crea un token para enviarlo al cliente
   * @param user. Usuario a partir del cual se creará el token
   */
	static generateToken(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		request['token'] = Tokenize.createToken(
			request['auth'].id,
			request['auth'].user
		);
		next();
	}

	static sendToken(request: Request, response: Response) {
		response.setHeader('Authorization', request['token']);
		response.status(200).send(request['auth'].user);
	}

	/**
   * Crea un token para enviarlo al cliente
   * @param user. Usuario a partir del cual se creará el token
   */
	static createToken(auth: string, user?: User): string {
		const payload: Payload = {
			sub: auth,
			iat: moment().unix(),
			exp: moment()
				.add(1, 'years')
				.unix(),
			user
		};
		return encode(payload, process.env.JWT_SECRET);
	}

	/**
   * Decodifica un token para saber si el cliente está autenticado
   * de manera correcta
   * @param token. Token a verificar
   * @return Regresa una Promise en caso de que el token sea correcto o no
   */
	static decodeToken(token: string): Promise<any> {
		return new Promise(
			(resolve: any, reject: any): void => {
				try {
					const payload = decode(token, process.env.JWT_SECRET);
					if (payload.exp <= moment().unix()) {
						return reject({
							status: 401,
							message: 'El token ha expirado'
						});
					}
					resolve(payload);
				} catch (error) {
					reject({
						status: 500,
						message: `Invalid token ${error}`
					});
				}
			}
		);
	}
}

export default Tokenize;
