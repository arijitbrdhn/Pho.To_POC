const path = require('path')
    , fs = require('fs')
    , Config = require('config')
    , Boom = require('@hapi/boom')
    , express = require('express')
    , crypto = require('crypto')
    , to_json =  require('xmljson').to_json
    , request = require('request');

const Response = require('../models/response')
    , middleware = require('../services/middleware')
    , root = path.normalize(`${__dirname}/../../../..`)
    , appId = Config.get('appid')
    , key = Config.get('key')
    , baseUrl = Config.get('baseUrl');

class SignatureController {

    static getHash(string, key){
        var hmac = crypto.createHmac('sha1', key);
        hmac.update(string); 
        return hmac.digest('hex'); 
    }

  
    async imageAccess(req, res) {
        let { id } = req.params;
        console.log('imgsArr', req.params)

        request.post({
            url:`${baseUrl}getresult`,
            method:"GET",
            qs: { request_id: id }
        }, function(error, response, body){
            // console.log('1',response.statusCode);
            // console.log('2',body); 
            // console.log('3',error);
            to_json(body, function (err, result) {
                if (err) {
                    return res.status(200).json({ message: 'An internal server error occurred', error: 'Internal Server Error', statusCode: 500 });
                }
                if(result.image_process_response && result.image_process_response.status !== 'OK'){
                    return res.status(200).json({ message: `${result.image_process_response.description}`, error: `${result.image_process_response.status}`, statusCode: `${result.image_process_response.err_code}` });
                }
                console.log("result", result);
                return res.json(new Response(result, 'Request fetched')); 
            });
        });
    }


    async imageProcess(req, res) {
        let {imgsArr,methodsArr} = req.body;

        let string = middleware.documentXml(imgsArr,methodsArr)
        ,   result = SignatureController.getHash(string, key)
        ,   dataString = `app_id=${appId}&sign_data=${result}&data=${string}`;

        request.post({
            url:`${baseUrl}addtask`,
            method:"POST",
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
            body: dataString
        }, function(error, response, body){
            // console.log('1',response.statusCode);
            // console.log('2',body); 
            // console.log('3',error);
            to_json(body, function (err, result) {
                if (err) {
                    return res.status(200).json({ message: 'An internal server error occurred', error: 'Internal Server Error', statusCode: 500 });
                }
                if(result.image_process_response && result.image_process_response.status !== 'OK'){
                    return res.status(200).json({ message: `${result.image_process_response.description}`, error: `${result.image_process_response.status}`, statusCode: `${result.image_process_response.err_code}` });
                }
                console.log("result", result);
                return res.json(new Response(result, 'Request registered')); 
            });
        });
    }

}

module.exports = new SignatureController();
