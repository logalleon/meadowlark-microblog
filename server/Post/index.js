const {site} = require('../../config');

class Post {

  preview (req, res) {
    // Fake
    let id = Number(req.params.id);
    const posts = require('../../posts');
    let post = posts.filter((p) => p.id === id)[0];
    res.render('post', {site, post});
  }

}
module.exports = Post;
