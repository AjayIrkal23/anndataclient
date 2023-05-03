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
import { Op } from 'sequelize';

const Time = ['9:30 Am', '12:00 Pm', '3:00 Pm', '5:00 Pm', '7:00 Pm'];
const Day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

const sendUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const list = await AllUserInstance.findAll({});
		list.forEach(async (item) => {
			await axios.get(
				`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${item?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2ANew+Users+Found+In+Your+Interest+Area%2A+Would+you+like+to+meet+them.%0APress+on+Next+to+Start+The+Process.&isTemplate=true&footer=Aanndata.Guru+AI`
			);
		});
		res.status(200).json({ message: 'success' });
	} catch (error) {
		return res.status(500).json({ message: 'Not success', error });
	}
};

const StartAI = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const list = await AllUserInstance.findAll({});
		list.forEach(async (item) => {
			console.log(item.day1, item.Time1);
			if (item.day1 == null || item.Time1 == null) {
				await axios.get(
					`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${item?.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AWelcome+i+am+Aaandata.Guru+AI+%F0%9F%A4%96%2A%0A%0APress+%2A%27Start%27%2A+to+perform+operations.%0A%0AYou+have+to+Complete+the+process+to+be+visible+to+people+for+connections&isTemplate=true&footer=Aanndata.Guru+AI`
				);
			}
		});
		res.status(200).json({ message: 'success' });
	} catch (error) {
		return res.status(500).json({ message: 'Not success', error });
	}
};

