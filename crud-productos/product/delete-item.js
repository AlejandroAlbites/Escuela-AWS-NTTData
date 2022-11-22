const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.PRODUCTS_TABLE;

exports.handler = async(event) => {
    
    const headers = {
        "Content-type": "application/json"
    }
    let statusCode = 200;
    let body;
    const {id} = event.pathParameters;
  
    try{
        await dynamodb.delete({
            TableName: TABLE_NAME,
            Key: {
              id
            }
          }).promise()
          
       
    } catch(error){
        statusCode = 500;
        body = error.message;
        
    }
    finally {
        body = JSON.stringify(body)
    }
    const response = {
        statusCode,
        body: JSON.stringify({
            status: 'success',
            message: 'item deleted',
        }),
        headers
    };
    return response;
};
