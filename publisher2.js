const amqp = require("amqplib")
const message = {
    description : "Bu bir test mesajıdır..."
}
connect_rabbitmq();
async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const assertion = channel.assertQueue("jobsQueue")
        setInterval(()=>{
            message.description = new Date().getTime()
            channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)))
            console.log("Gönderilen Mesaj",message)
        },1)
    } catch (error) {
        console.log("Hata mesajı = ",error)
    }
} 