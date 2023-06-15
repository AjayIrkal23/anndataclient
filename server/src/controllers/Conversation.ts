import { ConversationInstance } from '../models/Conversation';
import { NextFunction, Request, Response, response } from 'express';
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
import { AllUserInstance } from '../models/user';
const shortUrl = require('node-url-shortener');
var getDaysArray = function () {
	const s = new Date(Date.now());
	const e = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000);

	const dateObj = [];
	for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
		a.push(new Date(d).toDateString());
	}

	return a;
};

const preMeet = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const exists = await ConversationInstance.findAll();
		let d = new Date(Date.now());
		d.setDate(d.getDate());

		exists?.map(async (item) => {
			if (item.meetingLink) {
				console.log(typeof item.meetingLink);

				const now = new Date().getTime();
				const futureDate = new Date(`${new Date(d).toDateString()} ${item.meetingTime.split(' ')[0]}:00:00 ${item?.meetingTime.split(' ')[1]}`).getTime();
				const timeLeft = futureDate - now;
				const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				console.log(new Date(d).toDateString(), item.Mtd, hours);

				if (item.meetingLink && new Date(d).toDateString() == item.Mtd && hours <= 3 && item.finished != true) {
					item.members.map(async (number) => {
						shortUrl.short(item.meetingLink, async (err: any, url: any) => {
							console.log(url.split('/'));
							await axios
								.get(
									`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${
										config.whatsapp_pass
									}&send_to=${number}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Joining+Link+has+been+Shared+for+Meeting+upcoming.+%0AConnection+ID+-+${
										item.id
									}%0ASchedule+-+${new Date(d).toDateString() + ' ' + item.meetingTime.split(' ')[0] + ' ' + item?.meetingTime.split(' ')[1]}%0AMeeting+Url+-+${url.replace(
										/=/g,
										''
									)}%3D%3D&isTemplate=true&header=Meeting+Link+for+upcoming+Meeting&footer=Aanndata.Guru+AI`
								)
								.then(async (response) => {
									console.log(response);
									await ConversationInstance.update({ finished: true }, { where: { id: item.id } });
								});
						});
					});
				}
			}
		});

		res.status(200).json('Success');
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const getMeeting = async (req: Request, res: Response, next: NextFunction) => {
	const meetingDetails = {
		topic: 'Aanndata.Guru Meeting ',
		type: 2,
		agenda: 'Discuss between people connected to one another',
		settings: { host_video: 'true', participant_video: 'true', join_before_host: 'true', mute_upon_entry: 'False', watermark: 'true', audio: 'voip', auto_recording: 'cloud' }
	};

	const headers: any = { authorization: `Bearer ${config.Token}`, 'content-type': 'application/json' };

	try {
		const exists = await ConversationInstance.findAll();
		let d = new Date(Date.now());
		d.setDate(d.getDate());
		console.log(new Date(d).toDateString());
		exists?.map(async (item) => {
			if (item.meetingLink && new Date(d).toDateString() == item.Mtd) {
			}
		});
		res.status(200).json('Success');
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const setDate = async (req: Request, res: Response, next: NextFunction) => {
	const senderId = req.body.senderId;
	const receiverId = req.body.receiverId;

	try {
		const exists = await ConversationInstance.findAll();

		if (exists) {
			exists?.map(async (item) => {
				if (!item.Mtd) {
					const dateArr = getDaysArray();
					if (item.meetingDate == 'Saturday') {
						dateArr.forEach(async (dateItem) => {
							if (dateItem.includes('Sat')) {
								await ConversationInstance.update({ Mtd: dateItem }, { where: { id: item.id } }).then(async (resp) => {
									const users = await ConversationInstance.findOne({ where: { id: item.id } });
									users?.members.map(async (number) => {
										await axios
											.get(
												`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${number}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Zoom+meeting+has+been+created+for+%0AConnection+ID+-+${users.id}%0ADate+-+${users.Mtd}%0A%0AMeeting+Joining+link+will+be+share+on+the+day+meeting+has+been+allocated&isTemplate=true&header=Zoom+Meeting+has+been+allocated.&footer=Aanndata.Guru+AI`
											)
											.then((response) => {
												console.log(response);
											});
									});
								});
							}
						});
					} else if (item.meetingDate == 'Sunday') {
						dateArr.forEach(async (dateItem) => {
							if (dateItem.includes('Sun')) {
								await ConversationInstance.update({ Mtd: dateItem }, { where: { id: item.id } }).then(async (resp) => {
									const users = await ConversationInstance.findOne({ where: { id: item.id } });
									users?.members.map(async (number) => {
										await axios
											.get(
												`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${number}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Zoom+meeting+has+been+created+for+%0AConnection+ID+-+${users.id}%0ADate+-+${users.Mtd}%0A%0AMeeting+Joining+link+will+be+share+on+the+day+meeting+has+been+allocated&isTemplate=true&header=Zoom+Meeting+has+been+allocated.&footer=Aanndata.Guru+AI`
											)
											.then((response) => {
												console.log(response);
											});
									});
								});
							}
						});
					} else if (item.meetingDate == 'Monday') {
						dateArr.forEach(async (dateItem) => {
							if (dateItem.includes('Mon')) {
								await ConversationInstance.update({ Mtd: dateItem }, { where: { id: item.id } }).then(async (resp) => {
									const users = await ConversationInstance.findOne({ where: { id: item.id } });
									users?.members.map(async (number) => {
										await axios
											.get(
												`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${number}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Zoom+meeting+has+been+created+for+%0AConnection+ID+-+${users.id}%0ADate+-+${users.Mtd}%0A%0AMeeting+Joining+link+will+be+share+on+the+day+meeting+has+been+allocated&isTemplate=true&header=Zoom+Meeting+has+been+allocated.&footer=Aanndata.Guru+AI`
											)
											.then((response) => {
												console.log(response);
											});
									});
								});
							}
						});
					} else if (item.meetingDate == 'Tuesday') {
						dateArr.forEach(async (dateItem) => {
							if (dateItem.includes('Tue')) {
								await ConversationInstance.update({ Mtd: dateItem }, { where: { id: item.id } }).then(async (resp) => {
									const users = await ConversationInstance.findOne({ where: { id: item.id } });
									users?.members.map(async (number) => {
										await axios
											.get(
												`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${number}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Zoom+meeting+has+been+created+for+%0AConnection+ID+-+${users.id}%0ADate+-+${users.Mtd}%0A%0AMeeting+Joining+link+will+be+share+on+the+day+meeting+has+been+allocated&isTemplate=true&header=Zoom+Meeting+has+been+allocated.&footer=Aanndata.Guru+AI`
											)
											.then((response) => {
												console.log(response);
											});
									});
								});
							}
						});
					} else if (item.meetingDate == 'Wednesday') {
						dateArr.forEach(async (dateItem) => {
							if (dateItem.includes('Wed')) {
								await ConversationInstance.update({ Mtd: dateItem }, { where: { id: item.id } }).then(async (resp) => {
									const users = await ConversationInstance.findOne({ where: { id: item.id } });
									users?.members.map(async (number) => {
										await axios
											.get(
												`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${number}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Zoom+meeting+has+been+created+for+%0AConnection+ID+-+${users.id}%0ADate+-+${users.Mtd}%0A%0AMeeting+Joining+link+will+be+share+on+the+day+meeting+has+been+allocated&isTemplate=true&header=Zoom+Meeting+has+been+allocated.&footer=Aanndata.Guru+AI`
											)
											.then((response) => {
												console.log(response);
											});
									});
								});
							}
						});
					} else if (item.meetingDate == 'Thursday') {
						dateArr.forEach(async (dateItem) => {
							if (dateItem.includes('Thu')) {
								await ConversationInstance.update({ Mtd: dateItem }, { where: { id: item.id } }).then(async (resp) => {
									const users = await ConversationInstance.findOne({ where: { id: item.id } });
									users?.members.map(async (number) => {
										await axios
											.get(
												`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${number}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Zoom+meeting+has+been+created+for+%0AConnection+ID+-+${users.id}%0ADate+-+${users.Mtd}%0A%0AMeeting+Joining+link+will+be+share+on+the+day+meeting+has+been+allocated&isTemplate=true&header=Zoom+Meeting+has+been+allocated.&footer=Aanndata.Guru+AI`
											)
											.then((response) => {
												console.log(response);
											});
									});
								});
							}
						});
					} else if (item.meetingDate == 'Friday') {
						dateArr.forEach(async (dateItem) => {
							if (dateItem.includes('Fri')) {
								await ConversationInstance.update({ Mtd: dateItem }, { where: { id: item.id } }).then(async (resp) => {
									const users = await ConversationInstance.findOne({ where: { id: item.id } });
									users?.members.map(async (number) => {
										await axios
											.get(
												`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${number}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Zoom+meeting+has+been+created+for+%0AConnection+ID+-+${users.id}%0ADate+-+${users.Mtd}%0A%0AMeeting+Joining+link+will+be+share+on+the+day+meeting+has+been+allocated&isTemplate=true&header=Zoom+Meeting+has+been+allocated.&footer=Aanndata.Guru+AI`
											)
											.then((response) => {
												console.log(response);
											});
									});
								});
							}
						});
					}
				}
			});
			return res.status(200).json('Success');
		} else {
			return res.status(500).json('Not Success');
		}
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const newConversation = async (req: Request, res: Response, next: NextFunction) => {
	console.log('hello');
	const id = uuidv4();

	const { Setype, receiverId, senderId, ReType, meetingTime, meetingDate } = req.body;
	try {
		const exists = await ConversationInstance.findOne({ where: { members: { [Op.contains]: [receiverId, senderId] } } });

		if (exists) {
			res.status(200).json({ Status: 'Exists', message: 'Conversation already Exists' });
		} else {
			const dateUser = await AllUserInstance.findOne({ where: { email: receiverId } });
			if (dateUser?.day1 == meetingDate) {
				await AllUserInstance.update({ dt1: true }, { where: { email: receiverId } });
			} else if (dateUser?.day2 == meetingDate) {
				await AllUserInstance.update({ dt2: true }, { where: { email: receiverId } });
			} else if (dateUser?.day3 == meetingDate) {
				await AllUserInstance.update({ dt3: true }, { where: { email: receiverId } });
			}
			let members = [senderId, receiverId];
			const newConversation = await ConversationInstance.create({ id, members, Setype, ReType, meetingTime, meetingDate });

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
	getAllConversation,
	setDate,
	getMeeting,
	preMeet
};
