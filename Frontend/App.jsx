import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingsScreen from './src/screens/OnboardingsScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistoScreen from './src/screens/RegistoScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import SurveyIntroScreen from './src/screens/SurveyIntroScreen';
import MundosScreen from './src/screens/MundosScreen';
import {NativeBaseProvider} from 'native-base';
import CoursesScreen from './src/screens/CoursesScreen';
import CoursesDetailsScreen from './src/screens/CoursesDetailsScreen';
import FaqsScreen from './src/screens/FaqsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ManagerProfileScreen from './src/screens/ManagerProfileScreen';
import EmployeeProfileScreen from './src/screens/EmployeeProfileScreen';
import SurveyResultScreen from './src/screens/SurveyResultScreen';
import SurveyDetailsScreen from './src/screens/SurveyDetailsScreen';
import ChatScreen from './src/screens/ChatScreen';
import PaymentScreen from './src/screens/PaymentScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnboardingScreens"
            component={OnboardingsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegistoScreen"
            component={RegistoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AboutUsScreen"
            component={AboutUsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SurveyIntroScreen"
            component={SurveyIntroScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MundosScreen"
            component={MundosScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CoursesScreen"
            component={CoursesScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CoursesDetailsScreen"
            component={CoursesDetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManagerProfileScreen"
            component={ManagerProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EmployeeProfileScreen"
            component={EmployeeProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SurveyResultScreen"
            component={SurveyResultScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SurveyDetailsScreen"
            component={SurveyDetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="FaqsScreen" 
            component={FaqsScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="ChatScreen" 
            component={ChatScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="PaymentScreen" 
            component={PaymentScreen} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
