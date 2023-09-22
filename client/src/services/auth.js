import axios from "axios";

export const registerUser = async (data) =>
    await axios.post('http://localhost:5000/api/register', data);

export const loginUser = async (data) =>
    await axios.post('http://localhost:5000/api/login', data);

export const currentUser = async (authtoken) =>
    await axios.post('http://localhost:5000/api/current-user', {}, {
        headers: {
            authtoken
        }
    });
