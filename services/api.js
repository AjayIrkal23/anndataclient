import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import { useContext } from "react";

export const ad = async (data) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/add`, data);
  } catch (err) {
    console.log(err.message);
  }
};

export const GetUser = async () => {
  try {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/getUser`);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const setConversation = async (data) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/conversation/add`,
      data
    );
  } catch (e) {
    console.log(e.message);
  }
};

export const getConversation = async (data) => {
  try {
    let res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/conversation/get`,
      data
    );
    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getConversationAll = async (data) => {
  try {
    let res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/conversation/All`,
      data
    );
    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const newMessage = async (data) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/message/add`, data);
  } catch (e) {
    console.log(e.message);
  }
};

export const getMessage = async (id) => {
  try {
    let res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/message/get/${id}`
    );
    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};
