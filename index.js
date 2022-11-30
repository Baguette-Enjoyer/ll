const express = require("express");
const app = express();
const expressHbs = require("express-handlebars");

app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partial",
    defaultLayout: "layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

app.use(express.static(__dirname + "/Handlebars-StaticFiles"));
app.get("/", (req, res) => {
  res.render("index", { title: "Jeopardize Contest" });
});
app.get("/task1", (req, res) => {
  let { emotions } = require("./models/data.js");
  let title = req.query.title;
  let quotePath =
    title != null
      ? emotions.filter((item) => item.title == title)[0].quotePath
      : "images/task1/default.jpg";
  res.locals.emotions = emotions;
  res.locals.quotePath = quotePath;
  res.render("task1", { title: "Inspiring Quotes" });
});
app.get("/task2", (req, res) => {
  let salary = req.query.salary || 0;
  let jar55 = salary * 0.55;
  let jar10 = salary * 0.1;
  let jar5 = salary * 0.05;
  let jars = [jar55, jar10, jar5];
  res.locals.jar55 = jar55.toLocaleString("vn-VN", {
    style: "currency",
    currency: "VND",
  });
  res.locals.jar10 = jar10.toLocaleString("vn-VN", {
    style: "currency",
    currency: "VND",
  });
  res.locals.jar5 = jar5.toLocaleString("vn-VN", {
    style: "currency",
    currency: "VND",
  });
  res.render("task2", { title: "Jars Saving", jars });
});
app.get("/task3", (req, res) => {
  res.render("task3", { title: "TV Sales" });
});
app.get("/task4", (req, res) => {
  let { zodiacs } = require("./models/data.js");
  res.locals.zodiacs = zodiacs;
  res.render("task4", { title: "Zodiac Characteristics" });
});
app.get("/task4-details", (req, res) => {
  let { zodiacs } = require("./models/data.js");
  let detailName = req.query.name;
  console.log(detailName);
  let filtered = zodiacs.filter((item) => item.name == detailName);
  res.locals.zodiacs = filtered;

  res.render("task4-details", { title: "Zodiac Characteristics" });
});
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}`);
});
