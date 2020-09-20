// 引入公共方法
const Common = require("../utils/common");
// 引入group表的model
const GroupModel = require("../models/group");
// 引入常量
const Constant = require("../constant/constant");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// 配置对象
let exportObj = {
  list,
  info,
  update,
};
// 导出对象，供其它模块调用
module.exports = exportObj;

// 获取用户组列表方法
function list(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.query, [], cb);
    },
    // 查询方法
    query: [
      "checkParams",
      (results, cb) => {
        let whereCondition = {};
        // 如果查询角色名称存在，查询对象增加角色名称
        if (req.query.name) {
          whereCondition.name = { [Op.like]: `%${req.query.name}%` }; //模糊查询
        }
        GroupModel.findAll({ where: whereCondition })
          .then(function (result) {
            // 查询结果处理
            // 定义一个空数组list，用来存放最终结果
            let list = [];
            console.log(result);
            // 遍历SQL查询出来的结果，处理后装入list
            result.forEach((v, i) => {
              let obj = {
                role: v.role,
                name: v.name,
                permit: v.permit,
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

// 获取单条用户组方法
function info(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.params, ["role"], cb);
    },
    // 查询方法，依赖校验参数方法
    query: [
      "checkParams",
      (results, cb) => {
        // 使用cate的model中的方法查询
        GroupModel.findByPk(req.params.role)
          .then(function (result) {
            // 查询结果处理
            // 如果查询到结果
            if (result) {
              // 将查询到的结果给返回对象赋值
              resObj.data = {
                role: result.role,
                name: result.name,
                permit: result.permit,
              };
              // 继续后续操作
              cb(null);
            } else {
              // 查询失败，传递错误信息到async最终方法
              cb(Constant.GROUP_NOT_EXSIT);
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

// 修改用户组方法
function update(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法，成功继续后面操作，失败则传递错误信息到async最终方法
      Common.checkParams(req.body, ["role", "name", "permit"], cb);
    },
    // 更新方法，依赖校验参数方法
    update: (cb) => {
      // 使用cate的model中的方法更新
      GroupModel.update(
        {
          name: req.body.name,
          permit: req.body.permit,
        },
        {
          where: {
            role: req.body.role,
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
            cb(Constant.GROUP_NOT_EXSIT);
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
