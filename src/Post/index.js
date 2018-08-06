const {site} = require('../config');
const kebabCase = require('lodash').kebabCase;

class Post {

  preview (req, res) {
    // Fake
    let id = Number(req.params.id);
    console.log(id);
    let Post = req.app.locals.connection.model('post');
    Post.findById(id)
      .then((post) => {
        console.log(post);
        res.render('post', {site, post});
      })
      .catch((err) => {
        res.sendStatus(515);
      });
  }

  fetchAll (req, res) {
    let Post = req.app.locals.connection.model('post');
    Post.findAll({})
      .then((instances) => {
        res.json(instances);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  fetchOne (req, res) {
    let Post = req.app.locals.connection.model('post');
    Post.findById(req.params.id)
      .then((instance) => {
        res.json(instance);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  save (req, res) {
    let {title, content, postDate} = req.body;
    let alias = kebabCase(title);
    let values = {title, content, postDate, alias};
    let Post = req.app.locals.connection.model('post');
    Post.create(values)
      .then((instance) => {
        res.json(instance);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  update (req, res) {
    // @TODO this
    let {id} = req.params;
    let {title, content, postDate} = req.body;
    let alias = kebabCase(title);
    let values = {title, content, postDate, alias};
    let query = { where: {id} };
    let Post = req.app.locals.connection.model('post');
    console.log(values);
    console.log(query);
    Post.update(values, query)
      .then((instance) => {
        res.json(instance);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

}
module.exports = Post;
