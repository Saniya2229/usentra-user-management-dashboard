const STORAGE_KEY = 'userpulse_local_users_v1';
const DELETED_KEY = 'userpulse_deleted_ids_v1';

export const storage = {
  getCustomUsers: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCustomUsers: (users) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users to local storage', e);
    }
  },

  getDeletedIds: () => {
    try {
      const data = localStorage.getItem(DELETED_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveDeletedIds: (ids) => {
    try {
      localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error('Failed to save deleted IDs to local storage', e);
    }
  },

  clearStorage: () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DELETED_KEY);
  }
};
