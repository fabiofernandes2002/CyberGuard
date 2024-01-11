import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import MenuHamburguer from '../components/Menu';
import {Avatar, VStack} from 'native-base';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={Styles.container}>
      <View style={Styles.Menu}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* Logo pequeno e Cyber e Guard todo separado em baixo do outro */}
          <Image
            source={require('../assets/logo_semfundo.png')}
            style={Styles.logo}
            resizeMode="contain"
          />
          <View>
            <Text style={Styles.textC}>Cyber</Text>
            <Text style={Styles.textG}>Guard</Text>
          </View>
        </TouchableOpacity>
        {/* Menu hamburguer */}
        <MenuHamburguer />
      </View>
      <View style={Styles.container2}>
        <Text style={Styles.title}>Perfil</Text>
        <View style={Styles.profileDetails}>
          <VStack
            space={2}
            alignItems={{
              base: 'center',
              md: 'flex-start',
            }}>
            <Avatar
              bg="pink.600"
              alignSelf="center"
              size="2xl"
              source={{
                uri: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80',
              }}></Avatar>
          </VStack>
        </View>
      </View>

      <View style={[Styles.inputContainer, {alignItems: 'left'}]}>
        <Text>Nome</Text>
        <TextInput
          style={Styles.input}
          placeholder="John Doe"
          underlineColorAndroid="transparent"
        />
        <View style={Styles.underline}></View>
      </View>
      <View style={Styles.inputContainer}>
        <Text>Tipo de Utilizador</Text>
        <TextInput
          style={Styles.input}
          placeholder="Normal"
          underlineColorAndroid="transparent"
          editable={false}
        />
        <View style={Styles.underline}></View>
      </View>
      <View style={Styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={Styles.input}
          placeholder="john@doe.com"
          underlineColorAndroid="transparent"
        />
        <View style={Styles.underline}></View>
      </View>
      <View style={Styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={Styles.input}
          placeholder="* * * * * * * *"
          underlineColorAndroid="transparent"
          secureTextEntry={true}
        />
        <View style={Styles.underline}></View>
      </View>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  logo: {
    position: 'absolute',
    width: 50,
    height: 50,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    marginTop: 10,
  },
  textC: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 35,
    justifyContent: 'center',
  },
  textG: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 35,
    justifyContent: 'center',
  },
  container2: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Supply-Bold',
    fontSize: 24,
    color: '#6E0271',
    marginBottom: 20,
  },
  profileDetails: {
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 40,
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    marginBottom: -2,
  },
  underline: {
    height: 2,
    backgroundColor: '#6E0271',
  },
});

export default ProfileScreen;
