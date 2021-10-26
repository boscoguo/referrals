import axios from "axios";
import { REFERRALS_BASE_URL } from "../common/config/constants";

const httpMethod = {
  get: async () => {
    try {
      const response = await axios.get(REFERRALS_BASE_URL);
      return response.data;
    } catch (e) {
      return null;
    }
  },
  getById: async (id) => {
    try {
      const response = await axios.get(REFERRALS_BASE_URL+`/${id}`);
      return response.data;    
    } catch (e) {
      return null;
    }
  },
  create: async(values) => {
    try {
      const response = await axios.post(REFERRALS_BASE_URL, values);
      return response.data;
    } catch (e) {
      return null;
    }
  },
  update: async(id, values) => {
    try {
      const response = await axios.put(REFERRALS_BASE_URL+`/${id}`, values);
      return response.data;
    } catch (e) {
      return null;
    }
  },
  delete: async(id) => {
    try {
      const response = await axios.delete(REFERRALS_BASE_URL+`/${id}`);
      return response.data;
    } catch(e) {
      return null;
    }
  }
}


export default httpMethod;