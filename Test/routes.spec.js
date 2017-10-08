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
        response.body.length.should.equal(1);
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
        response.body.length.should.equal(2);
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
      });
    });

    it('should return a 404 status if the URL is incorrect', (done) => {
      chai.request(server)
      .get('/api/v1/palletttess')
      .end( (error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should retrieve a single project with matching ID', (done) => {
      chai.request(server)
      .get('/api/v1/projects/1')
      .end( (error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('project_name');
        response.body[0].project_name.should.equal('projectOne');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        done();
      });
    });

    it('should return a 404 if the URL is incorrect', (done) => {
      chai.request(server)
      .get('/api/v1/projects/5')
      .end( (error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should add a new project to the database', (done) => {
      chai.request(server)
      .post('/api/v1/projects')
      .send({
        project_name: 'Test Project'
      })
      .end( (error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('array');
        // response.body[0].should.have.property('project_name');
        // response.body[0].project_name.should.equal('Test Project');
        // response.body[0].should.have.property('id');

      chai.request(server)
      .get('/api/v1/projects')
      .end( (error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.res.text.should.include('Test Project');
        done();
      });
    });
  });
});

  describe('POST /api/v1/palettes', () => {
    it('should add a new palette to the database', (done) => {
      chai.request(server)
      .post('/api/v1/palettes')
      .send({
          id: 3,
          palette_name: 'Nature',
          color1: '#E84514',
          color2: '#95239A',
          color3: '#4BC6FB',
          color4: '#F7492A',
          color5: '#1CE6C7',
          project_id: 1
        })
        .end( (error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('array');
        // response.body[0].should.have.property('palette_name');
        // response.body[0].palette_name.should.equal('Nature');
        // response.body[0].should.have.property('id');
        // response.body[0].id.should.equal(3);
        // response.body[0].should.have.property('color1');
        // response.body[0].color1.should.equal('#E84514');
        // response.body[0].should.have.property('color2');
        // response.body[0].color2.should.equal('#95239A');
        // response.body[0].should.have.property('color3');
        // response.body[0].color3.should.equal('#4BC6FB');
        // response.body[0].should.have.property('color4');
        // response.body[0].color4.should.equal('#F7492A');
        // response.body[0].should.have.property('color5');
        // response.body[0].color5.should.equal('#1CE6C7');
        // response.body[0].should.have.property('project_id');
        // response.body[0].project_id.should.equal(1);

        chai.request(server)
        .get('/api/v1/palettes')
        .end( (error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.res.text.should.include('Nature');
          done();
        });
      });
    });
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should delete palette with macthing ID', (done) => {
      chai.request(server)
      .delete('/api/v1/palettes/1')
      .end( (error, response) => {
        // response.should.have.status(204);

      chai.request(server)
      .get('/api/v1/palettes')
      .end( (error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.res.text.should.not.include('seaPalette');
        done()
      });
    });
  });
});

  describe('DELETE /api/v1/projects/:id', () => {
    it('should delete a project with a matching ID', (done) => {
      chai.request(server)
      .delete('/api/v1/projects/1')
      .end( (error, response) => {
        // response.should.have.status(204);

        chai.request(server)
        .get('/api/v1/projects')
        .end( (error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.equal(0);
          response.res.text.should.not.include('projectOne');
          done();
        });
      });
    });
  });

});
