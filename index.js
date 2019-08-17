/**
 * Created by vmkde on 6/11/2019.
 */

const device = require ('./device');


module.exports = {

    botcreation : async function (req) {
        try {
            let value = await device.botcreation(req);
            return ({IsSuccess : true, message :`Success`, value :value });
        } catch(err) {
            return({IsSuccess : false, message :`Date-${Date.now()}-Bot creation failed `, exception :err });
        }
    },
    sendToTopic : async function (req) {
        try {
            let value = await device.sendToTopic(req);
            return ({IsSuccess : true, message :`Success`, value :value });
        } catch(err) {
            return({IsSuccess : false, message :`Date-${Date.now()}-Send To Topic failed `, exception :err });
        }
    },
    sfactiveaudience : async function (req) {
        try {
            let value = await device.sfactiveaudience(req);
            return ({IsSuccess : true, message :`Success`, value :value });
        } catch(err) {
            return({IsSuccess : false, message :`Date-${Date.now()}-Smoothflow active audience failed `, exception :err });
        }
    },
    sfchat : async function (req) {
        try {
            let value = await device.sfchat(req);
            return ({IsSuccess : true, message :`Success`, value :value });
        } catch(err) {
            return({IsSuccess : false, message :`Date-${Date.now()}-Smoothflow Chat failed `, exception :err });
        }
    },
    sfnewuser : async function (req) {
        try {
            let value = await device.sfnewuser(req);
            return ({IsSuccess : true, message :`Success`, value :value });
        } catch(err) {
            return({IsSuccess : false, message :`Date-${Date.now()}-Smoothflow New User failed `, exception :err });
        }
    },
    wfcreation : async function (req) {
        try {
            let value = await device.wfcreation(req);
            return ({IsSuccess : true, message :`Success`, value :value });
        } catch(err) {
            return({IsSuccess : false, message :`Date-${Date.now()}-Workflow creation failed `, exception :err });
        }
    },
    wfexec : async function (req) {
        try {
            let value = await device.wfexec(req);
            return ({IsSuccess : true, message :`Success`, value :value });
        } catch(err) {
            return({IsSuccess : false, message :`Date-${Date.now()}-Workflow Execution failed `, exception :err });
        }
    },
    unhandledMessage : async function (req) {
        try {
            let value = await device.unhandledMessage(req);
            return ({IsSuccess : true, message :`Success`, value :value });
        } catch(err) {
            return({IsSuccess : false, message :`Date-${Date.now()}-unhandledMessage update failed `, exception :err });
        }
    },
    cartStatus : async function (req) {
    try {
        let value = await device.cartStatus(req);
        return ({IsSuccess : true, message :`Success`, value :value });
    } catch(err) {
        return({IsSuccess : false, message :`Date-${Date.now()}-cartStatus update failed `, exception :err });
    }
}



};



