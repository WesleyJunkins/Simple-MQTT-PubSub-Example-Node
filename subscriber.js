const mqtt = require("mqtt")

// Go to https://www.hivemq.com/mqtt/public-mqtt-broker/ for info.

const broker_address = "mqtt://broker.hivemq.com"
const topic = "test/myTopic"

const client = mqtt.connect(broker_address)

client.on("connect", () => {
    console.log("Connected to broker")

    client.subscribe(topic, (err) => {
        if (!err) {
            console.log("Subscribed to topic " + topic)
        } else {
            console.error("Subscription error: ", err)
        }
    })
})

client.on("message", (topic, message) => {
    console.log("Received message " + message.toString() + " on topic " + topic)
})

client.on("error", (err) => {
    console.error("Connection error: ", err)
})