import { ConversationInstance } from './../models/Conversation';
import { MessageInstance } from './../models/Message';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Mailjet from 'node-mailjet';
import axios from 'axios';
import { AllUserInstance } from '../models/user';
import { UsersInstance } from '../models/userModel';
import { MentorInstance } from '../models/mentor';
import { BankInstance } from '../models/bank';
import { MarketingInstance } from '../models/marketing';

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

const getPerson = async (existingUser: AllUserInstance | null, user: any | null) => {
	let start = 0;
	if (existingUser?.last) {
		const list = await AllUserInstance.findAll({});

		start = list.findIndex((item) => item.email == existingUser.last) + 1;
		console.log(list.length, 'list');
		console.log(start, 'start');
		if (start < list.length) {
			if (list[start].email === existingUser?.email) {
				start = start + 1;
				if (start < list.length) {
					const update = await AllUserInstance.update({ last: list[start].email }, { where: { email: existingUser?.email } });
					if (list[start].type == 'Member') {
						await UsersInstance.findOne({ where: { email: list[start].email } }).then((value) => {
							console.log(value);
							axios
								.get(
									`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
								)
								.then((resp) => {
									console.log(resp);
								});
						});
					} else if (list[start].type == 'Mentor') {
						await MentorInstance.findOne({ where: { email: list[start].email } }).then((value) => {
							console.log(value);
							axios
								.get(
									`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
								)
								.then((resp) => {
									console.log(resp);
								});
						});
					} else if (list[start].type == 'Marketing') {
						await MarketingInstance.findOne({ where: { email: list[start].email } }).then((value) => {
							console.log(value);
							axios
								.get(
									`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
								)
								.then((resp) => {
									console.log(resp);
								});
						});
					} else {
						await BankInstance.findOne({ where: { email: list[start].email } }).then((value) => {
							console.log(value);
							axios
								.get(
									`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
								)
								.then((resp) => {
									console.log(resp);
								});
						});
					}
				} else {
					axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=we+will+notify+you+when+there+are+new+users+available&isTemplate=true&header=No+More+Users+Found+%21&footer=Aanndata.Guru+AI`
						)
						.then((resp) => {
							console.log(resp);
						});
				}
			} else {
				console.log(list[start]);
				const update = await AllUserInstance.update({ last: list[start].email }, { where: { email: existingUser?.email } });
				if (list[start].type == 'Member') {
					await UsersInstance.findOne({ where: { email: list[start].email } }).then((value) => {
						console.log(value);
						axios
							.get(
								`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
							)
							.then((resp) => {
								console.log(resp);
							});
					});
				} else if (list[start].type == 'Mentor') {
					await MentorInstance.findOne({ where: { email: list[start].email } }).then((value) => {
						console.log(value);
						axios
							.get(
								`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
							)
							.then((resp) => {
								console.log(resp);
							});
					});
				} else if (list[start].type == 'Marketing') {
					await MarketingInstance.findOne({ where: { email: list[start].email } }).then((value) => {
						console.log(value);
						axios
							.get(
								`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
							)
							.then((resp) => {
								console.log(resp);
							});
					});
				} else {
					await BankInstance.findOne({ where: { email: list[start].email } }).then((value) => {
						console.log(value);
						axios
							.get(
								`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
							)
							.then((resp) => {
								console.log(resp);
							});
					});
				}
			}
		}
	} else {
		const list = await AllUserInstance.findAll({});
		console.log(list);
		if (list[start].email === existingUser?.email) {
			start = start + 1;
			console.log(list[start]);
			const update = await AllUserInstance.update({ last: list[start].email }, { where: { email: existingUser?.email } });
			if (list[start].type == 'Member') {
				await UsersInstance.findOne({ where: { email: list[start].email } }).then((value) => {
					console.log(value);
					axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
						)
						.then((resp) => {
							console.log(resp);
						});
				});
			} else if (list[start].type == 'Mentor') {
				await MentorInstance.findOne({ where: { email: list[start].email } }).then((value) => {
					console.log(value);
					axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
						)
						.then((resp) => {
							console.log(resp);
						});
				});
			} else if (list[start].type == 'Marketing') {
				await MarketingInstance.findOne({ where: { email: list[start].email } }).then((value) => {
					console.log(value);
					axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
						)
						.then((resp) => {
							console.log(resp);
						});
				});
			} else {
				await BankInstance.findOne({ where: { email: list[start].email } }).then((value) => {
					console.log(value);
					axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
						)
						.then((resp) => {
							console.log(resp);
						});
				});
			}
		} else {
			console.log(list[start]);
			const update = await AllUserInstance.update({ last: list[start].email }, { where: { email: existingUser?.email } });
			if (list[start].type == 'Member') {
				await UsersInstance.findOne({ where: { email: list[start].email } }).then((value) => {
					console.log(value);
					axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
						)
						.then((resp) => {
							console.log(resp);
						});
				});
			} else if (list[start].type == 'Mentor') {
				await MentorInstance.findOne({ where: { email: list[start].email } }).then((value) => {
					console.log(value);
					axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
						)
						.then((resp) => {
							console.log(resp);
						});
				});
			} else if (list[start].type == 'Marketing') {
				await MarketingInstance.findOne({ where: { email: list[start].email } }).then((value) => {
					console.log(value);
					axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
						)
						.then((resp) => {
							console.log(resp);
						});
				});
			} else {
				await BankInstance.findOne({ where: { email: list[start].email } }).then((value) => {
					console.log(value);
					axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWould+You+Like+to+Meet+%F0%9F%A4%9D+${value?.name}%2A+%0A%0A%2ARole%2A+-++${value?.role}%2C%0A%2AIndustry%2A+-+${value?.industry}%2C%0A%2AType%2A+-+${list[start].type}%2C%0A%2AState%2A+-+${value?.state}%2C%0A%2ADescription%2A+-+${user?.aboutMe}%0A%0APress+%2AConnect%2A+to+Connect+with+${value?.name}%0A%2ANext%2A+to+see+next+user&isTemplate=true&footer=Aanndata.Guru+AI`
						)
						.then((resp) => {
							console.log(resp);
						});
				});
			}
		}
	}
};

