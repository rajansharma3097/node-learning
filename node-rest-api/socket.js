let io;

module.exports = {
  init: (httpServer) => {
    // websockets uses http protocols  the basis
    //so we are passing our http based server to the function
    // to create a websocket connection

    // we are setting up a function
    // to be executed whener a new connection is made
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
