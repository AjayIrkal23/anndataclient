import { ConversationInstance } from '../models/Conversation';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Mailjet from 'node-mailjet';
import { Op } from 'sequelize';
import { UsersInstance } from '../models/userModel';
import axios from 'axios';
import { MentorInstance } from '../models/mentor';
import { MarketingInstance } from '../models/marketing';
import { BankInstance } from '../models/bank';

const newConversation = async (req: Request, res: Response, next: NextFunction) => {
	console.log('hello');
	const id = uuidv4();

	const { Setype, receiverId, senderId, ReType } = req.body;
	try {
		const exists = await ConversationInstance.findOne({ where: { members: { [Op.contains]: [receiverId, senderId] } } });

		if (exists) {
			res.status(200).json({ Status: 'Exists', message: 'Conversation already Exists' });
		} else {
			let members = [senderId, receiverId];

			const newConversation = await ConversationInstance.create({ id, members, Setype, ReType });
			if (ReType == 'Member') {
				const isUser = await UsersInstance.findOne({ where: { email: receiverId } });
				if (isUser) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${senderId}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=You+are+successfully+connected+with+${isUser.name}%2C+Meeting+Link+Will+be+shared+soon%0ARegards&media_url=https%3A%2F%2Fwww.salesprogress.com%2Fhs-fs%2Fhub%2F53724%2Ffile-1853575215-jpg%2Fimages%2Femployee_connection.jpg&isTemplate=true&footer=Aadnata.Guru+Team`
					);
				}
			} else if (ReType == 'Mentor') {
				const isUser = await MentorInstance.findOne({ where: { email: receiverId } });
				if (isUser) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${senderId}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=You+are+successfully+connected+with+${isUser.name}%2C+Meeting+Link+Will+be+shared+soon%0ARegards&media_url=https%3A%2F%2Fwww.salesprogress.com%2Fhs-fs%2Fhub%2F53724%2Ffile-1853575215-jpg%2Fimages%2Femployee_connection.jpg&isTemplate=true&footer=Aadnata.Guru+Team`
					);
				}
			} else if (ReType == 'Marketing') {
				const isUser = await MarketingInstance.findOne({ where: { email: receiverId } });
				if (isUser) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${senderId}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=You+are+successfully+connected+with+${isUser.name}%2C+Meeting+Link+Will+be+shared+soon%0ARegards&media_url=https%3A%2F%2Fwww.salesprogress.com%2Fhs-fs%2Fhub%2F53724%2Ffile-1853575215-jpg%2Fimages%2Femployee_connection.jpg&isTemplate=true&footer=Aadnata.Guru+Team`
					);
				}
			} else {
				const isUser = await BankInstance.findOne({ where: { email: receiverId } });
				if (isUser) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${senderId}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=You+are+successfully+connected+with+${isUser.name}%2C+Meeting+Link+Will+be+shared+soon%0ARegards&media_url=https%3A%2F%2Fwww.salesprogress.com%2Fhs-fs%2Fhub%2F53724%2Ffile-1853575215-jpg%2Fimages%2Femployee_connection.jpg&isTemplate=true&footer=Aadnata.Guru+Team`
					);
				}
			}

			if (Setype == 'Member') {
				const isUser = await UsersInstance.findOne({ where: { email: senderId } });
				if (isUser) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${receiverId}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=You+have+A+new+Connection+-+${isUser.name}%0AMeeting+Link+Will+be+Shared+Shortly.%0ARegards&media_url=https%3A%2F%2Fwww.salesprogress.com%2Fhs-fs%2Fhub%2F53724%2Ffile-1853575215-jpg%2Fimages%2Femployee_connection.jpg&isTemplate=true&footer=Aanndata.Guru`
					);
				}
			} else if (Setype == 'Mentor') {
				const isUser = await MentorInstance.findOne({ where: { email: senderId } });
				if (isUser) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${receiverId}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=You+have+A+new+Connection+-+${isUser.name}%0AMeeting+Link+Will+be+Shared+Shortly.%0ARegards&media_url=https%3A%2F%2Fwww.salesprogress.com%2Fhs-fs%2Fhub%2F53724%2Ffile-1853575215-jpg%2Fimages%2Femployee_connection.jpg&isTemplate=true&footer=Aanndata.Guru`
					);
				}
			} else if (Setype == 'Marketing') {
				const isUser = await MarketingInstance.findOne({ where: { email: senderId } });
				if (isUser) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${receiverId}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=You+have+A+new+Connection+-+${isUser.name}%0AMeeting+Link+Will+be+Shared+Shortly.%0ARegards&media_url=https%3A%2F%2Fwww.salesprogress.com%2Fhs-fs%2Fhub%2F53724%2Ffile-1853575215-jpg%2Fimages%2Femployee_connection.jpg&isTemplate=true&footer=Aanndata.Guru`
					);
				}
			} else {
				const isUser = await BankInstance.findOne({ where: { email: senderId } });
				if (isUser) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${receiverId}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=You+have+A+new+Connection+-+${isUser.name}%0AMeeting+Link+Will+be+Shared+Shortly.%0ARegards&media_url=https%3A%2F%2Fwww.salesprogress.com%2Fhs-fs%2Fhub%2F53724%2Ffile-1853575215-jpg%2Fimages%2Femployee_connection.jpg&isTemplate=true&footer=Aanndata.Guru`
					);
				}
			}

			return res.status(200).json('Created successfully');
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error });
	}
};

const getConversation = async (req: Request, res: Response, next: NextFunction) => {
	const senderId = req.body.senderId;
	const receiverId = req.body.receiverId;

	try {
		const exists = await ConversationInstance.findOne({ where: { members: { [Op.contains]: [receiverId, senderId] } } });

		if (exists) {
			return res.status(200).json(exists);
		} else {
			return res.status(500).json('Conversation Not Found');
		}
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const getAllConversation = async (req: Request, res: Response, next: NextFunction) => {
	const senderId = req.body.senderId;
	const receiverId = req.body.receiverId;
	try {
		const exists = await ConversationInstance.findAll({ where: { members: { [Op.contains]: [senderId, receiverId] } } });

		if (exists) {
			return res.status(200).json(exists);
		} else {
			return res.status(500).json('Conversation Not Found');
		}
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

export default {
	getConversation,
	newConversation,
	getAllConversation
};
