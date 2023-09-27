import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let user = [];

const addUser = (userdata, socketId) => {
  !user.some((user) => user.email == userdata.email) &&
    user.push({ ...userdata, socketId });
  console.log(user);
};

const removeUser = (socketId) => {
  user = user.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return user.find((user) => user.email === userId);
};

io.on("connection", (socket) => {
  socket.on("addUsers", (userdata) => {
    addUser(userdata, socket.id);

    io.emit("getUsers", user);
    console.log(user);
  });

  socket.on("SendMessage", (data) => {
    const users = getUser(data.receiverId);
    if (users) {
      io.to(users.socketId).emit("getMessage", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", user);
  });
});
