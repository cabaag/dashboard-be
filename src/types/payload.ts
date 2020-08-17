import { User } from './';

type Payload = {
	_id: string;
	user: User;
	expiresIn: number;
};

export default Payload;
