import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { registoStyles } from './RegistoStyles';
import { loginStyles } from './LoginStyles';
import ModalRegister from './ModalRegister';
import AuthService from '../services/auth.service';

const Registo = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  const handleRegistarPress = async () => {
    try {
      const userData = {
        username,
        email,
        password,
        confirmPassword,
        userType: value,
        isOwner,
        companyName: isOwner ? companyName : null,
        company: !isOwner ? company : null,
      };

      //console.log('Dados do usuário:', userData);
      await AuthService.register(userData);

      navigation.navigate('LoginScreen');

    } catch (error) {
      console.error('Erro durante o registo:', error.message);
    }
  };

  const handleUserTypeChange = (selectedValue) => {
    if (selectedValue === 'empresarial') {
      setShowModal(true);
    } else {
      setShowModal(false);
      setIsOwner(false);
    }
  };

  return (
    <View style={registoStyles.container}>
      <Text style={registoStyles.texto}>Digita os teus dados para te registares na aplicação</Text>

      <TextInput
        mode="outlined"
        label="Nome"
        value={username}
        onChangeText={(text) => setUsername(text)}
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
        items={[
          { label: 'Normal', value: 'normal' },
          { label: 'Empresarial', value: 'empresarial' },
          { label: 'Profissional', value: 'profissional' },
        ]}
        setOpen={setOpen}
        setValue={setValue}
        setItems={() => {}} 
        onChangeValue={handleUserTypeChange}
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

      {/* Renderizar o modal se showModal for true */}
      {value === 'empresarial' && 
        <ModalRegister 
          isOwner={isOwner}
          setIsOwner={setIsOwner}
          companyName={companyName}
          setCompanyName={setCompanyName}
          company={company}
          setCompany={setCompany}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      }

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
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
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

export default Registo;