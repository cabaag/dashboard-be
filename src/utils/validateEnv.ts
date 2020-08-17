import { cleanEnv, str, port, bool } from 'envalid';

export default function validateEnv() {
	cleanEnv(process.env, {
		PRODUCTION: bool(),
		PORT: port(),
		JWT_SECRET: str(),
	});
}
