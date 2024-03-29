import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Card from '../components/CardFlip';
import Ellipse from '../assets/Ellipse.svg'; // Ellipse com curva para esquerda
import Ellipse2 from '../assets/Ellipse2.svg'; // Ellipse com curva para direita
import {NativeBaseProvider} from 'native-base';
import MenuHamburguer from '../components/Menu';
import CoursesService from '../services/courses.services';

const FlashcardsScreen = () => {
  const navigation = useNavigation();

  const [flashcards, setFlashcards] = useState([]); // Crie um estado para os flashcards

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await CoursesService.getAllDiscoverCourses();
        setFlashcards(courses.map(course => ({
          id: course._id,
          frontText: course.imgURL,
          backText: course.description,
          coursesIds: course.coursesIds,
        })));
      } catch (error) {
        console.error('Error fetching courses:', error.message);
        if (error.response) {
          console.error('Response body:', error.response.body);
        }
      }
    };
  
    fetchCourses();
  }, []);

  // quando o utilizador carrega no BackText do Card, ele vai para a página de cursos se courses.coursesIds.length > 0 senão aparece um alerta a dizer que não existem cursos
  /* if (flashcards.length === 0) {
    return (
      <View style={Styles.container}>
        <Text style={Styles.textTitulo}>Mundos</Text>
        <Text style={Styles.textDescricao}>
          Aqui temos os diferentes mundos que existem no ciberespaço para te
          proporcionar uma melhor aprendizagem deste universo.
        </Text>
        <Text style={Styles.textDescricao}>
          Não existem cursos disponíveis de momento.
        </Text>
      </View>
    );
  } */

  const handleCardBackPress = (course) => {
    if (course.coursesIds.length > 0) {
      navigation.navigate('CoursesScreen');
    } else {
      Alert.alert('Não existem cursos disponíveis de momento.');
    }
  };

  return (
    <LinearGradient
      colors={['#D8DBE2', '#A9BCD0', '#A9BCD0']}
      style={Styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
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
            {/* Hamburger menu */}
            <NativeBaseProvider>
              <MenuHamburguer />
            </NativeBaseProvider>
          </View>

          {/* Texto de apresentação */}
          <View style={Styles.text}>
            <Text style={Styles.textTitulo}>Mundos</Text>
            <Text style={Styles.textDescricao}>
              Aqui temos os diferentes mundos que existem no ciberespaço para te
              proporcionar uma melhor aprendizagem deste universo.
            </Text>
          </View>
          <View style={Styles.cardContainer}>
            {flashcards.map((card, index) => (
              <View style={Styles.row} key={`card_${card.id}`}>
                <View style={Styles.cardWithEllipse}>
                  {index % 2 === 0 ? (
                    <>
                      <TouchableOpacity onPress={() => handleCardBackPress(card)}>
                        <View style={Styles.cardWrapper}>
                          <Card
                            imgURL={card.frontText}
                            backText={card.backText}
                            handleCardBackPress={() => handleCardBackPress(card)}
                          />
                        </View>
                      </TouchableOpacity>
                      {index === flashcards.length - 1 ? (
                        <Ellipse style={{opacity: 0}} />
                      ) : (
                        <Ellipse position="right" style={Styles.ellipseRight} />
                      )}
                    </>
                  ) : (
                    <>
                      {index === flashcards.length - 1 ? (
                        <Ellipse2 style={{opacity: 0}} />
                      ) : (
                        <Ellipse2 position="left" style={Styles.ellipseLeft} />
                      )}
                      <TouchableOpacity onPress={() => handleCardBackPress(card)}>
                        <View style={Styles.cardWrapper}>
                          <Card
                            imgURL={card.frontText}
                            backText={card.backText}
                            handleCardBackPress={() => handleCardBackPress(card)}
                          />
                        </View>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
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
    width: 70,
    height: 70,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    marginTop: 10,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  row: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWithEllipse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  cardWrapper: {
    width: 170,
    height: 150,
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  ellipseRight: {
    marginRight: 70,
    marginTop: 50,
    transform: [{scale: 1.1}],
  },
  ellipseLeft: {
    marginLeft: 70,
    marginTop: 50,
    transform: [{scale: 1.1}],
  },
  curvedLineRight: {
    width: 100,
    height: 50,
    borderTopLeftRadius: 50,
    backgroundColor: 'red',
  },
  curvedLineLeft: {
    width: 100,
    height: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'green',
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
    marginTop: 30,
  },
  textC: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 55,
    justifyContent: 'center',
    marginTop: -5,
  },
  textG: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 55,
    justifyContent: 'center',
    marginTop: -5,
  },
});

export default FlashcardsScreen;
