import { getReply } from '../services/chatbot.js';

export const sendMessage = async (req, res) => {
  const reply = await getReply(req.body.message, req.lang);
  res.json({ reply });
};
