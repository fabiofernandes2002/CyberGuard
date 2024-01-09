import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Escudo from '../assets/Escudo.svg';
import Chave from '../assets/Chave.svg';
import Livro from '../assets/Livro.svg';
import Olho from '../assets/Olho.svg';

const SplashScreen = () => {

  const navigation = useNavigation();

  /* const handleStartPress = () => {
    navigation.navigate('OnboardingScreens');
  }; */

  // depois de 7 segundos vai para a pagina dos OnboardingScreens
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnboardingScreens');
    }, 7000);
  }, []);

  return (
      <ImageBackground
        source={require('../assets/fundo_splashScreen.png')}
        style={styles.backgroundImage}
      >
          <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Mantém te seguro.</Text>
                <Text style={styles.text}>Escolha a CyberGuard.</Text>
            </View>
            
              {/* Logo */}
              <Image
                  source={require('../assets/logo_semfundo.png')}
                  style={styles.logo}
                  resizeMode="contain"
              />

              {/* Botão */}
              {/* <TouchableOpacity onPress={handleStartPress}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Começar</Text>
                </View>
              </TouchableOpacity> */}
              {/* Icones */}
              <View style={styles.iconContainer}>
                <Escudo width={50} height={50} style={styles.icon} />
                <Chave width={50} height={50} style={styles.icon} />
                <Livro width={50} height={50} style={styles.icon} />
                <Olho width={50} height={50} style={styles.icon} />
              </View>
            </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // ou 'stretch' para cobrir toda a tela
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  textContainer: {
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'left',
  },
  text: {
    fontSize: 24,
    color: '#1B1B1E',
    fontFamily: 'Supply-Bold',
  },
  logo: {
    width: 400,
    height: 400,
    marginTop: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  icon: {
    marginHorizontal: 25,
  },

  button: {
    backgroundColor: '#6E0271',
    padding: 15,
    borderRadius: 8,
    marginTop: -30,
    alignItems: 'center',
    width: 150,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#f7f7f7',
    fontSize: 17,
    fontFamily: 'Supply-Bold',
  },
});

export default SplashScreen;