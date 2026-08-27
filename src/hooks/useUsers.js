import { useState, useEffect, useMemo, useCallback } from 'react';
import userApi from '../services/userApi';
import { storage } from '../utils/storage';

export function useUsers(searchTerm = '', selectedCompany = '', sortBy = 'name-asc', page = 1, pageSize = 6) {
  const [rawUsers, setRawUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch initial users from API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUsers = await userApi.getUsers();
      
      // Combine with local storage created users & filter deleted IDs
      const localUsers = storage.getCustomUsers();
      const deletedIds = storage.getDeletedIds();

      // Filter out deleted IDs from API users
      const activeApiUsers = apiUsers.filter((u) => !deletedIds.includes(u.id));
      
      // Merge local custom users (prepending new users) with API users
      const mergedUsers = [...localUsers, ...activeApiUsers];
      setRawUsers(mergedUsers);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while fetching users.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Extract unique company names for company dropdown filter
  const companyList = useMemo(() => {
    const companies = new Set();
    rawUsers.forEach((u) => {
      if (u.company) {
        const name = typeof u.company === 'string' ? u.company : u.company.name;
        if (name) companies.add(name);
      }
    });
    return Array.from(companies).sort();
  }, [rawUsers]);

  // Filter & Sort Logic
  const filteredUsers = useMemo(() => {
    let result = [...rawUsers];

    // Search filter (Name or Email)
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter((u) => {
        const name = u.name ? u.name.toLowerCase() : '';
        const email = u.email ? u.email.toLowerCase() : '';
        return name.includes(query) || email.includes(query);
      });
    }

    // Company filter
    if (selectedCompany) {
      result = result.filter((u) => {
        const companyName = typeof u.company === 'string' ? u.company : u.company?.name;
        return companyName === selectedCompany;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name-asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'name-desc') {
        return (b.name || '').localeCompare(a.name || '');
      }
      if (sortBy === 'company-asc') {
        const compA = typeof a.company === 'string' ? a.company : a.company?.name || '';
        const compB = typeof b.company === 'string' ? b.company : b.company?.name || '';
        return compA.localeCompare(compB);
      }
      return 0;
    });

    return result;
  }, [rawUsers, searchTerm, selectedCompany, sortBy]);

  // Pagination Logic
  const totalUsersCount = filteredUsers.length;
  const totalPages = Math.ceil(totalUsersCount / pageSize) || 1;
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const paginatedUsers = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIdx, startIdx + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Create User Handler
  const createUser = async (newUserData) => {
    setIsSubmitting(true);
    try {
      // Call API
      const apiResponse = await userApi.createUser(newUserData);

      // Create new user object with unique local ID
      const newUser = {
        ...newUserData,
        id: Date.now(), // Unique client timestamp ID
        company: typeof newUserData.company === 'string' ? { name: newUserData.company } : newUserData.company,
      };

      // Optimistic update
      const updatedLocalUsers = [newUser, ...storage.getCustomUsers()];
      storage.saveCustomUsers(updatedLocalUsers);

      setRawUsers((prev) => [newUser, ...prev]);
      return { success: true, user: newUser };
    } catch (err) {
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit User Handler
  const updateUser = async (id, updatedFields) => {
    setIsSubmitting(true);
    try {
      // Call API
      await userApi.updateUser(id, updatedFields);

      // Structure company properly
      const formattedCompany = typeof updatedFields.company === 'string'
        ? { name: updatedFields.company }
        : updatedFields.company;

      const formattedUpdate = {
        ...updatedFields,
        company: formattedCompany,
      };

      // Update in state
      setRawUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...formattedUpdate } : u))
      );

      // If user exists in local custom storage, update it there too
      const localUsers = storage.getCustomUsers();
      const updatedLocals = localUsers.map((u) =>
        u.id === id ? { ...u, ...formattedUpdate } : u
      );
      storage.saveCustomUsers(updatedLocals);

      return { success: true };
    } catch (err) {
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete User Handler
  const deleteUser = async (id) => {
    setIsSubmitting(true);
    try {
      // Call API
      await userApi.deleteUser(id);

      // Track deleted ID in storage
      const deletedIds = storage.getDeletedIds();
      if (!deletedIds.includes(id)) {
        storage.saveDeletedIds([...deletedIds, id]);
      }

      // Also clean up local created user if present
      const localUsers = storage.getCustomUsers().filter((u) => u.id !== id);
      storage.saveCustomUsers(localUsers);

      // Remove from active state
      setRawUsers((prev) => prev.filter((u) => u.id !== id));

      return { success: true };
    } catch (err) {
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    users: paginatedUsers,
    allFilteredUsers: filteredUsers,
    totalCount: totalUsersCount,
    totalPages,
    currentPage,
    companyList,
    loading,
    error,
    isSubmitting,
    refetch: fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}

export default useUsers;
