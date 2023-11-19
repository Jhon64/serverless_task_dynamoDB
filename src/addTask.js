const {v4} = require('uuid')
const AWS = require('aws-sdk')


module.exports.addTask = async (event) => {
    try {
        console.log(event)
        const {title, description} = JSON.parse(event.body)
        const createdAt = new Date();
        const id = v4();
        const dynamoDB = new AWS.DynamoDB.DocumentClient()

        const newTask = {
            id, title, description, createdAt
        }
        await dynamoDB.put({
            TableName: "TasksTable",
            Item: newTask
        },function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        }).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(
                newTask),
        };
    } catch (e) {
        return {
            statusCode: 400,
            body:  JSON.stringify(
            e),

        }
    }
};

