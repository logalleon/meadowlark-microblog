const {Router} = require('express');
const router = new Router();
const Admin = require('./');
const admin = new Admin();

router.get('/admin/', admin.dashboard.bind(admin));

module.exports = router;
