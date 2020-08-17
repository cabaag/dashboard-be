import { User, Payload } from './../../types/index';
import userModel from '../user/user.model';
import { generateHash } from './../../utils/crypto';
import { HttpException } from './../../exceptions/index';
import { sign } from 'jsonwebtoken';
import CreateUserDto from '../user/user.dto';
import * as moment from 'moment';

class AuthenticationService {
	public user = userModel;

	public async register(userData: CreateUserDto) {
		if (await this.user.findOne({ email: userData.email }).exec()) {
			throw new HttpException(`User with email ${userData.email} already exists`, 400);
		}
		const hashedPassword = await generateHash(userData.password, 10);
		const user = await this.user.create({
			...userData,
			password: hashedPassword
		});
		user.password = undefined;
		const token = this.createToken(user);
		return {
			token,
			user
		};
	}

	public createToken(user: User): string {
		const secret = process.env.JWT_SECRET;
		const expiresIn = moment()
			.add(1, 'hour')
			.unix();
		const payload: Payload = {
			_id: user._id,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				addresses: user.addresses,
				createdAt: user.createdAt
			},
			expiresIn
		};
		return sign(payload, secret, { expiresIn });
	}
}

export default AuthenticationService;
