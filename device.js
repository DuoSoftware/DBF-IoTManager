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
        req.body.data.timestamp = date.getTime();

        if(OnlineSate === true){
            device.publish(req.body.topic, JSON.stringify(req.body.data), {qos: 1}, function(err, success){

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


module.exports.wfexec =  async (req) => {

    //console.log("DBF-AWSIoTService wfexec");
    req.body.topic = `dashboard/sfexec/${req.body.partitionKey}`;
    return await send(req);

};

module.exports.wfcreation =  async (req) => {

    //console.log("DBF-AWSIoTService wfcreation");
    req.body.topic = `dashboard/wfcreation/${req.body.partitionKey}`;
    return await send(req);

};

module.exports.sfchat =  async (req) => {

    //console.log("DBF-AWSIoTService sfchat");
    req.body.topic = `dashboard/sfchat/${req.body.partitionKey}`;
    return await send(req);

};

module.exports.sfactiveaudience =  async (req) => {

    //console.log("DBF-AWSIoTService sfactiveaudience");
    req.body.topic = `dashboard/sfactiveaudience/${req.body.partitionKey}`;
    return await send(req);

};

module.exports.sfnewuser =  async (req) => {

    console.log("DBF-AWSIoTService wfexec");
    req.body.topic = `dashboard/sfnewuser/${req.body.partitionKey}`;
    return await send(req);

};

module.exports.botcreation = async (req) => {

    console.log("DBF-AWSIoTService wfexec");
    req.body.topic = `dashboard/botcreation/${req.body.partitionKey}`;
    return await send(req);

};




function send(req)  {


    return new Promise(function(resolve, reject) {
        let date = new Date();
        let timestamp = date.getTime();

        req.body.data.timestamp = timestamp.toString();


        if(OnlineSate === true){
            device.publish(req.body.topic, JSON.stringify(req.body.data), {qos: 1}, function(err, success){

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
