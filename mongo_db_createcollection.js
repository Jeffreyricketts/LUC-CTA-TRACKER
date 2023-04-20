var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
/* Need to figure out appropriate connection url for website */

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("luc_db")
  dbo.createCollection("Users", function(err, res){
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});