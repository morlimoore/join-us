let express = require('express');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vikkidchamp',
    database: 'project'
});

connection.connect();


app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM users';
    connection.query(q, function(error, results) {
        if (error) throw error;
        let count = results[0].count;
        // let msg = 'We have ' + results[0].count + ' users.';
        res.render('home', {count});
    });
});

app.post("/register", function(req, res) {
    connection.query('INSERT INTO users SET ?', { email:  req.body.email }, function(err, result) {
        if (err) throw new Error ('There is an error!');
        res.redirect('/')
    })
})

app.listen(8080, function () {
 console.log('App listening on port 8080!');
});