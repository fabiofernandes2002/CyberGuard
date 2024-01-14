import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import MenuHamburguer from '../components/Menu';

const AboutUsScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={styles.container}>
      <View>
        <View style={styles.Menu}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/logo_semfundo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.textC}>Cyber</Text>
              <Text style={styles.textG}>Guard</Text>
            </View>
          </TouchableOpacity>
          <NativeBaseProvider>
            <MenuHamburguer />
          </NativeBaseProvider>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.titleEquipa}>
          <Text style={styles.titleEquipa}>Equipa</Text>
        </View>
        <View style={styles.team}>
          <View style={styles.member}>
            <Image
              source={require('../assets/Foto1.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.name}>Bernardo</Text>
          </View>
          <View style={styles.member}>
            <Image
              source={require('../assets/Foto2.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.name}>Fábio</Text>
          </View>
          <View style={styles.member}>
            <Image
              source={require('../assets/Foto3.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.name}>Lucas</Text>
          </View>
        </View>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.aboutUsText}>
          Como alunos do terceiro ano do curso de Tecnologias Web e Sistemas de
          Informação, mergulhámos a fundo no desenvolvimento Web, adquirindo
          competências sólidas em linguagens como HTML, CSS e JavaScript, bem
          como em estruturas modernas, incluindo React e Vue. Com experiência
          prática em projetos, exploramos áreas avançadas como bases de dados,
          segurança da informação e integração de API. Valorizando a
          colaboração, partilhamos ideias para enriquecer o nosso conhecimento
          coletivo. A nossa paixão pela aprendizagem constante e o compromisso
          com a excelência levam-nos a enfrentar os desafios dinâmicos da
          tecnologia, ansiosos por dar um contributo significativo para a área
          do desenvolvimento web.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    Menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
      },    
    content: {
        marginTop: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    team: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    aboutUsText: {
        fontSize: 15,
        textAlign: 'justify',
    },
});

export default AboutUsScreen;
