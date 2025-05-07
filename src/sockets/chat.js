module.exports = (io) => {
    io.on('connection', socket => {
      console.log('New client connected');
  
      socket.on('private_message', ({ to, message }) => {
        io.to(to).emit('private_message', message);
      });
  
      socket.on('join_group', group => {
        socket.join(group);
      });
  
      socket.on('group_message', ({ group, message }) => {
        io.to(group).emit('group_message', message);
      });
  
      socket.on('leave_group', group => {
        socket.leave(group);
      });
    });
  };
  