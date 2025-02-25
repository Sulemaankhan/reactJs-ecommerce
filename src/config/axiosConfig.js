import axios from "axios";
const axiosInstance = axios.create({
        baseURL: 'http://localhost:7777/shopping-service',
        headers : {
        'Content-Type': 'application/json',
        },
    })
 export default axiosInstance;   