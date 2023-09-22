import axios from "axios";

export const createShortUrl = async (data) =>
    await axios.post("https://test-deploy-app-dusky.vercel.app/shorturl", data,);

export const listUrl = async (authtoken) => {
    return await axios.get("https://test-deploy-app-dusky.vercel.app/shorturl", {
        headers: {
            authtoken
        }
    });
};

export const clicksUrl = async (data) => {
    await axios.post("https://test-deploy-app-dusky.vercel.app/shorturl/clicks", { data });
};

export const removeUrl = async (id) => {
    await axios.delete("https://test-deploy-app-dusky.vercel.app/shorturl/" + id)
}


