// 引入express对象
var express = require("express");
// 引入路由对象
var router = express.Router();

// 引入自定义的用户组controller
const GroupController = require("../controllers/group");

// 定义用户组列表路由，get请求
router.get("/", GroupController.list);
// 定义单个用户组路由，get请求
router.get("/:role", GroupController.info);
// 定义修改用户组路由，put请求
router.put("/", GroupController.update);

// 导出路由，供app.js调用
module.exports = router;
