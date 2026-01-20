const AWS = require('aws-sdk');

const translate = new AWS.Translate({ apiVersion: '2017-07-01' });

// CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
};

exports.handler = (event, context, callback) => {
  console.log("event: ", JSON.stringify(event));
  
  // Handle CORS preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    callback(null, {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    callback(null, {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    });
    return;
  }

  let params = {
    SourceLanguageCode: payload.sourceLang,
    TargetLanguageCode: payload.targetLang,
    Text: payload.content,
  };
  console.log("parameters: " + JSON.stringify(params));

  translate.translateText(
    params,
    function(error, response) {
      if (error) {
        console.log(error);
        callback(null, {
          statusCode: 500,
          headers: corsHeaders,
          body: JSON.stringify(error)
        });
      }
      else {
        console.log('response ' + JSON.stringify(response));
        callback(null, {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(response)
        });
      }
    }
  );
};
