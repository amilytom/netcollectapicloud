var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// 引入Token验证中间件
const verifyMiddleware = require("./utils/verify");

// 引入路由文件(router文件夹)
var indexRouter = require("./routes/index");
var linkRouter = require("./routes/link");
var groupRouter = require("./routes/group");
var cateRouter = require("./routes/cate");
var userRouter = require("./routes/user");
var authRouter = require("./routes/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.engine("html", require("express-art-template"));
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 定义使用路由-给router分配访问路径
app.use("/", indexRouter);
app.use("/cate", verifyMiddleware.verifyToken, cateRouter);
app.use("/link", verifyMiddleware.verifyToken, linkRouter);
app.use("/group", verifyMiddleware.verifyToken, groupRouter);
app.use("/user", verifyMiddleware.verifyToken, userRouter);
app.use("/auth", verifyMiddleware.verifyToken, authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
