const {Router} = require('express');
const router = new Router();
const Post = require('./');
const post = new Post();

router.get('/posts/preview/:id', post.preview.bind(post));

module.exports = router;
