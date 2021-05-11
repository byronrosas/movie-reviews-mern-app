import axios from "axios";
import config from "../config";
import { PERSISTENCE_STORAGE } from "../_redux/store";

const URL = `${config.baseURL}/movie`;

export const getMovies = (page, token) => axios.get(`${URL}/list-rating/${page}`,{ headers: {"Authorization" : `Bearer ${token}`} });
export const addMovie = (movie, token) => axios.post(`${URL}/add`,movie, { headers: {"Authorization" : `Bearer ${token}`} });
export const removeMovie = (id, token) => axios.delete(`${URL}/remove/${id}`, { headers: {"Authorization" : `Bearer ${token}`} });