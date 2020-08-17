import { City, Country, State } from './country';

export type User = {
	_id: any;
	addresses?: {
		home?: {
			address1?: String;
			address2?: String;
			city?: City;
			state?: State;
			country?: Country;
			postalCode?: Number;
		};
		billing?: {
			address1?: String;
			address2?: String;
			city?: City;
			state?: State;
			country?: Country;
			postalCode?: Number;
		};
	};

	createdAt: Date | string;

	description?: string;

	email: string;
	gender?: string;

	lastLogin?: Date;

	name: string;

	password?: string;

	rfc?: string;

	username?: string;
	updatedAt?: Date;
};
