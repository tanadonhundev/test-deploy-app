import axios from "axios";

export const createShortUrl = async (data) =>
    await axios.post("http://localhost:5000/api/shorturl", data,);

export const listUrl = async (authtoken) => {
    return await axios.get("https://test-deploy-app-dusky.vercel.app/", {
        headers: {
            authtoken
        }
    });
};

export const clicksUrl = async (data) => {
    await axios.post("http://localhost:5000/api/shorturl/clicks", { data });
};

export const removeUrl = async (id) =>
    await axios.delete("http://localhost:5000/api/shorturl/" + id)