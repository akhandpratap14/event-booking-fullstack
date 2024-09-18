import Instance from "./instance";

const useAuth = () => {
  const { instance: api } = Instance();

  const login = async (obj: { username: string; password: string }) => {
    const response = await api.post("login", obj);
    return response.data;
  };

  const signUp = async (obj: {
    username: string;
    password: string;
    name: string;
    type: string;
    email: string;
  }) => {
    const response = await api.post("register", obj);
    return response.data;
  };

  return {
    signUp,
    login,
  };
};

export default useAuth;
