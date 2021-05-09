import axios from "axios";
import config from "../config";

const URL = `${config.baseURL}/auth`;

export const login = (email,password) => axios.post(`${URL}/login`, {email, password});
export const register = (user) => axios.post(`${URL}/register`, user);