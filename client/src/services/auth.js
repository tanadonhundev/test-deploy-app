import axios from "axios";

export const registerUser = async (data) =>
    await axios.post('https://test-deploy-app-dusky.vercel.app/auth/register', data);

export const loginUser = async (data) =>
    await axios.post('http://localhost:5000/api/login', data);
