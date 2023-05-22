import { AllUserInstance } from './../models/user';
import { MentorInstance } from './../models/mentor';
import { AdminInstance } from './../models/superAdmin';
import { BankInstance } from './../models/bank';
import { MarketingInstance } from './../models/marketing';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Mailjet from 'node-mailjet';
import { UsersInstance } from '../models/userModel';
const accountSid = 'ACcfd4392f3c289e88c8964e1ab37d261f';
const authToken = '9625c1ac2f619d90dc4f4b9022329982';

import axios from 'axios';

const razorpay = require('razorpay');

const mailjet = Mailjet.apiConnect(config.mj_api_key, config.mj_secret_key);

var instance = new razorpay({
	key_id: 'rzp_test_L36esytYvjRbfR',
	key_secret: 'aweI2D4OrVRdr2MjDvP9DbOV'
});

const smsOpt = async (name: string, email: string, type: string) => {
	console.log(`+91${email}`);
	const otp = Math.floor(100000 + Math.random() * 900000);
	if (type === 'Mentor') {
		await MentorInstance.update({ otp: otp }, { where: { email: email } });
	} else if (type === 'Member') {
		await UsersInstance.update({ otp: otp }, { where: { email: email } });
	} else if (type === 'Marketing') {
		await MarketingInstance.update({ otp: otp }, { where: { email: email } });
	} else {
		await BankInstance.update({ otp: otp }, { where: { email: email } });
	}

	await axios
		.get(
			`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Please+verify+your+number.+OTP+is+${otp}%2C+Please+do+not+share+this+to+anyone+else.%0ARegards&isTemplate=true&header=Number+Verification&footer=Aandata.Guru+Team`
		)
		.then((res) => {
			console.log(res);
		});
};

const addAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const id = uuidv4();
	const { name, nakedpassword } = req.body;
	try {
		const existingAdmin = await AdminInstance.findOne({ where: { name } });
		if (existingAdmin) {
			res.status(400).json({ Status: 'Duplicate', message: 'Admin Already Exist' });
		} else {
			const password = await bcrypt.hash(nakedpassword, config.round);
			const user = await AdminInstance.create({ name, password, id });
			res.status(200).json({ Status: 'Success', message: 'Admin Created Successfull.' });
		}
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
	const { email, type } = req.body;
	try {
		const isUser = await UsersInstance.findOne({ where: { email } });
		if (!isUser) {
			res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
		} else {
			const otp = Math.floor(100000 + Math.random() * 900000);
			if (type === 'Mentor') {
				await MentorInstance.update({ otp: otp }, { where: { email: email } });
			} else if (type === 'Member') {
				await UsersInstance.update({ otp: otp }, { where: { email: email } });
			} else if (type === 'Marketing') {
				await MarketingInstance.update({ otp: otp }, { where: { email: email } });
			} else {
				await BankInstance.update({ otp: otp }, { where: { email: email } });
			}

			await axios
				.get(
					`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Please+verify+your+number.+OTP+is+${otp}%2C+Please+do+not+share+this+to+anyone+else.%0ARegards&isTemplate=true&header=Number+Verification&footer=Aandata.Guru+Team`
				)
				.then((gg) => {
					res.status(200).json({ Message: 'Success' });
				});
		}
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
	const id = uuidv4();
	const { name, nakedpassword } = req.body;
	try {
		const isAdmin = await AdminInstance.findOne({ where: { name } });

		if (!isAdmin) {
			res.status(404).json({ Status: 'Not Found', message: 'Admin Not Found' });
		} else {
			const matchPassword = await bcrypt.compare(nakedpassword, isAdmin.password);
			if (!matchPassword) {
				res.status(400).json({ Status: 'Wrong', message: 'Password Does Not Match' });
			} else {
				const token = jwt.sign({ name: isAdmin.name, id: id }, config.secret);
				res.status(200).json({
					Status: 'Success',
					name: isAdmin.name,
					token: token,
					message: 'Successfully Logged In'
				});
			}
		}
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
	const email = req.body.email;
	const otp = req.body.otp;
	const type = req.body.type;

	try {
		if (type === 'Mentor') {
			const existingUser = await MentorInstance.findOne({ where: { email } });

			if (existingUser && existingUser.otp === null) {
				res.status(400).json({ Status: 'Expired', message: 'Expired OTP' });
			} else if (existingUser && existingUser.otp !== otp) {
				res.status(400).json({ Status: 'Wrong', message: 'Wrong OTP' });
			} else if (existingUser && existingUser.otp === otp) {
				if (req.body.password) {
					const password = await bcrypt.hash(req.body.password, config.round);
					const user = await MentorInstance.update({ otp: null, password: password }, { where: { email: email } });
					res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
				} else {
					const user = await MentorInstance.update({ otp: null, active: true }, { where: { email: email } });
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser.email}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=Welcome+${existingUser.name}%2C+Your+Account+has+been+successfully+registered+on+Aannadata.Guru++You+will+be+receiving+regular+updates+from+us+here.+%0ARegards&media_url=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F925%2F820%2Foriginal%2Fcolorful-welcome-design-template-free-vector.jpg&isTemplate=true&footer=Aanndata.Guru+Team`
					);
					res.status(200).json({ Status: 'Success', message: 'Email Verified. Login now' });
				}
			}
		} else if (type === 'Member') {
			const existingUser = await UsersInstance.findOne({ where: { email } });

			if (existingUser && existingUser.otp === null) {
				res.status(400).json({ Status: 'Expired', message: 'Expired OTP' });
			} else if (existingUser && existingUser.otp !== otp) {
				res.status(400).json({ Status: 'Wrong', message: 'Wrong OTP' });
			} else if (existingUser && existingUser.otp === otp) {
				if (req.body.password) {
					const password = await bcrypt.hash(req.body.password, config.round);
					const user = await UsersInstance.update({ otp: null, password: password }, { where: { email: email } });
					res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
				} else {
					const user = await UsersInstance.update({ otp: null, active: true }, { where: { email: email } });
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser.email}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=Welcome+${existingUser.name}%2C+Your+Account+has+been+successfully+registered+on+Aannadata.Guru++You+will+be+receiving+regular+updates+from+us+here.+%0ARegards&media_url=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F925%2F820%2Foriginal%2Fcolorful-welcome-design-template-free-vector.jpg&isTemplate=true&footer=Aanndata.Guru+Team`
					);
					res.status(200).json({ Status: 'Success', message: 'Email Verified. Login now' });
				}
			}
		} else if (type === 'Marketing') {
			const existingUser = await MarketingInstance.findOne({ where: { email } });

			if (existingUser && existingUser.otp === null) {
				res.status(400).json({ Status: 'Expired', message: 'Expired OTP' });
			} else if (existingUser && existingUser.otp !== otp) {
				res.status(400).json({ Status: 'Wrong', message: 'Wrong OTP' });
			} else if (existingUser && existingUser.otp === otp) {
				if (req.body.password) {
					const password = await bcrypt.hash(req.body.password, config.round);
					const user = await MarketingInstance.update({ otp: null, password: password }, { where: { email: email } });
					res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
				} else {
					const user = await MarketingInstance.update({ otp: null, active: true }, { where: { email: email } });
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser.email}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=Welcome+${existingUser.name}%2C+Your+Account+has+been+successfully+registered+on+Aannadata.Guru++You+will+be+receiving+regular+updates+from+us+here.+%0ARegards&media_url=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F925%2F820%2Foriginal%2Fcolorful-welcome-design-template-free-vector.jpg&isTemplate=true&footer=Aanndata.Guru+Team`
					);
					res.status(200).json({ Status: 'Success', message: 'Email Verified. Login now' });
				}
			}
		} else {
			const existingUser = await BankInstance.findOne({ where: { email } });

			if (existingUser && existingUser.otp === null) {
				res.status(400).json({ Status: 'Expired', message: 'Expired OTP' });
			} else if (existingUser && existingUser.otp !== otp) {
				res.status(400).json({ Status: 'Wrong', message: 'Wrong OTP' });
			} else if (existingUser && existingUser.otp === otp) {
				if (req.body.password) {
					const password = await bcrypt.hash(req.body.password, config.round);
					const user = await BankInstance.update({ otp: null, password: password }, { where: { email: email } });
					res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
				} else {
					const user = await BankInstance.update({ otp: null, active: true }, { where: { email: email } });
					axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${existingUser.email}&v=1.1&format=json&msg_type=IMAGE&method=SENDMEDIAMESSAGE&caption=Welcome+${existingUser.name}%2C+Your+Account+has+been+successfully+registered+on+Aannadata.Guru++You+will+be+receiving+regular+updates+from+us+here.+%0ARegards&media_url=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F925%2F820%2Foriginal%2Fcolorful-welcome-design-template-free-vector.jpg&isTemplate=true&footer=Aanndata.Guru+Team`
					);
					res.status(200).json({ Status: 'Success', message: 'Email Verified. Login now' });
				}
			}
		}
	} catch (error) {
		return error;
	}
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
	const id = uuidv4();
	const active = false;
	const type = req.body.type;
	const { name, email, nakedpassword } = req.body;

	let optin = await axios.get(
		`https://media.smsgupshup.com/GatewayAPI/rest?method=OPT_IN&format=json&userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&phone_number=${email}&v=1.1&auth_scheme=plain&channel=WHATSAPP`
	);

	try {
		if (type === 'Member') {
			const existingUser = await UsersInstance.findOne({ where: { email } });
			if (existingUser && existingUser.active) {
				res.status(400).json({ Status: 'Duplicate', message: 'User Already Exist' });
			} else if (existingUser && !existingUser.active) {
				smsOpt(name, email, type);
				res.status(300).json({ Status: 'Pending', message: 'OTP Sent to email. Verify EMail.' }); // redirect to otp entry
			} else {
				await AllUserInstance.create({ id, email, type });
				const user = await UsersInstance.create({ id, name, email, active });
				smsOpt(name, email, type);
				res.status(200).json({ Status: 'Success', message: 'Signup Successfull. Verify Email.' });
			}
		} else if (type === 'Mentor') {
			await AllUserInstance.create({ id, email, type });
			const existingUser = await MentorInstance.findOne({ where: { email } });
			if (existingUser && existingUser.active) {
				res.status(400).json({ Status: 'Duplicate', message: 'User Already Exist' });
			} else if (existingUser && !existingUser.active) {
				smsOpt(name, email, type);
				res.status(300).json({ Status: 'Pending', message: 'OTP Sent to email. Verify EMail.' }); // redirect to otp entry
			} else {
				const password = await bcrypt.hash(nakedpassword, config.round);
				const user = await MentorInstance.create({ id, name, email, password, active });
				smsOpt(name, email, type);
				res.status(200).json({ Status: 'Success', message: 'Signup Successfull. Verify Email.' });
			}
		} else if (type === 'Marketing') {
			await AllUserInstance.create({ id, email, type });
			const existingUser = await MarketingInstance.findOne({ where: { email } });
			if (existingUser && existingUser.active) {
				res.status(400).json({ Status: 'Duplicate', message: 'User Already Exist' });
			} else if (existingUser && !existingUser.active) {
				smsOpt(name, email, type);
				res.status(300).json({ Status: 'Pending', message: 'OTP Sent to email. Verify EMail.' }); // redirect to otp entry
			} else {
				const password = await bcrypt.hash(nakedpassword, config.round);
				const user = await MarketingInstance.create({ id, name, email, password, active });
				smsOpt(name, email, type);
				res.status(200).json({ Status: 'Success', message: 'Signup Successfull. Verify Email.' });
			}
		} else {
			await AllUserInstance.create({ id, email, type });
			const existingUser = await BankInstance.findOne({ where: { email } });
			if (existingUser && existingUser.active) {
				res.status(400).json({ Status: 'Duplicate', message: 'User Already Exist' });
			} else if (existingUser && !existingUser.active) {
				smsOpt(name, email, type);
				res.status(300).json({ Status: 'Pending', message: 'OTP Sent to email. Verify EMail.' }); // redirect to otp entry
			} else {
				const password = await bcrypt.hash(nakedpassword, config.round);
				const user = await BankInstance.create({ id, name, email, password, active });
				smsOpt(name, email, type);
				res.status(200).json({ Status: 'Success', message: 'Signup Successfull. Verify Email.' });
			}
		}
	} catch (error) {
		return res.status(500).json({ message: `${error} noob error` });
	}
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
	const { email, nakedpassword, otp } = req.body;
	const type = req.body.type;
	let passCheck = null;

	try {
		if (type === 'Mentor') {
			const isUser = await MentorInstance.findOne({ where: { email } });
			if (!isUser?.password) {
				passCheck = false;
			} else {
				passCheck = true;
			}
			if (!isUser) {
				res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
			} else if (isUser && !isUser.active) {
				smsOpt(isUser.name, email, type);
				res.status(300).json({ Status: 'Pending', message: 'OTP Sent to email. Verify EMail.' }); // redirect to otp entry
			} else {
				if (otp != isUser.otp) {
					res.status(400).json({ Status: 'Wrong', message: 'Password Does Not Match' });
				} else {
					const token = jwt.sign({ email: email, name: isUser.name, id: isUser.id }, config.secret);
					res.status(200).json({
						Status: 'Success',
						email: email,
						name: isUser.name,
						token: token,
						message: 'Successfully Logged In',
						passCheck
					});
				}
			}
		} else if (type === 'Member') {
			const isUser = await UsersInstance.findOne({ where: { email } });
			if (!isUser) {
				res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
			} else if (isUser && !isUser.active) {
				smsOpt(isUser.name, email, type);
				res.status(300).json({ Status: 'Pending', message: 'OTP Sent to email. Verify EMail.' }); // redirect to otp entry
			} else {
				const token = jwt.sign({ email: email, name: isUser.name, id: isUser.id }, config.secret);
				res.status(200).json({
					Status: 'Success',
					email: email,
					name: isUser.name,
					token: token,
					message: 'Successfully Logged In',
					passCheck
				});
			}
		} else if (type === 'Marketing') {
			const isUser = await MarketingInstance.findOne({ where: { email } });
			if (!isUser?.password) {
				passCheck = false;
			} else {
				passCheck = true;
			}
			if (!isUser) {
				res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
			} else if (isUser && !isUser.active) {
				smsOpt(isUser.name, email, type);
				res.status(300).json({ Status: 'Pending', message: 'OTP Sent to email. Verify EMail.' }); // redirect to otp entry
			} else {
				const matchPassword = await bcrypt.compare(nakedpassword, isUser.password);
				if (!matchPassword) {
					res.status(400).json({ Status: 'Wrong', message: 'Password Does Not Match' });
				} else {
					const token = jwt.sign({ email: email, name: isUser.name, id: isUser.id }, config.secret);
					res.status(200).json({
						Status: 'Success',
						email: email,
						name: isUser.name,
						token: token,
						message: 'Successfully Logged In',
						passCheck
					});
				}
			}
		} else {
			const isUser = await BankInstance.findOne({ where: { email } });
			if (!isUser?.password) {
				passCheck = false;
			} else {
				passCheck = true;
			}
			if (!isUser) {
				res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
			} else if (isUser && !isUser.active) {
				smsOpt(isUser.name, email, type);
				res.status(300).json({ Status: 'Pending', message: 'OTP Sent to email. Verify EMail.' }); // redirect to otp entry
			} else {
				const matchPassword = await bcrypt.compare(nakedpassword, isUser.password);
				if (!matchPassword) {
					res.status(400).json({ Status: 'Wrong', message: 'Password Does Not Match' });
				} else {
					const token = jwt.sign({ email: email, name: isUser.name, id: isUser.id }, config.secret);
					res.status(200).json({
						Status: 'Success',
						email: email,
						name: isUser.name,
						token: token,
						message: 'Successfully Logged In',
						passCheck
					});
				}
			}
		}
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const updateUserDets = async (req: Request, res: Response, next: NextFunction) => {
	const { email, type } = req.body;

	try {
		if (type === 'Mentor') {
			const existingUser = await MentorInstance.findOne({ where: { email } });

			if (!existingUser) {
				res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
			} else {
				const user = await MentorInstance.update({ ...req.body }, { where: { email: email } });
				res.status(200).json({ Status: 'Success', message: user });
			}
		} else if (type === 'Member') {
			const existingUser = await UsersInstance.findOne({ where: { email } });

			if (!existingUser) {
				res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
			} else {
				const user = await UsersInstance.update({ ...req.body }, { where: { email: email } });
				res.status(200).json({ Status: 'Success', message: user });
			}
		} else if (type === 'Marketing') {
			const existingUser = await MarketingInstance.findOne({ where: { email } });

			if (!existingUser) {
				res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
			} else {
				const user = await MarketingInstance.update({ ...req.body }, { where: { email: email } });
				res.status(200).json({ Status: 'Success', message: user });
			}
		} else {
			const existingUser = await BankInstance.findOne({ where: { email } });

			if (!existingUser) {
				res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
			} else {
				const user = await BankInstance.update({ ...req.body }, { where: { email: email } });
				res.status(200).json({ Status: 'Success', message: user });
			}
		}
		res.status(200).json({ Status: 'Success' });
	} catch (error) {
		return error;
	}
};

const refreshProfile = async (req: Request, res: Response, next: NextFunction) => {
	const { email, type } = req.body;

	if (type === 'Mentor') {
		const isUser = await MentorInstance.findOne({ where: { email } });

		if (isUser) {
			isUser.password = '';
			isUser.otp = 0;
			const token = jwt.sign({ email: email, name: isUser.name, id: isUser.id }, config.secret);
			res.status(200).json({
				Status: 'Success',
				message: { user: isUser, token: token }
			});
		} else {
			res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
		}
	} else if (type === 'Member') {
		const isUser = await UsersInstance.findOne({ where: { email } });
		if (isUser) {
			isUser.password = '';
			isUser.otp = 0;
			const token = jwt.sign({ email: email, name: isUser.name, id: isUser.id }, config.secret);
			res.status(200).json({
				Status: 'Success',
				message: { user: isUser, token: token }
			});
		} else {
			res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
		}
	} else if (type === 'Marketing') {
		const isUser = await MarketingInstance.findOne({ where: { email } });
		if (isUser) {
			isUser.password = '';
			isUser.otp = 0;
			const token = jwt.sign({ email: email, name: isUser.name, id: isUser.id }, config.secret);
			res.status(200).json({
				Status: 'Success',
				message: { user: isUser, token: token }
			});
		} else {
			res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
		}
	} else {
		const isUser = await BankInstance.findOne({ where: { email } });
		if (isUser) {
			isUser.password = '';
			isUser.otp = 0;
			const token = jwt.sign({ email: email, name: isUser.name, id: isUser.id }, config.secret);
			res.status(200).json({
				Status: 'Success',
				message: { user: isUser, token: token }
			});
		} else {
			res.status(404).json({ Status: 'Not Found', message: 'User Not Found' });
		}
	}

	try {
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Member = await UsersInstance.findAll({});
		if (Member) {
			Member.forEach((item) => {
				item.password = '';
				item.otp = 0;
			});
		}
		const Mentor = await MentorInstance.findAll({});
		if (Mentor) {
			Mentor.forEach((item) => {
				item.password = '';
				item.otp = 0;
			});
		}
		const Bank = await BankInstance.findAll({});
		if (Bank) {
			Bank.forEach((item) => {
				item.password = '';
				item.otp = 0;
			});
		}
		const Marketing = await MarketingInstance.findAll({});
		if (Marketing) {
			Marketing.forEach((item) => {
				item.password = '';
				item.otp = 0;
			});
		}
		res.status(200).json({ Member, Mentor, Bank, Marketing });
	} catch (error) {
		return res.status(500).json(error);
	}
};

const getUsersTable = async (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body;
	try {
		const Member = await AllUserInstance.findOne({ where: { email } });
		res.status(200).json(Member);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const SendNotPaid = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const Member = await UsersInstance.findAll({});
		if (Member) {
			Member.forEach(async (item) => {
				if (!item.paid) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${item.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hello+${item.name}%2C+Your+Account+has+been+Registered+at+Aanndata.Guru+but+Your+Profile+is+not+Visible+yet.+to+make+it+visible+please+pay+the+registration+token+of+%2A100%2F-%2A%0ARegards&isTemplate=true&header=Complete+the+Registration+Process+%21&footer=Aandata.Guru+Team`
					);
				}
			});
		}
		const Mentor = await MentorInstance.findAll({});
		if (Mentor) {
			Mentor.forEach(async (item) => {
				if (!item.paid) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${item.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hello+${item.name}%2C+Your+Account+has+been+Registered+at+Aanndata.Guru+but+Your+Profile+is+not+Visible+yet.+to+make+it+visible+please+pay+the+registration+token+of+%2A100%2F-%2A%0ARegards&isTemplate=true&header=Complete+the+Registration+Process+%21&footer=Aandata.Guru+Team`
					);
				}
			});
		}
		const Bank = await BankInstance.findAll({});
		if (Bank) {
			Bank.forEach(async (item) => {
				if (!item.paid) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${item.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hello+${item.name}%2C+Your+Account+has+been+Registered+at+Aanndata.Guru+but+Your+Profile+is+not+Visible+yet.+to+make+it+visible+please+pay+the+registration+token+of+%2A100%2F-%2A%0ARegards&isTemplate=true&header=Complete+the+Registration+Process+%21&footer=Aandata.Guru+Team`
					);
				}
			});
		}
		const Marketing = await MarketingInstance.findAll({});
		if (Marketing) {
			Marketing.forEach(async (item) => {
				if (!item.paid) {
					await axios.get(
						`https://media.smsgupshup.com/GatewayAPI/rest?userid=${config.whatsapp_id}&password=${config.whatsapp_pass}&send_to=${item.email}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hello+${item.name}%2C+Your+Account+has+been+Registered+at+Aanndata.Guru+but+Your+Profile+is+not+Visible+yet.+to+make+it+visible+please+pay+the+registration+token+of+%2A100%2F-%2A%0ARegards&isTemplate=true&header=Complete+the+Registration+Process+%21&footer=Aandata.Guru+Team`
					);
				}
			});
		}
		res.status(200).json({ Message: 'Success' });
	} catch (error) {
		return res.status(500).json(error);
	}
};

