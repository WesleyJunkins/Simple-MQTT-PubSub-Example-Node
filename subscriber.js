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

function sub(client, topic) {
    client.subscribe(topic, (err) => {
        if (err) {
            console.error("Failed to subscribe: " + err.message)
        }
    })
    client.on("message", on_message)
}

// ~~~   your code starts here   ~~~

// Message handler
function on_message(topic, message) {
    console.log("Received message " + message.toString() + " on topic " + topic)
}

// Create client
const client = create_client("testSubscriber1", "Htil2024ExamplePassword", "ac468314de194d56906aa94b21f74655.s1.eu.hivemq.cloud")

// Subscribe to a topic
sub(client, "htil/test/topic")

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