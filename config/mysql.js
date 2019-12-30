const mysql = require('mysql');

const option = {
  host: '127.0.0.1', //主机
  port: '3306', //端口
  user: 'root', //用户名
  password: '123456', //密码
  database: 'test' //数据库名称
};
const connection = mysql.createConnection(option);

connection.connect(err => {
  if (err) {
    console.error('mysql：error connecting: ' + err.stack);
    return;
  }
  console.log('mysql 连接成功：connected as id ' + connection.threadId);
});

module.exports = connection;