const Payment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let amount = 100 * 100;
		let currency = 'INR';

		instance.orders.create({ amount, currency }, (error: any, order: any) => {
			if (error) {
				return res.status(500).json(error);
			}
			return res.status(200).json(order);
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

const uploadDayTime = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { day, time, email } = req.body;

		day.map(async (item: string, i: any) => {
			if (i == 0) {
				await AllUserInstance.update({ day1: day[i] }, { where: { email: email } });
				await AllUserInstance.update({ Time1: time[i] }, { where: { email: email } });
			} else if (i == 1) {
				await AllUserInstance.update({ day2: day[i] }, { where: { email: email } });
				await AllUserInstance.update({ Time2: time[i] }, { where: { email: email } });
			} else if (i == 2) {
				await AllUserInstance.update({ day3: day[i] }, { where: { email: email } });
				await AllUserInstance.update({ Time3: time[i] }, { where: { email: email } });
			}
		});
		await AllUserInstance.update({ ready: true }, { where: { email: email } });
		return res.status(200).json('Success');
	} catch (error) {
		return res.status(500).json(error);
	}
};

const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { type, email } = req.body;
		if (type === 'Member') {
			const Member = await UsersInstance.findOne({ where: { email } });
			if (Member) {
				Member.password = '';
				Member.otp = 0;
				res.status(200).json(Member);
			} else {
				res.status(404).json({ Status: 'Not Found', message: 'Member Not Found' });
			}
		} else if (type === 'Mentor') {
			const Member = await MentorInstance.findOne({ where: { email } });
			if (Member) {
				Member.password = '';
				Member.otp = 0;
				res.status(200).json(Member);
			} else {
				res.status(404).json({ Status: 'Not Found', message: 'Mentor/Investor Not Found' });
			}
		} else if (type === 'Marketing') {
			const Member = await MarketingInstance.findOne({ where: { email } });
			if (Member) {
				Member.password = '';
				Member.otp = 0;
				res.status(200).json(Member);
			} else {
				res.status(404).json({ Status: 'Not Found', message: 'Marketing Not Found' });
			}
		} else {
			const Member = await BankInstance.findOne({ where: { email } });
			if (Member) {
				Member.password = '';
				Member.otp = 0;
				res.status(200).json(Member);
			} else {
				res.status(404).json({ Status: 'Not Found', message: 'Bank Not Found' });
			}
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

const getAllFilter = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { type } = req.body;
		if (type === 'Member') {
			const Member = await UsersInstance.findAll({});
			if (Member) {
				Member.forEach((item) => {
					item.password = '';
					item.otp = 0;
				});
				res.status(200).json(Member);
			} else {
				res.status(404).json({ Status: 'Not Found', message: 'Member Not Found' });
			}
		} else if (type === 'Mentor') {
			const Member = await MentorInstance.findAll({});

			if (Member) {
				Member.forEach((item) => {
					item.password = '';
					item.otp = 0;
				});
				res.status(200).json(Member);
			} else {
				res.status(404).json({ Status: 'Not Found', message: 'Mentor/Investor Not Found' });
			}
		} else if (type === 'Marketing') {
			const Member = await MarketingInstance.findAll({});
			if (Member) {
				Member.forEach((item) => {
					item.password = '';
					item.otp = 0;
				});
				res.status(200).json(Member);
			} else {
				res.status(404).json({ Status: 'Not Found', message: 'Marketing Not Found' });
			}
		} else {
			const Member = await BankInstance.findAll({});
			if (Member) {
				Member.forEach((item) => {
					item.password = '';
					item.otp = 0;
				});
				res.status(200).json(Member);
			} else {
				res.status(404).json({ Status: 'Not Found', message: 'Bank Not Found' });
			}
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
	const email = req.body.email;
	const type = req.body;
	if (type == 'Member') {
		const user = await UsersInstance.findOne({ where: { email } });
		if (user) {
			smsOpt(user.name, email, type);
			res.status(200).json({ Status: 'Success', message: 'OTP Sent to email. Check your email.' });
		} else {
			res.status(404).json({ Status: 'Not Found', message: 'Email not found. Please register' });
		}
	} else if (type == 'Mentor') {
		const user = await MentorInstance.findOne({ where: { email } });
		if (user) {
			smsOpt(user.name, email, type);
			res.status(200).json({ Status: 'Success', message: 'OTP Sent to email. Check your email.' });
		} else {
			res.status(404).json({ Status: 'Not Found', message: 'Email not found. Please register' });
		}
	} else if (type == 'Marketing') {
		const user = await MarketingInstance.findOne({ where: { email } });
		if (user) {
			smsOpt(user.name, email, type);
			res.status(200).json({ Status: 'Success', message: 'OTP Sent to email. Check your email.' });
		} else {
			res.status(404).json({ Status: 'Not Found', message: 'Email not found. Please register' });
		}
	} else {
		const user = await BankInstance.findOne({ where: { email } });
		if (user) {
			smsOpt(user.name, email, type);
			res.status(200).json({ Status: 'Success', message: 'OTP Sent to email. Check your email.' });
		} else {
			res.status(404).json({ Status: 'Not Found', message: 'Email not found. Please register' });
		}
	}
};

const ChangeOldPassword = async (req: Request, res: Response, next: NextFunction) => {
	const email = req.body.email;
	const oldPass = req.body.oldPass;
	const newPass = req.body.newPass;
	const type = req.body.type;
	if (type == 'Member') {
		try {
			const existingUser = await UsersInstance.findOne({ where: { email } });
			if (req.body.oldPass) {
				if (existingUser) {
					const checkPasswordMatch = await bcrypt.compare(oldPass, existingUser.password);
					if (!checkPasswordMatch) {
						res.status(401).json({ Status: 'Wrong', message: 'Password Does Not Match' });
					} else {
						const password = await bcrypt.hash(newPass, config.round);
						const user = await UsersInstance.update({ password: password }, { where: { email: email } });
						res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
					}
				} else {
					return res.status(400).json({ message: 'User Not Found' });
				}
			} else {
				const password = await bcrypt.hash(newPass, config.round);
				const user = await UsersInstance.update({ password: password }, { where: { email: email } });
				res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
			}
		} catch (error) {
			return error;
		}
	} else if (type == 'Mentor') {
		try {
			const existingUser = await MentorInstance.findOne({ where: { email } });
			if (req.body.oldPass) {
				if (existingUser) {
					const checkPasswordMatch = await bcrypt.compare(oldPass, existingUser.password);
					if (!checkPasswordMatch) {
						res.status(401).json({ Status: 'Wrong', message: 'Password Does Not Match' });
					} else {
						const password = await bcrypt.hash(newPass, config.round);
						const user = await MentorInstance.update({ password: password }, { where: { email: email } });
						res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
					}
				} else {
					return res.status(400).json({ message: 'User Not Found' });
				}
			} else {
				const password = await bcrypt.hash(newPass, config.round);
				const user = await MentorInstance.update({ password: password }, { where: { email: email } });
				res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
			}
		} catch (error) {
			return error;
		}
	} else if (type == 'Marketing') {
		try {
			const existingUser = await MarketingInstance.findOne({ where: { email } });
			if (req.body.oldPass) {
				if (existingUser) {
					const checkPasswordMatch = await bcrypt.compare(oldPass, existingUser.password);
					if (!checkPasswordMatch) {
						res.status(401).json({ Status: 'Wrong', message: 'Password Does Not Match' });
					} else {
						const password = await bcrypt.hash(newPass, config.round);
						const user = await MarketingInstance.update({ password: password }, { where: { email: email } });
						res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
					}
				} else {
					return res.status(400).json({ message: 'User Not Found' });
				}
			} else {
				const password = await bcrypt.hash(newPass, config.round);
				const user = await MarketingInstance.update({ password: password }, { where: { email: email } });
				res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
			}
		} catch (error) {
			return error;
		}
	} else {
		try {
			const existingUser = await BankInstance.findOne({ where: { email } });
			if (req.body.oldPass) {
				if (existingUser) {
					const checkPasswordMatch = await bcrypt.compare(oldPass, existingUser.password);
					if (!checkPasswordMatch) {
						res.status(401).json({ Status: 'Wrong', message: 'Password Does Not Match' });
					} else {
						const password = await bcrypt.hash(newPass, config.round);
						const user = await BankInstance.update({ password: password }, { where: { email: email } });
						res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
					}
				} else {
					return res.status(400).json({ message: 'User Not Found' });
				}
			} else {
				const password = await bcrypt.hash(newPass, config.round);
				const user = await BankInstance.update({ password: password }, { where: { email: email } });
				res.status(200).json({ Status: 'Success', message: 'Password Changed. Login now' });
			}
		} catch (error) {
			return error;
		}
	}
};

export default {
	signUp,
	verifyOtp,
	signIn,
	addAdmin,
	adminLogin,
	updateUserDets,
	refreshProfile,
	SendNotPaid,
	getAllUsers,
	getSingleUser,
	sendOtp,
	getAllFilter,
	ChangeOldPassword,
	changePassword,
	Payment,
	getUsersTable,
	uploadDayTime
};
