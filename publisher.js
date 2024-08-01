const mqtt = require("mqtt")

// Go to https://www.hivemq.com/mqtt/public-mqtt-broker/ for info.

const broker_address = "mqtt://broker.hivemq.com"
const topic = "test/myTopic"
const message = "Hello, this is publisher Wes!"

const client = mqtt.connect(broker_address)

client.on("connect", () => {
    console.log("Connected to broker")

    client.publish(topic, message, () => {
        console.log("Published " + message + " to topic " + topic + ".")
    })
})

client.on("error", (err) => {
    console.error("Connection error: " + err)
})