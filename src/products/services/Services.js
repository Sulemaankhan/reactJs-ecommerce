import axiosInstance from "../../config/axiosConfig";

export const createProduct = async (data) => {

    try{
        const response = await axiosInstance.post("/products",data);
        console.log("=======backend response====",response.data)
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getAllProducts = async () => {

    try{
        const response = await axiosInstance.get("/products");
        console.log("=======backend response====",response.data)
        return response.data;
    }catch(error){
        throw error;
    }
}