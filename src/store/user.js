import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/user";

export const asyncLogin = createAsyncThunk("user/login", async (data) => {
  const response = await login(data);
  return response.data;
});

const user = createSlice({
  name: "user",
  initialState: {}, // 여기에 return 값이 담김
  reducers: {
    userSave: (state, action) => {
      return action.payload;
    },
    userLogout: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      const result = action.payload;
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result));
      // action함수가 성공했을때 여기에 결과값
      //   console.log(action.payload); //  로그인 성공시 해당 정보가 있음
      return action.payload; // 여기에 결과값이 담김
    });
  },
});
export default user;
export const { userSave, userLogout } = user.actions;
