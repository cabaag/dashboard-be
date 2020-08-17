export type Country = {
	_id: any;
	name: string;
};

export type State = {
	_id: any;
	country: Country;
	name: string;
};

export type City = {
	_id: any;
	state: State;
	name: string;
};
