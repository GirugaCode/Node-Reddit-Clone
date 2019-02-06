// test/posts.js
const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require('../models/post');
const server = require('../server');
const User = require('../models/user');

chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(app);
describe('Posts', function() {

  before((done) => {
    User.findOneAndRemove({ username: "testone" }, function() {
      agent
      .post("/sign-up")
      .send({ username: "testone", password: "password" })
      .end(function(err, res) {
        console.log(res.body);
        res.should.have.status(200);
        agent.should.have.cookie("nToken");
        done();
      })
  })
});

  // Post that we'll use for testing purposes
  const newPost = {
      title: 'post title',
      url: 'https://www.google.com',
      summary: 'post summary',
  };

  const user = {
    username: 'poststest',
    password: 'testposts'
  }



  // TEST POST
  it('Should create with valid attributes at POST /posts', function(done) {
    // Checks how many posts there are now
    Post.estimatedDocumentCount()
      .then(function (initialDocCount) {
        console.log(initialDocCount)
          agent
              .post("/posts")
              .set("content-type", "application/x-www-form-urlencoded")
              .send(newPost)
              .end(function (err, res) {
                  Post.estimatedDocumentCount()
                      .then(function (newDocCount) {
                          // Check that the response is a success
                          expect(res).to.have.status(200);
                          // Check that the database has one more post in it
                          expect(newDocCount).to.be.equal(initialDocCount + 1)
                          return done();
                      })
              })
      })
      .catch(function (err) {
          done(err);
      });
  });
  after(function (done) {
    Post.findOneAndDelete(newPost)
    .then(function (res) {
        agent.close()

        User.findOneAndDelete({
            username: user.username
        })
          .then(function (res) {
              done()
          })
          .catch(function (err) {
              done(err);
          });
    })
    .catch(function (err) {
        done(err);
    });
  });
});
