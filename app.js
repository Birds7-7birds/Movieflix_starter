/*
 Authors:
 Your name and student #:Xavier El Chantiry A01229374
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");



let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));



app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/", (req, res) => {

  let theHTML = "";
  let mvSTR = req.body;
  let mvList = mvSTR["rawmovie"].toString().split(",");
  mvList.forEach(name => {theHTML +=`<label class="todo-list__label">
  <input type="checkbox" name="" id="" />
  <i class="check"></i>
  <span>${name}</span>
</label>`})
res.send(`
<div class="header"><span class="subheader">Hi John,</span><br> <span class="subheader"> Welcome back 🍿</span></div>
  <div class="container">
<link
href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&display=swap"
rel="stylesheet">
<link rel="stylesheet" href="style.css">
<form>
<fieldset class="todo-list">
${theHTML}
</fieldset>
</form>
</div>
</body>`)
});


app.get("/myListQueryString", (req, res) => {
  
  console.log(req.query)
  let qSTring = req.query
  Object.keys(qSTring).forEach(key => {theHTML +=`<label class="todo-list__label">
  <input type="checkbox" name="" id="" />
  <i class="check"></i>
  <span>${qSTring[key]}</span>
</label>`})
  res.send(`
  <div class="header"><span class="subheader">Hi John,</span><br> <span class="subheader"> Welcome back 🍿</span></div>
    <div class="container">
  <link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&display=swap"
  rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <form>
  <fieldset class="todo-list">
  ${theHTML}
  </fieldset>
  </form>
  </div>
  </body>`)
});

app.get("/search/:movieName", (req, res) => {
  let serachCrit = req.params
  console.log(serachCrit)
  let name = `no movie has the name ${Object.values(serachCrit)}`
  let dis = 'No where to be found'
  fs.readFile('movieDescriptions.txt', 'utf8', (err,data) => {
    let rawOpt = data
    let listOpt = rawOpt.split('\n')
    listOpt.forEach(nameDis => {
      let nameNdis = nameDis.split(':')
      if (Object.values(serachCrit).toString().toLowerCase() == nameNdis[0].toLowerCase() ){
        name = nameNdis[0]
        dis = nameNdis[1]
      }
    })
  res.render("pages/searchResult", {result: name, descript: dis})
  })
  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});