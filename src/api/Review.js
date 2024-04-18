import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

//인증 필요없는 RESTful API 가져올때 기본 루트
const instnace = axios.create({
  baseURL: "http://localhost:8080/api/public/",
});

// 인증이 필요한 RESTful API 가져올때 기본 루트
const authorize = axios.create({
  baseURL: "http://localhost:8080/api/",
});
authorize.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// [post] http://localhost:8080/api/review
// 인증 필요, RequestBody 데이터 보내야 되는 상황
export const addReview = async (data) => {
  return await authorize.post("review", data);
};

//[GET] http://localhost:8080/api/public/product/18/review
// 인증 필요 x, 경로에 상품 코드 보내야 되는 상황
export const getReviews = async (code) => {
  return await instnace.get("product/" + code + "/review");
};

// @DeleteMapping /review/{code}
// 인증 필요
export const delReview = async (reviCode) => {
  return await authorize.delete("review/" + reviCode);
};

// @Putmapping("/review") 인증 필요, requestbody로 데이터 받음
export const updateReview = async (data) => {
  return await authorize.put("review", data);
};
