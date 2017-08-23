const {Router} = require('express');
const router = new Router();

/**
 * Routes
 */
const Admin = require('./server/Admin/router');

router.use(Admin);
module.exports = router;
