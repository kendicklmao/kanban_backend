// socket.js
const { Server } = require("socket.io");

let io;

module.exports = {
    init: (httpServer) => {
        io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true,
            },
        });

        // 1. Tên phòng chung cố định
        const GLOBAL_ROOM = "app_global_room";

        io.on("connection", (socket) => {
            console.log("⚡ Client connected:", socket.id);

            // 2. Tự động thêm client vào phòng chung ngay khi vừa kết nối
            socket.join(GLOBAL_ROOM);
            console.log(`Socket ${socket.id} joined global room: ${GLOBAL_ROOM}`);

            socket.on("disconnect", () => {
                console.log("🔥 Client disconnected:", socket.id);
            });
        });

        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io chưa được khởi tạo!");
        }
        return io;
    },
};