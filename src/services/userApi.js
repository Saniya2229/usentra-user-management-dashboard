import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Normalizes error messages from Axios or network failures
 */
const handleError = (error, customMessage) => {
  if (error.response) {
    const status = error.response.status;
    const msg = error.response.data?.message || `Server responded with error status ${status}`;
    throw new Error(`${customMessage}: ${msg}`);
  } else if (error.request) {
    throw new Error(`${customMessage}: Network error. Please check your connection.`);
  } else {
    throw new Error(error.message || customMessage);
  }
};

export const userApi = {
  /**
   * Fetch all users from /users
   */
  async getUsers() {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      handleError(error, 'Failed to fetch users');
    }
  },

  /**
   * Fetch posts for a specific user from /posts?userId={userId}
   */
  async getUserPosts(userId) {
    try {
      const response = await apiClient.get(`/posts?userId=${userId}`);
      return response.data;
    } catch (error) {
      handleError(error, `Failed to fetch posts for user #${userId}`);
    }
  },

  /**
   * Create a new user via POST /users
   */
  async createUser(userData) {
    try {
      const response = await apiClient.post('/users', userData);
      return response.data;
    } catch (error) {
      handleError(error, 'Failed to create user');
    }
  },

  /**
   * Update an existing user via PUT /users/{id}
   */
  async updateUser(id, userData) {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      handleError(error, `Failed to update user #${id}`);
    }
  },

  /**
   * Delete a user via DELETE /users/{id}
   */
  async deleteUser(id) {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      handleError(error, `Failed to delete user #${id}`);
    }
  },
};

export default userApi;
