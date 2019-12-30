const fs = require('fs');
const path = require('path');

const project_path = path.resolve(__dirname, '..');

module.exports = {
  userList: function(req, res) {
    var userFile = project_path + '/public/user.json';
    console.log(userFile);
    fs.readFile(userFile, 'utf8', function(err, data) {
      data = JSON.parse(data);
      res.json(data);
    });
  }
};
