/*
 Navicat Premium Data Transfer

 Source Server         : 本地MYSQL
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : netcollection

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 20/09/2020 10:12:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for coll_auth
-- ----------------------------
DROP TABLE IF EXISTS `coll_auth`;
CREATE TABLE `coll_auth`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `oname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '功能名称',
  `pid` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父级ID',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '权限表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coll_auth
-- ----------------------------
INSERT INTO `coll_auth` VALUES (1, '分类管理', 0, '2020-09-16 18:18:21', NULL);
INSERT INTO `coll_auth` VALUES (2, '链接管理', 0, '2020-09-16 19:18:26', NULL);
INSERT INTO `coll_auth` VALUES (3, '用户管理', 0, '2020-09-17 18:18:30', NULL);
INSERT INTO `coll_auth` VALUES (4, '群组管理', 0, '2020-09-18 18:18:33', NULL);
INSERT INTO `coll_auth` VALUES (7, '1111', 4, '2020-09-19 18:28:08', '2020-09-19 18:28:08');

-- ----------------------------
-- Table structure for coll_cate
-- ----------------------------
DROP TABLE IF EXISTS `coll_cate`;
CREATE TABLE `coll_cate`  (
  `cid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '分类名称',
  `pid` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '上级分类id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `isgood` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0非推荐 1推荐',
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`cid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coll_cate
-- ----------------------------
INSERT INTO `coll_cate` VALUES (1, '前端技术', 0, 0, 0, '2020-09-10 11:46:52', NULL);
INSERT INTO `coll_cate` VALUES (2, 'vue', 1, 0, 1, '2020-09-14 20:07:23', '2020-09-16 20:07:29');
INSERT INTO `coll_cate` VALUES (3, 'react', 1, 0, 1, '2020-09-13 12:07:48', NULL);
INSERT INTO `coll_cate` VALUES (4, 'angular', 1, 0, 0, '2020-09-15 20:08:23', '2020-09-16 20:08:30');
INSERT INTO `coll_cate` VALUES (5, '后端技术', 0, 0, 0, '2020-09-10 20:08:50', '2020-09-14 20:08:53');
INSERT INTO `coll_cate` VALUES (6, 'php', 5, 0, 1, '2020-09-13 20:09:17', NULL);
INSERT INTO `coll_cate` VALUES (7, 'java', 5, 0, 1, '2020-09-11 08:09:35', NULL);
INSERT INTO `coll_cate` VALUES (8, 'aspx', 5, 0, 0, '2020-09-14 13:10:03', '2020-09-15 20:10:21');
INSERT INTO `coll_cate` VALUES (9, '系统技术', 0, 0, 0, '2020-09-09 20:10:55', NULL);
INSERT INTO `coll_cate` VALUES (10, '代码托管', 0, 0, 0, '2020-09-15 20:14:16', NULL);
INSERT INTO `coll_cate` VALUES (11, '网页技术', 0, 0, 1, '2020-09-19 12:23:40', '2020-09-19 12:23:40');

-- ----------------------------
-- Table structure for coll_group
-- ----------------------------
DROP TABLE IF EXISTS `coll_group`;
CREATE TABLE `coll_group`  (
  `role` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '级别',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '组名称',
  `permit` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '权限',
  PRIMARY KEY (`role`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理组' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coll_group
-- ----------------------------
INSERT INTO `coll_group` VALUES (1, '普通用户', '[2,1]');
INSERT INTO `coll_group` VALUES (3, '频道管理员', '[3,2,1]');
INSERT INTO `coll_group` VALUES (10, '超级管理员', '[4,7,3,2,1]');

-- ----------------------------
-- Table structure for coll_link
-- ----------------------------
DROP TABLE IF EXISTS `coll_link`;
CREATE TABLE `coll_link`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '链接id',
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '链接名称',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '链接地址',
  `key` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '关键词',
  `cat` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '分类id 外键',
  `istop` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0非置顶 1置顶',
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '发布时间',
  `updated_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '链接表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coll_link
-- ----------------------------
INSERT INTO `coll_link` VALUES (1, 'github', 'https://github.com/', 'github', 10, 1, '2020-09-15 12:14:40', NULL);
INSERT INTO `coll_link` VALUES (2, 'vue', 'vuejs.com', 'vue', 2, 1, '2020-09-14 20:15:28', NULL);
INSERT INTO `coll_link` VALUES (3, 'b站', 'https://www.bilibili.com/', 'vue,python,java,php', 1, 0, '2020-09-14 12:16:57', '2020-09-16 20:16:54');
INSERT INTO `coll_link` VALUES (4, 'python代码库', 'https://zyk.mingrisoft.com/QuickUse/previewAll/id/30.html', 'python', 5, 0, '2020-09-14 20:17:49', NULL);
INSERT INTO `coll_link` VALUES (5, 'Express 的使用', 'https://www.jianshu.com/p/9dc618cca7f4', 'node,后端技术', 5, 0, '2020-09-09 20:18:37', '2020-09-14 20:18:40');
INSERT INTO `coll_link` VALUES (6, '345', '12345', 'dfd', 2, 1, '2020-09-14 16:20:07', '2020-09-19 16:38:32');
INSERT INTO `coll_link` VALUES (8, '111', '111', '111', 11, 0, '2020-09-19 16:51:17', '2020-09-19 16:51:17');

-- ----------------------------
-- Table structure for coll_user
-- ----------------------------
DROP TABLE IF EXISTS `coll_user`;
CREATE TABLE `coll_user`  (
  `uid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '密码',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '姓名',
  `role` int(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '级别 管理组外键',
  `last_login_at` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  `created_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updated_at` datetime NULL DEFAULT NULL COMMENT '登录时间',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coll_user
-- ----------------------------
INSERT INTO `coll_user` VALUES (1, 'admin', '888', '赵大', 10, '2020-09-20 10:08:09', '2020-09-11 11:30:18', '2020-09-20 10:08:09');
INSERT INTO `coll_user` VALUES (2, 'xming', '222', '小明', 1, '2020-09-20 10:03:10', '2020-09-11 11:36:08', '2020-09-20 10:03:10');
INSERT INTO `coll_user` VALUES (3, 'xhong', '333', '小红', 1, NULL, '2020-09-12 08:31:47', NULL);
INSERT INTO `coll_user` VALUES (4, 'xli', '444', '小李', 3, '2020-09-20 10:10:44', '2020-09-12 09:32:48', '2020-09-20 10:10:44');
INSERT INTO `coll_user` VALUES (5, 'xqian', '222', '小钱', 1, NULL, '2020-09-12 15:33:19', '2020-09-17 22:52:45');
INSERT INTO `coll_user` VALUES (6, 'xfei', '666', '小飞', 1, '2020-09-12 11:33:46', '2020-09-10 11:33:52', '2020-09-13 11:33:56');
INSERT INTO `coll_user` VALUES (8, 'maliu', '666', '马六', 10, NULL, '2020-09-17 22:49:45', '2020-09-18 20:54:05');
INSERT INTO `coll_user` VALUES (11, 'elin', '888', '依琳', 3, NULL, '2020-09-18 20:43:00', '2020-09-18 20:43:00');

SET FOREIGN_KEY_CHECKS = 1;
