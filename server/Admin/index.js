const {site} = require('../../config');

class Admin {

  dashboard (req, res) {
    let {title} = site;
    res.render('dashboard', {title});
  }

}
module.exports = Admin;
