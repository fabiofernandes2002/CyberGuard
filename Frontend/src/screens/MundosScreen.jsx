import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/CardFlip';
import SetaEsquerda from '../assets/SetaEsquerda.svg';
//import Menu from '../assets/Menu.svg';
import Ellipse from '../assets/Ellipse.svg'; // Ellipse com curva para esquerda
import Ellipse2 from '../assets/Ellipse2.svg'; // Ellipse com curva para direita
import { NativeBaseProvider } from 'native-base';
import MenuHamburguer from '../components/Menu';

const flashcards = [
  {
    id: '1',
    frontText: 'Front Text 1',
    backText: 'Back Text 1',
  },
  {
    id: '2',
    frontText: 'Front Text 2',
    backText: 'Back Text 2',
  },
  {
    id: '3',
    frontText: 'Front Text 3',
    backText: 'Back Text 3',
  },
  /* {
    id: '4',
    frontText: 'Front Text 4',
    backText: 'Back Text 4',
  }, */
];

const FlashcardsScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']} style={Styles.container}>
      <SafeAreaView>
        <View style={Styles.Menu}>
          {/* Back button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          {/* Hamburger menu */}
          <NativeBaseProvider>
            <MenuHamburguer />
          </NativeBaseProvider>
        </View>

        {/* Texto de apresentação */}
        <View style={Styles.text}>
          <Text style={Styles.textTitulo}>Mundos</Text>
          <Text style={Styles.textDescricao}>
            Aqui temos os diferentes mundos que existem no ciberespaço para te proporcionar uma melhor aprendizagem deste universo.
          </Text>
        

        </View>
        <View style={Styles.cardContainer}>
          {flashcards.map((card, index) => (
            <View style={index % 2 === 0 ? Styles.cardRow : Styles.cardRowSecond} key={`card_${card.id}`}>
              <Card frontText={card.frontText} backText={card.backText} />
              {index < flashcards.length - 1 && (
                index % 2 === 0 ? 
                <Ellipse width={179.31} height={150} style={Styles.ellipse} /> :
                <Ellipse2 width={179.31} height={150} style={Styles.ellipse2} />
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>
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
  cardContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  cardRowSecond: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    position: 'absolute', // Adicione isso
    right: 0, // Adicione isso
    marginTop: 200, // Adicione isso
  },
  ellipse: {
    alignSelf: 'center',
    marginLeft: 'auto', // Espaçamento entre a carta e a elipse
    marginRight: 5, // Espaçamento entre a elipse e a próxima carta
  },
  // ellipse2 ficar do lado esquerdo da carta
  ellipse2: {
    position: 'absolute', // Adicione isso
    right: 200, // Adicione isso
    alignSelf: 'center',
    marginRight: 'auto', // Espaçamento entre a carta e a elipse
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  textTitulo: {
    fontFamily: 'Supply-Bold',
    fontSize: 24,
    color: '#6E0271',
    marginBottom: 20,
  },
  textDescricao: {
    fontFamily: 'Raleway-Medium',
    fontSize: 17,
    color: '#24364C',
    textAlign: 'center',
    marginBottom: 20,
  },
  Menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  icon: {
    // Estilos para o ícone, se necessário
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
});

export default FlashcardsScreen;