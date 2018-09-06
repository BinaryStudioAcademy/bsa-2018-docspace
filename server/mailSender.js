const amqp = require('amqplib/callback_api')

module.exports = {
  sendData: (data) => {
    const options = {
      protocol: 'amqp',
      hostname: process.env.RABBITMQ_HOST,
      port: 5672,
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
      locale: 'en_US',
      frameMax: 0,
      heartbeat: 0,
      vhost: '/'
    }

    amqp.connect(options, (err, conn) => {
      if (err !== null) return console.warn(err)
      conn.createChannel((err, ch) => {
        if (err !== null) return console.warn(err)
        const q = 'docspace-mail'

        ch.assertQueue(q, {durable: false})
        ch.sendToQueue(q, Buffer.from(JSON.stringify(data)))
        console.log(' [x] Sent message to the queue')
      })
    })
  }
}
