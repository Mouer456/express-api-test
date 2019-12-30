const { app } = require('./config/config.js');
const user = require('./api/user');
const test = require('./api/test');
const restfulTest = require('./api/restfulTest');

// 全局拦截, 一定要写在最上面
let login = false;
app.all('*', (req, res, next) => {
  // console.log(req.hostname); //req.ip：获取主机名和IP地址
  // console.log(req.ip); // 获取原始请求URL

  var time = new Date();
  console.log(time, ' ', req.url);
  // if (!login) {
  //   return res.json("未登录");
  // }
  next();
});

// 三种传参方式测试 http://localhost:8081/test/123?a=b
// https://zhuanlan.zhihu.com/p/56030432
app.post('/test/:id', (req, res) => {
  res.json({
    query: req.query, // 表单请求
    params: req.params, // :id   req.params.id
    json: req.body // json 请求
  });
});

// 1. 路由列表
app.post('/register', (req, res) => user.register(req, res));
app.post('/login', (req, res) => user.login(req, res));
app.get('/getAllUser', (req, res) => user.getAllUser(req, res));

// 2. 链式路由
app
  .route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

// 3. 路由图
// 3.1 封装
app.map = function(a, route) {
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
        app.map(a[key], route + key);
        break;
      // get: function(){ ... }
      case 'function':
        app[key](route, a[key]);
        break;
    }
  }
};
// 3.2 可多级嵌套
app.map({
  '/user': {
    get: user.getAllUser,
    post: user.login,
    '/book': {
      get: function(req, res) {
        res.send('Get a random user/book');
      },
      '/:id': {}
    }
  }
});

// 文件上传
app.post('/fileUpload', (req, res) => test.fileUpload(req, res));

// restful
app.get('/userList', (req, res) => restfulTest.userList(req, res));
