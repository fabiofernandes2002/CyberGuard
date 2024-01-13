// LoginComponent.js
import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {loginStyles} from './LoginStyles';

const LoginComponent = ({setEmail, setPassword}) => {
  const [email, setEmailLocal] = useState('');
  const [password, setPasswordLocal] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = text => {
    setEmailLocal(text);
    setEmail(text);
  };

  const handlePasswordChange = text => {
    setPasswordLocal(text);
    setPassword(text);
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        style={loginStyles.input}
        theme={{
          colors: {
            primary: '#487281',
            text: '#1B1B1E',
          },
          fonts: {
            regular: loginStyles.label,
          },
          roundness: 7.5,
        }}
        right={<TextInput.Affix />}
      />

      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={!showPassword}
        style={loginStyles.input}
        theme={{
          colors: {
            primary: '#487281',
            text: '#1B1B1E',
          },
          fonts: {
            regular: loginStyles.label,
          },
          roundness: 7.5,
        }}
        right={
          <TextInput.Icon
            style={{marginTop: 20}}
            onPress={() => setShowPassword(!showPassword)}
            icon="eye"
          />
        }
      />
    </View>
  );
};

export default LoginComponent;
