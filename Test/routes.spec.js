//bring in dependencies

const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');
const server = require('../server');

//connecting datatbase -- for API Routes

const environment = process.env.NODE_ENV || "test";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

chai.use(chaiHTTP);

describe('Client Routes', () => {

  it('should return a the homepage', (done) => {
    chai.request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.include('Palette Pickr');
      done();
    });
  });

  it('should return a 404 for route that does not exist', (done) => {
    chai.request(server)
    .get('/hellooo')
    .end((error, response) => {
      response.should.have.status(404);
      done();
    });
  });
});

describe('API Routes', () => {

  before( (done) => {
    database.migrate.latest()
      .then( () => done() )
      .catch( (error) => console.log(error) );
  })

  beforeEach( (done) => {
    database.seed.run()
      .then( () => done() )
      .catch( (error) => console.log(error) );
  })

  describe('GET /api/v1/projects', () => {
    it('should retrieve all projects', (done) => {
      chai.request(server)
      .get('/api/v1/projects')
      .end( (error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('project_name');
        response.body[0].project_name.should.equal('projectOne');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        done();
      });
    });

    it('should return a 404 if URL is incorrect', (done) => {
      chai.request(server)
      .get('/api/v1/proojectss')
      .end( (error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/palettes', () => {
    it('should retrieve all saved palettes', (done) => {
      chai.request(server)
      .get('/api/v1/palettes')
      .end( (error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('palette_name');
        response.body[0].palette_name.should.equal('seaPalette');
        response.body[0].should.have.property('color1');
        response.body[0].color1.should.equal('#C50742');
        response.body[0].should.have.property('color2');
        response.body[0].color2.should.equal('#4B98D8');
        response.body[0].should.have.property('color3');
        response.body[0].color3.should.equal('#4BEBE5');
        response.body[0].should.have.property('color4');
        response.body[0].color4.should.equal('#268E94');
        response.body[0].should.have.property('color5');
        response.body[0].color5.should.equal('#8FF159');
        response.body[0].should.have.property('project_id');
        response.body[0].project_id.should.equal(1);
        done();
      })
    })
  })

});
