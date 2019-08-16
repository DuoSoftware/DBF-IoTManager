/**
 * Created by vmkde on 6/11/2019.
 */
var awsIot = require('aws-iot-device-sdk');
const messageFormatter = require('dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js');
const config = require('config');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//
var device = awsIot.device({
    keyPath: config.CertPath.keyPath,
    certPath: config.CertPath.certPath,
    caPath: config.CertPath.caPath,
    clientId: config.CertPath.clientId,
    //region: 'us-east-1',
    debug: config.CertPath.debug,
    host: config.CertPath.host
});


//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
let OnlineSate = false;

device.on('connect', function() {
    //console.log('connected to AWS');
    device.subscribe('notifications/1');
    device.publish('notification/1', JSON.stringify({ 'AWS IoT Notification server': 1}));
    OnlineSate = true
});

device.on('disconnect', function() {
    //console.log('connected to AWS');
    OnlineSate = false
});

device.on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
});

device.on('error', function(error) {
    console.log(`message ${error}`);
});

device.on('reconnect', function() {
    //console.log(`reconnected`);
    OnlineSate = true
});


module.exports.sendToTopic =  (req , res) => {

    //console.log("DBF-AWSIoTService sendToTopic");

    return new Promise(function(resolve, reject) {

        let date = new Date();
        req.data.timestamp = date.getTime();

        if(OnlineSate === true){
            device.publish(req.topic, JSON.stringify(req.data), {qos: 1}, function(err, success){

                if(success){
                    //console.log(success);
                    resolve(success);
                }
                else if (err){
                    console.log(err);
                    reject(err);
                }
            });


        }
    });

};

module.exports.unhandledMessage =  async (req) => {

    //console.log("DBF-AWSIoTService wfexec");
    req.topic = `dashboard/unhandledmessage/${req.partitionKey}`;
    return await send(req);

};

module.exports.wfexec =  async (req) => {

    //console.log("DBF-AWSIoTService wfexec");
    req.topic = `dashboard/sfexec/${req.partitionKey}`;
    return await send(req);

};

module.exports.wfcreation =  async (req) => {

    //console.log("DBF-AWSIoTService wfcreation");
    req.topic = `dashboard/wfcreation/${req.partitionKey}`;
    return await send(req);

};

module.exports.sfchat =  async (req) => {

    //console.log("DBF-AWSIoTService sfchat");
    req.topic = `dashboard/sfchat/${req.partitionKey}`;
    return await send(req);

};

module.exports.sfactiveaudience =  async (req) => {

    //console.log("DBF-AWSIoTService sfactiveaudience");
    req.topic = `dashboard/sfactiveaudience/${req.partitionKey}`;
    return await send(req);

};

module.exports.sfnewuser =  async (req) => {

    //console.log("DBF-AWSIoTService wfexec");
    req.topic = `dashboard/sfnewuser/${req.partitionKey}`;
    return await send(req);

};

module.exports.botcreation = async (req) => {

    console.log("DBF-AWSIoTService wfexec");
    req.topic = `dashboard/botcreation/${req.partitionKey}`;
    return await send(req);

};




function send(req)  {


    return new Promise(function(resolve, reject) {
        let date = new Date();
        let timestamp = date.getTime();

        req.data.timestamp = timestamp.toString();


        if(OnlineSate === true){
            device.publish(req.topic, JSON.stringify(req.data), {qos: 1}, function(err, success){

                if(success){
                    resolve(success);
                }
                else if (err){
                    console.log(err);
                    reject(err);
                }
            });


        }
        else {
            reject(OnlineSate)
        }
    });




}
