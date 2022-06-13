const amqp = require("amqplib")
const queueName = process.argv[2] || "jobsQueue"


connect_rabbitmq();
async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const assertion = channel.assertQueue(queueName)

        // Getting the messages from the queue
        console.log("Mesaj bekleniyor....")
        channel.consume(queueName, (message)=>{
            console.log("Message", message.content.toString());
            channel.ack(message)
        })
    } catch (error) {
        console.log("Hata mesajı = ",error)
    }



} 