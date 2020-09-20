// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 定义model
const Group = seque.define(
  "Group",
  {
    // 主键
    role: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    // 分类名称
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    // 父分类
    permit: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "coll_group",
    createdAt: false,
    updatedAt: false,
  }
);

// 导出model
module.exports = Group;
