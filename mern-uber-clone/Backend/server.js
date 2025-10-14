const http = require('http');
const app = require('./app.js');
const port = process.env.PORT || 3000;

const connectDB = require('./db/db.js');
connectDB();
console.log("Inside server.js after db connected");

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
});