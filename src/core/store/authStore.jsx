import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: "",
      avatar: "",
      nickname: "",
      success: false,
      userId: "",
      isLoggedIn: false,
    
      setAccessToken: ( token ) => set({ accessToken: token }),
      setAvatar: ( avatar ) => set({ avatar }),
      setNickname: ( nickname ) => set({ nickname }),
      setSuccess: ( success ) => set({ success }),
      setUserId: ( userId ) => set({ userId }),
      setIsLoggedIn: ( isLoggedIn ) => set({ isLoggedIn }),

      logout: () => {
        set({
          accessToken: null,
          nickname: null,
          userId: null,
          isLoggedIn: false
        })
        localStorage.removeItem('auth-storage');
      } 
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
)


export default useAuthStore;