import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';

chai.use(chaiHttp);

describe('Authentication controller', () => {
	it('should log in', (done) => {
		chai
			.request(server)
			.post('/api/v1/auth/login')
			.send({
				email: 'admin@admin.com',
				password: 'admin',
			})
			.end((err, res) => {
				chai.expect(res.header.authorization).to.be.a('string');
				done();
			});
	});

	it('should log out', (done) => {
		chai
			.request(server)
			.post('/api/v1/auth/logout')
			.send()
			.end((err, res) => {
				chai.expect(res).to.have.status(401);
				done();
			});
	});
});
