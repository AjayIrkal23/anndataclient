import axios from 'axios';
import { TestInstance } from './../models/Test';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
const razorpay = require('razorpay');

var instance = new razorpay({
	key_id: 'rzp_test_L36esytYvjRbfR',
	key_secret: 'aweI2D4OrVRdr2MjDvP9DbOV'
});

const TestStart = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let amount = 250 * 100;
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

const CheckActive = async (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body;
	try {
		const test = await TestInstance.findOne({ where: { email: email, state: true } });
		if (test) {
			res.status(202).json({ Message: 'Test exists' });
		} else {
			res.status(200).json({ Message: 'No Test Exists' });
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

const createTest = async (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body;
	const id = uuidv4();
	try {
		const test = await TestInstance.findOne({ where: { email: email, state: true } });
		if (test) {
			res.status(202).json({ Message: 'Test exists' });
		} else {
			let { data } = await axios.post('https://app.swayamanalytics.com/dev/v1/assessment_short.php', {
				affiliate: 1,
				report: 1
			});

			let user = {
				id: id,
				affiliate: '1',
				swayamRef: data.swayam_ref,
				cRef: data.customer_reference,
				uRef: data.user_reference,
				state: true,
				testResp: data,
				page: '1',
				email: email
			};
			const test = await TestInstance.create(user);
			res.status(200).json({ Message: 'Test Created', data });
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

const updateTest = async (req: Request, res: Response, next: NextFunction) => {
	const { email, send } = req.body;

	try {
		if (send.psychology_response) {
			let { data } = await axios.post('https://app.swayamanalytics.com/dev/v1/assessment_short_result.php', send);
			console.log(data);

			let user = {
				affiliate: '1',
				swayamRef: data.swayam_ref,
				cRef: data.customer_reference,
				uRef: data.user_reference,
				state: false,
				testResp: data,
				page: '',
				email: email
			};
			const resp = TestInstance.update({ ...user }, { where: { swayamRef: user.swayamRef } }).then((resp) => {
				res.status(200).json({ Message: 'Updated' });
			});
		} else if (send.physiology_response) {
			let { data } = await axios.post('https://app.swayamanalytics.com/dev/v1/assessment_short_2.php', send);
			console.log(data);

			let user = {
				affiliate: '1',
				swayamRef: data.swayam_ref,
				cRef: data.customer_reference,
				uRef: data.user_reference,
				state: true,
				testResp: data,
				page: '2',
				email: email
			};
			const resp = TestInstance.update({ ...user }, { where: { swayamRef: user.swayamRef } }).then((resp) => {
				res.status(200).json({ Message: 'Updated' });
			});
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

const getTests = async (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body;
	const id = uuidv4();
	try {
		const test = await TestInstance.findAll({ where: { email: email } });
		if (test) {
			res.status(200).json({ test });
		} else {
			res.status(400).json({ Message: 'Something Went Wrong' });
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

export default {
	CheckActive,
	TestStart,
	createTest,
	updateTest,
	getTests
};
