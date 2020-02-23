var fs = require('fs')
var notesData = require('../db/db.json')
var notesArray = notesData;


module.exports = function(app){
    
    app.get("/api/notes", function(req, res) {
        console.log(notesData)
    res.json(notesData);
    console.log("exported")
  });   

  app.post("/api/notes", function(req, res) {
    var newNote = (req.body)
    newNote.id = Math.floor(Math.random() * 1000000)
    notesArray.push(newNote)
    console.log(notesArray)
    fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
      res.json(true);
      console.log("posted")
});


app.delete("/api/notes/:id", function(req, res) {
    console.log(req.params)
    // Empty out the arrays of data
    for (let i = 0; i < notesData.length; i++) {
        
        if(notesData[i].id === parseInt(req.params.id))
        {
            notesData.splice(i, 1);
            fs.writeFile('./db/db.json', JSON.stringify(notesData), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });
        }
        
    }
    
    // notesArray.length = 0;
    
    res.json({ ok: true });
  });
};




