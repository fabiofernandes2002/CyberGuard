import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from './config.js';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro durante o login.');
      }

      const user = await response.json();

      // Armazenar informações do utilizador logado no AsyncStorage
      const userInfo = {
        username: user.userInfo.username,
        email: user.userInfo.email,
        userType: user.userInfo.userType,
        isOwner: user.userInfo.isOwner,
        companyName: user.userInfo.companyName,
        company: user.userInfo.company,
      };
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", user.accessToken);
  
      return user;
    } catch (error) {
      console.error('Erro durante o login:', error.message);
      throw error;
    }
  },

  register: async (username, email, password, confirmPassword, userType, isOwner, companyName, company) => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword, userType, isOwner, companyName, company }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Erro durante o registo.';
  
        if (response.status === 400) {
          errorMessage = errorData.message || 'Erro de solicitação inválida.';
        } else if (response.status === 401) {
          errorMessage = errorData.message || 'Credenciais inválidas.';
        }
  
        throw new Error(errorMessage);
      }
  
      const user = await response.json();
      await AsyncStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Erro durante o registo:', error.message);
      throw error;
    }
  },  

  async logout() {
    await AsyncStorage.removeItem("user");
  },

  async getUserLogged() {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  }
};

export default AuthService;
    