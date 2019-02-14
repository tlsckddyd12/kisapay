var express = require('express');
var app = express();
var session = require('express-session');
var appdata = require('./appdata.json');
var dbconn = require('./routes/database/database');
var request = require('request');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

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

app.get('/auth', function (req, res) {
    res.render('result');
})

app.post('/user/join', function (req, res) {
    var sql = "INSERT INTO "
})


app.get('/authResult', function (req, res) {
    console.log(req.query.code); // *** 중요 *** 이용자의 승인 번호(Authorization Code)입니다. 이 값을 바탕으로 Access Token을 획득합니다.
    console.log(req.query.scope);// 권한 관련 내용을 콘솔에서 확인
    var getTokenURI = 'https://testapi.open-platform.or.kr/oauth/2.0/token'; // 토큰을 받을 수 있는 restful url
    var options = {
        method: 'POST',
        url: getTokenURI,
        headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        form : {
            code : req.query.code,
            client_id : appdata.APIKey, // 발급받은 API 키를 입력해주세요
            client_secret : appdata.APISecret, // 발급받은 API 비밀키를 입력해주세요
            redirect_uri : 'http://localhost:3000/authResult',
            grant_type : 'authorization_code'
        }
    };
    console.log(options.form);
    request(options, function (error, response, body) {
        if (error) {
            console.log(err);
            throw new Error(error);
        }
        console.log();
        var authData = JSON.parse(body)
        res.render('authComplete',{authData : authData});
    });

});

app.get('/camera', function (req, res) {
    res.render('camera');
})

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});


