// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const log = require('lambda-log');
const AWS = require('aws-sdk');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */


//sample function to test configuration
exports.lambdaHandler = async (event, context) => {

    log.debug("event is " + event);
    console.log(event);
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

/*
Two functions required for the site:
1.submit form
2.retrieve all 'approved' items from database

DB format: (Single Table)
Primary key:- UID+Date
Item 1 -> Submitted Item ->
{
    "Contact":"",
    "Name":"",
    "Email":"",
    "Date":"",
    "Approved":"No",

    "Where":"",
    "What":"",
    "Description":"",
    "Quantity":"",
    "Requirement":true/false
}

*/

const crypto = require('crypto')
const generateUUID = () => crypto.randomBytes(16).toString("hex");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.submitItem = async (event, context) => {

    //TODO :- implement 'requirement' logic
    //parse event.body

    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'hello world',
            // location: ret.data.trim()
        }),
    }

    response["headers"] = {
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*' 
    }

    let input_obj = event.body;
    input_obj = input_obj.replace(/\r?\n|\r/g, "");
    console.log(input_obj);
    input_obj = JSON.parse(input_obj);
    log.info(input_obj);

    let date = new Date().toUTCString();

    let user_obj = {
        uid: generateUUID(),
        Timestamp: Date.now().toString(),
        contact: input_obj.contact,
        name: input_obj.name,
        email: input_obj.email,
        date: date,
        Approved: false,
        Where: input_obj.where,
        What: input_obj.what,
        Description: input_obj.Description,
        Quantity: input_obj.Quantity,
        Requirement: input_obj.Requirement
    }

    var params = {
        TableName: 'PhConnector',
        Item: user_obj
    };

    try {
        var data = await documentClient.put(params).promise();
        console.log("Success", data);
        response.statusCode = 200;
        response.body = JSON.stringify("Success YAY");

    } catch (err) {
        console.log("Error", err);
        response.statusCode = 505;
        response.body = JSON.stringify(err);
    }

    return response;

}

/*

Item 2 -> Verified Item ->
{
    "Contact":"",
    "Name":"",
    "Email":"",
    "Date":"",
    "Approved":"",

    Where "Location":"",
    Custom "Item/Service":"",
    Quantity "Availability":""
}
*/


exports.getVerifiedItems = async (event, context) => {
    
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'hello world',
            // location: ret.data.trim()
        }),
    }

}