import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from './config.js';

const ChatService = {
    createChat: async (content) => {
        try {
          const user = JSON.parse(await AsyncStorage.getItem('user'));
          const token = user.accessToken;
          const response = await fetch(`${API_URL}/chats/createChat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
              content,
            }),
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta:', errorText);
            throw new Error(errorText);
          }
      
          // Agora, retornamos a resposta como um objeto JSON
          const result = await response.json();
      
          return result;
        } catch (error) {
          console.error('Erro ao criar o chat:', error);
          throw error;
        }
      },
      

    addMessageToChat: async (chatId, content) => {
        try {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/chats/addMessageToChat`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ chatId, content }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta:', errorText);
            throw new Error(errorText);
        }
        } catch (error) {
        console.error('Erro ao adicionar mensagem ao chat:', error);
        throw error;
        }
    },

    getAllChats: async () => {
        try {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/chats/getAllChats`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            let data = await response.json();
            return data.chats;
        } else {
            throw Error(response.message);
        }

        } catch (error) {
        console.error('Erro ao obter todos os chats:', error);
        throw error;
        }
    }
};

export default ChatService;