const express = require('express');
const app = express();
const rateLimiter = require('../src/middlewares/rateLimiter');
const logger = require('../src/config/winston');
const morgan = require('morgan');
const userRoutes = require('../src/routes/userRoutes');
const adminRoutes = require('../src/routes/adminRoutes');

app.use(express.json());
app.use(rateLimiter);
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

module.exports = app;