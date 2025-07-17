interface User {
  name: string;
  email: string;
  id: string;
  status: boolean;
}

const intialState: { user: User } = {
  user: {
    name: "",
    email: "",
    id: "",
    status: false,
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => intialState,
  getters: {
    currentUser: (state) => state.user,
  },
  actions: {
    set(user: User) {
      this.$patch({ user });
    },
  },
});
