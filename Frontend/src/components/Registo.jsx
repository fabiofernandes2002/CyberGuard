import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
//import DropDown from "react-native-paper-dropdown";
import DropDownPicker from 'react-native-dropdown-picker';
//import { Provider, DefaultTheme } from 'react-native-paper';
import { registoStyles } from './RegistoStyles';
import { loginStyles } from './LoginStyles';

const Registo = () => {

  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Normal', value: 'normal' },
    { label: 'Empresarial', value: 'empresarial' },
    { label: 'Profissional', value: 'profissional' }
  ]);
  const [password, setPassword] = React.useState('');
  const [confirmarPassword, setConfirmarPassword] = React.useState('');

  const handleRegistarPress = () => {
    console.log('Registar pressionado');
  };

  return (
    <View style={registoStyles.container}>
      <Text style={registoStyles.texto}>Digita os teus dados para te registares na aplicação</Text>

      <TextInput
        mode="outlined"
        label="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
        style={{
          ...loginStyles.input,
          fontFamily: 'Raleway-Regular',
          fontSize: 17,
        }}
        theme={{
          colors: {
            primary: '#487281',
            text: '#1B1B1E',
          },
          roundness: 7.5,
        }}
      />

      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{
          ...loginStyles.input,
          fontFamily: 'Raleway-Regular',
          fontSize: 17,
        }}
        theme={{
          colors: {
            primary: '#487281',
            text: '#1B1B1E',
          },
          roundness: 7.5,
        }}
      />

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Tipo de Utilizador"
        style={{
          backgroundColor: '#D8DBE2',
          borderColor: '#487281',
          borderWidth: 1,
          borderRadius: 7.5,
        }}
        dropDownContainerStyle={{
          backgroundColor: '#D8DBE2',
          borderColor: '#487281',
          borderWidth: 1,
        }}
        textStyle={{
          fontFamily: 'Raleway-Regular',
          fontSize: 17,
          color: '#1B1B1E',
        }}
        containerStyle={{
          height: 50,
          width: 350,
          marginBottom: 10,
          marginTop: 5,
        }}
      />

      <TextInput
        mode="outlined"
        label="Palavra-passe"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={{
          ...loginStyles.input,
          fontFamily: 'Raleway-Regular',
          fontSize: 17,
        }}
        theme={{
          colors: {
            primary: '#487281',
            text: '#1B1B1E',
          },
          roundness: 7.5,
        }}
      />

      <TextInput
        mode="outlined"
        label="Confirmar Palavra-passe"
        value={confirmarPassword}
        onChangeText={(text) => setConfirmarPassword(text)}
        secureTextEntry
        style={{
          ...loginStyles.input,
          fontFamily: 'Raleway-Regular',
          fontSize: 17,
        }}
        theme={{
          colors: {
            primary: '#487281',
            text: '#1B1B1E',
          },
          roundness: 7.5,
        }}
      />

      <TouchableOpacity onPress={handleRegistarPress}>
        <View style={registoStyles.button}>
          <Text style={registoStyles.buttonText}>Registar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
});

export default Registo