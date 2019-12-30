const fs = require('fs');
const connection = require('../config/mysql');
const { Result } = require('../common/function');

module.exports = {
  // 文件上传  调试中...
  fileUpload: function(req, res) {
    console.log(req.files);
    var file = req.files[0];
    console.log(file);
    fs.readFile(file.path, function(err, data) {
      var des_file = __dirname + '/' + file.originalname;
      fs.writeFile(des_file, data, function(err) {
        var result = new Result();
        if (err) {
          console.log(err);
          result = new Result(101, '上传失败');
        } else {
          result = new Result(0, '上传成功');
        }
        res.json(result);
      });
    });
  }
};
