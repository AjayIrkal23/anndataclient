import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import UserData from '../controllers/UserData';
import authenticate, { adminAuthenticate } from '../middleware/authenticate';
import Conversation from '../controllers/Conversation';
import Message from '../controllers/Message';

const router = express.Router();

router.get('/hello', (req, res, next) => res.status(200).json({ message: 'hello vaiii' }));
router.post('/signUp', UserData.signUp);
router.post('/verifyOtp', UserData.verifyOtp);
router.post('/signIn', UserData.signIn);
router.post('/changePassword', UserData.ChangeOldPassword);

router.post('/sendOtp', UserData.sendOtp);

router.get('/notPaid', UserData.SendNotPaid);
router.post('/reqPass', UserData.changePassword);
router.put('/updateUserDetails', UserData.updateUserDets);
router.post('/refreshProfile', authenticate, UserData.refreshProfile);
router.get('/getAllUsers', UserData.getAllUsers);
router.get('/sendAI', Message.sendUsers);
router.get('/startAI', Message.StartAI);
router.post('/getSingleUser', authenticate, UserData.getSingleUser);
router.get('/getAllFilter', authenticate, UserData.getAllFilter);
router.post('/payment', authenticate, UserData.Payment);
router.post('/conversation/add', Conversation.newConversation);
router.post('/conversation/get', Conversation.getConversation);
router.post('/conversation/All', Conversation.getAllConversation);
router.post('/replyBot', Message.replyMessage);
router.post('/message/add', Message.newMessage);
router.get('/message/get/:id', Message.getMessage);
router.post('/users/single', UserData.getUsersTable);
router.post('/users/uploadDayTime', UserData.uploadDayTime);

export = router;
