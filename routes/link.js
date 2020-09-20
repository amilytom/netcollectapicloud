// 引入express对象
var express = require('express');
// 引入路由对象
var router = express.Router();

// 引入自定义的用户组controller
const LinkController = require('../controllers/link');

// 定义用户组列表路由，get请求
router.get('/', LinkController.list);
// 定义单条分类路由，get请求
router.get('/:id', LinkController.info);
// 定义添加分类路由，post请求
router.post('/', LinkController.add);
// 定义修改分类路由，put请求
router.put('/', LinkController.update);
// 定义删除分类路由，delete请求
router.delete('/', LinkController.remove);


// 导出路由，供app.js调用
module.exports = router;
