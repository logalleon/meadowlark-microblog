const {Router} = require('express');
const router = new Router();
const Post = require('./');
const post = new Post();

router.get('/posts/preview/:id', post.preview.bind(post));
router.get('/api/post', post.fetchAll.bind(post));
router.get('/api/post/:id', post.fetchOne.bind(post));
router.post('/api/post', post.save.bind(post));
router.patch('/api/post/:id', post.update.bind(post));

module.exports = router;
