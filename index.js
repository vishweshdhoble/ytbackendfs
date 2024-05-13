const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files });
  });
});

app.post("/create", function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`,req.body.details,function (err) {
        res.redirect("/");
    })
});

app.get("/files/:filename", function (req, res) {
    fs.readFile(`files/${req.params.filename}`,"utf-8",function (err, filedata) {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
        return;
    }
        res.render('show',{filename:req.params.filename,filedatas:filedata});
        console.log(filedata);
    })
});

app.get("/profile/:username", function (req, res) {
  res.send(req.params.username);
});

app.get("/profile/:username/:age", function (req, res) {
  res.send(req.params.age);
});

app.listen(3000, function () {
  console.log("its running");
});
