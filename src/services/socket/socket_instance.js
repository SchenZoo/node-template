const { SocketFactory } = require('./socket_factory');
const { SOCKET_EVENT_NAMES } = require('../../constants/socket/event_names.socket');
const { SOCKET_ROOM_NAMES } = require('../../constants/socket/rooms.socket');


const socketFactory = new SocketFactory();

class SocketInstance {
  constructor(namespace) {
    this.namespace = namespace;
    this.SOCKET_EVENT_NAMES = SOCKET_EVENT_NAMES;
    this.SOCKET_ROOM_NAMES = SOCKET_ROOM_NAMES;
  }

  initialize(connectionHandlers) {
    socketFactory.addNamespace(this.namespace, connectionHandlers);
  }

  sendEvent(eventName, payload) {
    socketFactory.sendEvent(this.namespace, eventName, payload);
  }

  sendEventInRoom(roomName, eventName, payload) {
    socketFactory.sendEventInRoom(this.namespace, roomName, eventName, payload);
  }

  sendEventInMultipleRooms(roomsArray, eventName, payload) {
    if (Array.isArray(roomsArray)) {
      roomsArray.forEach((roomName) => {
        socketFactory.sendEventInRoom(this.namespace, roomName, eventName, payload);
      });
    } else {
      console.warn('sendEventInMultipleRooms was called with roomsArray not Array object');
    }
  }
}

module.exports = {
  SocketInstance,
};
