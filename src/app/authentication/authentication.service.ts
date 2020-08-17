import { sign } from 'jsonwebtoken';
import moment from 'moment';
import { Payload, User } from './../../types/index';

class AuthenticationService {
	public createToken(user: User): string {
		const secret = process.env.JWT_SECRET;
		const expiresIn = moment().add(1, 'hour').unix();
		const payload: Payload = {
			_id: user._id,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				addresses: user.addresses,
				createdAt: user.createdAt,
			},
			expiresIn,
		};
		return sign(payload, secret, { expiresIn });
	}
}

export default AuthenticationService;
