
var ConnectDB = function(){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'panorama'
    });

    connection.connect(function(err) {
        if(!err) {
            console.log("Database is connected ... nn");
        } else {
            console.log("Error connecting database ... nn");
        }
    });
    return connection;

}

var test = function(){
    return "TESTESTEST";
}

module.exports.Conn=ConnectDB();