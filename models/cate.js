// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 引入user表的model
const UserModel = require("./user");

const LinkModel = require("./link");

// 定义model
const Cate = seque.define(
  "Cate",
  {
    // 主键
    cid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 分类名称
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    // 父分类
    pid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 用户id
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 是否推荐
    isgood: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "coll_cate",
  }
);

// Cate.associate = function () {
//   Cate.belongsTo(UserModel, {
//     foreignKey: "uid",
//     targetKey: "uid",
//     constraints: false,
//   });
//   Cate.hasMany(LinkModel, {
//     foreignKey: "cid",
//     targetKey: "cat",
//     constraints: false,
//   });
// };

Cate.belongsTo(UserModel, {
  as: "user",
  foreignKey: "uid",
  targetKey: "uid",
  constraints: false,
});
// Cate.hasMany(LinkModel, {
//   foreignKey: "cid",
//   sourceKey: "cat",
//   constraints: false,
// });

// 导出model
module.exports = Cate;