const replyMessage = async (req: Request, res: Response, next: NextFunction) => {
	const { button, mobile, waNumber } = req.body;

	let text;
	if (button) {
		text = JSON.parse(button).text;
	} else {
		text = req.body.text;
	}

	let total = 3;
	let count;

	const number = mobile.slice(2, mobile.length);

	try {
		const user = await AllUserInstance.findOne({ where: { email: number } });
		if (!user?.Time1 || !user?.day1) {
			count = 1;
		} else if (!!user?.Time2 || !user?.day2) {
			count = 2;
		} else if (!user?.Time3 || !user?.day3) {
			count = 3;
		}

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
		} else if (text == 'Connect') {
			getConnected('Setype', 'receiverId', 'senderId', 'ReType');
		} else if (text == 'Start') {
			await axios
				.get(
					`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2A1%2A+-+${Time[0]}%0A%2A2%2A+-+${Time[1]}%0A%2A3%2A+-+${Time[2]}%0A%2A4%2A+-+${Time[3]}%0A%2A5%2A+-+${Time[4]}%0A%0Areply+the+following+serial+number+to+select+your+availability.&isTemplate=true&header=Please+Select+Your+availability.+%28Time%29&footer=Aanndata.Guru+AI`
				)
				.then((resp) => {
					console.log(resp);
					res.status(200).json({ message: 'success' });
				});
		} else if (text == 1 || text == 2 || text == 3 || text == 4 || text == 5) {
			if (!user?.Time1) {
				await AllUserInstance.update({ Time1: Time[text - 1] }, { where: { email: number } });
			} else if (!user?.Time2) {
				await AllUserInstance.update({ Time2: Time[text - 1] }, { where: { email: number } });
			} else if (!user?.Time3) {
				await AllUserInstance.update({ Time3: Time[text - 1] }, { where: { email: number } });
			}
			await axios
				.get(
					`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=A+-+${Day[0]}%0AB+-+${Day[1]}%0AC+-+${Day[2]}%0AD+-+${Day[3]}+%0AE+-+${Day[4]}%0AF+-+${Day[5]}%0AD+-+${Day[6]}%0A%0AReply+the+following+serial+number+to+select+your+day.&isTemplate=true&header=Please+Select+Your+availability.+%28Day%29&footer=Aanndata.Guru+AI`
				)
				.then((resp) => {
					console.log(resp);
					res.status(200).json({ message: 'success' });
				});
		} else if (
			text.toLowerCase() == 'a' ||
			text.toLowerCase() == 'b' ||
			text.toLowerCase() == 'c' ||
			text.toLowerCase() == 'd' ||
			text.toLowerCase() == 'e' ||
			text.toLowerCase() == 'f' ||
			text.toLowerCase() == 'g'
		) {
			if (text.toLowerCase() == 'a') {
				if (user?.day1 == Day[0] || user?.day2 == Day[0] || user?.day3 == Day[0]) {
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2ADay+Already+Selected+In+Weekly+Slots%2A%0A%0APlease+Select+Different+Day.&isTemplate=true&footer=Aanndata.Guru+AI`
					);
				} else {
					if (!user?.day1) {
						await AllUserInstance.update({ day1: Day[0] }, { where: { email: number } });
					} else if (!user?.day2) {
						await AllUserInstance.update({ day2: Day[0] }, { where: { email: number } });
					} else if (!user?.day3) {
						await AllUserInstance.update({ day3: Day[0] }, { where: { email: number } });
					}
				}
			} else if (text.toLowerCase() == 'b') {
				if (user?.day1 == Day[1] || user?.day2 == Day[1] || user?.day3 == Day[1]) {
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2ADay+Already+Selected+In+Weekly+Slots%2A%0A%0APlease+Select+Different+Day.&isTemplate=true&footer=Aanndata.Guru+AI`
					);
				} else {
					if (!user?.day1) {
						await AllUserInstance.update({ day1: Day[1] }, { where: { email: number } });
					} else if (!user?.day2) {
						await AllUserInstance.update({ day2: Day[1] }, { where: { email: number } });
					} else if (!user?.day3) {
						await AllUserInstance.update({ day3: Day[1] }, { where: { email: number } });
					}
				}
			} else if (text.toLowerCase() == 'c') {
				if (user?.day1 == Day[2] || user?.day2 == Day[2] || user?.day3 == Day[2]) {
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2ADay+Already+Selected+In+Weekly+Slots%2A%0A%0APlease+Select+Different+Day.&isTemplate=true&footer=Aanndata.Guru+AI`
					);
				} else {
					if (!user?.day1) {
						await AllUserInstance.update({ day1: Day[2] }, { where: { email: number } });
					} else if (!user?.day2) {
						await AllUserInstance.update({ day2: Day[2] }, { where: { email: number } });
					} else if (!user?.day3) {
						await AllUserInstance.update({ day3: Day[2] }, { where: { email: number } });
					}
				}
			} else if (text.toLowerCase() == 'd') {
				if (user?.day1 == Day[3] || user?.day2 == Day[3] || user?.day3 == Day[3]) {
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2ADay+Already+Selected+In+Weekly+Slots%2A%0A%0APlease+Select+Different+Day.&isTemplate=true&footer=Aanndata.Guru+AI`
					);
				} else {
					if (!user?.day1) {
						await AllUserInstance.update({ day1: Day[3] }, { where: { email: number } });
					} else if (!user?.day2) {
						await AllUserInstance.update({ day2: Day[3] }, { where: { email: number } });
					} else if (!user?.day3) {
						await AllUserInstance.update({ day3: Day[3] }, { where: { email: number } });
					}
				}
			} else if (text.toLowerCase() == 'e') {
				if (user?.day1 == Day[4] || user?.day2 == Day[4] || user?.day3 == Day[4]) {
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2ADay+Already+Selected+In+Weekly+Slots%2A%0A%0APlease+Select+Different+Day.&isTemplate=true&footer=Aanndata.Guru+AI`
					);
				} else {
					if (!user?.day1) {
						await AllUserInstance.update({ day1: Day[4] }, { where: { email: number } });
					} else if (!user?.day2) {
						await AllUserInstance.update({ day2: Day[4] }, { where: { email: number } });
					} else if (!user?.day3) {
						await AllUserInstance.update({ day3: Day[4] }, { where: { email: number } });
					}
				}
			} else if (text.toLowerCase() == 'f') {
				if (user?.day1 == Day[5] || user?.day2 == Day[5] || user?.day3 == Day[5]) {
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2ADay+Already+Selected+In+Weekly+Slots%2A%0A%0APlease+Select+Different+Day.&isTemplate=true&footer=Aanndata.Guru+AI`
					);
				} else {
					if (!user?.day1) {
						await AllUserInstance.update({ day1: Day[5] }, { where: { email: number } });
					} else if (!user?.day2) {
						await AllUserInstance.update({ day2: Day[5] }, { where: { email: number } });
					} else if (!user?.day3) {
						await AllUserInstance.update({ day3: Day[5] }, { where: { email: number } });
					}
				}
			} else if (text.toLowerCase() == 'g') {
				if (user?.day1 == Day[6] || user?.day2 == Day[6] || user?.day3 == Day[6]) {
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2ADay+Already+Selected+In+Weekly+Slots%2A%0A%0APlease+Select+Different+Day.&isTemplate=true&footer=Aanndata.Guru+AI`
					);
				} else {
					if (!user?.day1) {
						await AllUserInstance.update({ day1: Day[6] }, { where: { email: number } });
					} else if (!user?.day2) {
						await AllUserInstance.update({ day2: Day[6] }, { where: { email: number } });
					} else if (!user?.day3) {
						await AllUserInstance.update({ day3: Day[6] }, { where: { email: number } });
					}
				}
			}
			if (!user?.day1 || !user?.day2 || !user?.day3 || !user?.Time1 || !user?.Time2 || !user?.Time3) {
				axios.get(
					`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AAvailability+Allocated%2A+${count}%2F${total}%0APlease+Complete+All+the+Slots+To+Start+Meeting+People.&isTemplate=true&footer=Aanndata.Guru+AI`
				);
				gotoSend(mobile).then((resp) => {
					res.status(200).json({ message: 'success' });
				});
			} else {
				axios.get(
					`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Your+Time+and+Day+has+been+allocated+to+meet+new+users.+%0A%0AWeekly+Connections+will+be+arranged.&isTemplate=true&footer=Aanndata.Guru+AI`
				);
				res.status(200).json({ message: 'success' });
			}
		} else {
			console.log(text);
			await axios.get(
				`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AInvalid+Response%2A%0A%0APlease+Provide+an+Valid+Response.+%0A%0Aalso+if+you+spam+messages+without+any+request+our+bot+can+ban+you.&isTemplate=true&footer=Aanndata.Guru+AI`
			);
			res.status(500).json({ message: 'Not success' });
		}
	} catch (error) {
		return res.status(500).json({ message: 'Not success', error });
	}
};

const gotoSend = async (mobile: any) => {
	await axios
		.get(
			`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2A1%2A+-+${Time[0]}%0A%2A2%2A+-+${Time[1]}%0A%2A3%2A+-+${Time[2]}%0A%2A4%2A+-+${Time[3]}%0A%2A5%2A+-+${Time[4]}%0A%0Areply+the+following+serial+number+to+select+your+availability.&isTemplate=true&header=Please+Select+Your+availability.+%28Time%29&footer=Aanndata.Guru+AI`
		)
		.then((resp) => {
			console.log(resp);
			return true;
		});
};

const getConnected = async (Setype: any, receiverId: any, senderId: any, ReType: any) => {
	const id = uuidv4();

	try {
		const exists = await ConversationInstance.findOne({ where: { members: { [Op.contains]: [receiverId, senderId] } } });

		if (exists) {
			console.log('exists');
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

			console.log('created successfully');
		}
	} catch (error) {
		console.log(error);
	}
};

// const gotoSendDay = async (mobile: any) => {
// 	await axios
// 		.get(
// 			`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=A+-+${Day[0]}%0AB+-+${Day[1]}%0AC+-+${Day[2]}%0AD+-+${Day[3]}+%0AE+-+${Day[4]}%0AF+-+${Day[5]}%0AD+-+${Day[6]}%0A%0AReply+the+following+serial+number+to+select+your+day.&isTemplate=true&header=Please+Select+Your+availability.+%28Day%29&footer=Aanndata.Guru+AI`
// 		)
// 		.then((resp) => {
// 			console.log(resp);
// 			return true;
// 		});
// };
export default {
	getMessage,
	newMessage,
	replyMessage,
	sendUsers,
	StartAI
};
