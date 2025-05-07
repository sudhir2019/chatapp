require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const socketHandler = require('./src/sockets/chat');
const swaggerUi = require('swagger-ui-express');
const userSwagger = require('./src/swagger/userSwagger.json');
const adminSwagger = require('./src/swagger/adminSwagger.json');

const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

// DB and Socket Setup
connectDB();
socketHandler(io);

// Basic Route
app.get('/', (req, res) => {
  res.send("Server is running...!!");
});

// Swagger Docs
app.use('/api/docs/user', swaggerUi.serveFiles(userSwagger), swaggerUi.setup(userSwagger));
app.use('/api/docs/admin', swaggerUi.serveFiles(adminSwagger), swaggerUi.setup(adminSwagger));

// Server Listener
const PORT = process.env.PORT || 8083;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
