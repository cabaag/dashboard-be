export interface Error {
	name: string;
	appId: string;
	user: string;
	time: Date;
	location: string;
	url: string;
	message: string;
	stack: object;
}
