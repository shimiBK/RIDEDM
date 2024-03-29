const { Server } = require("socket.io");


const corsOptions = {
    origin: "http://localhost:3000,http://54.165.148.188:3000"
  }

const PORT = 5001;


const io = new Server({
    cors: {
      corsOptions,
      methods: ["GET", "POST"],
    },
  });


  let users = [];

  const addUser = (userId,socketId) => {

    !users.some((user)=> user.userId === userId) &&
    users.push({userId,socketId});

    
  }

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };



  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, addresseId, text }) => {
      const user = getUser(addresseId);
       io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });




  io.listen(PORT);
