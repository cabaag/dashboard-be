import 'dotenv/config';
import { Authenticator } from 'passport';
import { ExtractJwt, Strategy as JWtStrategy } from 'passport-jwt';

const passport = new Authenticator();

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
