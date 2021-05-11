import axios from "axios";
import config from "../config";
import { PERSISTENCE_STORAGE } from "../_redux/store";

const URL = `${config.baseURL}/movie`;
const data = JSON.parse(localStorage.getItem(PERSISTENCE_STORAGE));
const token = data ? data.userLoginReducer.isLogin ? data.userLoginReducer.token : ''  :  '';
console.log("token for movies=>",token);
export const getMovies = (page) => axios.get(`${URL}/list-rating/${page}`,{ headers: {"Authorization" : `Bearer ${token}`} });
export const addMovie = (movie) => axios.post(`${URL}/add`,movie, { headers: {"Authorization" : `Bearer ${token}`} });
export const removeMovie = (id) => axios.delete(`${URL}/remove/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });