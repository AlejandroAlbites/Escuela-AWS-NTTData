const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

const TABLE_NAME = process.env.PRODUCTS_TABLE;

exports.handler = async (event) => {
    
  const requestJSON = JSON.parse(event.body);
   
  const params = {
    TableName: TABLE_NAME,
    Item: {
        ...requestJSON
    },
  };  

  const headers = {
        "Content-type": "application/json"
    }
    let statusCode = 200;
    let body;
    try{
        await dynamodb.put(params).promise();
        body = requestJSON
        
    } catch(error){
        statusCode = 500;
        body = error.message;
        
    } finally {
        body = JSON.stringify(body)
    }
    const response = {
        statusCode,
        body,
        headers
    };
    return response;
};