// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 引入group表的model
const GroupModel = require("./group");

// 定义model
const User = seque.define(
  "User",
  {
    // 主键
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 用户名
    username: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    // 密码
    password: {
      type: Sequelize.STRING(36),
      allowNull: false,
    },
    // 姓名
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    // 角色
    role: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 上次登录时间
    lastLoginAt: {
      type: Sequelize.DATE,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "coll_user",
  }
);

// 导出model
module.exports = User;

// 用户属于用户组，一个用户组包含多个用户，将用户表user和用户组表group进行关联
User.belongsTo(GroupModel, { foreignKey: "role", constraints: false });
