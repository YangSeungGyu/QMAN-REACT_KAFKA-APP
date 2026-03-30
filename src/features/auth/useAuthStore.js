import { create } from 'zustand';
import { comm } from 'src/context/comm.js';

function loadUserFromStorage() {
  try {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

const savedUser = loadUserFromStorage();

export const useAuthStore = create((set) => ({
  user:       savedUser,
  isLoggedIn: !!savedUser,
  loading:    false,
  error:      null,

  login: async ({ id, pw }) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('username', id);
      formData.append('password', pw);
      const data = await comm.axiosPostForm('/login', formData);
      localStorage.setItem('user', JSON.stringify(data));
      set({ user: data, isLoggedIn: true, loading: false });
      return { success: true, data };
    } catch (e) {
      const msg = e.response?.data?.message || e.message || '로그인에 실패했습니다.';
      set({ loading: false, error: msg, isLoggedIn: false });
      return { success: false, message: msg };
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isLoggedIn: false, loading: false, error: null });
  },
}));
