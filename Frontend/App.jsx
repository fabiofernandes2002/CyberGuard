import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingsScreen from './src/screens/OnboardingsScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistoScreen from './src/screens/RegistoScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import SurveyIntroScreen from './src/screens/SurveyIntroScreen';
import MundosScreen from './src/screens/MundosScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreens" component={OnboardingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegistoScreen" component={RegistoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SurveyIntroScreen" component={SurveyIntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MundosScreen" component={MundosScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;