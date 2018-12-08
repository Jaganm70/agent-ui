import * as socketIo from 'socket.io';
import { logInAuth, SocketCustom } from './auth/socket-auth';
import { log } from 'winston';
import {agentEvents} from './chats/agent_events'

let ioServer = null;

export function getIoServer() {
  return ioServer;
}

export async function startWs(server) {
  const io = socketIo(server);
  io.use(logInAuth(io));
  io.on('connection', async (socket: SocketCustom) => {
    log('info', `User connected: ${socket.id}, ${socket.claim.username} ${socket.claim.user_id}`);
  });
  (<any>io).setMaxListeners(50);
  // Add event handlers

  //Agent
  agentEvents(io);

  ioServer = io;
}

setInterval(() => {
}, 50); // Socket IO fix hack
