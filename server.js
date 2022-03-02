const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "http://track-geo.netlify.app", "*"],
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: ["*"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.onAny((eventName, data) => {
    console.log(data);
    io.emit(eventName, data);
  });
});

const port = 4000;
server.listen(process.env.PORT || port, () => {
  console.log(`listening on *:${port}`);
});
