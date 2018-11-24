import {Chat}  from '../../db/chat';
export async function getChats(req, res) {

    const userId = req.params.userId === 'me'? req.claim.user_id :req.params.userId
    var chats = await new Chat().getChats(userId);     
    res.status(200);
    res.send(chats);
  }