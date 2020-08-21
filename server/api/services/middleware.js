const Boom = require('@hapi/boom')
    , path = require('path')
    , Config = require('config')
    , axios = require('axios')
    , fs = require('fs');

const root = path.normalize(`${__dirname}/../../../..`);

const documentXml = (imgsArr,methodsArr) => {
    let string = `<image_process_call>`;

    for(let i=0; i<imgsArr.length; i++){
        string = string + `<image_url order="${i+1}">${imgsArr[i]}</image_url>`;
    }
    string = string + `<methods_list>`;
    
    for(let j=0; j<methodsArr.length; j++){
        string = string + `<method order="${j+1}"> <name>${methodsArr[j].method}</name> 
            <params>${methodsArr[j].param}</params></method>`;
    }
    string = string + `</methods_list></image_process_call>`;

    console.log('xmllll',string)
    return string
}




module.exports = {
    documentXml,
};
