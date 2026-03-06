import axiosInstance from "../../config/axiosConfig";

export const createProduct = async (data) => {
  try {
    const response = await axiosInstance.post("/products", data);
    console.log("=======backend response====", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    console.log("=======backend response====", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsPage = async ({
  page = 0,
  size = 12,
  search = "",
  category = "",
  sortBy = "id",
  sortDir = "asc",
}) => {
  try {
    const params = {
      page,
      size,
      sortBy,
      sortDir,
    };
    if (search) {
      params.search = search;
    }
    if (category) {
      params.category = category;
    }
    const response = await axiosInstance.get("/products/page", { params });
    console.log("=======paged backend response====", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};