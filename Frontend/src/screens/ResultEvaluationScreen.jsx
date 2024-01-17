import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SucessIcon from '../assets/SucessIcon.svg';

const ResultEvaluationScreen = ({route}) => {
  const {score} = route.params;
  console.log('Score:', score);
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate('ProfileScreen');
  }, 5000);

  const handleLinkTextClick = () => {
    navigation.navigate('MundosScreen');
  };

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={Styles.container}>
      <View>
        {/* Logo */}
        <View style={Styles.LogoLogin}>
          <Image
            source={require('../assets/logo_semfundo.png')}
            style={Styles.logo}
            resizeMode="contain"
          />
          <Text style={Styles.pontuacaoText}>Curso de Malware concluído!</Text>
        </View>
        {/* coolIcon */}
        <View style={Styles.coolIcon}>
          <SucessIcon width={100} height={100} style={Styles.icon} />
        </View>
        {/* Pontuação */}
        <View style={Styles.pontuacaoText}>
          <Text style={Styles.textP}>Pontuação: {score} / pontos</Text>
        </View>
        {/* Text results */}
        <View style={Styles.text}>
          <Text style={Styles.text}>
            Serás redirecionado para a tua página de perfil em 5 segundos, para
            veres a tua evolução...
          </Text>
          <Text style={[Styles.text, Styles.spacing]}>
            Clica{' '}
            <Text onPress={handleLinkTextClick} style={Styles.linkText}>
              Aqui
            </Text>{' '}
            caso não sejas redirecionado automaticamente.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -150,
  },
  logo: {
    width: 230,
    height: 230,
    marginBottom: 20,
    alignSelf: 'center',
    marginBottom: 50,
  },
  pontuacaoText: {
    color: '#6E0271',
    fontSize: 24,
    fontFamily: 'Supply-Bold',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: -50,
  },
  text: {
    color: '#1B1B1E',
    fontSize: 17,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
  },
  textP: {
    color: '#6E0271',
    fontSize: 24,
    fontFamily: 'Supply-Bold',
    textAlign: 'center',
    marginTop:30
  },
  linkText: {
    color: '#6E0271',
    fontSize: 17,
    fontFamily: 'Supply-Bold',
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  spacing: {
    marginTop: 20,
  },
});
export default ResultEvaluationScreen;
