import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './server';

chai.use(chaiHttp);

describe('App', () => {
	it('should enter api', (done) => {
		chai
			.request(server)
			.get('/api/v1')
			.end((err, res) => {
				chai.expect(res).to.have.status(200);
				done();
			});
	});
});
