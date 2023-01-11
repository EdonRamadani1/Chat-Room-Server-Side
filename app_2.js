require("dotenv").config();
const express = require("express");
const app = express();
const socketHandlers = require("../../reactexercises/src/week12/sockethandlers");
const http = require("http");
const socketIO = require('socket.io');
const port = process.env.PORT || 5000;
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static("public"));
app.get("/*", (request, response) => {
 // needed for refresh
 response.sendFile(path.join(__dirname, "public/index.html"));
});

io.on("connection", (socket) => {
    // scenario 1 - client sends server 'join' message using room to join
    socket.on("join", (clientData) => {
    socketHandlers.handleJoin(socket, clientData);
    });
    // scenario 2 - client disconnects from server
    socket.on("disconnect", () => {
    socketHandlers.handleDisconnect(socket);
    });
    // scenario 3 - client starts typing
    socket.on("typing", (clientData) => {
    socketHandlers.handleTyping(socket, clientData);
    });
     // scenario 4 - client sends message
     socket.on("message", (clientData) => {
        socketHandlers.handleMessage(socket, clientData);
        });
});

    // will pass 404 to error handler
app.use((req, res, next) => {
    const error = new Error("No such route found");
    error.status = 404;
    next(error);
});

   // error handler middleware
   app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
    error: {
    status: error.status || 500,
    message: error.message || "Internal Server Error"
    }
    });
   });
   server.listen(port, () => console.log(`starting on port ${port}`));