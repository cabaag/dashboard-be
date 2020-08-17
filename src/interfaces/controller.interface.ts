import { model } from 'mongoose';
import { Router } from 'express';

export default interface IController {
		path: string;
		router: Router;
}
