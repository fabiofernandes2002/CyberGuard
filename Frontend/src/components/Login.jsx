// LoginComponent.js
import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { loginStyles } from './LoginStyles'; // Importar os estilos do arquivo styles.js

const LoginComponent = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={loginStyles.input} // Usar o estilo para o input
        theme={{
          colors: {
            primary: '#487281',
            text: '#1B1B1E',
          },
          fonts: {
            regular: loginStyles.label, // Usar o estilo para o label
          },
          roundness: 7.5,
        }}
        right={<TextInput.Affix />}
      />

      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={loginStyles.input} // Usar o estilo para o input
        theme={{
          colors: {
            primary: '#487281',
            text: '#1B1B1E',
          },
          fonts: {
            regular: loginStyles.label, // Usar o estilo para o label
          },
          roundness: 7.5,
        }}
        right={<TextInput.Icon icon="eye" />}
      />
    </View>
  );
};

export default LoginComponent;