import Koa from "koa";
import * as socketIo from "socket.io";
import http from "http";
import cors from "@koa/cors";

const app = new Koa();

// Insert all app code here

app.use(cors({ origin: "*" }));

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

// Insert all app code here

const server = http.createServer(app.callback());

const io = new socketIo.Server(server, { cors: { origin: "*" } });

io.on("connection", async (socket) => {
  console.log("User connected");

  socket.join("global");
  socket.emit("connected", { userId: socket.id });

  socket.broadcast.to("global").emit("clientConnected", {
    userId: socket.id.replace("_", "").replace("&", "").replace("%", ""),
  });
});

server.listen(2021, "0.0.0.0", undefined, () =>
  console.log("server started on port 2021")
);
