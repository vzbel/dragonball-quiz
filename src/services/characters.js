import axios from "axios";

const baseUrl = "http://dragonball-api.com/api";

const getAll = () => {
    const req = axios.get(`${baseUrl}/characters`);
    return req.then((res) => res.data);
};

export default {
    getAll
};
