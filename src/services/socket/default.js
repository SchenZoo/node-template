const { SocketInstance } = require('./socket_instance');
const { authorizeUser } = require('./global_handlers');

const DefaultSocketInstance = new SocketInstance('/');

DefaultSocketInstance.initialize(async (socketClient) => {
  try {
    await authorizeUser(socketClient);
  } catch (err) {
    console.log('Socket user not authorized ', err);
  }
});

module.exports = {
  DefaultSocketInstance,
};
