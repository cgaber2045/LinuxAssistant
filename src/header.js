// https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/develop-your-first-skill.html
const Alexa = require('ask-sdk-core');
var AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({region: 'us-east-1'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queue_url = process.env.QUEUE_URL;

// Used to send commands to the SQS server.
const sendCommand = async command => {
  const params = {MessageBody: command, QueueUrl: queue_url};
  // Creating the message to send to the SQS server!
  const request = sqs.sendMessage(params);
  const result = await request.promise();
  if(result) console.log("Message queued to SQS successfully : ", result.MessageId);
  else console.log("Message queued failed");
};


