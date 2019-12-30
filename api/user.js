const connection = require('../config/mysql');
const { Result } = require('../common/function');

module.exports = {
  // 注册
  register: function(req, res) {
    const param = req.body;
    const username = param.username;
    const password = param.password;
    const phone = param.phone;

    var result = new Result(101, '注册失败');
    if (username && password && phone) {
      var getUserSql = 'select username from user where username = ?';
      var getUserParam = [username];
      connection.query(getUserSql, getUserParam, function(
        error,
        results,
        fields
      ) {
        if (error) {
          throw error;
        }
        if (results.length >= 1) {
          result = new Result(104, '该用户已注册');
          res.send(result);
        } else {
          var insertSql =
            'insert into user (username,password,phone) values (?,?,?)';
          var insertParam = [username, password, phone];
          connection.query(insertSql, insertParam, function(
            error,
            results,
            fields
          ) {
            if (error) {
              throw error;
            }

            if (results.affectedRows == 1) {
              result = new Result(0, '注册成功');
            } else {
              result = new Result(104, '注册失败');
            }
            res.send(result);
          });
        }
      });
    } else {
      result = new Result(102, '用户名、密码、手机号都不能为空');
      res.send(result);
    }
  },
  // 登录
  login: function(req, res) {
    var param = req.body;
    var username = param.username;
    var password = param.password;

    var result = new Result(101, '登录失败');
    if (username && password) {
      var getUserSql = 'select * from user where username = ?';
      var getUserParam = [username];
      connection.query(getUserSql, getUserParam, function(
        error,
        results,
        fields
      ) {
        if (error) {
          throw error;
        }
        if (results.length >= 1) {
          if (password == results[0].password) {
            result = new Result(0, '登陆成功');
          } else {
            result = new Result(101, '密码错误');
          }
        } else {
          result = new Result(102, '该用户未注册');
        }
        res.json(result);
      });
    } else {
      result = new Result(102, '用户名或密码不能为空');
      res.json(result);
    }
  },
  // 获取所有用户信息
  getAllUser: function(req, res) {
    connection.query('select * from user', function(error, results, fields) {
      if (error) {
        throw error;
      }
      var result = new Result(0, '查询成功', results);
      res.json(result);
    });
  }
};
