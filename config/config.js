const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors()); // 跨域
app.use(bodyParser.json()); // json 请求
app.use(bodyParser.urlencoded({ extended: false })); // 表单请求

app.use(express.static('public')); // 静态文件

// 监听 8081 端口
var server = app.listen(8081, () => {
  // var host = server.address().address;
  // var port = server.address().port;
  // console.log('http://%s:%s', host, port);
  console.log('nodejs 服务启动成功');
});

module.exports = { app };
