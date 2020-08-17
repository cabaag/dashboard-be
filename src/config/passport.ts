import userModel from './../app/user/user.model';
import 'dotenv/config';
import { Authenticator } from 'passport';
import * as PassportFacebook from 'passport-facebook-token';
import {
	OAuth2Strategy as GoogleStrategy,
	Profile
} from 'passport-google-oauth';
import { ExtractJwt, Strategy as JWtStrategy } from 'passport-jwt';

const googleToken: any = require('passport-google-token');
const passport = new Authenticator();
const user = userModel;

const errorSocialLogin = (err: any) => {
	let errMsg;
	switch (err.code) {
		case 11000:
			errMsg = {
				status: 409,
				message: 'Email ya registrado',
			};
			break;
		default:
			errMsg = {
				status: 500,
				message: 'Error al crear usuario',
			};
	}
	return errMsg;
};

const jwtStrategy = (
	payload: any,
	done: (error: any, user?: any, info?: any) => void
) => {
	const id = payload.sub;
	return id ? done(null, id) : done(new Error('You shall not pass'), null);
};

passport.use(
	new JWtStrategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		},
		jwtStrategy
	)
);

export default passport;
