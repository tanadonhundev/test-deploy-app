import axios from "axios";

export const registerUser = async (data) =>
    await axios.post('https://test-deploy-app-dusky.vercel.app/register', data);

export const loginUser = async (data) =>
    await axios.post('https://test-deploy-app-dusky.vercel.app/login', data);

