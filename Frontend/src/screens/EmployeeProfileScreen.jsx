import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Avatar, VStack, NativeBaseProvider} from 'native-base';
import {Card} from 'react-native-paper';
import Star from '../assets/star.svg';
import MenuHamburguer from '../components/Menu';
import AuthService from '../services/auth.service';

const user = AuthService.getUserLogged();

const EmployeeProfileScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setUsername(user._j.userInfo.username);
        setEmail(user._j.userInfo.email);
        setPassword(user._j.userInfo.password);
        setUserType(user._j.userInfo.userType);
      } catch (error) {
        console.error('Error retrieving user information:', error.message);
        throw error;
      }
    };
    getUserInfo();

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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
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

            <NativeBaseProvider>
              <MenuHamburguer />
            </NativeBaseProvider>
          </View>

          <View style={Styles.container2}>
            <Text style={[Styles.title, {marginBottom: 30}]}>Perfil</Text>

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

          <View style={Styles.inputContainer}>
            <Text>Nome</Text>
            <View style={Styles.inputWrapper}>
              <TextInput
                style={[Styles.input, {textAlign: 'left'}]}
                placeholder={username}
                underlineColorAndroid="transparent"
                editable={false}
              />
            </View>
            <View style={Styles.underline}></View>
          </View>

          <View style={Styles.inputContainer}>
            <Text>Tipo de Utilizador</Text>
            <View style={Styles.inputWrapper}>
              <TextInput
                style={[Styles.input, {textAlign: 'left'}]}
                placeholder={userType}
                underlineColorAndroid="transparent"
                editable={false}
              />
            </View>
            <View style={Styles.underline}></View>
          </View>

          <View style={Styles.inputContainer}>
            <Text>Email</Text>
            <View style={Styles.inputWrapper}>
              <TextInput
                style={[Styles.input, {textAlign: 'left'}]}
                placeholder={email}
                underlineColorAndroid="transparent"
                editable={false}
              />
            </View>
            <View style={Styles.underline}></View>
          </View>

          <View style={Styles.sugestedCourses}>
            <Text style={Styles.title2}>CURSOS CONCLUÍDOS</Text>
            <ScrollView horizontal>
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
            </ScrollView>
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
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },

  Menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
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

  textC: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 55,
    justifyContent: 'center',
  },

  textG: {
    fontFamily: 'Supply-Bold',
    fontSize: 20,
    color: '#00428A',
    marginLeft: 55,
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

  title2: {
    fontFamily: 'Supply-Bold',
    fontSize: 18,
    color: 'black',
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

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  underline: {
    height: 2,
    backgroundColor: '#6E0271',
  },

  sugestedCourses: {
    marginTop: 40,
  },

  cards: {
    marginTop: 20,
    flexDirection: 'row',
    paddingRight: 20,
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '23%',
    marginBottom: 50,
    marginHorizontal: 10,
    backgroundColor: '#00428A',
  },
  cardTitle: {
    fontFamily: 'Supply-Medium',
    fontSize: 15,
    color: '#f7f7f7',
    marginTop: 10,
  },
});

export default EmployeeProfileScreen;
