import { Router } from 'express';
import login from './auth/login';
import register from './auth/register';
import { authMiddleware } from './auth/router-middleware';
import { createServer } from './servers/post';
import { getServers } from './servers/get';
import { getChannels } from './channels/get';
import { getUser } from './users/get';
import { leaveServer } from './servers/leave';
import { deleteServer } from './servers/delete';
import { deleteChannel } from './channels/delete';
import { getServerInvite } from './servers/invites/get';
import { joinServer } from './servers/join';
import { createServerInvite } from './servers/invites/post';

const router = Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Authenticated routes
router.post('/servers', authMiddleware, createServer);
router.get('/channels', authMiddleware, getChannels);
router.get('/users/:username', authMiddleware, getUser);
// Servers
router.get('/servers', authMiddleware, getServers);
router.get('/servers/invites/:id', authMiddleware, getServerInvite);
router.post('/leave-server/:id', authMiddleware, leaveServer);
router.post('/join-server/:id', authMiddleware, joinServer);
router.post('/servers/invites', authMiddleware, createServerInvite);
router.delete('/delete-server/:id', authMiddleware, deleteServer);
// Channels
router.delete('/delete-channel/:id', authMiddleware, deleteChannel);

//Agent publiucTransfer
import {startChat, sendMessage, getMessages} from './visitors/visitor';
import {getChats} from './chats/chat' 
router.post('/visitors/:visitorId/chat/start', startChat);
router.post('/visitors/:visitorId/chat/send_message', sendMessage);
router.post('/visitors/:visitorId/chat/messages', getMessages);

//Get Chats
router.get('/users/:userId/chats', authMiddleware, getChats);
router.get('/users/:userId/chats/:chatId/messages', authMiddleware, getChats);

export default router;
