import axios from "axios";

const instnace = axios.create({
  baseURL: "http://localhost:8080/api/public/",
});

export const getCategories = async () => {
  return await instnace.get("category");
};

// getProduct
export const getProducts = async (page) => {
  return await instnace.get("product?page=" + page);
};

// 상품 하나
export const getDetail = async (code) => {
  return await instnace.get("product/" + code);
};
