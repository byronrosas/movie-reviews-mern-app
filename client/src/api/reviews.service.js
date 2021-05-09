import axios from "axios";
import config from "../config";
import { PERSISTENCE_STORAGE } from "../_redux/store";

const URL = `${config.baseURL}/review`;
const data = JSON.parse(localStorage.getItem(PERSISTENCE_STORAGE));
const token = data ? data.userLoginReducer.isLogin ? data.userLoginReducer.token : ''  :  '';
export const getReviews = (page,movie) => axios.get(`${URL}/list/${page}/${movie}`,{ headers: {"Authorization" : `Bearer ${token}`} });
export const addReview = (review) => axios.post(`${URL}/add`,review, { headers: {"Authorization" : `Bearer ${token}`} });
export const removeReview = (id) => axios.delete(`${URL}/remove/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });