const {Router} = require('express');
const router = new Router();

/**
 * Routes
 */
const Admin = require('./server/Admin/router');
const Post = require('./server/Post/router');

router.use(Admin);
router.use(Post);
module.exports = router;
