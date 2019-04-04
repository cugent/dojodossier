const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const axios = require("axios");
// parse application/json
app.use(bodyParser.json());
const cors = require("cors");

app.use(cors());

let count = 0;

app.use(express.static("./build/"));

// SERVER LISTENING
const server = app.listen(1337, () => {
  console.log("Server restarted...");
});

const io = require("socket.io")(server);

io.on("connection", function(socket) {
  //2
  count++;
  console.log("CONNECTED TO CLIENT SOCKET");
  socket.emit("greeting", { msg: "You have connected to socket server" }); //3
  updateConnectedUsers();
  socket.on("thankyou", function(data) {
    //7
    console.log("SOCKET.ON thankyou");
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });
  socket.on("disconnect", () => {
    count--;
    updateConnectedUsers();
  });
});

const updateConnectedUsers = () => {
  io.emit("usercountchanged", { count: count }); //3
};

const updateData = () => {
  axios.get("http://5c9bca575ee0830014b71895.mockapi.io/dd").then(response => {
    io.emit("dataUpdated", { data: response.data });
  });
};

app.post("/addTab", (request, response) => {
  axios.post(`http://5c9bca575ee0830014b71895.mockapi.io/dd`, request.body).then(resp => {
    // getUpdatedItemList("Someone updated an item");
    updateData();
    response.json(resp.data);
  });
});

app.put(`/updateTab/:id`, (request, response) => {
  axios.put(`http://5c9bca575ee0830014b71895.mockapi.io/dd/${request.params.id}`, request.body).then(resp => {
    // getUpdatedItemList("Someone updated an item");
    updateData();
    response.json(resp.data);
  });
});
app.get("/getTab", (request, response) => {
  axios.get(`http://5c9bca575ee0830014b71895.mockapi.io/dd`, request.body).then(resp => {
    response.json(resp.data);
  });
});
