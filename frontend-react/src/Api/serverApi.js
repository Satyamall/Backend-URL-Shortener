
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/"
})

export const createApi=(payload)=>{
    return api.post('/api/url/shorten',payload);
}

export const deleteApi = (apiId) => {
    return api.delete(`/api/${apiId}`);
  };

export const getAllApi=()=>{
    return api.get('/api');
}