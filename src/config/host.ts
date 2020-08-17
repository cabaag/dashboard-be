const host =
	process.env.PRODUCTION === 'true'
		? 'https://gruvel.com'
		: process.env.TEST === 'true'
		? 'https://gruvel-api.herokuapp.com'
		: 'http://localhost:4200';

export default host;
