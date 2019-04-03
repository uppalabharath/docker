const express = require("express");
const redis = require("redis")

const app = express();
// As we are using docker-compose when the redis tries to connect to a host called redis-server, 
// system routes it to the service with name redis-server
const client = redis.createClient({
    host: "redis-server",
    port: 6379
});
client.set("visits", 0);
app.get("/", (req, res) => {
    client.get("visits", (err, visits) => {
        res.send("No of Visits: " + visits);
        client.set("visits", parseInt(visits, 10) + 1)
    })
});

app.listen("9900", () => {
    console.log("App started successfully on port 9900")
})