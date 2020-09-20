var express = require("express");
var router = express.Router();

// 引入自定义的权限controller
const AuthController = require("../controllers/auth");

// 定义用户列表路由，get请求
router.get("/", AuthController.list);
// 定义单条用户路由，get请求
router.get("/:id", AuthController.info);
// 定义添加用户路由，post请求
router.post("/", AuthController.add);
// 定义修改用户路由，put请求
router.put("/", AuthController.update);
// 定义删除用户路由，delete请求
router.delete("/", AuthController.remove);

module.exports = router;
