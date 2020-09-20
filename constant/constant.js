// 定义一个返回对象
const obj = {
  // 默认请求成功
  DEFAULT_SUCCESS: {
    code: 10000,
    msg: "请求成功",
  },
  // 默认请求失败
  DEFAULT_ERROR: {
    code: 188,
    msg: "系统错误-请求失败",
  },
  // 定义错误返回-缺少必要参数
  LACK: {
    code: 199,
    msg: "缺少必要参数",
  },
  // 定义错误返回-Token验证失败
  TOKEN_ERROR: {
    code: 401,
    msg: "Token验证失败",
  },
  // 定义错误返回-服务器拒绝地址请求
  DEFAULT_REFUSE: {
    code: 403,
    msg: "禁止访问",
  },
  // 定义错误返回-无法找到文件
  DEFAULT_NotFOUND: {
    code: 404,
    msg: "无法找到文件",
  },
  // 定义错误返回-资源被禁止
  DEFAULT_NotALLOWED: {
    code: 405,
    msg: "资源被禁止",
  },
  // 定义错误返回-访问超时
  DEFAULT_TIMEOUT: {
    code: 504,
    msg: "访问超时",
  },
  // 定义错误返回-用户名或密码错误
  LOGIN_ERROR: {
    code: 101,
    msg: "用户名或密码错误",
  },
  // 定义错误返回-用户不存在
  USER_NOT_EXSIT: {
    code: 102,
    msg: "用户不存在",
  },
  // 定义错误返回-管理组不存在
  GROUP_NOT_EXSIT: {
    code: 103,
    msg: "管理组不存在",
  },
  // 定义错误返回-链接不存在
  LINK_NOT_EXSIT: {
    code: 104,
    msg: "链接不存在",
  },
  // 定义错误返回-分类不存在
  CATE_NOT_EXSIT: {
    code: 105,
    msg: "分类不存在",
  },
  // 定义错误返回-用户分类关系ID不存在
  AUTH_NOT_EXSIT: {
    code: 106,
    msg: "权限ID不存在",
  },
};
// 导出对象，给其他方法调用
module.exports = obj;
