import axios from "axios";
import config from "../config";
import { PERSISTENCE_STORAGE } from "../_redux/store";

const URL = `${config.baseURL}/review`;

export const getReviews = (page,movie, token) => axios.get(`${URL}/list/${page}/${movie}`,{ headers: {"Authorization" : `Bearer ${token}`} });
export const addReview = (review, token) => axios.post(`${URL}/add`,review, { headers: {"Authorization" : `Bearer ${token}`} });
export const removeReview = (id, token) => axios.delete(`${URL}/remove/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });