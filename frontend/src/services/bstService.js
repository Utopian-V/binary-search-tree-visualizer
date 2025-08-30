import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

class BSTService {
  static async getTreeState() {
    const response = await axios.get(`${API_BASE_URL}/tree`);
    return response.data;
  }

  static async insert(value) {
    const response = await axios.post(`${API_BASE_URL}/tree/insert`, { value });
    return response.data;
  }

  static async delete(value) {
    const response = await axios.post(`${API_BASE_URL}/tree/delete`, { value });
    return response.data;
  }

  static async search(value) {
    const response = await axios.post(`${API_BASE_URL}/tree/search`, { value });
    return response.data;
  }

  static async clear() {
    const response = await axios.post(`${API_BASE_URL}/tree/clear`);
    return response.data;
  }

  static async generateRandom() {
    const response = await axios.get(`${API_BASE_URL}/tree/random`);
    return response.data;
  }

  static async getTraversal(type) {
    const response = await axios.get(`${API_BASE_URL}/tree/traversal/${type}`);
    return response.data;
  }

  static async getHeight() {
    const response = await axios.get(`${API_BASE_URL}/tree/height`);
    return response.data;
  }

  static async getSize() {
    const response = await axios.get(`${API_BASE_URL}/tree/size`);
    return response.data;
  }
}

export { BSTService };