const replyMessage = async (req: Request, res: Response, next: NextFunction) => {
	const { button, mobile, waNumber } = req.body;
	// const text = JSON.parse(button).text;
	const text = button.text;
	const number = mobile.slice(2, mobile.length);

	try {
		if (text == 'Stop Notification') {
			await axios
				.get(
					`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=You+wont+receive+notification+or+messages+from+our+AI+again.%0ARegards&isTemplate=true&header=Stopping+Whatsapp+AI+Service.&footer=Aandata.guru`
				)
				.then(async (resp) => {
					await axios
						.get(
							`https://media.smsgupshup.com/GatewayAPI/rest?method=OPT_OUT&format=json&userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&phone_number=${mobile}&v=1.1&auth_scheme=plain&channel=WHATSAPP`
						)
						.then((resp) => {
							res.status(200).json({ message: 'Opted Out' });
						});
				});
		} else if (text == 'Next') {
			const existingUser = await AllUserInstance.findOne({ where: { email: number } });
			if (existingUser?.type == 'Mentor') {
				const user = await MentorInstance.findOne({ where: { email: existingUser.email } });
				getPerson(existingUser, user);
				res.status(200).json({ message: 'success' });
			} else if (existingUser?.type == 'Member') {
				const user = await UsersInstance.findOne({ where: { email: existingUser.email } });
				getPerson(existingUser, user);
				res.status(200).json({ message: 'success' });
			} else if (existingUser?.type == 'Marketing') {
				const user = await MarketingInstance.findOne({ where: { email: existingUser.email } });
				getPerson(existingUser, user);
				res.status(200).json({ message: 'success' });
			} else {
				const user = await BankInstance.findOne({ where: { email: existingUser?.email } });
				getPerson(existingUser, user);
				res.status(200).json({ message: 'success' });
			}
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
