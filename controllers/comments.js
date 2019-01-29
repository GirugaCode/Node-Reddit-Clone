const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = function(app) {
  // CREATE COMMENT
  app.post("/posts/:postId/comments", function(req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);

    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(comment => {
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(comment => {
        // REDIRECT TO THE ROOT
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  });
};
