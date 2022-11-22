const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.PRODUCTS_TABLE;

exports.handler = async(event) => {
    const {Nombre} = JSON.parse(event.body);
    const headers = {
        "Content-type": "application/json"
    }
    let statusCode = 200;
    let body;
    const {id} = event.pathParameters;
  
    try{
        body = await dynamodb.update({
            TableName: TABLE_NAME,
            Key: {
              id
            },
            UpdateExpression: "set Nombre = :Nombre",
            ExpressionAttributeValues: {
                ":Nombre": Nombre
            },
            ReturnValues: "ALL_NEW",
          }).promise()
          
       
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
