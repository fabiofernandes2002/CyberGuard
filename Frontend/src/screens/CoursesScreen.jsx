import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import MenuHamburguer from '../components/Menu';
import {Card} from 'react-native-paper';
import Star from '../assets/star.svg';
import CoursesService from '../services/courses.services';

/* const courses = [
  {
    id: '1',
    name: 'Direitos Individuais',
    image: require('../assets/course1.png'),
    price: '20.99€',
    rating: 120,
    description:
      'Explora os fundamentos dos direitos individuais no nosso curso. Capacita-te na compreensão e defesa dos teus direitos online.',
  },
  {
    id: '2',
    name: 'Malware',
    image: require('../assets/course2.png'),
    price: false,
    rating: 120,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Sed vitae eros quis nisl aliquam aliquet.',
  },
  {
    id: '3',
    name: 'Proteção de Dados',
    image: require('../assets/course3.png'),
    price: '20.99€',
    rating: 120,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Sed vitae eros quis nisl aliquam aliquet.',
  },
  {
    id: '4',
    name: 'Marketing Digital Ético',
    image: require('../assets/course4.png'),
    price: '20.99€',
    rating: 120,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam aliquet. Sed vitae eros quis nisl aliquam aliquet.',
  },
]; */

const CoursesScreen = () => {
  const navigation = useNavigation();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await CoursesService.getAllCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseDetailsScreen = item => {
    navigation.navigate('CoursesDetailsScreen', {courseId: item._id});
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
            {/* Menu hamburguer */}
            <MenuHamburguer />
          </View>
          <View style={Styles.container2}>
            <Text style={Styles.title}>Privavcidade de Dados</Text>
            <Text style={Styles.textDescription}>
              A privacidade de dados é crucial para assegurar que as tuas
              informações pessoais permanecem seguras ao longo do processo.
            </Text>
            <View style={Styles.cards}>
              {courses.map((course, index) => (
                <Card
                  key={index}
                  style={Styles.card}
                  onPress={() => handleCourseDetailsScreen(course)}>
                  <Card.Cover
                    style={{height: 150}}
                    source={{uri: course.imgURL}}
                  />
                  <Card.Content>
                    <Text style={Styles.cardTitle}>{course.nameCourse}</Text>
                    <Text style={Styles.cardPrice}>
                      {course.price ? course.price : 'FREE'}
                    </Text>
                    {/* adicionar a imagem svg star */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} width={15} height={15} />
                      ))}
                      <Text
                        style={{
                          fontFamily: 'Supply-Medium',
                          fontSize: 15,
                          color: '#f7f7f7',
                          marginLeft: 5,
                        }}>
                        ({course.rating})
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </View>
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
    marginTop: 50,
  },
  textDescription: {
    fontFamily: 'Raleway-Medium',
    fontSize: 17,
    color: '#24364C',
    textAlign: 'center',
    marginBottom: 20,
  },
  cards: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 50,
    backgroundColor: '#00428A',
  },
  cardTitle: {
    fontFamily: 'Supply-Medium',
    fontSize: 15,
    color: '#f7f7f7',
    marginTop: 10,
  },
  cardPrice: {
    fontFamily: 'Supply-Medium',
    fontSize: 15,
    color: '#f7f7f7',
    marginTop: 10,
  },
});

export default CoursesScreen;
