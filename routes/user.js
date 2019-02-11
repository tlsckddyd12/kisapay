var express = require('express');
var router = express.Router();
var dbconn = require('../database/database');
var async = require('async');
var request = require('request');
var settingData = require('./dataset.json');

router.post('/auth', function (req, res) {
    var options = {
        method: 'GET',
        url: settingData.url + '/oauth/2.0/oauth/2.0/authorize2',
        headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + settingData.quiryToken
            },
        form: {
            fintech_use_num: settingData.finNum,
            tran_dtime: "20160310101921"
        }
    };
    request(options, function (error, response, body) {
        if (error) {
            throw new Error(error);
        }
    });
})


module.exports = router;
