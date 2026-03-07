import axiosInstance from "../../config/axiosConfig";

export const createProduct = async (data) => {
  try {
    const payload = {
      productName: data.productName ?? "",
      productCategory: data.productCategory ?? data.categoryName ?? "",
      description: data.description ?? "",
      price: typeof data.price === "number" ? data.price : Number(data.price) || 0,
    };
    const response = await axiosInstance.post("/shopping-service/products", payload);
    console.log("=======backend response====", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/shopping-service/products");
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
    const response = await axiosInstance.get("/shopping-service/products/page", { params });
    let raw = response.data;
    // Backend (PagedResponseDTO) returns object: { content: ProductResDTO[], totalPages, pageNumber, pageSize, ... }
    if (typeof raw === "string") {
      try {
        raw = JSON.parse(raw);
      } catch (e) {
        console.warn("Paged response was string but not valid JSON", e);
        return { content: [], totalPages: 1 };
      }
    }
    if (raw == null || typeof raw !== "object") {
      return { content: [], totalPages: 1 };
    }
    // Backend returns object { content: [...], totalPages, pageNumber, ... }; support wrapped or bare array
    if (Array.isArray(raw)) {
      return { content: raw, totalPages: 1 };
    }
    const data = raw?.data != null && Array.isArray(raw.data?.content) ? raw.data : raw;
    const content =
      Array.isArray(data?.content) ? data.content
        : Array.isArray(data?.Content) ? data.Content
        : Array.isArray(data?.productResList) ? data.productResList
        : Array.isArray(data?.products) ? data.products
        : Array.isArray(data?.data) ? data.data
        : (() => {
            const key = data && Object.keys(data).find((k) => Array.isArray(data[k]));
            return key ? data[key] : [];
          })();
    const totalPages = typeof data?.totalPages === "number" ? data.totalPages : 1;
    const out = {
      content,
      totalPages: totalPages < 1 ? 1 : totalPages,
      totalElements: data?.totalElements,
      pageNumber: data?.pageNumber,
      pageSize: data?.pageSize,
      first: data?.first,
      last: data?.last,
    };
    console.log("=======paged backend response====", { contentLength: content.length, totalPages: out.totalPages, sample: content[0] });
    return out;
  } catch (error) {
    throw error;
  }
};