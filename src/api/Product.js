import axios from "axios";

const instnace = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getCategories = async () => {
  return await instnace.get("public/category");
};

// getProduct
export const getProducts = async (page) => {
  return await instnace.get("public/product?page=" + page);
};
