import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from './config.js';

const CoursesService = {
    getAllDiscoverCourses: async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.accessToken;
            const response = await fetch(`${API_URL}/courses/getAllDiscoverCourses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (response.ok) {
                let data = await response.json();
                return data.discoverCourses;
            } else {
                throw Error(response.message);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getAllCourses: async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/courses/getAllCourses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            let data = await response.json();
            return data.courses;
        } else {
            throw Error(response.msg);
        }
    },
};

export default CoursesService;