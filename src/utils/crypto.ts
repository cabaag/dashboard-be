import { compare, genSalt, hash } from 'bcrypt-nodejs';

function generateHash(password: string, salt = 10): Promise<string> {
	return new Promise((resolve, reject) => {
		genSalt(salt, (err: Error, saltGenerated: string) => {
			if (err) {
				return reject(err);
			}
			hash(password, saltGenerated, null, (errHash: Error, hashGen: string) => {
				errHash ? reject(errHash) : resolve(hashGen);
			});
		});
	});
}

function comparePasswords(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		compare(password, hashedPassword, (error, result) => {
			error ? reject(false) : !result ? resolve(false) : resolve(true);
		});
	});
}

export { generateHash, comparePasswords };
