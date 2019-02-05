const Post = require('../models/post');

module.exports = app => {
  // ROOT
  app.get("/", (req, res) => {
    var currentUser = req.user;

    Post.find({})
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.get("/posts/new", (req, res) => {
    res.render('create-post')
  })

  // CREATE
  app.post("/posts/new", (req,res) => {
    if (req.user) {
      // INSTANTIATE INSTANCE OF POST MODEL
      const post = new Post(req.body);
      // SAVE INSTANCE OF POST MODEL TO DB
      post.save((err, post) => {
        // REDIRECT TO THE ROOT
        return res.redirect('/');
      })
    } else {
      return res.status(401); //UNAUTHORIZED
    }
  });

  // LOOK UP THE POST
  app.get("/posts/:id", function(req, res) {
    Post.findById(req.params.id).populate('comments')
      .then(post => {
        res.render("posts-show", { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function(req,res) {
    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });

};
