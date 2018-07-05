const express = require("express");
const cors = require("cors");
const port = 8081;
const app = new express();
const bodyParser = require("body-parser");
const corss = require("cors");
const Websocket = require("ws");
const http = require("http");
const logsData = require("./logsData");
const nfConfiguration = require("./chainsMockData");
const graphData = require("./graphMockData");
const hostsData = require("./hostsMockData");
const tenantsData = require("./tenantsMockData");

YAML = require("yamljs");

// const server = http.createServer(app);

let server = app.listen(port, () => console.log(`Listening on ${port}`));

app.use(cors());

const wss = new Websocket.Server({ server });

const serverDelayConstant = 100;
// Simulate a small amount of delay to demonstrate app's async features
app.use((req, res, next) => {
  const delay = (Math.random() * 15 + 5) * serverDelayConstant;
  setTimeout(next, delay);
});

app.use(express.static("public"));

app.use(corss());

app.use(bodyParser.json());

wss.on("connection", ws => {
  console.log("connecting");
  ws.on("message", message => {
    // TODO look at message.type (this is the subscription).
    // Have different setIntervals for each type. On each type send the relevant data
    console.log("received something");
    //log the received message and send it back to the client
    console.log("received: %s", message);
    if (message === "logs") {
      setInterval(function() {
        ws.send(JSON.stringify(logsData.logs_array[0]));
      }, 1000);
    } else if (message === "stats") {
      console.log("entered stats");
      for (var i = 0, len = graphData.graph_data.length; i < len; i += 1) {
        (function(i) {
          setInterval(function() {
            ws.send(JSON.stringify(graphData.graph_data[i]));
          }, 5000);
        })(i);
      }
    } else if (message === "hosts") {
      for (key in hostsData.hosts_data) {
        setInterval(function() {
          hostsData.hosts_data[key].forEach(function(item) {
            ws.send(JSON.stringify(item));
          });
        }, 5000);
      }
    } else if (message === "services") {
      for (key in tenantsData.tenants_data) {
        console.log("entered tenants", tenantsData.tenants_data[key]);
        setInterval(function() {
          tenantsData.tenants_data[key].forEach(function(item) {
            ws.send(JSON.stringify(item));
          });
        }, 5000);
      }
    }
  });
});

nativeObject = YAML.load("database.yml", database => {
  app.post("/authenticate", (req, res) => {
    const id = req.params.username;
    const password = req.params.password;
    const user = database.users.find(
      user => user.username === id && user.password === password
    );
    if (!user) {
      return res.status(500).json({
        error: "No user with the specified ID",
        id
      });
    } else {
      res.status(200).json(user);
    }
  });

  app.get("/users", (req, res) => {
    const users = database.users;
    console.log("reaching server", users);
    res.status(200).json(users);
  });

  app.post("/add-user", (req, res) => {
    const user = req.body;
    console.log("this is the request to add user", req.body);
    res.status(200).json(user);
  });

  app.get("/endpoints", (req, res) => {
    console.log("RECEIVING REQUEST");
    const endpoints = database.endpoints;
    res.status(200).json(endpoints);
  });

  app.post("/add-endpoint", (req, res) => {
    const user = req.body;
    console.log("this is the request to add user", req.body);
    res.status(200).json(user);
  });

  app.get("/chains", (req, res) => {
    console.log("RECEIVING REQUEST");
    const chains = nfConfiguration;
    console.log("these are the chains sent", chains);
    res.status(200).json(chains);
  });

  app.post("/chains", (req, res) => {
    const chain = req.body;
    console.log("this is the request to add a chain", req.body);
    res.status(200).json(chain);
  });
});
