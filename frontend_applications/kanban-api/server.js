const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// Mock tasks
let tasks = [
  { id: '1', title: '#1001', customer: 'Customer1', status: 'pending' },
  { id: '2', title: '#1002', customer: 'Customer2', status: 'in-progress' },
  { id: '3', title: '#1003', customer: 'Customer3', status: 'done' },
];

// GET /tasks - Return current list
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks/:id/status - Update task status
app.post('/tasks/:id/:status', (req, res) => {
  const taskId = req.params.id;
  const newStatus = req.params.status;

  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).send('Task not found');

  task.status = newStatus;

  io.emit('task-updated', task);

  res.json(task);
});

// Start server
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('Client connected via WebSocket');
});

server.listen(3005, () => {
  console.log('API running at http://localhost:3005');
});