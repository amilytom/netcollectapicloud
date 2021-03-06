// 引入公共方法
const Common = require("../utils/common");
// 引入cate表的model
const LinkModel = require("../models/link");

// 引入cate表的model
const CateModel = require("../models/cate");

// 引入user表的model
const UserModel = require("../models/user");

// 引入常量
const Constant = require("../constant/constant");
// 引入dateformat包
const dateFormat = require("dateformat");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// 配置对象
let exportObj = {
  list,
  info,
  add,
  update,
  remove,
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 获取链接列表方法
function list(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.query, ["page", "rows"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 如果没传入，分页查询
        // 根据前端提交参数计算SQL语句中需要的offset，即从多少条开始查询
        let offset = req.query.rows * (req.query.page - 1) || 0;
        // 根据前端提交参数计算SQL语句中需要的limit，即查询多少条
        let limit = parseInt(req.query.rows) || 20;
        // 设定一个查询条件对象
        let whereCondition = {};
        let whereUid = {};
        // 如果查询标题存在，查询对象增加标题字段
        if (req.query.title) {
          whereCondition.title = { [Op.like]: `%${req.query.title}%` };
        }
        // 如果查询关键词存在，查询对象增加关键词
        if (req.query.key) {
          whereCondition.key = { [Op.like]: `%${req.query.key}%` };
        }
        if (req.query.cat) {
          whereCondition.cat = req.query.cat;
        }
        if (req.query.uid) {
          whereUid.uid = req.query.uid;
        }
        searchOption = {
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [["created_at", "DESC"]],
          // 关联cate表进行联表查询
          include: [
            {
              model: CateModel,
              attributes: ["cid", "name", "uid"],
              where: whereUid,
              include: [
                {
                  model: UserModel,
                  as: "user",
                  attributes: ["uid", "username", "name"],
                },
              ],
            },
          ],
        };
        // 通过offset和limit使用cate的model去数据库中查询，并按照创建时间排序
        LinkModel.findAndCountAll(searchOption)
          .then(function (result) {
            // 查询结果处理
            // 定义一个空数组list，用来存放最终结果
            let list = [];
            // 遍历SQL查询出来的结果，处理后装入list
            result.rows.forEach((v, i) => {
              let obj = {
                id: v.id,
                title: v.title,
                url: v.url,
                key: v.key,
                cat: v.cat,
                istop: v.istop,
                // 联表读取Cate表中的cid
                cid: v.Cate.cid,
                catename: v.Cate.name,
                //11uid: v.Cate.user.uid,
                createdAt: dateFormat(v.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              list.push(obj);
            });
            // 给返回结果赋值，包括列表和总条数
            resObj.data = {
              list,
              count: result.count,
            };
            // 继续后续操作
            cb(null);
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 获取单条链接方法
function info(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.params, ["id"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 使用cate的model中的方法查询
        LinkModel.findByPk(req.params.id)
          .then(function (result) {
            // 查询结果处理
            // 如果查询到结果
            if (result) {
              // 将查询到的结果给返回对象赋值
              resObj.data = {
                id: result.id,
                title: result.title,
                url: result.url,
                key: result.key,
                cat: result.cat,
                istop: result.istop,
                createdAt: dateFormat(result.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              // 继续后续操作
              cb(null);
            } else {
              // 查询失败，传递错误信息到async最终方法
              cb(Constant.LINK_NOT_EXSIT);
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err);
            // 传递错误信息到async最终方法
            cb(Constant.DEFAULT_ERROR);
          });
      },
    ],
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 添加链接方法
function add(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.body, ["title", "url", "key", "cat", "istop"], cb);
    },
    // 添加方法，依赖校验参数方法
    add: (cb) => {
      // 使用cate的model中的方法插入到数据库
      LinkModel.create({
        title: req.body.title,
        url: req.body.url,
        key: req.body.key,
        cat: req.body.cat,
        istop: req.body.istop,
      })
        .then(function (result) {
          // 插入结果处理
          // 继续后续操作
          cb(null);
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 修改链接方法
function update(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(
        req.body,
        ["id", "title", "url", "key", "cat", "istop"],
        cb
      );
    },
    // 更新方法，依赖校验参数方法
    update: (cb) => {
      // 使用cate的model中的方法更新
      LinkModel.update(
        {
          title: req.body.title,
          url: req.body.url,
          key: req.body.key,
          cat: req.body.cat,
          istop: req.body.istop,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
        .then(function (result) {
          // 更新结果处理
          if (result[0]) {
            // 如果更新成功
            // 继续后续操作
            cb(null);
          } else {
            // 更新失败，传递错误信息到async最终方法
            cb(Constant.LINK_NOT_EXSIT);
          }
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}

// 删除链接方法
function remove(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.body, ["id"], cb);
    },
    // 删除方法，依赖校验参数方法
    remove: (cb) => {
      // 使用cate的model中的方法更新
      LinkModel.destroy({
        where: {
          id: req.body.id,
        },
      })
        .then(function (result) {
          // 删除结果处理
          if (result) {
            // 如果删除成功
            // 继续后续操作
            cb(null);
          } else {
            // 删除失败，传递错误信息到async最终方法
            cb(Constant.LINK_NOT_EXSIT);
          }
        })
        .catch(function (err) {
          // 错误处理
          // 打印错误日志
          console.log(err);
          // 传递错误信息到async最终方法
          cb(Constant.DEFAULT_ERROR);
        });
    },
  };
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj);
}
