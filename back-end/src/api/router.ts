import { Router } from 'express';
import login from './auth/login';
import register from './auth/register';
import { authMiddleware } from './auth/router-middleware';
import { getUser } from './users';

const router = Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Authenticated routes
router.get('/users/:username', authMiddleware, getUser);

//Agent publiucTransfer
import {startChat, sendMessage, getMessages} from './visitor';
import {getChats} from './chat' 
import {createSkill, getSkills, addAgentsToSkill, removeAgentsFromSkill} from './skill';

router.post('/visitors/:visitorId/chat/start', startChat);
router.post('/visitors/:visitorId/chat/send_message', sendMessage);
router.post('/visitors/:visitorId/chat/messages', getMessages);

//Get Chats
router.get('/users/:userId/chats', authMiddleware, getChats);
router.get('/users/:userId/chats/:chatId/messages', authMiddleware, getChats);

//Skils
router.get('/users/:userId/skills', authMiddleware, getSkills);
router.post('/users/:userId/skills', authMiddleware, createSkill);
router.post('/users/:userId/skills/:skillId/addagent', authMiddleware, addAgentsToSkill);
router.post('/users/:userId/skills/:skillId/deleteagent', authMiddleware, removeAgentsFromSkill);

export default router;
