import { ConversationInstance } from './../models/Conversation';
import { MessageInstance } from './../models/Message';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Mailjet from 'node-mailjet';

const newMessage = async (req: Request, res: Response, next: NextFunction) => {
	const id = uuidv4();
	const { conversationId, receiverId, senderId, text, type } = req.body;

	try {
		const Message = await MessageInstance.create({ id, conversationId, receiverId, senderId, text, type });
		const user = await ConversationInstance.update({ messages: text }, { where: { id: conversationId } });
		res.status(200).json({ Status: 'Success', message: 'Message Sent' });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const getMessage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const exists = await MessageInstance.findAll({ where: { conversationId: req.params.id } });

		return res.status(200).json(exists);
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

export default {
	getMessage,
	newMessage
};
