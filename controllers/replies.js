const Post = require("../models/post");
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = app => {
  // NEW REPLY
  app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    let post;
    Post.findById(req.params.postId)
      .then(p => {
        post = p;
        return Comment.findById(req.params.commentId);
      })
      .then(comment => {
        res.render("replies-new", { post, comment });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // CREATE REPLY
  app.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
      // TURN REPLY INTO A COMMENT OBJECT
      const reply = new Comment(req.body);
      reply.author = req.user._id
      // LOOKUP THE PARENT POST
      let opPost;
      Post
          .findById(req.params.postId)
          .then(post => {
              // FIND THE CHILD Comment
              opPost = post;
            return reply.save()
          })
          .then(reply => Comment.findById(req.params.commentId))
          .then(comment => {
            console.log(comment)
            comment.comments.unshift(reply._id)
            return comment.save()
          })
          .then(comment => opPost.save())
          .then(post => res.redirect(`/posts/${post._id}`))
          .catch(err => console.error(err));
  })
}
// Promise.all([
//     reply.save(),
//     Comment.findById(req.params.commentId),
// ])
//     .then(([reply, comment]) => {
//         // ADD THE REPLY
//         comment.comments.unshift(reply._id);
//
//         return comment.save()
//     })
//     .then((comment) => {
//         res.redirect(`/posts/${req.params.postId}`);
//     })
