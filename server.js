var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Walletdb";

// MongoClient.connect(url, function(err, db){
// 	if (err) throw err;
// 	console.log("Database Created")
// 	db.close();
// });

// MongoClient.connect(url, function(err, db){
// 	if (err) throw err;
// 	var dbo = db.db("Walletdb");
// 	dbo.createCollection("Users", function(err, res){
// 		if (err) throw err;
// 		console.log("Collection Created")
// 		db.close();
// 	})
// })
function User (username, password, privkey, address){
	this.username = // from signup
	this.password = // from signup
	this.privkey = // from signup
	this.address = // from signup
}

MongoClient.connect(url, function(err, db){
	if (err) throw err{}
		var dbo = db.db("Walletdb");
		var newUser = new User() 
})