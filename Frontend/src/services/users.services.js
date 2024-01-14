import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from './config.js';

const UsersService = {
    submitSurvey: async ({answers, score}) => {
        try {
          const user = JSON.parse(await AsyncStorage.getItem('user'));
          const token = user.accessToken;
          const response = await fetch(`${API_URL}/users/submitSurvey`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              answers,
              score
            }),
          });
      
          if (!response.ok) {
            const responseBody = await response.json();
            console.error('Response status: ', response.status);
            console.error('Response body: ', responseBody);
            throw new Error('Response not OK');
          }
      
          const data = await response.json();
      
          console.log('Survey submitted successfully: ', data)
        } catch (error) {
          console.error('Error submitting survey: ', error);
        }
    }
};
export default UsersService;