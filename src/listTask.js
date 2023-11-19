const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()
module.exports.listTask = async (event) => {
   try{
       const datos = await dynamoDB.scan({
           TableName: "TasksTable"
       }).promise()
       return {
           statusCode: 200,
           body: JSON.stringify(
               datos.Items),
       };
   }catch (e) {
       return {
           statusCode: 400,
           body: JSON.stringify(
             e
           ),
       };
   }
};

