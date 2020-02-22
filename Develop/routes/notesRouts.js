var fs = require('fs')
var notesData = require("../db/db");

module.exports = function(app){
var notes = fs.readFile('./db/db.json', "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });

app.get("/api/db", function(req, res) {
    res.json(notes);
  });   

  app.post("/api/db", function(req, res) {
    notesData.push(req.body);
      res.json(true);
      console.log("posted")
});
console.log(JSON.stringify(notes))
}

