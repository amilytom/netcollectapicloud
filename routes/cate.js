// 引入express对象
var express = require("express");
// 引入路由对象
var router = express.Router();

// 引入自定义的分类controller
const CateController = require("../controllers/cate");

// 定义分类列表路由，get请求
router.get("/", CateController.list);
// 定义单条分类路由，get请求
router.get("/:cid", CateController.info);
// 定义添加分类路由，post请求
router.post("/", CateController.add);
// 定义修改分类路由，put请求
router.put("/", CateController.update);
// 定义删除分类路由，delete请求
router.delete("/", CateController.remove);

// 导出路由，供app.js调用
module.exports = router;
