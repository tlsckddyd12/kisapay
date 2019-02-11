var express = require('express');
var app = express();
var session = require('express-session');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/signup', function (req, res) {
    res.render('signup');
})

app.get('/login', function (req, res) {
    res.render('login');
})

app.get('/statements', function (req, res) {
    res.render('statements');
})

app.get('/camera', function (req, res) {
    res.render('camera');
})

var server = app.listen(8080, function(){
    console.log("Express server has started on port 3000")
});


