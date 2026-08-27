import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockAxiosInstance } = vi.hoisted(() => {
  return {
    mockAxiosInstance: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  };
});

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockAxiosInstance),
  },
}));

import userApi from '../services/userApi';

describe('userApi Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getUsers fetches user list successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', company: { name: 'Romaguera-Crona' } },
    ];
    mockAxiosInstance.get.mockResolvedValueOnce({ data: mockUsers });

    const result = await userApi.getUsers();
    expect(result).toEqual(mockUsers);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users');
  });

  it('createUser sends POST request with user data', async () => {
    const newUserData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '123-456-7890',
      website: 'janedoe.com',
      company: 'TechCorp',
    };

    mockAxiosInstance.post.mockResolvedValueOnce({ data: { id: 11, ...newUserData } });

    const result = await userApi.createUser(newUserData);
    expect(result).toHaveProperty('id', 11);
    expect(result.name).toBe('Jane Doe');
    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/users', newUserData);
  });
});
