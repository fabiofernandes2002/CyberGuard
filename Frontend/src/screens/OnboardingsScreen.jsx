import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import AuthenticationFlatline from '../assets/authenticationFlatline.svg';
import AuthenticationMonochromatic from '../assets/authenticationMonochromatic.svg';
import AuthenticationTwoColor from '../assets/authenticationTwoColor.svg';
import { useNavigation } from '@react-navigation/native';

const OnboardingsScreen = () => {

  const navigation = useNavigation();
  const handleButtonLoginPress = () => {
    navigation.navigate('LoginScreen');
  }

  const handleButtonRegistoPress = () => {
    navigation.navigate('RegistoScreen');
  }

  return (
    <LinearGradient colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']} style={styles.slide}>
      <Swiper style={styles.wrapper} showsButtons={false} paginationStyle={{bottom: 300}} dotColor="#F7F7F7" activeDotColor="#00428A" loop={false}>
        <View style={styles.slide}>
          <AuthenticationTwoColor style={styles.image} />
          <Text style={styles.text}>Aprende a guardar as tuas passwords em segurança.</Text>
        </View>
        <View style={styles.slide}>
          <AuthenticationMonochromatic style={styles.image} />
          <Text style={styles.text}>Todos os teus dados ficarão mais seguros com os conhecimentos que temos para ti.</Text>
        </View>
        <View style={styles.slide}>
          <AuthenticationFlatline style={styles.image} />
          <Text style={styles.text}>Não percas mais tempo e começa já a tua jornada no mundo da cibersegurança com a CyberGuard</Text>
          <View style={styles.buttons}>
              <View style={styles.ButtonLoginRegisto}>
                <TouchableOpacity onPress={handleButtonLoginPress}>
                    <Text style={styles.buttonText1}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleButtonRegistoPress}>
                    <Text style={styles.buttonText1}>Registo</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.buttonText2}>FAQ´s</Text>
              </TouchableOpacity>
          </View>

        </View>
      </Swiper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: -80,
    paddingBottom: 80
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    marginBottom: 20,
  },
  text: {
    color: '#1B1B1E',
    fontSize: 17,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    position: 'absolute',
    alignItems: 'center',
    // colocar os botoes mais abaixo
    bottom: 0,
    marginBottom: -50,
  },
  buttonText1: {
    backgroundColor: '#00428A',
    borderRadius: 7.5,
    padding: 10,
    marginBottom: 10, // Adicionando margem inferior para separar do próximo botão
    fontFamily: 'Supply-Bold',
    fontSize: 17,
    color: '#F7F7F7',
    width: 115,
    textAlign: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  buttonText2: {
    backgroundColor: '#6E0271',
    borderRadius: 7.5,
    padding: 10,
    marginBottom: 10, // Adicionando margem inferior para separar do botão anterior
    fontFamily: 'Supply-Bold',
    fontSize: 17,
    color: '#F7F7F7',
    width: 240,
    textAlign: 'center',
  },
  ButtonLoginRegisto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  
});

export default OnboardingsScreen;