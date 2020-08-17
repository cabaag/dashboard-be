import { Request } from 'express';
import { User } from './../types/user';

interface RequestWithUser extends Request {
	user: User;
	session: any;
}

export default RequestWithUser;
