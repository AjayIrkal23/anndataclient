import { ConversationInstance } from './../models/Conversation';
import { MessageInstance } from './../models/Message';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Mailjet from 'node-mailjet';
import axios from 'axios';

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

const replyMessage = async (req: Request, res: Response, next: NextFunction) => {
	const { button, mobile, waNumber } = req.body;

	try {
		if (mobile) {
			await axios
				.get(
					`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=9538513924&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Please+verify+your+number.+OTP+is+${button.text}${mobile}${waNumber}%2C+Please+do+not+share+this+to+anyone+else.%0ARegards&isTemplate=true&header=Number+Verification&footer=Aandata.Guru+Team`
				)
				.then((resp) => {
					res.status(200).json({ message: 'success' });
				});
		} else {
			res.status(500).json({ message: 'Not success' });
		}
	} catch (error) {
		return res.status(500).json({ message: 'Not success', error });
	}
};

export default {
	getMessage,
	newMessage,
	replyMessage
};
