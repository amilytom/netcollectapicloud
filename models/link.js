// 引入Sequelize模块
const Sequelize = require("sequelize");
// 引入数据库实例
const seque = require("../utils/seque");

// 引入cate表的model
const CateModel = require("./cate");

// 定义model
const Link = seque.define(
  "Link",
  {
    // 主键
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 链接标题
    title: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    // 链接网址
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // 关键词
    key: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    // 用户分类关系表ID
    cat: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // 是否置顶
    istop: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    // 是否支持驼峰
    underscored: true,
    // mysql数据库表名
    tableName: "coll_link",
  }
);

// 导出model
module.exports = Link;

// 链接属于分类表，一个分类表包含多个链接，将链接表link和分类表cate进行关联
Link.belongsTo(CateModel, { foreignKey: "cat", constraints: false });
