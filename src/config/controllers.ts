import AuthenticationController from './../app/authentication/authentication.controller';
import UserController from './../app/user/user.controller';
import Controller from './../types/controller';

const controllers: Controller[] = [
	new AuthenticationController(),
	new UserController(),
];

export default controllers;
