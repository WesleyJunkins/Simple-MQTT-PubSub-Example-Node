const mqtt = require("mqtt")

// Go to https://www.hivemq.com/mqtt/public-mqtt-broker/ for info.

function create_client(username, password, broker_address, clientId = "client", port = 8883) {
    const options = {
        clientId: clientId,
        username: username,
        password: password,
        port: port,
        protocol: "mqtts"
    }
    const client = mqtt.connect("mqtts://" + broker_address, options)
    return client
}

function pub(client, topic, message) {
    client.publish(topic, message, (err) => {
        if (err) {
            console.error("Failed to publish: " + err.message)
        }
    })
}

// ~~~   your code starts here   ~~~

// Create client
const client = create_client("testPublisher1", "Htil2024ExamplePassword", "ac468314de194d56906aa94b21f74655.s1.eu.hivemq.cloud", clientId = "7589475092390435864039726543")

// Keep the client connection alive
client.on('connect', () => {
    console.log("Connected to broker")
})

client.on('error', (err) => {
    console.error("Connection error: " + err.message)
})

client.on('close', () => {
    console.log("Connection closed")
})

// Publish a counter message every 0.01 seconds
let counter = 0
setInterval(() => {
    pub(client, "htil/test/topic", counter.toString())
    console.log("Published message " + counter)
    counter += 1
}, 10)
