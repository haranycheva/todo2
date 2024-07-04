import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://65ef66c8ead08fa78a5065ee.mockapi.io/tasks";

export async function postToDo(task) {
  const res = await axios.post("", task);
  return res.data;
}

// export async function deleteToDo(idToDelete) {
//   const res = await axios.delete(`/${idToDelete}`);
//   return res.data;
// }

export async function getOneToDo(id) {
  const res = await axios.get(`/${id}`);
  return res.data;
}

export const getTodo = createAsyncThunk(
  "todo/fetchAll",
  async (_, thunkApi) => {
    try {
      const res = await axios.get("");
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const changeTodo = createAsyncThunk(
  "todo/changeTodo",
  async ({id, data}, thunkApi) => {
    try {
      const res = await axios.put(`/${id}`, data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export async function getSingleToDo(id) {
  const res = await axios.get(`/${id}`);
  return res.data;
}

export const deleteToDo = createAsyncThunk(
  "todo/deleteTodo",
  async ({deleteEl, doAfter}, thunkApi) => {
    try {
      const res = await axios.delete(`/${deleteEl}`);
      return {data: res.data, doAfter,};
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
