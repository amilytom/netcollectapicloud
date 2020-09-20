// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 定义model
const Auth = seque.define(
  "Auth",
  {
    // 主键
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 权限名称
    oname: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    // 父分类
    pid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "coll_auth",
  }
);

// 导出model
module.exports = Auth;
