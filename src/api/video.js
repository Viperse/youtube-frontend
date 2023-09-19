import axios from "axios";

// http://localhost:8080/api/
const instance = axios.create({
    baseURL : "http://localhost:8080/api/",
})

// async ~ await + axios
export const getCategories = async () => {
    return await instance.get("category");

}