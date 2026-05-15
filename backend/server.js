const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToDB = require("./config/db");
const { Server } = require("socket.io");
const http = require("http");
const Canvas = require("./models/canvasModel");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

const userRoutes = require("./routes/userRoutes");
const canvasRoutes = require("./routes/canvasRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/canvas", canvasRoutes);

app.get("/", (req, res) => {
res.send("Whiteboard Backend Running Successfully");
});

connectToDB();

const server = http.createServer(app);

const io = new Server(server, {
cors: {
origin: [
"http://localhost:3000",
"https://whiteboard-frontend-h5h3.onrender.com"
],
methods: ["GET", "POST"],
},
});

let canvasData = {};

io.on("connection", (socket) => {
console.log("A user connected:", socket.id);

socket.on("joinCanvas", async ({ canvasId }) => {
console.log("Joining canvas:", canvasId);

```
try {
  const authHeader = socket.handshake.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided.");

    setTimeout(() => {
      socket.emit("unauthorized", {
        message: "Access Denied: No Token",
      });
    }, 100);

    return;
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, SECRET_KEY);

  const userId = decoded.userId;

  console.log("User ID:", userId);

  const canvas = await Canvas.findById(canvasId);

  if (
    !canvas ||
    (String(canvas.owner) !== String(userId) &&
      !canvas.shared.includes(userId))
  ) {
    console.log("Unauthorized access.");

    setTimeout(() => {
      socket.emit("unauthorized", {
        message: "You are not authorized to join this canvas.",
      });
    }, 100);

    return;
  }

  socket.join(canvasId);

  console.log(`User ${socket.id} joined canvas ${canvasId}`);

  if (canvasData[canvasId]) {
    socket.emit("loadCanvas", canvasData[canvasId]);
  } else {
    socket.emit("loadCanvas", canvas.elements);
  }
} catch (error) {
  console.error(error);

  socket.emit("error", {
    message: "An error occurred while joining the canvas.",
  });
}
```

});

socket.on("drawingUpdate", async ({ canvasId, elements }) => {
try {
canvasData[canvasId] = elements;

```
  socket.to(canvasId).emit("receiveDrawingUpdate", elements);

  const canvas = await Canvas.findById(canvasId);

  if (canvas) {
    await Canvas.findByIdAndUpdate(
      canvasId,
      { elements },
      { new: true }
    );
  }
} catch (error) {
  console.error(error);
}
```

});

socket.on("disconnect", () => {
console.log("User disconnected:", socket.id);
});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
