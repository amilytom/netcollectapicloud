var express = require('express');
var router = express.Router();

// 引入自定义的首页controller
const IndexController = require('../controllers/index');
// 定义登录路由，post请求
router.post('/login', IndexController.login);

module.exports = router;
