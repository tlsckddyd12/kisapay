var express = require('express');
var app = express();
var session = require('express-session');
var appdata = require('./appdata.json');
var dbconn = require('./routes/database/database');
var request = require('request');
var moment = require('moment');
var cors = require('cors');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

var accessKey = "6ec4ddec-8174-43a9-ab31-7629f992f3fc";
var refreash = "ce5f7f8a-1d6c-47b6-b3f5-d43b4d7fa0e9";
var userNum = "1100034736";


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

})

app.post('/')


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

app.get('/authAk', function (req, res) {
    var getTokenURI = 'https://testapi.open-platform.or.kr/oauth/2.0/token'; // 토큰을 받을 수 있는 restful url
    var options = {
        method: 'POST',
        url: getTokenURI,
        headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        form : {
            code : '398f71b4-156a-4921-9662-0bfc8a5d6948',
            client_id : appdata.APIKey, // 발급받은 API 키를 입력해주세요
            client_secret : appdata.APISecret, // 발급받은 API 비밀키를 입력해주세요
            redirect_uri : 'http://127.0.0.1:3000/authResult',
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
})

app.get('/camera', function (req, res) {
    res.render('camera');
})

app.get('/getData', function (req, res) {
    var getUserDataURI = 'https://testapi.open-platform.or.kr/user/me?user_seq_no='+userNum; // 토큰을 받을 수 있는 restful url
    var options = {
        url: getUserDataURI,
        method : 'GET',
        headers: {
            'Authorization' : 'Bearer '+accessKey
        }
    };

    request(options, function (error, response, body) {
        console.log(JSON.parse(body));
        res.json(JSON.parse(body));
    })


})

app.get('/getBalance', function (req, res) {
    var getUserDataURI = 'https://testapi.open-platform.or.kr/account/balance?fintech_use_num=199003328057724253977191&tran_dtime=20190218204400'; // 토큰을 받을 수 있는 restful url
    var options = {
        url: getUserDataURI,
        method : 'GET',
        headers: {
            'Authorization' : 'Bearer '+accessKey
        }
    };
    request(options, function (error, response, body) {
        console.log(JSON.parse(body));
    })

})

app.get('/getAccountList', function (req, res) {
    var getUserDataURI = 'https://testapi.open-platform.or.kr/v1.0/account/list?user_seq_no=1100034736&include_cancel_yn=Y&sort_order=D'; // 토큰을 받을 수 있는 restful url
    var options = {
        url: getUserDataURI,
        method : 'GET',
        headers: {
            'Authorization' : 'Bearer 7830876a-ccfa-45b3-912b-f018e3b955e9'
        }
    };
    request(options, function (error, response, body) {
        console.log(JSON.parse(body));
    })

})



app.post('/join', function (req, res) {
    var userid = req.body.userId;
    var name = req.body.name;
    var pwd = req.body.pwd;
    var use_num = req.body.use_num;
    var AT = req.body.accessToken;
    var refreshToken = req.body. refreshToke;

    var sql = "INSERT INTO member (name, id, password,use_num, userAccessToken) VALUES (?,?,?,?,?)";
    dbconn.pool.getConnection(function (err, conn) {
        if(err){
            console.error(err);
            throw err;
        }
        else {
            conn.query(sql, [name, userid, pwd, AT, use_num], function (err, result) {
                if(err){
                    console.error(err);
                    throw err;
                }
                else{
                    console.log(result);
                    conn.release();
                    res.json(1);
                }
            })
        }
    })
})


var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});


